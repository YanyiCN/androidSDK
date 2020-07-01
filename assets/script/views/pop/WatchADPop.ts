import MyPop from "../../base/MyPop";
import ActiveMgr from "../../data/active/ActiveMgr";
import { ActiveType, ActiveHandleType, EventType, ActiveTaskHandleType } from "../../define/Const";
import AdMgr from "../../data/AdMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class WatchADPop extends MyPop {

    @property(cc.Node)
    btnGetTripleAward: cc.Node = null;

    onExtLoad(activeType: number = null, handleType: number = null, other: any = null) {
        this.regLis(EventType.ACTIVE_SIGNIN_TRIPLE_AWARD, this.lookAdOver);//签到模块广告
        this.regLis(EventType.ACTIVE_TASK_CHALLENGE_VIDEO_SUCCEED, this.lookAdOver);//挑战任务广告
        this.regLis(EventType.ACTIVE_TASK_THREEDAYS_VIDEO_SUCCEED, this.lookAdOver);//三日任务广告
        this.regLis(EventType.ACTIVE_PROFITS_VIDEO_SUCCEED, this.lookAdOver);//一本万利广告
        this.btnGetTripleAward.on("click", () => {
            let cfgWelfareSignIn = ActiveMgr.getActiveData(ActiveType.EVERY_SIGN_IN, true, true)
            let signInDynamicData = cfgWelfareSignIn.activeDynamic;//签到 动态数据
            let adid = AdMgr.getADid();
            let handleValue = "";
            switch (activeType) {
                case ActiveType.EVERY_SIGN_IN://签到
                    if (handleType == ActiveHandleType.HANDLE_RECEIVE_REWARD_VIDEO_TRIPLE) {
                        if (signInDynamicData.todaySignState != 2) {//三倍
                            handleValue = JSON.stringify({ "adId": adid });
                            ActiveMgr.sendActiveReq(ActiveType.EVERY_SIGN_IN, ActiveHandleType.HANDLE_RECEIVE_REWARD_VIDEO_TRIPLE, handleValue);
                        }
                    } else if (handleType == ActiveHandleType.HANDLE_RECEIVE_REWARD_VIDEO_RETROACTIVE) {//补签
                        handleValue = JSON.stringify({ "adId": adid, "value": other });
                        ActiveMgr.sendActiveReq(ActiveType.EVERY_SIGN_IN, ActiveHandleType.HANDLE_RECEIVE_REWARD_VIDEO_RETROACTIVE, handleValue);
                    }
                    else if (handleType == ActiveHandleType.HANDLE_RECEIVE_REWARD_VIDEO_DOUBLE) {//二倍
                        handleValue = JSON.stringify({ "adId": adid });
                        ActiveMgr.sendActiveReq(ActiveType.EVERY_SIGN_IN, ActiveHandleType.HANDLE_RECEIVE_REWARD_VIDEO_DOUBLE, handleValue);
                    }
                    break;

                case ActiveType.TIAO_ZHAN_TASK://挑战任务
                    handleValue = JSON.stringify({ "adId": adid });
                    ActiveMgr.sendActiveReq(ActiveType.TIAO_ZHAN_TASK, ActiveTaskHandleType.HANDLE_TASK_VIDEO, handleValue);
                    break;

                case ActiveType.THREE_DAY_TASK://三日任务
                    handleValue = JSON.stringify({ "adId": adid });
                    ActiveMgr.sendActiveReq(ActiveType.THREE_DAY_TASK, ActiveTaskHandleType.HANDLE_TASK_VIDEO, handleValue);
                    break;

                case ActiveType.YI_BEN_WAN_LI://一本万利
                    handleValue = JSON.stringify({ "adId": adid });
                    ActiveMgr.sendActiveReq(ActiveType.YI_BEN_WAN_LI, ActiveTaskHandleType.HANDLE_TASK_VIDEO, handleValue);
                    break;

                default:
                    break;
            }
        })
    }

    /**光看观看完成 */
    private lookAdOver() {
        AdMgr.setADid();
        this.close();
    }
}
