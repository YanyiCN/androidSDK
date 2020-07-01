import { EventType, NetStateType, PopLayer, MsgType, Mid, MsgTypeMap } from "../define/Const";
import CrossMgr from "../data/CrossMgr";
import { Lobby } from "../proto/proto";
import glb from "../utils/glb";
import PopMgr from "../data/PopMgr";
import mlog from "../utils/LogUtil";

var CONNECT_TIMEOUT = 8		// 连接超时CD
var CONNECT_CHECK_TICK = 0.1	// 连接检测间隔
var CONNECT_FOR_LOADING = 0	// 连接出现loading的时间

var NET_CHECK_CD_MAX = 1		// 网络检查CD//0.3
var HEART_SEND_CD_MAX = 3 	    // 发送心跳CD
var HEART_RECON_CD_MAX = 10 	// 心跳重连CD
var HEART_RECON_CD_FAST = 1.5 	// 心跳重连CD,快速
var RE_CONNECT_CD_MAX = 2		// 重连CD



export default class MySocket extends cc.Component {

    private host: string;
    private port: number;

    private reqMsgId: number = 0;
    delayTime: number;
    private inited: boolean;
    hasMsgNoSuc: boolean;
    private hasNetCheckCD: number;

    netState: number;
    private heartSendCD: number;
    private heartSend: boolean;

    private ws: WebSocket;
    private connectCheckSchedule: Function;
    private connectTime: number;
    private heartTime: number;
    private reConnecting: boolean;
    private reConnectTime: number;
    private isConnecting: boolean;
    private isConnectSucc: any;
    private lastServerTime: any;
    private lastClientTime: number;


    // 快速检测回调
    private fastCheckCall: (isCon: boolean) => void;

    private mainUpdateSchedule: boolean;

    constructor() {
        super();
        glb.regEventLis(EventType.CROSS_NET_TYPE_CHANGE, this.onNetChange, this)
        glb.regEventLis(EventType.CROSS_NET_LEVEL_CHANGE, this.onNetLevelChange, this)
    }

    public getIsConnectSucc(): boolean {
        return this.isConnectSucc;
    }

    onDestroy() {
        glb.removeTargetAllEventLis(this);
    }

    init(serverHost: string, serverPort: number): void {
        this.host = serverHost
        this.port = serverPort
        // 初次检测网络
        this.netState = CrossMgr.checkNetState()
        mlog.info("this.netState", this.netState)
        this.reqMsgId = 0
        this.delayTime = 0
        this.inited = true
        this.hasMsgNoSuc = false
        this.hasNetCheckCD = NET_CHECK_CD_MAX
        this.resetAll()

        if (!this.mainUpdateSchedule) {
            this.schedule(this.update, 0);
            this.mainUpdateSchedule = true;
        }
    }





    private onNetChange(value): void {
        // 网络类型变化  主动去查
        // 只是将网络检测提前
        mlog.info("网络变化事件:", value, "旧状态：", this.netState)
        this.hasNetCheckCD = -1
        this.update(0)
        glb.sendEvent(EventType.NETWORK_CHANGE, this.netState)
    }

    private onNetLevelChange(value: number): void {
        // 网络强度变化
        // 只是将网络检测提前
        mlog.info("网络强度变化", value, "旧状态：", this.netState)
        this.hasNetCheckCD = -1
        this.update(0)
        glb.sendEvent(EventType.NETWORK_CHANGE, this.netState)
    }

    private uninitByLogout(): void {
        this.inited = false;
        let temp = this.ws;
        this.ws = null;
        if (temp) {
            temp.onclose = null;
            temp.close();
        }
        this.resetAll()
    }

    // 重置状态
    private resetAll(): void {
        this.heartSend = false
        this.heartSendCD = HEART_SEND_CD_MAX  //心跳剩余时间
        this.heartTime = HEART_RECON_CD_MAX
        this.reConnecting = false
        this.reConnectTime = Date.now();

        this.connectTime = 0
        this.isConnecting = false

        // 清空之前的连接检测定时器
        this.cleanConnectCheck();
    }

    // 检查客户端是否有网络
    private checkHasNet(delta): boolean {
        this.hasNetCheckCD = this.hasNetCheckCD - delta
        if (this.hasNetCheckCD < 0) {
            this.hasNetCheckCD = NET_CHECK_CD_MAX


            let oldState = this.netState
            this.netState = CrossMgr.checkNetState();
            if (oldState != this.netState) {
                mlog.info("网络变化,重连: ", oldState, "->", this.netState)
                if (oldState == NetStateType.NST_NO && this.netState != NetStateType.NST_NO) {
                    // 之前无网  现在有网
                } else if (oldState != NetStateType.NST_NO && this.netState == NetStateType.NST_NO) {
                    // 之前有网  现在无网
                    glb.sendEvent(EventType.NET_STATE_TIP, {
                        msg: "网络已丢失"
                    })
                }

                if (this.netState == NetStateType.NST_WIFI) {
                    mlog.info("提示已切换到wifi")
                    glb.sendEvent(EventType.NET_STATE_TIP, {
                        msg: "已连接到wifi",
                        icon: "wifi"
                    })
                } else if (this.netState == NetStateType.NST_NET) {
                    mlog.info("提示已切换到手机网络")
                    glb.sendEvent(EventType.NET_STATE_TIP, {
                        msg: "已连接到手机网络",
                        icon: "net"
                    })
                }
                this.reConnect(true, true)
                glb.sendEvent(EventType.NETWORK_CHANGE, this.netState)
                return false
            }
        }
        // 返回是否有网
        return this.netState != NetStateType.NST_NO
    }

    // 检测心跳
    private checkHeart(delta): void {
        this.heartTime = this.heartTime - delta
        if (this.heartTime <= 0) {
            mlog.info("心跳超时,直接重连")
            this.reConnect()
            return
        }
        this.heartSendCD = this.heartSendCD - delta
        if (this.heartSendCD < 0) {
            if (!this.heartSend) {
                //发送心跳
                this.sendHeartBeatMsg()
            }
        }
    }

    // 马上发送一个心跳,快速检测网络
    public checkByHeartFast(): Promise<boolean> {
        this.sendHeartBeatMsg()
        this.heartTime = HEART_RECON_CD_FAST
        return new Promise<boolean>((res, rej) => {
            this.fastCheckCall = res;
        });
    }


    public reConnect(force: boolean = false, igTime = false): void {
        // 已确定网络是有问题的
        this.handleFastCallback(false);
        // 重连
        if (!igTime && Date.now() - this.reConnectTime <= RE_CONNECT_CD_MAX * 1000) {
            return
        }
        if (!force && this.reConnecting) {
            return
        }
        mlog.info("服务器重连")
        this.resetAll()
        this.isConnectSucc = false
        this.reConnecting = true
        if (this.ws) {
            this.ws.onmessage = null
            this.ws.onclose = null;
            this.ws.onerror = null;
            this.ws.close()
            this.ws = null
        }
        this.connect()
    }

    // 连接成功
    private onConnectSuc(): void {
        let isReCon = this.reConnecting
        this.resetAll()
        this.isConnectSucc = true
        mlog.info("Socket connect success!")
        glb.sendEvent(EventType.LOADING_CON, false);
        glb.sendEvent(EventType.SERVER_CONNECT_CHANGE, true, "服务器已连接", isReCon)
    }

    // 连接失败
    private onConnectFail(errorInfo): void {
        this.resetAll()
        this.isConnectSucc = false
        glb.sendEvent(EventType.SERVER_CONNECT_CHANGE, false, errorInfo)
        mlog.info("onConnectFail:", errorInfo)
        glb.sendEvent(EventType.NET_STATE_TIP, {
            msg: "网络连接不稳定"
        })
    }


    update(delta): void {
        if (!this.inited) {
            return
        }
        // 无网直接不操作   网络从无到有会重连
        if (!this.checkHasNet(delta)) {
            return
        }
        // 心跳处理 超时会重连
        this.checkHeart(delta)

        // 收取数据
        // this.receiveMessage()
        // 发送数据
        //	this.send()
    }

    // 发送心跳
    private sendHeartBeatMsg(): void {
        this.heartSend = true
        this.heartSendCD = HEART_SEND_CD_MAX
        glb.sendMsg(MsgType.HeartBeatReq, { req_time: Date.now() })
        // console.log("发送心跳包  ")//+Date.now())
    }

    private cleanConnectCheck() {
        // 清空之前的连接检测定时器
        if (this.connectCheckSchedule) {
            this.unschedule(this.connectCheckSchedule)
            this.connectCheckSchedule = null
        }
    }

    //连接
    public connect(): void {
        mlog.info("SocketClient:connect serverIp = ", this.host, ", serverPort = ", this.port)

        glb.sendEvent(EventType.LOADING_MSG_FINISH, null, null, true)

        // 清空之前的连接检测定时器
        this.cleanConnectCheck();
        // 创建连接
        this.ws = new WebSocket(this.host + ":" + this.port)
        // this.ws.binaryType = "arraybuffer";

        this.ws.onmessage = this.onMsgArrive.bind(this)
        this.ws.onclose = () => {
            // 直接重连
            mlog.info("网络关闭onclose")
            this.reConnect(false)
        }
        this.ws.onerror = () => {
            // 直接重连
            mlog.info("网络异常onerror")
            this.reConnect(false)
        }

        this.connectCheckSchedule = (): void => {
            let oldConnectTime = this.connectTime;
            this.connectTime += CONNECT_CHECK_TICK;
            if (this.ws.readyState === WebSocket.OPEN) {
                this.onConnectSuc()
                return
            }

            if (this.connectTime > CONNECT_TIMEOUT) {
                mlog.info("连接超时")
                this.onConnectFail("连接超时")
                //直接尝试重连
                this.reConnect(true, true)
            } else if (this.connectTime > CONNECT_FOR_LOADING && (oldConnectTime <= CONNECT_FOR_LOADING)) {
                // 可以出现loading了
                glb.sendEvent(EventType.LOADING_CON, true);
            }
        }
        this.schedule(this.connectCheckSchedule, CONNECT_CHECK_TICK)
    }

    // 发送数据
    public sendData(msgType: any[], data: object, msgId: number): boolean {
        if (!this.isConnectSucc || !this.ws || this.isConnecting) {
            // 链接未建立
            PopMgr.showPop(PopLayer.POP_TIP, {
                msg: "网络连接失败,请检查!"
            }, true)
            return false
        }
        // local sendSize, errorInfo, sendIndexWhenError = this.tcpConnection:send(datas)

        let logicMsg = msgType[1].create(data) //构造对象
        let logicMsgEncode = msgType[1].encode(logicMsg).finish()    //获取二进制数据，一定要注意使用finish函数
        let msgCtn = Lobby.BaseMsg.create({ type: msgType[2], mid: msgType[0], req_id: msgId, server_id: null, data: logicMsgEncode }) //构造对象
        let msgCtnEncode = Lobby.BaseMsg.encode(msgCtn).finish()
        let sendArray = msgCtnEncode.buffer.slice(msgCtnEncode.byteOffset, msgCtnEncode.byteOffset + msgCtnEncode.byteLength);
        this.ws.send(sendArray); //发送二进制数据

        return true
    }

    // 心跳消息到达处理
    private onHeartBeatRes(msg): void {
        // if(msg){
        //     console.log("检测到心跳 req_time  ",msg.req_time+"\nserver_time  "+msg.server_time);
        // }
        // console.log("检测到心跳")
        // 可以肯定是有网络的
        this.handleFastCallback(true);
        // 重置CD
        this.heartSendCD = HEART_SEND_CD_MAX
        this.heartSend = false
        this.heartTime = HEART_RECON_CD_MAX

        if (msg && msg.req_time != null && msg.req_time > 0) {
            this.delayTime = Date.now() - msg.req_time
            if (msg.server_time != null && msg.server_time > 0) {
                this.lastServerTime = msg.server_time
                this.lastClientTime = Date.now()
            }
            glb.sendEvent(EventType.SERVER_DELAY_CHANGE, this.delayTime)
        }
    }

    // 获取服务器的时间
    public getServerTime(): number {
        if (this.lastServerTime != null && this.lastClientTime != null) {
            return Math.ceil(this.lastServerTime + (Date.now() - this.lastClientTime) + (this.delayTime) / 2)
        }
        return Date.now()
    }


    private onMsgArrive(event): void {
        if (event == null) {
            return
        }
        if (event.data instanceof ArrayBuffer) {
            this.handleMsg(event.data);
        } else {
            try {
                if (event.data instanceof Blob) {
                    let reader = new FileReader();
                    reader.readAsArrayBuffer(event.data);
                    reader.onload = (e: ProgressEvent) => {
                        this.handleMsg(reader.result as ArrayBuffer);
                    };
                }
            } catch (error) {
                mlog.error(error);
            }
        }
    }

    private handleMsg(data: ArrayBuffer) {
        let buf = new Uint8Array(data)
        let msgCtn = Lobby.BaseMsg.decode(buf)
        let msgTypeCla = null
        let msgTypeName = MsgTypeMap[msgCtn.mid]
        if (!msgTypeName) {
            mlog.info("SocketClient:onMsgArrive() type:", msgCtn.mid, " is unknown!!!")
            return
        }
        for (let i in MsgType) {
            if (MsgType[i][0] == msgCtn.mid) {
                msgTypeCla = MsgType[i][1]
                break
            }
        }
        let midDatas = msgTypeCla.decode(msgCtn.data);
        if (msgCtn.mid == Mid.MID_HEART_BEAT_REQ) {
            this.sendHeartBeatMsg()
        } else {
            if (msgCtn.mid == Mid.MID_HEART_BEAT_RES) {
                this.onHeartBeatRes(midDatas)
            }
            else {
                // -- 普通消息 重置CD
                this.onHeartBeatRes(null)
                glb.sendEvent(EventType.LOADING_MSG_FINISH, msgCtn.mid, midDatas)
                glb.sendEvent(msgCtn.mid, midDatas)
            }
        }
    }

    public getReqMsgId(): number {
        return this.reqMsgId;
    }
    public addReqMsgId(): number {
        this.reqMsgId++;
        return this.reqMsgId;
    }


    private handleFastCallback(isCon: boolean) {
        if (this.fastCheckCall != null) {
            this.fastCheckCall(isCon);
            this.fastCheckCall = null;
        }
    }
}
