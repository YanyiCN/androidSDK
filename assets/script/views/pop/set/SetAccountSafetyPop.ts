import MyPop from "../../../base/MyPop";
import PopMgr from "../../../data/PopMgr";
import { PopLayer, EventType, SceneType } from "../../../define/Const";
import { Texts } from "../../../define/Texts";
import glb from "../../../utils/glb";
import UserMgr from "../../../data/UserMgr";
import ComUtil from "../../../utils/ComUtil";
import SceneMgr from "../../../data/SceneMgr";
import HeadBoxSprite from "../../common/HeadBoxSprite";

const { ccclass, property } = cc._decorator;

@ccclass
export default class SetAccountSafetyPop extends MyPop {

    @property(cc.Node)
    btnBindPhone: cc.Node = null;

    @property(cc.Node)
    btnChangeBind: cc.Node = null;

    @property(cc.Node)
    btnHandoverAccount: cc.Node = null;

    @property(cc.RichText)
    lbCanBindTime: cc.RichText = null;

    @property(cc.Node)
    nodeCanChange: cc.Node = null;

    @property(cc.Node)
    nodeNotCanChange: cc.Node = null;

    @property(cc.Label)
    lbNickName: cc.Label = null;

    @property(cc.Label)
    lbID: cc.Label = null;

    @property(cc.Node)
    private spHead: cc.Node = null;

    onExtLoad() {
        glb.regEventLis(EventType.UPDATE_USERINFO, this.updateView, this)
        this.updateView();
        this.btnBindPhone.on("click", () => {
            PopMgr.showPop(PopLayer.POP_SET_BIND_PHONE);
        })

        this.btnChangeBind.on("click", () => {
            PopMgr.showPop(PopLayer.POP_SET_CHANGE_PHONE);
        })

        this.btnHandoverAccount.on("click", () => {
            // PopMgr.alert({
            //     msg: Texts.handoverTip,
            //     okCallback: () => {
            //         glb.setUserData("userId", 0, "int");
            //         glb.setUserData("loginToken", "", "string");
            //         cc.audioEngine.stopAll();
            //         cc.game.restart();
            //     },
            //     cancelBtn: true
            // })

            PopMgr.alert({
                msg: Texts.handoverTip,
                okCallback: () => {
                    glb.setUserData("userId", 0, "int");
                    glb.setUserData("loginToken", "", "string");
                    // 点击确定按键,如果当前不是登录界面,就跳转到登录界面
                    if (SceneMgr.getCurSceneType() != SceneType.LOGIN_SCENE) {
                        // 跳转去登录界面
                        SceneMgr.goLoginScene()
                    }
                },
                cancelBtn: true
            })
        })

        this.spHead.getComponent(HeadBoxSprite).changeHeadImgByUrl(UserMgr.getUserInfo().headImgUrl);
        //this.spHead.getComponent(HeadBoxSprite).changeHeadSkin(UserMgr.getUserInfo().UserUsePropInfo.headSkinJson.cId);
    }

    private updateView() {
        let canChangeBind: boolean = UserMgr.getUserInfo().UserOtherInfo.mobileBindTime <= 0;
        this.nodeCanChange.active = canChangeBind;
        this.nodeNotCanChange.active = !canChangeBind;

        let isBinded: boolean = UserMgr.getUserInfo().UserOtherInfo.mobile.length > 0;
        this.btnChangeBind.active = isBinded;
        this.btnBindPhone.active = !isBinded;

        if (!canChangeBind) {
            let strTime = ComUtil.formatDate(new Date(UserMgr.getUserInfo().UserOtherInfo.mobileBindTime), "yyyy年MM月dd日")
            this.lbCanBindTime.string = "<color=#A35D0A>下次可改绑时间为：</c><color=#FF0202>" + strTime + "</color>";
        }

        this.lbNickName.string = UserMgr.getUserInfo().nickName;
        this.lbID.string = UserMgr.getUserInfo().userId.toString();

    }
}
