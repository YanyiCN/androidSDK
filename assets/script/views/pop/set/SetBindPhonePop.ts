import MyPop from "../../../base/MyPop";
import ComUtil from "../../../utils/ComUtil";
import UserMgr from "../../../data/UserMgr";
import RealInfoMgr from "../../../data/RealInfoMgr";
import { PhoneVerificationCodeType, UserRealType, EventType } from "../../../define/Const";
import PopMgr from "../../../data/PopMgr";
import glb from "../../../utils/glb";

const { ccclass, property } = cc._decorator;

@ccclass
export default class SetBindPhonePop extends MyPop {

    @property(cc.Label)
    lbBindID: cc.Label = null;

    @property(cc.EditBox)
    editboxPhone: cc.EditBox = null;

    @property(cc.EditBox)
    editboxCode: cc.EditBox = null;

    @property(cc.Node)
    private lbGetcode: cc.Node = null;

    @property(cc.Node)
    private lbCodeTime: cc.Node = null;

    @property(cc.Node)
    private btnPhoneCode: cc.Node = null;

    @property(cc.Node)
    private btnBind: cc.Node = null;

    onExtLoad() {
        glb.sendEvent(EventType.RESET_VALID_TIME);
        glb.regEventLis(EventType.REAL_USER_PHONE_SUCCEED, this.realPhoneSucceed, this)
        this.lbBindID.string = ComUtil.formatStr("你正在绑定%s的账号", UserMgr.getUserInfo().userId);
        this.btnPhoneCode.on("click", () => {
            let strPhone: string = this.editboxPhone.string;
            if (strPhone.length >= 6) {
                RealInfoMgr.reqVerificationCode(PhoneVerificationCodeType.BIND, strPhone);
            } else {
                PopMgr.alert("请输入正确的手机号");
            }
        });
        this.schedule(this.updateTime, 1)

        this.btnBind.on("click", () => {
            let strPhone: string = this.editboxPhone.string;
            let strPhoneCode: string = this.editboxCode.string;
            if (strPhone.length >= 6 && strPhoneCode.length > 3) {
                RealInfoMgr.reqUserReal(UserRealType.Phone, JSON.stringify({ phone: strPhone, code: strPhoneCode }))
            } else {
                PopMgr.alert("请输入正确的手机号和验证码")
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

    private realPhoneSucceed() {
        glb.sendEvent(EventType.RESET_VALID_TIME);
        PopMgr.alert("手机绑定成功");
        this.close();
    }
}
