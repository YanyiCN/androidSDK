import MyPop from "../../../base/MyPop";
import GameMgr from "../../../data/game/GameMgr";
import ComUtil from "../../../utils/ComUtil";
import ProfileMgr from "../../../data/ProfileMgr";
import PopMgr from "../../../data/PopMgr";
import { PopLayer, ActiveType, ActiveHandleType, EventType, SendSeasonReqType } from "../../../define/Const";
import ActiveMgr from "../../../data/active/ActiveMgr";
import { CurDanEveyrDayAwaryInfo } from "../../../data/entity/ReceiveSerDataTree";
import UserMgr from "../../../data/UserMgr";
import SetMgr from "../../../data/SetMgr";
import RedPointMgr, { RedPointTypes } from "../../../data/RedPointMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameWanfaPop extends MyPop {

    @property(cc.Node)
    btnClose: cc.Node = null;

    @property(cc.Node)
    nodeRoomItemExample: cc.Node = null;

    @property(cc.Node)
    contentRoom: cc.Node = null;

    @property(cc.Label)
    lbSeason: cc.Label = null;

    @property(cc.Label)
    lbSeasonTime: cc.Label = null;

    @property(cc.Label)
    spCurDan: cc.Label = null;

    @property(cc.Label)
    lbLastDan: cc.Label = null;

    @property(cc.Label)
    lbStarNum: cc.Label = null;

    @property(cc.Node)
    spAskDan: cc.Node = null;

    @property(cc.Node)
    btnRecevie: cc.Node = null;

    @property(cc.Label)
    lbTaskDes: cc.Label = null;

    @property(cc.Label)
    lbTaskPaln: cc.Label = null;

    @property(cc.ProgressBar)
    pbTask: cc.ProgressBar = null;

    @property(cc.Node)
    spDanBoxOpen: cc.Node = null;

    @property(cc.Node)
    spDanBoxClose: cc.Node = null;

    @property(cc.Node)
    btnNotRecevie: cc.Node = null;

    @property(cc.Node)
    spAskWanfa: cc.Node = null;

    @property(cc.Node)
    btnBag: cc.Node = null;

    @property(cc.Node)
    btnSet: cc.Node = null;

    @property(cc.Node)
    ndoeLastDan: cc.Node = null;

    @property(cc.Label)
    lbGold: cc.Label = null;

    @property(cc.Label)
    lbGem: cc.Label = null;

    @property(cc.Label)
    lbCoupon: cc.Label = null;

    onExtLoad(wanfaType: string) {
        this.regLis(EventType.UPDATE_DAN_INFO, this.updateDanInfo);
        ProfileMgr.sendSeasonReq(SendSeasonReqType.CurSeasonInfo);
        this.regLis(EventType.ACTIVE_DAN_EVERYDAY_AWARD, this.updateDanDayTask);
        this.regLis(EventType.RED_POINT_UPDATE, this.onUpdateRedManage);
        this.regLis(EventType.UPDATE_USER_MONEY, this.updateUserMoneyView);
        this.btnClose.on("click", () => {
            this.close();
        })
        this.spAskDan.on("click", () => {
            PopMgr.showPop(PopLayer.POP_RANKING_EXPLAIN)
        })

        this.spAskWanfa.on("click", () => {
            PopMgr.showPop(PopLayer.POP_PLAYING_METHOD)
        })


        this.btnRecevie.on("click", () => {
            //段位每日工资
            ActiveMgr.sendActiveReq(ActiveType.DAN_EVERY_DAY_AWARD, ActiveHandleType.HANDLE_RECEIVE_REWARD);
        })

        this.spDanBoxOpen.on("click", () => {
            //上赛季奖励领取
            let lastSeasonInfo = ProfileMgr.getLastSeasonInfo();
            ProfileMgr.sendSeasonReq(SendSeasonReqType.LastSeasonAward, lastSeasonInfo.usId);
        })

        this.btnBag.on("click", () => {
            PopMgr.showPop(PopLayer.POP_BAG)
        })

        this.btnSet.on("click", () => {
            PopMgr.showPop(PopLayer.POP_SET)
        })

        this.initView(wanfaType);
    }

    private initView(wanfaType: string) {
        this.createRoom(wanfaType);
        this.updateUserMoneyView();
        this.onUpdateRedManage();
    }

    private createRoom(wanfaType: string) {
        let curRoomTypeCfgList = GameMgr.getGameWanCfgArrByType(wanfaType);
        let orderCfg = GameMgr.getSortCurRoomTypeCfg(curRoomTypeCfgList);
        for (let i = 0; i < orderCfg.length; i++) {
            let curCfg = orderCfg[i];
            let node = cc.instantiate(this.nodeRoomItemExample);
            node.getChildByName("lbDifenNum").getComponent(cc.Label).string = curCfg.goldBase.toString();
            node.getChildByName("lbGoldLimit").getComponent(cc.Label).string = ComUtil.formatStr("%s-%s",
                ComUtil.numToWanInteger(curCfg.goldLimit[0]), ComUtil.numToWanInteger(curCfg.goldLimit[1]));
            node.active = true;
            this.contentRoom.addChild(node);
        }
    }

    private updateDanInfo() {
        ActiveMgr.sendActiveReq(ActiveType.DAN_EVERY_DAY_AWARD, ActiveHandleType.HANDLE_GET_INFO);
        let curSeasonInfo = ProfileMgr.getCurSeasonInfo();
        let curDanInfo = ProfileMgr.getCurDanName(curSeasonInfo.seasonDan);
        let curBigDanInfo = ProfileMgr.getCurBigDanInfo(curDanInfo.infoId);
        this.lbSeason.string = curSeasonInfo.seasonName;
        this.lbSeasonTime.string = ComUtil.formatStr("%s-%s", ComUtil.formatDate(new Date(curSeasonInfo.seasonStartTime), "yyyy.M.d"),
            ComUtil.formatDate(new Date(curSeasonInfo.seasonEndTime), "yyyy.M.d"));
        this.spCurDan.string = curDanInfo.name;
        this.lbStarNum.string = curSeasonInfo.seasonStar.toString();
        this.lbTaskDes.string = ComUtil.formatStr("完成%s局排位赛可以领取每日奖励", curBigDanInfo.everyDayVictoryStar);


        let lastSeasonInfo = ProfileMgr.getLastSeasonInfo();
        if (lastSeasonInfo) {
            let lastDanInfo = ProfileMgr.getCurDanName(lastSeasonInfo.seasonDan);
            // let lastBigDanInfo = ProfileMgr.getCurBigDanInfo(lastDanInfo.infoId);
            this.lbLastDan.string = lastDanInfo.name;
            this.spDanBoxClose.active = lastSeasonInfo.rewardReceive_state == 0;
            this.spDanBoxOpen.active = lastSeasonInfo.rewardReceive_state == 1;
            this.ndoeLastDan.active = true;
        } else {
            this.ndoeLastDan.active = false;
        }

    }

    private updateDanDayTask(danDayInfo: CurDanEveyrDayAwaryInfo) {
        let curSeasonInfo = ProfileMgr.getCurSeasonInfo();
        let curDanInfo = ProfileMgr.getCurDanName(curSeasonInfo.seasonDan);
        let curBigDanInfo = ProfileMgr.getCurBigDanInfo(curDanInfo.infoId);
        this.lbTaskPaln.string = ComUtil.formatStr("%s/%s", danDayInfo.playTimes, curBigDanInfo.everyDayVictoryStar);
        this.pbTask.progress = Number((danDayInfo.playTimes / curBigDanInfo.everyDayVictoryStar).toFixed(3));
        this.btnNotRecevie.active = danDayInfo.receiveStatus == 0 && danDayInfo.playTimes < curBigDanInfo.everyDayVictoryStar;
        this.btnRecevie.active = danDayInfo.receiveStatus == 0 && danDayInfo.playTimes >= curBigDanInfo.everyDayVictoryStar;
    }

    private updateUserMoneyView() {
        let userInfo = UserMgr.getUserInfo()
        this.lbGold.string = userInfo.coinA.toString();
        this.lbGem.string = userInfo.coinB.toString();
        this.lbCoupon.string = userInfo.coinC.toString();
    }

    /**红点动态刷新 */
    private onUpdateRedManage() {
        //设置红点
        RedPointMgr.updateRedPointNode(this.btnSet, [RedPointTypes.RealId, RedPointTypes.RealPhone, RedPointTypes.FeedbackMessage]);
    }
}
