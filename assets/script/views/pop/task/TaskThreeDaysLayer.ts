import MyNode from "../../../base/MyNode";
import ActiveMgrTaskThreeDays from "../../../data/active/ActiveMgrTaskThreeDays";
import { TaskThreeDaysConfig } from "../../../data/config/CfgTaskThreeDays";
import ActiveMgrTaskChallenge from "../../../data/active/ActiveMgrTaskChallenge";
import { TaskChallengeConfigActiveItems } from "../../../data/config/CfgTaskChallenge";
import ComUtil from "../../../utils/ComUtil";
import { EventType, ActiveType, ActiveHandleType, TaskReceiveState, ActiveTaskHandleType, PopLayer } from "../../../define/Const";
import ActiveMgr from "../../../data/active/ActiveMgr";
import { TaskThreeDaysDetails } from "../../../data/entity/ActiveTaskThreeDaysData";
import ActiveMgrTaskDaily from "../../../data/active/ActiveMgrTaskDaily";
import AdMgr from "../../../data/AdMgr";
import PopMgr from "../../../data/PopMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class TaskThreeDaysLayer extends MyNode {

    @property(cc.Node)
    nodeItemExample: cc.Node = null;

    @property(cc.Node)
    nodeActiveTaskGroup: cc.Node = null;

    @property(cc.Label)
    lbAwardTip: cc.Label = null;

    @property(cc.Node)
    btnQuickReceive: cc.Node = null;

    @property(cc.Node)
    btnReceived: cc.Node = null;

    @property(cc.Node)
    btnNotGet: cc.Node = null;

    @property(cc.Node)
    btnVideo: cc.Node = null;

    onExtLoad() {
        this.regLis(EventType.ACTIVE_TASK_THREEDAYS_UPDATE_DATA, this.initView);
        ActiveMgr.sendActiveReq(ActiveType.THREE_DAY_TASK, ActiveHandleType.HANDLE_GET_INFO);
        this.btnQuickReceive.on("click", () => {
            //领取三日奖励
            ActiveMgr.sendActiveReq(ActiveType.THREE_DAY_TASK, ActiveTaskHandleType.HANDLE_TASK_GIFT);
        })
        this.btnVideo.on("click", () => {
            AdMgr.sendAdReq();
            PopMgr.showPop(PopLayer.POP_WATCH_AD, ActiveType.THREE_DAY_TASK, ActiveTaskHandleType.HANDLE_TASK_VIDEO);
        })
    }

    private initView() {
        let taskThreeDaysData = ActiveMgrTaskThreeDays.getAllData();
        let taskDataList = taskThreeDaysData.activeDynamic.taskList;
        let cfgList = this.createtThreeDaysAllcfgList();
        let curChallengeTask: TaskChallengeConfigActiveItems[] = [];
        for (let i = 0; i < taskDataList.length; i++) {
            curChallengeTask.push(this.findNeedCfg(taskDataList[i].id, cfgList));
        }
        this.createTaskList(curChallengeTask, taskDataList);

        let taskThreeDaysCfg = taskThreeDaysData.activeStatic;
        let taskBoxState = taskThreeDaysData.activeDynamic.boxReceive;
        this.lbAwardTip.string = ComUtil.formatStr("最高%s钻,最低%s钻", taskThreeDaysCfg.maxDiamond, taskThreeDaysCfg.minDiamond);

        this.btnQuickReceive.active = taskBoxState == TaskReceiveState.YET_COMPLETE;
        this.btnReceived.active = taskBoxState == TaskReceiveState.YET_RECEIVE;
        this.btnNotGet.active = taskBoxState == TaskReceiveState.NO_COMPLETE;
    }

    private createTaskList(taskThreeDaysCfg: TaskChallengeConfigActiveItems[], taskDataList: TaskThreeDaysDetails[]) {
        ComUtil.destroyAllChildren(this.nodeActiveTaskGroup);
        for (let i = 0; i < taskThreeDaysCfg.length; i++) {
            let node = cc.instantiate(this.nodeItemExample);
            let curCfg = taskThreeDaysCfg[i];//当前item 静态配置
            let curData = taskDataList[i];//当前item 动态数据
            node.y = 0;
            node.getChildByName("nodeTaskOpen").active = curData.status != TaskReceiveState.NO_OPEN;
            node.getChildByName("nodeTaskNotOpen").active = curData.status == TaskReceiveState.NO_OPEN;
            let nodeTaskOpen = node.getChildByName("nodeTaskOpen");
            nodeTaskOpen.getChildByName("lbDay").getComponent(cc.Label).string = ComUtil.formatStr("第%s天", ComUtil.numToHan(i + 1));
            nodeTaskOpen.getChildByName("lbTaskDes").getComponent(cc.Label).string = ComUtil.formatStr(ActiveMgr.getTaskName(curCfg.taskType), curCfg.taskTimes);
            nodeTaskOpen.getChildByName("pbActive").getComponent(cc.ProgressBar).progress = curData.times / curCfg.taskTimes;
            nodeTaskOpen.getChildByName("pbActive").getChildByName("lbActivebar").getComponent(cc.Label).string = curData.times + "/" + curCfg.taskTimes;
            nodeTaskOpen.getChildByName("btnToFinish").active = curData.status == TaskReceiveState.NO_COMPLETE;
            nodeTaskOpen.getChildByName("spDone").active = curData.status == TaskReceiveState.YET_RECEIVE;
            nodeTaskOpen.getChildByName("btnToFinish").on("click", () => {
                //去完成
            })
            node.getChildByName("nodeTaskNotOpen").getChildByName("lbDay").getComponent(cc.Label).string = ComUtil.formatStr("第%s天", ComUtil.numToHan(i + 1));
            node.active = true;
            this.nodeActiveTaskGroup.addChild(node);
        }
    }

    /**筛选阶段对应配置 */
    private findNeedCfg(cfgID: number, cfgList: TaskChallengeConfigActiveItems[]) {
        for (const iterator of cfgList) {
            if (iterator.id == cfgID) {
                return iterator;
            }
        }
    }

    /**三日任务由挑战任务合并组成 */
    private createtThreeDaysAllcfgList() {
        let allThreeDaysCfg: TaskChallengeConfigActiveItems[] = [];
        let taskChallengeCfg = ActiveMgrTaskChallenge.getStaticDate();
        let challengeAllcfgList = [taskChallengeCfg.oneItems, taskChallengeCfg.twoItems, taskChallengeCfg.threeItems];
        for (let i = 0; i < challengeAllcfgList.length; i++) {
            for (const iterator of challengeAllcfgList[i]) {
                allThreeDaysCfg.push(iterator);
            }
        }
        return allThreeDaysCfg;
    }
}
