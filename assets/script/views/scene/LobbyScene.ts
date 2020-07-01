import MyScene from "../../base/MyScene";
import { SceneType, EventType, MsgType, Mid, PopLayer } from "../../define/Const";
import glb from "../../utils/glb";
import { Lobby } from "../../proto/proto";
import PopMgr from "../../data/PopMgr";
import UserInfo from "../../data/entity/UserInfo";
import UserMgr from "../../data/UserMgr";
import HeadBoxSprite from "../common/HeadBoxSprite";
import { Texts } from "../../define/Texts";
import ComUtil from "../../utils/ComUtil";
import SetMgr from "../../data/SetMgr";
import { UserDynamicData } from "../../data/entity/UserData";
import { ClientCfg, ClientCfgIconURL } from "../../define/ClientCfg";
import RedPointMgr, { RedPointTypes } from "../../data/RedPointMgr";
import CrossMgr from "../../data/CrossMgr";

const { ccclass, property } = cc._decorator;
let BtnTags = {
    PROFILE: 1,
    SHOP: 2,
    BAG: 3,
    SET: 4,
    RANKING: 5,
    MAIL: 6,
    SERVICE: 7,
    VIP: 8,
    TASK: 9,
    WELFARE: 10,
    ACTIVE: 11,
    CARNIVAL: 12,
    INVITE: 13
}

@ccclass
export default class LobbyScene extends MyScene {

    @property(cc.Node)
    private nodeBg: cc.Node = null;

    @property(cc.Node)
    private nodeCenterMenu: cc.Node = null;

    //上方
    @property(cc.Node)
    private btnProfile: cc.Node = null;

    @property(cc.Node)
    private btnSet: cc.Node = null;

    @property(cc.Label)
    private lbNickName: cc.Label = null;
    @property(cc.Label)
    private lbUserId: cc.Label = null;
    @property(cc.Label)
    private lbLvValue: cc.Label = null;

    @property(cc.ProgressBar)
    private nodeLvProgress: cc.ProgressBar = null;
    @property(cc.Label)
    private lbProgress: cc.Label = null;

    @property(cc.Label)
    private lbGold: cc.Label = null;

    @property(cc.Label)
    private lbGem: cc.Label = null;

    @property(cc.Label)
    private lbCoupon: cc.Label = null;

    @property(cc.Node)
    private spHead: cc.Node = null;

    @property(cc.Node)
    private btnBag: cc.Node = null;

    @property(cc.Node)
    private btnVip: cc.Node = null;

    @property(cc.Node)
    private btnWelfare: cc.Node = null;

    // 跑马灯
    @property(cc.Node)
    private nodePmdBar: cc.Node = null;
    @property(cc.Node)
    private nodePmdLbs: cc.Node = null;
    @property(cc.Label)
    private lbPmdExample: cc.Label = null;

    //下方
    @property(cc.Node)
    private btnShop: cc.Node = null;

    @property(cc.Node)
    private btnRanking: cc.Node = null;

    @property(cc.Node)
    private btnMail: cc.Node = null;

    @property(cc.Node)
    private btnService: cc.Node = null;

    @property(cc.Node)
    private btnTask: cc.Node = null;

    @property(cc.Node)
    private btnActive: cc.Node = null;

    //左侧
    @property(cc.Node)
    private btnCarnival: cc.Node = null;

    @property(cc.Node)
    private btnInvite: cc.Node = null;

    public getSceneType(): string {
        return SceneType.LOBBY_SCENE;
    }
 
    getBgNode(): cc.Node {
        return this.nodeBg;
    }

    onExtLoad() {
        this.regLis(EventType.Cocos2dxJavascriptJavaBridge, (param) => {
            console.log("神舟五号发射成功  ",UserMgr.getUserInfo().nickName,"   param: ",param);
            PopMgr.showPop(PopLayer.POP_SET);
        })
        this.regLis(EventType.RED_POINT_UPDATE, this.onUpdateRedManage);
        this.regLis(EventType.UPDATE_USERINFO, this.updateUserInfo); 
        this.regLis(EventType.UPDATE_USER_MONEY, this.onUserMoneyChange);
        this.regLis(EventType.CHANGE_NICK_NAME_SUCCEED, this.onChangeName);
        this.regLis(EventType.SKIN_HEAD_CHANGE_SUCCEED, this.onChangeSkinHead);
        let path = "prefabs/pop/game/ModeNormalLayer";
        cc.loader.loadRes(path, (err, res) => {
            let node = cc.instantiate(res)
            this.nodeCenterMenu.addChild(node)
        })

        this.regBtns();
        this.initView();
    }

    onExtStart() {

    }

    private regBtns() {

        //上方
        this.regBtnClickByTag(this.btnProfile, BtnTags.PROFILE);
        this.regBtnClickByTag(this.btnSet, BtnTags.SET);
        this.regBtnClickByTag(this.btnBag, BtnTags.BAG);
        this.regBtnClickByTag(this.btnVip, BtnTags.VIP);
        this.regBtnClickByTag(this.btnWelfare, BtnTags.WELFARE)

        //下方
        this.regBtnClickByTag(this.btnShop, BtnTags.SHOP);
        this.regBtnClickByTag(this.btnRanking, BtnTags.RANKING);
        this.regBtnClickByTag(this.btnMail, BtnTags.MAIL);
        this.regBtnClickByTag(this.btnService, BtnTags.SERVICE);
        this.regBtnClickByTag(this.btnTask, BtnTags.TASK);
        this.regBtnClickByTag(this.btnActive, BtnTags.ACTIVE);

        //左侧
        this.regBtnClickByTag(this.btnCarnival, BtnTags.CARNIVAL);
        this.regBtnClickByTag(this.btnInvite, BtnTags.INVITE);
    }

    private regBtnClickByTag(btn: cc.Node, tag: number) {
        if (!btn) {
            return;
        }
        btn.on("click", () => {
            this.onBtnClick(tag);
        })
    }

    private initView() {
        // 跑马灯
        this.createPmdBar();
        this.updateUserInfo();
        this.onUserMoneyChange();
        let userCurheadSkinInfo = UserMgr.getUserInfo().UserUsePropInfo.headSkinJson;
        this.onChangeSkinHead(userCurheadSkinInfo.cId);
        this.onUpdateRedManage();
    }

    private onBtnClick(tag: number) {
        if (glb.getUserData("openShock", "int", 1) == 1) {
            CrossMgr.makeShock();
        }

        // jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "showDialog", "()V");
        switch (tag) {
            case BtnTags.PROFILE:
                PopMgr.showPop(PopLayer.POP_PROFILE_PANEL);
                break;
            case BtnTags.SHOP:
                PopMgr.showPop(PopLayer.POP_SHOP)
                break;
            case BtnTags.SET:
                PopMgr.showPop(PopLayer.POP_SET)
                break;
            case BtnTags.RANKING:
                PopMgr.showPop(PopLayer.POP_RANKING)
                break;
            case BtnTags.MAIL:
                PopMgr.showPop(PopLayer.POP_MAIL)
                CrossMgr.copyText("复制文本本")
                console.log("复制文本本");
                break;
            case BtnTags.BAG:
                PopMgr.showPop(PopLayer.POP_BAG)
                CrossMgr.getCopyText();
                break;
            case BtnTags.SERVICE:
                PopMgr.showPop(PopLayer.POP_SET_CONTACT_SERVICE)
                break;
            case BtnTags.VIP:
                PopMgr.showPop(PopLayer.POP_VIP)
                break;
            case BtnTags.TASK:
                PopMgr.showPop(PopLayer.POP_TASK)
                break;
            case BtnTags.WELFARE:
                PopMgr.showPop(PopLayer.POP_WELFARE)
                break;
            case BtnTags.ACTIVE:
                PopMgr.showPop(PopLayer.POP_ACTIVE)
                break;
            case BtnTags.CARNIVAL:
                PopMgr.showPop(PopLayer.POP_CARNIVAL)
                break;
            case BtnTags.INVITE:
                PopMgr.showPop(PopLayer.POP_INVITE_GIFT)
                break;
            default:
                break;
        }
    }

    /**红点动态刷新 */
    private onUpdateRedManage() {
        //设置红点
        RedPointMgr.updateRedPointNode(this.btnSet, [RedPointTypes.RealId, RedPointTypes.RealPhone, RedPointTypes.FeedbackMessage]);
        //邮件
        RedPointMgr.updateRedPointNode(this.btnMail, [RedPointTypes.Mail]);
    }

    /**用户数据变化，大厅视图刷新 */
    private onUserInfoChange() {
        let userInfo = UserMgr.getUserInfo()
        this.lbNickName.string = userInfo.nickName;
        this.lbUserId.string = userInfo.userId.toString();
        this.spHead.getComponent(HeadBoxSprite).changeHeadImgByUrl(userInfo.headImgUrl);
        this.lbLvValue.string = UserMgr.getUserInfo().level.toString();
    }

    /**用户游戏币变化，大厅视图刷新 */
    private onUserMoneyChange() {
        let userInfo = UserMgr.getUserInfo()
        this.lbGold.string = userInfo.coinA.toString();
        this.lbGem.string = userInfo.coinB.toString();
        this.lbCoupon.string = userInfo.coinC.toString();
    }

    // 创建跑马灯
    private createPmdBar() {
        this.nodePmdBar.active = true;
        if (!this.nodePmdBar.active) {
            return;
        }
        for (const pmdTxt of Texts.lobbyPmd) {
            let lb = cc.instantiate(this.lbPmdExample.node);
            lb.getComponent(cc.Label).string = pmdTxt;
            this.nodePmdLbs.addChild(lb);
        }
        ComUtil.destroy(this.lbPmdExample.node);
        this.lbPmdExample = null;
        this.nodePmdLbs.getComponent(cc.Layout).updateLayout();
        let totalWidth = this.nodePmdLbs.width;
        let localX = this.nodePmdLbs.x;
        let laterX = localX - (this.nodePmdLbs.getParent().width + totalWidth);
        cc.tween(this.nodePmdLbs).repeatForever(
            cc.tween(this.nodePmdLbs)
                .to(totalWidth / 80, { x: laterX })
                .to(0, { x: localX })
                .delay(1.0)
        ).start();
    }

    /**用户数据更新 */
    private updateUserInfo() {
        this.onUserInfoChange();
        this.onUpdateVipInfo();
    }

    /**改名 */
    private onChangeName() {
        this.lbNickName.string = UserMgr.getUserInfo().nickName;
    }

    /**修改头像框 */
    private onChangeSkinHead(skinHeadcfgID: number) {
        if (skinHeadcfgID > 105) {
            //此判断暂用-因资源不足
            skinHeadcfgID = 105;
        }
        let url = ClientCfgIconURL.skinHead + skinHeadcfgID;
        if (skinHeadcfgID == 100 || !skinHeadcfgID) {//使用默认头像
            url = null;
        }
        this.spHead.getComponent(HeadBoxSprite).changeHeadSkin(url);
    }

    /**用户VIP等级升级 */
    private onUpdateVipInfo() {
        let vipLv = UserMgr.getUserInfo().vipLevel;
        let vipIconGroup = this.btnVip.children;
        for (let i = 0; i < vipIconGroup.length; i++) {
            vipIconGroup[i].active = i == vipLv;
        }
    }


}
