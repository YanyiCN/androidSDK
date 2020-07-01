import MyPop from "../../../base/MyPop";
import RealInfoMgr from "../../../data/RealInfoMgr";
import { PhoneVerificationCodeType, Mid, LoginType, EventType } from "../../../define/Const";
import ComUtil from "../../../utils/ComUtil";
import PopMap from "../../../define/PopMap";
import PopMgr from "../../../data/PopMgr";
import glb from "../../../utils/glb";
import UserMgr from "../../../data/UserMgr";
import { Lobby } from "../../../proto/proto";
import SceneMgr from "../../../data/SceneMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class LoginPhonePop extends MyPop {

    @property(cc.EditBox)
    private editboxPhone: cc.EditBox = null;

    @property(cc.EditBox)
    private editboxCode: cc.EditBox = null;

    @property(cc.Node)
    private lbGetcode: cc.Node = null;

    @property(cc.Node)
    private lbCodeTime: cc.Node = null;

    @property(cc.Node)
    private btnPhoneCode: cc.Node = null;

    @property(cc.Node)
    private btnBind: cc.Node = null;

    private verifiedMobile: number = null;

    onExtLoad() {
        glb.regEventLis(EventType.LOGIN_DYNAMIC_DATA_SUCCEED, this.onLoginSucceed, this);
        this.btnPhoneCode.on("click", () => {
            let strPhone: string = this.editboxPhone.string;
            if (strPhone.length >= 6) {
                RealInfoMgr.reqVerificationCode(PhoneVerificationCodeType.Login, strPhone);
            } else {
                PopMgr.alert("请输入正确的手机号");
            }
        });
        this.schedule(this.updateTime, 1)

        this.btnBind.on("click", () => {
            let strPhone: string = this.editboxPhone.string;
            let strPhoneCode: string = this.editboxCode.string;
            if (strPhone.length >= 6 && strPhoneCode.length > 3) {
                UserMgr.sendReqServerLogin(LoginType.Phone, JSON.stringify({ phone: strPhone, code: strPhoneCode }))
            }
        })
    }

    private updateTime() {
        let sec = RealInfoMgr.getLastSendValidTime();
        if (sec == null) {
            this.lbGetcode.active = true;
            this.lbCodeTime.active = false;
            this.btnPhoneCode.getComponent(cc.Button).interactable = true;
        } else {
            this.lbGetcode.active = false;
            this.lbCodeTime.active = true;
            this.lbCodeTime.getComponent(cc.Label).string = ComUtil.formatStr("已发送%s", sec);
            this.btnPhoneCode.getComponent(cc.Button).interactable = false;
        }
    }

    private onLoginSucceed() {
        this.close();
        SceneMgr.goLobbyScene();
    }



}
