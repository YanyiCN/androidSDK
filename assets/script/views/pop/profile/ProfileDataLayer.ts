import MyNode from "../../../base/MyNode";
import PopMgr from "../../../data/PopMgr";
import { PopLayer, EventType, SkinType } from "../../../define/Const";
import ProfileMgr from "../../../data/ProfileMgr";
import glb from "../../../utils/glb";
import UserMgr from "../../../data/UserMgr";
import HeadBoxSprite from "../../common/HeadBoxSprite";
import { ClientCfgIconURL } from "../../../define/ClientCfg";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ProfileDataLayer extends MyNode {

    @property(cc.Node)
    private spHead: cc.Node = null;

    @property(cc.Label)
    private lbUserName: cc.Label = null;

    @property(cc.Label)
    private lbUserID: cc.Label = null;

    @property(cc.Label)
    private lbUserAddress: cc.Label = null;

    @property(cc.Label)
    private lbGold: cc.Label = null;

    @property(cc.Label)
    private lbGem: cc.Label = null;

    @property(cc.Label)
    private lbCoupon: cc.Label = null;

    @property(cc.Label)
    private lbTotallnningNum: cc.Label = null;

    @property(cc.Label)
    private lbWinRateNum: cc.Label = null;

    @property(cc.Label)
    private lbMaxStreakingNum: cc.Label = null;

    @property(cc.Label)
    private lbSpringNum: cc.Label = null;

    @property(cc.Label)
    private lbMaxDiploidNum: cc.Label = null;

    @property(cc.Label)
    private lbBombNum: cc.Label = null;

    @property(cc.Node)
    private btnRename: cc.Node = null;



    onExtLoad() {
        this.regLis(EventType.CHANGE_NICK_NAME_SUCCEED, () => {
            this.lbUserName.string = UserMgr.getUserInfo().nickName;
        })
        this.regLis(EventType.SKIN_HEAD_CHANGE_SUCCEED, this.onChangeHeadSkin);
        this.regLis(EventType.PROFILE_USERGAMEDATA, this.onUpdateGameData);
        this.spHead.on("click", () => {
            PopMgr.showPop(PopLayer.POP_CHANGE_HEAD_PHOTO);
        })
        this.btnRename.on("click", () => {
            PopMgr.showPop(PopLayer.POP_CHANGE_NICK_NAME);
        })
        ProfileMgr.sendUserGameDataReq();
        this.initUserInfo();
        let userCurheadSkinInfo = UserMgr.getUserInfo().UserUsePropInfo.headSkinJson;
        this.onChangeHeadSkin(userCurheadSkinInfo.cId);
    }

    private initUserInfo() {
        let userInfo = UserMgr.getUserInfo();
        this.lbUserName.string = userInfo.nickName;
        this.lbUserID.string = userInfo.userId.toString();
        this.lbUserAddress.string = userInfo.address;
        this.lbGold.string = userInfo.coinA.toString();
        this.lbGem.string = userInfo.coinB.toString();
        this.lbCoupon.string = userInfo.coinC.toString();
    }

    private onUpdateGameData() {
        let userGameData = ProfileMgr.getUserGameData();
        this.lbTotallnningNum.string = userGameData.playCount.toString();
        this.lbWinRateNum.string = userGameData.victoryRate.toString();
        this.lbMaxStreakingNum.string = userGameData.maxVictory.toString();
        this.lbSpringNum.string = userGameData.springCount.toString();
        this.lbMaxDiploidNum.string = userGameData.maxMultiple.toString();
        this.lbBombNum.string = userGameData.bombCount.toString();
    }

    /**修改头像框 */
    private onChangeHeadSkin(skinHeadcfgID: number) {
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
}
