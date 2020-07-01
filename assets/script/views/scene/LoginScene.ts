import MyScene from "../../base/MyScene";
import { SceneType, Mid, MsgType, PhoneVerificationCodeType, PopLayer, LoginType, EventType } from "../../define/Const";
import glb from "../../utils/glb";
import SceneMgr from "../../data/SceneMgr";
import { Lobby } from "../../proto/proto";
import RealInfoMgr from "../../data/RealInfoMgr";
import ComUtil from "../../utils/ComUtil";
import PopMgr from "../../data/PopMgr";
import UserMgr from "../../data/UserMgr";
import { Texts } from "../../define/Texts";

const { ccclass, property } = cc._decorator;
//开发--.20   测试--.100
const RELEASE_HOST = ["ws://192.168.1.20", 18052];

const TEST_HOST: { [key: string]: any[] } = {
    "lm_work": ["ws://192.168.1.20", 18052],
    "lm_test": ["ws://192.168.1.100", 18052],
}

@ccclass
export default class LoginScene extends MyScene {

    @property(cc.Node)
    private nodeBg: cc.Node = null;

    @property(cc.Node)
    private btnTokenLogin: cc.Node = null;

    @property(cc.Node)
    private btnVisitorLogin: cc.Node = null;

    @property(cc.Node)
    private btnWXLogin: cc.Node = null;

    @property(cc.Node)
    private btnPhoneLogin: cc.Node = null;

    @property(cc.Node)
    private nodeLoginWay: cc.Node = null;

    @property(cc.Toggle)
    private togAgreement: cc.Toggle = null;

    @property(cc.Node)
    private btnAgreement: cc.Node = null;

    @property(cc.Node)
    private nodeTestNet: cc.Node = null;

    public getSceneType(): string {
        return SceneType.LOGIN_SCENE;
    }

    getBgNode(): cc.Node {
        return this.nodeBg;
    }

    onExtLoad() {
        this.nodeTestNet.active = glb.isTest &&
            (!UserMgr.getUserInfo().userId || UserMgr.getUserInfo().userId == 0);

        if (!glb.isTest) {
            if (!UserMgr.getUserInfo().userId || UserMgr.getUserInfo().userId == 0) {
                glb.getSocket().init(RELEASE_HOST[0] as string, RELEASE_HOST[1] as number);
                glb.getSocket().connect();
                console.log("Cocos Creator v", cc.ENGINE_VERSION);
            }
        }
        glb.regEventLis(EventType.LOGIN_TOKEN_LOGIN_FAILED, this.onTokenLoginFailed, this);
        glb.regEventLis(EventType.LOGIN_DYNAMIC_DATA_SUCCEED, this.onLoginSucceed, this);
        glb.regEventLis(EventType.SERVER_CONNECT_CHANGE, this.onNetStaticConfig, this);
        this.btnVisitorLogin.on("click", () => {
            if (!this.togAgreement.isChecked) {
                PopMgr.alert(Texts.loginNoAgree);
            } else {
                UserMgr.sendReqServerLogin(LoginType.Visitor, "");
            }
        })


        this.btnWXLogin.on("click", () => {
            if (!this.togAgreement.isChecked) {
                PopMgr.alert(Texts.loginNoAgree);
            } else {
                UserMgr.sendReqServerLogin(LoginType.Visitor, "");
            }
        })

        this.btnPhoneLogin.on("click", () => {
            if (!this.togAgreement.isChecked) {
                PopMgr.alert(Texts.loginNoAgree);
            } else {
                PopMgr.showPop(PopLayer.POP_LOGIN_PHONE);
            }
        })

        this.btnTokenLogin.on("click", () => {
            if (!this.togAgreement.isChecked) {
                PopMgr.alert(Texts.loginNoAgree);
            } else {
                let loginToken = glb.getUserData("loginToken")
                let userId = glb.getUserData("userId", "int")
                UserMgr.sendReqServerLogin(LoginType.Token, JSON.stringify({ token: loginToken, uid: userId }));
            }
        })

        this.btnAgreement.on("click", () => {
            PopMgr.showPop(PopLayer.POP_LOGIN_AGREEMENT);
        })
    }

    onExtStart() {
        if (UserMgr.tokenLogin()) {
            this.nodeLoginWay.active = false;
            this.btnTokenLogin.active = true;
        } else {
            this.nodeLoginWay.active = true;
            this.btnTokenLogin.active = false;
        }
    }

    private onNetStaticConfig(suc, msg, isRecon) {
        if (suc) {
            // 尝试获取服务器的配置
            UserMgr.getServerStaticConfig()
        }
    }

    private onLoginSucceed() {
        SceneMgr.goLobbyScene();
    }

    private onTokenLoginFailed() {
        this.nodeLoginWay.active = true;
        this.btnTokenLogin.active = false;
    }

    // 测试网络
    onTestClick(event: cc.Event.EventTouch, eventData: string) {
        let host = TEST_HOST[eventData];
        glb.getSocket().init(host[0] as string, host[1] as number);
        glb.getSocket().connect();
        this.nodeTestNet.active = false;
        console.log("Cocos Creator v", cc.ENGINE_VERSION + "\nnet ", host[0]);
    }

}
