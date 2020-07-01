import MyPop from "../../../base/MyPop";
import ComUtil from "../../../utils/ComUtil";
import UserMgr from "../../../data/UserMgr";
import RealInfoMgr from "../../../data/RealInfoMgr";
import PopMgr from "../../../data/PopMgr";
import { PhoneVerificationCodeType, UserRealType, EventType } from "../../../define/Const";
import glb from "../../../utils/glb";

const { ccclass, property } = cc._decorator;

@ccclass
export default class SetChangePhonePop extends MyPop {
    @property(cc.Node)
    nodeRemoveCurPhone: cc.Node = null;//解绑

    @property(cc.Node)
    nodeBindNextPhone: cc.Node = null;//换绑

    //下一步
    @property(cc.Label)
    private lbBindID: cc.Label = null;

    @property(cc.Node)
    private btnNextStep: cc.Node = null;

    @property(cc.EditBox)
    private txtCurPhoneCode: cc.EditBox = null;

    @property(cc.Node)
    private btnGetCodeCurPhone: cc.Node = null;

    @property(cc.Node)
    private lbGetCodeCurPhone: cc.Node = null;

    @property(cc.Node)
    private lbCodeTimeCurPhone: cc.Node = null;

    //绑定


    @property(cc.EditBox)
    private txtPhoneNext: cc.EditBox = null;

    @property(cc.EditBox)
    private txtCodeNext: cc.EditBox = null;

    @property(cc.Node)
    private lbGetCodeNext: cc.Node = null;

    @property(cc.Node)
    private lbCodeTimeNext: cc.Node = null;

    @property(cc.Node)
    private btnPhoneCodeNext: cc.Node = null;

    @property(cc.Node)
    private btnBindNext: cc.Node = null;


    onExtLoad() {
        glb.sendEvent(EventType.RESET_VALID_TIME);
        glb.regEventLis(EventType.REAL_USER_PHONE_SUCCEED, this.toNextStep, this)
        this.nodeRemoveCurPhone.active = true;
        this.nodeBindNextPhone.active = false;
        this.lbBindID.string = ComUtil.formatStr("你正在绑定%s的账号", UserMgr.getUserInfo().userId);

        this.btnGetCodeCurPhone.on("click", () => {
            let strCurPhone: string = UserMgr.getUserInfo().UserOtherInfo.mobile;
            if (strCurPhone.length >= 6) {
                RealInfoMgr.reqVerificationCode(PhoneVerificationCodeType.CHANGE, strCurPhone);
            } else {
                PopMgr.alert("请输入正确的手机号");
            }
        });

        this.btnNextStep.on("click", () => {
            let strCurPhone: string = UserMgr.getUserInfo().UserOtherInfo.mobile;
            let strCurPhoneCode: string = this.txtCurPhoneCode.string;
            if (strCurPhone.length >= 6 && strCurPhoneCode.length > 3) {
                RealInfoMgr.reqUserReal(UserRealType.Phone, JSON.stringify({ phone: strCurPhone, code: strCurPhoneCode }))
            } else {
                PopMgr.alert("请输入正确的手机号和验证码")
            }
        })



        this.btnPhoneCodeNext.on("click", () => {
            let strNextPhone: string = this.txtPhoneNext.string;
            if (strNextPhone.length >= 6) {
                RealInfoMgr.reqVerificationCode(PhoneVerificationCodeType.CHANGE, strNextPhone);
            } else {
                PopMgr.alert("请输入正确的手机号");
            }
        });

        this.btnBindNext.on("click", () => {
            let strNextPhone: string = this.txtPhoneNext.string;
            let strNextPhoneCode: string = this.txtCodeNext.string;
            if (strNextPhone.length >= 6 && strNextPhoneCode.length > 3) {
                RealInfoMgr.reqUserReal(UserRealType.Phone, JSON.stringify({ phone: strNextPhone, code: strNextPhoneCode }))
            } else {
                PopMgr.alert("请输入正确的手机号和验证码")
            }
        })
        this.schedule(this.updateTimeCur, 1);
        this.schedule(this.updateTimeNext, 1);
    }

    private updateTimeCur() {
        if (this.nodeRemoveCurPhone.active) {
            let sec = RealInfoMgr.getLastSendValidTime();
            if (sec == null) {
                this.lbGetCodeCurPhone.active = true;
                this.lbCodeTimeCurPhone.active = false;
                this.btnGetCodeCurPhone.getComponent(cc.Button).interactable = true;
            } else {
                this.lbGetCodeCurPhone.active = false;
                this.lbCodeTimeCurPhone.active = true;
                this.lbCodeTimeCurPhone.getComponent(cc.Label).string = ComUtil.formatStr("已发送%s", sec);
                this.btnGetCodeCurPhone.getComponent(cc.Button).interactable = false;
            }
        }
    }

    /**更换手机当前手机验证成功  --  更绑成功 */
    private toNextStep() {
        if (this.nodeRemoveCurPhone.active) {
            glb.sendEvent(EventType.RESET_VALID_TIME);
            this.nodeRemoveCurPhone.active = false;
            this.nodeBindNextPhone.active = true;
        } else if (this.nodeBindNextPhone.active) {
            this.close();
        }
    }


    private updateTimeNext() {
        if (this.nodeBindNextPhone.active) {
            let sec = RealInfoMgr.getLastSendValidTime();
            if (sec == null) {
                this.lbGetCodeNext.active = true;
                this.lbCodeTimeNext.active = false;
                this.btnPhoneCodeNext.getComponent(cc.Button).interactable = true;
            } else {
                this.lbGetCodeNext.active = false;
                this.lbCodeTimeNext.active = true;
                this.lbCodeTimeNext.getComponent(cc.Label).string = ComUtil.formatStr("已发送%s", sec);
                this.btnPhoneCodeNext.getComponent(cc.Button).interactable = false;
            }
        }
    }




}
