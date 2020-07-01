import MySocket from "../base/MySocket";
import MyMgr from "../base/MyMgr";
import CrossMgr from "../data/CrossMgr";
import mlog from "../utils/LogUtil";
import { EventType, Mid, PopLayer } from "../define/Const";
import { ClientCfg } from "../define/ClientCfg";
import { ChannelBean } from "../data/entity/ChannelBean";

class glb extends MyMgr{
    public initByLoad() {
        mlog.info("初始glb");
        this.socket = new MySocket();
    }

    public initMgr() {
        this.ch = CrossMgr.getChannelAndCode()
        this.isTest = ClientCfg.forceTest|| this.ch.channel == "test"
    }
    public uninitMgr() {}
    
    //此类定义一些公用的小方法
    eventsListener:{[key:number] : Array<any[]>} = {}
    private socket:MySocket = null;
    isShenhe: boolean;
    ch: ChannelBean;
    scheduler: any;
    isOutBySelf = false
    isOutBySelfBackTime = 0
    clientVersion = "1.0.0";
    isTest = false;

    // 获取数据接口
    getUserData(key:string, valueType:string="string",defVal:any=null):any{

        let localValue = cc.sys.localStorage.getItem(key);
        if (localValue==null || localValue=="") {
            return defVal
        }
        if (valueType=="int") {
            return Number.parseInt(localValue);
        }
        return localValue;
    }


    //设置数据接口 
    setUserData( key:string, value:any, valueType:string="string" ):void{
        cc.sys.localStorage.setItem(key,value);
    }
    removeUserData(key:string){
        cc.sys.localStorage.removeItem(key);
    }
    


    // start //
    ////////////////////////////////
    // @class function regEventLis
    // @description 注册事件回调
    // @param eventType 事件类型
    // @param target 实例
    // @param method 方法
    // @return
    // glb.regEventLis(2, self, self.eventLis)
    // } //
    regEventLis(eventType:number, method:Function, target:object):void{
        if(eventType==null || !target || !method) {
            mlog.info("error regEventLis return!!! ",eventType)
            if(eventType==null) { throw("eventType is null !!!") }
            if(!target) { throw("target is null !!!") }
            if(!method) { throw("method is null !!!") }
            return;
        }
        let eventsListener = this.eventsListener
        let lisList = eventsListener[eventType]
        if(!lisList){
            // 首次添加eventType类型事件,新建消息存储列表
            lisList = new Array<any[]>();
            eventsListener[eventType] = lisList
        }else{
            // 检查重复添加
            for (let lis of lisList) {
                if(lis[0] == target && lis[1] == method) {
                    if (lis[2]) {
                        lis[2] = false
                        return
                    }
                    return
                }
            }
        }

        // 加入到事件列表中
        let lis = [target, method ,false];
        lisList.push(lis);
    }
    // start //
    ////////////////////////////////
    // @class function sendEvent
    // @description 分发eventType事件
    // @param eventType 事件类型
    // @param ... 调用者传递的参数
    // @return
    // } //
    sendEvent(eventType:number, ...params:any):void{
        if(eventType==null) {
            return;
        }
        let listeners = this.eventsListener[eventType];
        if (!listeners) {
            return;
        }
        // 从后向前调用,防止调用途中,中途插入,只做删除
        for (let i = listeners.length-1; i >= 0; i--) {
            let listener=listeners[i];
            if(listener[2]) { 
                // 在内部调用删除,防止出现乱的问题
                listeners.splice(i,1);
            }
        }

        // 从后向前调用,防止调用途中,中途插入,只执行方法
        for (let i = listeners.length-1; i >= 0; i--) {
            let listener=listeners[i]
            if(!listener[2]) {
                // 调用注册函数
                try {
                    let funToRun = listener[1].bind(listener[0]);
                    funToRun(...params);
                } catch (error) {
                    mlog.error("sendEvent eventType",eventType,", err",error,", errMsg:",error?error.message:"");
                }
            }
        }
    }

    // start //
    ////////////////////////////////
    // @class function removeTargetEventListenerByType
    // @description 移除target注册的事件
    // @param target self
    // @param eventType 消息类型
    // @return
    // } //
    removeTargetEventLisByType(target:object, eventType:number):void{
        if (!target || eventType==null) {
            return
        }

        // 移除target的注册的eventType类型事件
        let listeners = this.eventsListener[eventType];

        for (let listener of listeners) {
            if (listener[1] == target) {
                //只做标记,不真删除,发送前删除
                listener[3] = true
            }
        }
    }

    // start //
    ////////////////////////////////
    // @class function removeTargetAllEventLis
    // @description 移除target的注册的全部事件
    // @param target self
    // @return
    // } //
    removeTargetAllEventLis(target:object):void{
        if (!target) {
            return
        }
        let removeCount = 0
        // 移除target注册的全部事件
        for (const evtType in this.eventsListener) {
            // mlog.info("evtType:",evtType)
            const evtList = this.eventsListener[evtType];
            for (const evt of evtList) {
                if (evt[0] == target) {
                    removeCount++;
                    //只做标记,不真删除,发送前删除
                    evt[2] = true;
                }
            }
        }
        mlog.info("移除目标的所有监听共",removeCount)
    }
    // glb.removeTargetAllEventLis = removeTargetAllEventLis

    // start //
    ////////////////////////////////
    // @class function removeAllEventLis
    // @description 移除全部消息注册回调
    // @return
    // } //
    removeAllEventLis():void{
        this.eventsListener = {}
    }


    // 发送消息
    sendMsg(mType,msgTable,ignoreLoading:boolean = false):void{
        let reqMsgId = this.socket.getReqMsgId();
        let loadingData:{mtype:number,reqMsgId:number, autoCloseMsg:number[]} = null;
        // loading
        if (mType[3]!=null && mType[3].autoCloseMsg && mType[3].autoCloseMsg.length>0 && !ignoreLoading) {
            loadingData = {
                mtype:mType[0],
                reqMsgId:reqMsgId,
                autoCloseMsg:mType[3].autoCloseMsg
            }
        }
        
        // 消息 编号++
        this.socket.addReqMsgId()

        // 发送消息
        if (this.socket.sendData(mType,msgTable,reqMsgId)) {
            if (loadingData!=null) {
                // 创建Loading
                this.sendEvent(EventType.LOADING_MSG_NEED,loadingData);
            }
        }
    }
    private trueSendMsg(mType,msgTable,ignoreLoading:boolean = false):void{
        let reqMsgId = this.socket.getReqMsgId();
        let loadingData:{mtype:number,reqMsgId:number, autoCloseMsg:number[]} = null;
        // loading
        if (mType[3]!=null && mType[3].autoCloseMsg && mType[3].autoCloseMsg.length>0 && !ignoreLoading) {
            loadingData = {
                mtype:mType[0],
                reqMsgId:reqMsgId,
                autoCloseMsg:mType[3].autoCloseMsg
            }
        }
        
        // 消息 编号++
        this.socket.addReqMsgId()

        // 发送消息
        if (this.socket.sendData(mType,msgTable,reqMsgId)) {
            if (loadingData!=null) {
                // 创建Loading
                this.sendEvent(EventType.LOADING_MSG_NEED,loadingData);
            }
        }
    }
    // glb.sendMsg = sendMsg


    // // 服务器时间
    getServerTime():number{
        return this.socket.getServerTime()
    }
    // glb.getServerTime = getServerTime

    getSocket():MySocket{
        return this.socket;
    }
}

export default new glb;