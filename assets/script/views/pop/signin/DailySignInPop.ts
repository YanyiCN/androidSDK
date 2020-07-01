import MyPop from "../../../base/MyPop";
import PopMgr from "../../../data/PopMgr";
import { PopLayer, ActiveType, ActiveHandleType, EventType, AwardType } from "../../../define/Const";
import ComUtil from "../../../utils/ComUtil";
import ActiveMgr from "../../../data/active/ActiveMgr";
import VipMgr from "../../../data/VipMgr";
import UserMgr from "../../../data/UserMgr";
import AdMgr from "../../../data/AdMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class DailySignInPop extends MyPop {

    @property(cc.Node)
    spPeople: cc.Node = null;

    @property(cc.Node)
    itemDailyExample: cc.Node = null;

    @property(cc.Node)
    contentDaily: cc.Node = null;

    @property(cc.Node)
    btnReceiveOne: cc.Node = null;

    @property(cc.Node)
    btnADReceiveTriple: cc.Node = null;

    @property(cc.Node)
    btnADReceiveDouble: cc.Node = null;

    @property(cc.Label)
    lbContinuousDays: cc.Label = null;

    @property(cc.Node)
    nodeContinuousGroup: cc.Node = null;

    @property(cc.Node)
    nodeItemContinue: cc.Node = null;

    @property(cc.Node)
    btnClose: cc.Node = null;

    onExtLoad() {
        this.regLis(EventType.ACTIVE_SIGNIN_UPDATE_INFO, this.initView);
        this.spPeople.on("click", () => {
            PopMgr.showPop(PopLayer.POP_DAILY_SIGNIN_TIP);
        })

        this.btnADReceiveTriple.on("click", () => {
            AdMgr.sendAdReq();
            PopMgr.showPop(PopLayer.POP_WATCH_AD, ActiveType.EVERY_SIGN_IN, ActiveHandleType.HANDLE_RECEIVE_REWARD_VIDEO_TRIPLE);
        })

        this.btnADReceiveDouble.on("click", () => {
            AdMgr.sendAdReq();
            PopMgr.showPop(PopLayer.POP_WATCH_AD, ActiveType.EVERY_SIGN_IN, ActiveHandleType.HANDLE_RECEIVE_REWARD_VIDEO_DOUBLE);
        })

        this.btnReceiveOne.on("click", () => {
            this.onClickReceiveOneAward();
        })

        this.btnClose.on("click", () => {
            this.onClickReceiveOneAwardClose();
        })
        this.initView();
    }

    //签到动态数据
    // contSignDay: 0
    // curDay: 11  当前第几天
    // historyContSignDay: 0//连续签到
    // mouthDay: 30
    // signDateList: number[]//已签到
    // todaySignState  012  今日未签到，1,3

    //rewardReceiveStatus //已领取连续
    private initView() {
        let cfgWelfareSignIn = ActiveMgr.getActiveData(ActiveType.EVERY_SIGN_IN, true, true)
        let signInDynamicData = cfgWelfareSignIn.activeDynamic;//签到 动态数据

        this.lbContinuousDays.string = signInDynamicData.historyContSignDay + "";

        this.btnReceiveOne.active = signInDynamicData.todaySignState == 0;
        this.btnADReceiveTriple.active = (signInDynamicData.todaySignState != 2 && signInDynamicData.todaySignState != 1);

        this.btnADReceiveDouble.active = signInDynamicData.todaySignState == 1;
        this.createAllDailyList();
        this.continuousAwardView();
    }


    //**生成每日签到列表 */
    private createAllDailyList() {
        ComUtil.destroyAllChildren(this.contentDaily);
        let cfgWelfareSignIn = ActiveMgr.getActiveData(ActiveType.EVERY_SIGN_IN, true, true)
        let signInStaticCfg = cfgWelfareSignIn.activeStatic;//签到 静态数据
        let signInDynamicData = cfgWelfareSignIn.activeDynamic;//签到 动态数据
        let cfgWelfareSignInDaily = cfgWelfareSignIn.activeStatic.activeItems;//配置表
        let mouthDays = cfgWelfareSignIn.activeDynamic.mouthDay;
        let toDay = cfgWelfareSignIn.activeDynamic.curDay;
        let retroactiveTipDay = this.retroactiveTipTheDay();
        for (let i = 0; i < mouthDays; i++) {
            let curSignIncfg = cfgWelfareSignInDaily[i];
            let node = cc.instantiate(this.itemDailyExample);
            node.getChildByName("lbAwardNum").getComponent(cc.Label).string = "X" + curSignIncfg.rewardNum;
            node.getChildByName("lbDay").getComponent(cc.Label).string = ComUtil.formatStr("第%s天", curSignIncfg.day);
            node.getChildByName("btnRetroactive").on("click", () => {
                this.onClickRetroactive(curSignIncfg);
            })
            node.on("click", () => {
                if (curSignIncfg.rewardType == AwardType.Prop) {
                    PopMgr.showPop(PopLayer.POP_DAILY_SIGNIN_TIP, curSignIncfg.rewardId);
                }
            })
            node.getChildByName("spReceivedImg").active = this.signedInTheDay(curSignIncfg.day);
            node.getChildByName("btnRetroactive").active = this.retroactiveBtnTheDay(curSignIncfg.day);
            node.getChildByName("spADtip").active = (curSignIncfg.day == retroactiveTipDay && curSignIncfg.day < toDay);
            node.getChildByName("spVipIcon").active = this.vipMultipleIcon(curSignIncfg.day);
            node.getChildByName("spBodybg").active = toDay != curSignIncfg.day;
            node.getChildByName("spBodybgToday").active = toDay == curSignIncfg.day;
            node.active = true;
            this.contentDaily.addChild(node);
        }
    }

    /**当前天数是否已经签到 */
    private signedInTheDay(day: number) {
        let cfgWelfareSignIn = ActiveMgr.getActiveData(ActiveType.EVERY_SIGN_IN, null, true);
        if (cfgWelfareSignIn.signDateList.length > 0) {
            let signedInDaysArr = cfgWelfareSignIn.signDateList;
            for (let i = 0; i < signedInDaysArr.length; i++) {
                if (signedInDaysArr[i] == day) {
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * 当前天数是否显示补签按钮
     * @param signedIn 此天是否已签到
     * @param day 当前配置天数
     */
    private retroactiveBtnTheDay(day: number) {
        let cfgWelfareSignIn = ActiveMgr.getActiveData(ActiveType.EVERY_SIGN_IN, null, true)
        let toDay = cfgWelfareSignIn.curDay;
        let notSignInDaysArr = this.notSignInDays();
        if (day < toDay) {
            if (notSignInDaysArr.length > 0) {
                for (let i = 0; i < notSignInDaysArr.length; i++) {
                    if (notSignInDaysArr[i] == day) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    /**显示补签横条天数 */
    private retroactiveTipTheDay() {
        let notSignInDaysArr = this.notSignInDays();
        if (notSignInDaysArr.length > 0) {
            return notSignInDaysArr[0];
        }
        return 0;
    }

    /**未签到天数 */
    private notSignInDays() {
        let cfgWelfareSignIn = ActiveMgr.getActiveData(ActiveType.EVERY_SIGN_IN, null, true);
        let mouthDays = cfgWelfareSignIn.mouthDay;
        let signedInDaysArr = cfgWelfareSignIn.signDateList;//已签到数组
        let notSignedInDaysArr = [];

        if (cfgWelfareSignIn.signDateList.length > 0) {
            let isFind = false;
            for (let i = 0; i < mouthDays; i++) {
                for (let j = 0; j < signedInDaysArr.length; j++) {
                    if (signedInDaysArr[j] == (i + 1)) {
                        isFind = true;
                        break;
                    }
                }
                if (!isFind) {
                    notSignedInDaysArr.push(i + 1);
                }
                isFind = false;
            }
        } else {
            for (let i = 0; i < mouthDays; i++) {
                notSignedInDaysArr.push(i + 1);
            }
        }
        return notSignedInDaysArr;
    }


    /**用户当前VIP等级可领取翻倍奖励天数集合 */
    private vipMultipleArr() {
        let curUserVip = UserMgr.getUserInfo().vipLevel;
        if (curUserVip == 0) {
            return [];
        } else {
            let vipCfgList = VipMgr.getVIPConfig();
            for (let i = 0; i < vipCfgList.length; i++) {
                if (vipCfgList[i].level == curUserVip) {
                    return vipCfgList[i].permissions.signInMultipleDay;
                }
            }
        }
    }


    /**根据当前VIP等级翻倍展示 */
    private vipMultipleIcon(day: number) {
        let vipMultipleArr = this.vipMultipleArr();
        for (let i = 0; i < vipMultipleArr.length; i++) {
            if (day == vipMultipleArr[i]) {
                return true;
            }
        }
        return false;
    }

    /** 关闭领取一倍奖励 */
    private onClickReceiveOneAwardClose() {
        let cfgWelfareSignIn = ActiveMgr.getActiveData(ActiveType.EVERY_SIGN_IN, true, true)
        let signInDynamicData = cfgWelfareSignIn.activeDynamic;//签到 动态数据
        if (signInDynamicData.todaySignState == 0) {
            ActiveMgr.sendActiveReq(ActiveType.EVERY_SIGN_IN, ActiveHandleType.HANDLE_RECEIVE_REWARD);
        }
        this.close();
    }

    /**领取一倍奖励 */
    private onClickReceiveOneAward() {
        let cfgWelfareSignIn = ActiveMgr.getActiveData(ActiveType.EVERY_SIGN_IN, true, true)
        let signInDynamicData = cfgWelfareSignIn.activeDynamic;//签到 动态数据
        if (signInDynamicData.todaySignState == 0) {
            ActiveMgr.sendActiveReq(ActiveType.EVERY_SIGN_IN, ActiveHandleType.HANDLE_RECEIVE_REWARD);
        }
    }

    /**补签 */
    private onClickRetroactive(curSignIncfg) {
        AdMgr.sendAdReq();
        PopMgr.showPop(PopLayer.POP_WATCH_AD, ActiveType.EVERY_SIGN_IN, ActiveHandleType.HANDLE_RECEIVE_REWARD_VIDEO_RETROACTIVE, curSignIncfg.day);
    }

    /**连续签到视图更新 */
    private continuousAwardView() {
        let awardGroup = this.nodeContinuousGroup;
        let cfgWelfareSignIn = ActiveMgr.getActiveData(ActiveType.EVERY_SIGN_IN, true, true);
        let continuousCfg = cfgWelfareSignIn.activeStatic.continuousItems;
        let signInData = cfgWelfareSignIn.activeDynamic;
        let historyMaxSignDay = signInData.historyContSignDay;
        let rewardReceiveStatus = signInData.rewardReceiveStatus;//领取状态0-未完成，1-已完成未领取，2-已领取
        let isCurItemgetAward = false;//当前奖励是否已领取
        ComUtil.destroyAllChildren(this.nodeContinuousGroup);
        for (let i = 0; i < continuousCfg.length; i++) {
            let node = cc.instantiate(this.nodeItemContinue);
            let awardCfg = continuousCfg[i];
            let titleGroup = node.getChildByName("nodeBodybg");
            for (let j = 0; j < titleGroup.childrenCount; j++) {
                titleGroup.children[j].active = false;
            }
            titleGroup.children[i].active = true;
            node.x = 0;
            node.getChildByName("lbAwardNum").getComponent(cc.Label).string = "X" + awardCfg.rewardNum;
            node.getChildByName("spReceivedIcon").active = rewardReceiveStatus[i] == 2;
            node.getChildByName("btnUndone").active = rewardReceiveStatus[i] == 0;
            node.getChildByName("btnRrceive").active = rewardReceiveStatus[i] == 1;
            node.getChildByName("btnRrceive").on("click", () => {
                ActiveMgr.sendActiveReq(ActiveType.EVERY_SIGN_IN, ActiveHandleType.HANDLE_RECEIVE_REWARD_CONTINUOUS_SIGNIN, awardCfg.id + "");
            })
            node.active = true;
            this.nodeContinuousGroup.addChild(node);

        }


    }

}
