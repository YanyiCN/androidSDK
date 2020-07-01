import MyPop from "../base/MyPop";
import { Mid, MsgType, SceneType,EventType } from "../define/Const";
import glb from "../utils/glb";
import PopMgr from "../data/PopMgr";
import FloatMgr from "../data/FloatMgr";
import MyScene from "../base/MyScene";
import PopMap from "../define/PopMap";
const { ccclass, property } = cc._decorator;

@ccclass
export default class ProtobufTset extends MyScene {

    @property(cc.Node)
    sendNode: cc.Node = null;

    @property(cc.Node)
    bgNode: cc.Node = null;

    public getSceneType(): string {
        return null;//SceneType.TEST_SCENE;
    }

    protected getBgNode(): cc.Node {
        return this.bgNode;
    }

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    onExtLoad() {
        console.log("onExtLoad...ProtabufTest..scene");
        let RELEASE_HOST = ["wss://ddz.game.18juyou.com", 18053];
        glb.getSocket().init(RELEASE_HOST[0] as string, RELEASE_HOST[1] as number);
        glb.getSocket().connect();
    }
    onExtStart() {
        // console.log("start");
        // this.regLis(Mid.MID_QUESTION_RES, this.onResponse);
    }

    private sendEvent(event, data) {
        // PopMgr.tip("2.3.3~~~~");
        let e = event;
        cc.log("protobuf 测试 打印", data);
        // glb.sendMsg(MsgType.QuestionReq, { question_ctx: "GG SMD" })

        // FloatMgr.showDebugPoint();
        //   this.node.getComponent(MyScene).scene();

        // PopMgr.alert("12345上山打老虎");
        glb.sendEvent(EventType.LOADING_CON,false);
    }

    // 发送数据
    private send() {
        let RELEASE_HOST = ["wss://ddz.game.18juyou.com", 18053];
        let self = this;
        let webSocket = new WebSocket(RELEASE_HOST[0] + ":" + RELEASE_HOST[1]);
        webSocket.binaryType = "arraybuffer";

        let webSocketRes: string = "";
        webSocket.onmessage = this.regEvent.bind(this)
        webSocket.onopen = (event) => {
            //用于指定连接成功后的回调函数。
            console.log("网络连接onopen")
            console.log(event);
            webSocketRes = event.type;
        }
        webSocket.onclose = () => {
            //用于指定连接关闭后的回调函数。
            console.log("网络关闭onclose")
            console.log(event);
        }
        webSocket.onerror = () => {
            //用于指定连接失败后的回调函数。
            console.log("网络异常onerror")
            console.log(event);
        }

        let getReadyState = () => {
            console.log(webSocket.readyState);
            if (webSocket.readyState == WebSocket.OPEN) {
                var buf = "Hello WebSocket中文,\0 I'm\0 a\0 binary\0 message\0.";
                var arrData = new Uint16Array(buf.length);
                for (var i = 0; i < buf.length; i++) {
                    arrData[i] = buf.charCodeAt(i);
                }
                //向websocket发送消息
                webSocket.send(arrData.buffer);
            }
        }
        this.scheduleOnce(getReadyState, 1);


    }

    private regEvent() {
        //用于指定连接成功后的回调函数。
        console.log("网络连接onopen")
        console.log(event);
    }

    // private onResponse(msg: qp.IQuestionRes) {
    //     console.log("举报回应" + msg);
    // }
    private prefabTest() {
        // cc.loader.loadRes("prefabs/pop/common/TipPop", (err, res) => {
        //     let cloneNode = cc.instantiate(res)
        //     this.node.addChild(cloneNode);
        //     cloneNode.x = 100;
        //     cloneNode.y = 100;
        // })

        // let xx: cc.Node = cc.loader.getRes("prefabs/pop/common/TipPop", cc.Prefab);
        // let yy:cc.Node = cc.instantiate(xx);
        // this.node.addChild(yy);
        // // yy.setPosition(100,100);
        // // let popScript: MyPop = yy.getComponent(MyPop);
        // // popScript.test("gg");
        // setTimeout(() => {
        //     this.node.removeChild(yy);
        // }, 1000);
    }


}
