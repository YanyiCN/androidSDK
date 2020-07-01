import MyNode from "../../../base/MyNode";
import ActiveMgrTaskDaily from "../../../data/active/ActiveMgrTaskDaily";
import ComUtil from "../../../utils/ComUtil";
import { TaskDailyConfigHuoyueduItems, TaskDailyConfigActiveItems } from "../../../data/config/CfgTaskDaily";
import ActiveMgr from "../../../data/active/ActiveMgr";
import { ActiveType, ActiveHandleType, EventType, TaskReceiveState, ActiveTaskHandleType } from "../../../define/Const";
import { TaskDailyDynamicData, TaskDailyDetails } from "../../../data/entity/ActiveTaskDailyData";

const { ccclass, property } = cc._decorator;

@ccclass
export default class TaskDailyLayer extends MyNode {

    @property(cc.Node)
    itemExample: cc.Node = null;

    @property(cc.Node)
    contentDailyTask: cc.Node = null;

    @property(cc.Node)
    itemGiftBox: cc.Node = null;

    @property(cc.Node)
    nodeGiftBoxGroup: cc.Node = null;

    @property(cc.Label)
    lbLiveness: cc.Label = null;

    @property(cc.ProgressBar)
    pbLiveness: cc.ProgressBar = null;

    onExtLoad() {
        this.regLis(EventType.ACTIVE_TASK_EVERYDAY_UPDATE_DATA, this.initView);
        ActiveMgr.sendActiveReq(ActiveType.EVERY_DAY_TASK, ActiveHandleType.HANDLE_GET_INFO);
    }

    private initView() {
        let dailyTask = ActiveMgrTaskDaily.getAllData();
        let activeStatic = dailyTask.activeStatic;
        let activeDynamic = dailyTask.activeDynamic;
        let orderCfgList = this.orderTaskListByState(activeStatic.activeItems, activeDynamic.taskList);//领取状态排序
        this.createLivenessBoxList(activeStatic.huoyueduItems, activeDynamic);
        this.createActiveList(orderCfgList, activeDynamic);
        this.lbLiveness.string = activeDynamic.activeScore.toString();
        let percent = activeDynamic.activeScore / 100;
        this.pbLiveness.progress = Number(percent.toFixed(3));
        console.log("progress: " + this.pbLiveness.progress);
    }

    /**活跃度奖励宝箱列表 */
    private createLivenessBoxList(huoyueduItemsList: TaskDailyConfigHuoyueduItems[], activeDynamic: TaskDailyDynamicData) {
        let boxReceivedArr = activeDynamic.boxReceiveList;//已领取宝箱ID
        ComUtil.destroyAllChildren(this.nodeGiftBoxGroup);
        for (let i = 0; i < huoyueduItemsList.length; i++) {
            let node = cc.instantiate(this.itemGiftBox);
            let curActivecfg = huoyueduItemsList[i];
            let isBoxReceived = this.isBoxReceived(curActivecfg.id, boxReceivedArr);//此宝箱是否领取
            node.getChildByName("nodeStateUndone").active = activeDynamic.activeScore < curActivecfg.score;//宝箱未获得
            node.getChildByName("nodeStateToGet").active = (activeDynamic.activeScore >= curActivecfg.score) && !isBoxReceived;//宝箱未领取
            node.getChildByName("nodeStateReceived").active = (activeDynamic.activeScore >= curActivecfg.score) && isBoxReceived //宝箱已领取

            node.getChildByName("nodeStateUndone").getChildByName("lbBoxLiveness").getComponent(cc.Label).string = curActivecfg.score.toString();
            node.getChildByName("nodeStateToGet").getChildByName("btnStateToGet").on("click", () => {
                //领取活跃度宝箱奖励
                let cfgID = curActivecfg.id.toString();
                ActiveMgr.sendActiveReq(ActiveType.EVERY_DAY_TASK, ActiveTaskHandleType.HANDLE_TASK_BOX, cfgID);
            })
            node.x = 0;
            node.active = true;
            this.nodeGiftBoxGroup.addChild(node);
        }
    }

    /**详情活动列表 */
    private createActiveList(activeItemsList: TaskDailyConfigActiveItems[], activeDynamic: TaskDailyDynamicData) {
        ComUtil.destroyAllChildren(this.contentDailyTask);
        let taskListData = activeDynamic.taskList;
        for (let i = 0; i < activeItemsList.length; i++) {
            let node = cc.instantiate(this.itemExample);
            let curActivecfg = activeItemsList[i];
            let curActiceData = taskListData[i];
            node.getChildByName("lbLiveness").getComponent(cc.Label).string = "活跃度: +" + curActivecfg.huoyuedu;
            node.getChildByName("lbActiveTip").getComponent(cc.Label).string = ComUtil.formatStr(ActiveMgr.getTaskName(curActivecfg.taskType), curActivecfg.taskTimes)
                + ComUtil.formatStr("获得%s%s", curActivecfg.rewardNum, ComUtil.awardName(curActivecfg.rewardType))
            node.getChildByName("lbAwardNum").getComponent(cc.Label).string = "x" + curActivecfg.rewardNum;
            node.getChildByName("pbActive").getComponent(cc.ProgressBar).progress = curActiceData.times / curActivecfg.taskTimes;
            node.getChildByName("pbActive").getChildByName("lbActivebar").getComponent(cc.Label).string = curActiceData.times + "/" + curActivecfg.taskTimes;
            node.getChildByName("btnPromptlyGet").active = curActiceData.status == TaskReceiveState.YET_COMPLETE;
            node.getChildByName("btnToFinish").active = curActiceData.status == TaskReceiveState.NO_COMPLETE;
            node.getChildByName("spDone").active = curActiceData.status == TaskReceiveState.YET_RECEIVE;
            node.getChildByName("btnPromptlyGet").on("click", () => {
                //领取活任务奖励
                let cfgID = curActivecfg.id.toString();
                ActiveMgr.sendActiveReq(ActiveType.EVERY_DAY_TASK, ActiveTaskHandleType.HANDLE_TASK_GIFT, cfgID);
            })
            node.x = 0;
            node.active = true;
            this.contentDailyTask.addChild(node);
        }
    }

    /**此宝箱是否已领取 */
    private isBoxReceived(boxID: number, boxReceivedArr: number[]) {
        for (const iterator of boxReceivedArr) {
            if (iterator == boxID) {
                return true;
            }
        }
        return false;
    }

    /**根据领取状态任务列表排序 */
    private orderTaskListByState(cfgList: TaskDailyConfigActiveItems[], taskList: TaskDailyDetails[]) {
        let orderList: TaskDailyConfigActiveItems[] = [];
        for (const item of taskList) {
            for (let j = 0; j < cfgList.length; j++) {
                if (cfgList[j].id == item.id) {
                    orderList.push(cfgList[j]);
                    break;
                }
            }
        }
        // console.log("orderList:\n", orderList, "\ntaskList:\n", taskList);
        return orderList;
    }

}
