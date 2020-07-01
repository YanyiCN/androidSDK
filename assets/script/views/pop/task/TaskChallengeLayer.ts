import MyNode from "../../../base/MyNode";
import ActiveMgrTaskChallenge from "../../../data/active/ActiveMgrTaskChallenge";
import ComUtil from "../../../utils/ComUtil";
import { TaskChallengeConfigActiveItems } from "../../../data/config/CfgTaskChallenge";
import { EventType, ActiveType, ActiveHandleType, TaskReceiveState, ActiveTaskHandleType, PopLayer } from "../../../define/Const";
import ActiveMgr from "../../../data/active/ActiveMgr";
import ActiveMgrTaskDaily from "../../../data/active/ActiveMgrTaskDaily";
import { TaskChallengeDetails } from "../../../data/entity/ActiveTaskChallengeData";
import AdMgr from "../../../data/AdMgr";
import PopMgr from "../../../data/PopMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class TaskChallengeLayer extends MyNode {

    @property(cc.Node)
    nodeItemExample: cc.Node = null;

    @property(cc.Node)
    nodeActiveTaskGroup: cc.Node = null;

    @property(cc.Node)
    btnVideo: cc.Node = null;

    onExtLoad() {
        this.regLis(EventType.ACTIVE_TASK_CHALLENGE_UPDATE_DATA, this.initView);
        ActiveMgr.sendActiveReq(ActiveType.TIAO_ZHAN_TASK, ActiveHandleType.HANDLE_GET_INFO);
        this.btnVideo.on("click", () => {
            AdMgr.sendAdReq();
            PopMgr.showPop(PopLayer.POP_WATCH_AD, ActiveType.TIAO_ZHAN_TASK, ActiveTaskHandleType.HANDLE_TASK_VIDEO);
        })
    }

    private initView() {
        let taskChallenge = ActiveMgrTaskChallenge.getAllData();
        let taskList = taskChallenge.activeDynamic.taskList;
        let cfgList = [taskChallenge.activeStatic.oneItems, taskChallenge.activeStatic.twoItems, taskChallenge.activeStatic.threeItems];
        let curChallengeTask: TaskChallengeConfigActiveItems[] = [];
        for (let i = 0; i < taskList.length; i++) {
            curChallengeTask.push(this.findNeedCfg(taskList[i].id, cfgList[i]));
        }
        this.createChallengeTaskList(curChallengeTask, taskList);
    }

    private createChallengeTaskList(curChallengeTask: TaskChallengeConfigActiveItems[], taskList: TaskChallengeDetails[]) {
        ComUtil.destroyAllChildren(this.nodeActiveTaskGroup);
        for (let i = 0; i < curChallengeTask.length; i++) {
            let theTaskCfg = curChallengeTask[i];//当前item 静态配置
            let theTaskData = taskList[i];//当前item 动态数据
            let node = cc.instantiate(this.nodeItemExample);
            node.getChildByName("lbAwardNum").getComponent(cc.Label).string = "x" + theTaskCfg.rewardNum.toString();
            node.getChildByName("lbTaskDes").getComponent(cc.Label).string = ComUtil.formatStr(ActiveMgr.getTaskName(theTaskCfg.taskType), theTaskCfg.taskTimes);
            node.getChildByName("lbStage").getComponent(cc.Label).string = ComUtil.formatStr("第%s阶", ComUtil.numToHan(i + 1));
            node.getChildByName("pbActive").getComponent(cc.ProgressBar).progress = theTaskData.times / theTaskCfg.taskTimes;
            node.getChildByName("pbActive").getChildByName("lbActivebar").getComponent(cc.Label).string = theTaskData.times + "/" + theTaskCfg.taskTimes;
            node.getChildByName("btnPromptlyGet").active = theTaskData.status == TaskReceiveState.YET_COMPLETE;//立即领取-btn
            node.getChildByName("btnToFinish").active = theTaskData.status == TaskReceiveState.NO_COMPLETE;//去完成-btn
            node.getChildByName("spDone").active = theTaskData.status == TaskReceiveState.YET_RECEIVE;//已完成
            node.getChildByName("btnNotOpen").active = theTaskData.status == TaskReceiveState.NO_OPEN;//暂未开启
            //立即领取-btn
            node.getChildByName("btnPromptlyGet").on("click", () => {
                //领取活任务奖励
                let stepsNum = (i + 1).toString();
                ActiveMgr.sendActiveReq(ActiveType.CHENG_ZHANG_TASK, ActiveTaskHandleType.HANDLE_TASK_GIFT, stepsNum);
            })

            node.getChildByName("btnToFinish").on("click", () => {
                //去完成
            })

            node.y = 0;
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
}
