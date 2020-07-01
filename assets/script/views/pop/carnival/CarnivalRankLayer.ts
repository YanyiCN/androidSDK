import MyNode from "../../../base/MyNode";
import { EventType, ActiveType, ActiveHandleType, ActiveReceiveStatusType } from "../../../define/Const";
import ActiveMgr from "../../../data/active/ActiveMgr";
import ActiveMgrCarnival, { CarnivalTaskType } from "../../../data/active/ActiveMgrCarnival";
import { ActiveCarnivalTaskConfig, ActiveCarnivalMenuConfig } from "../../../data/config/CfgActiveCarnival";
import { TaskDetails } from "../../../data/entity/ActiveCarnivalData";
import ComUtil from "../../../utils/ComUtil";

const { ccclass, property } = cc._decorator;
//嘉年华排位上分
@ccclass
export default class CarnivalRankLayer extends MyNode {
    @property(cc.Node)
    nodeSelectTypeGroup: cc.Node = null;

    @property(cc.Node)
    nodeTogTypeItem: cc.Node = null;

    @property(cc.Node)
    contentTask: cc.Node = null;

    @property(cc.Node)
    nodeTaskItem: cc.Node = null;

    @property(cc.ScrollView)
    svTaskGroup: cc.ScrollView = null;

    private curSelectType: number = null;

    // private viewShowLocation: cc.Vec2[] = null;

    onExtLoad() {
        // this.svTaskGroup.getContentPosition()
        this.regLis(EventType.ACTIVE_CARNIVAL_UPDATE_DATA, this.updateView);
        ActiveMgr.sendActiveReq(ActiveType.JIA_NIAN_HUA, ActiveHandleType.HANDLE_GET_INFO);
    }

    private updateView() {
        let carnivalData = ActiveMgrCarnival.getAllData();
        let rankCfg = ActiveMgrCarnival.getCfgPaiWeiShangFen();
        let rankData = ActiveMgrCarnival.getDataPaiWeiShangFen();
        this.createSelectTypeGroup(rankCfg.menuList)
    }

    /**
     * 刷新任务列表-已排序
     * @param rankCfg 任务静态配置
     * @param rankData 任务静态数据
     */
    private createTaskList(rankCfg: ActiveCarnivalTaskConfig[], rankData: TaskDetails[]) {
        ComUtil.destroyAllChildren(this.contentTask);
        for (let i = 0; i < rankCfg.length; i++) {
            let curTaskCfg = rankCfg[i];
            let curTaskData = rankData[i];
            let node = cc.instantiate(this.nodeTaskItem);
            node.getChildByName("lbTaskDes").getComponent(cc.Label).string = rankData[i].key;
            node.getChildByName("lbTaskDes").getComponent(cc.Label).string = curTaskData.key;
            node.getChildByName("btnToReceive").active = curTaskData.status == ActiveReceiveStatusType.NO_RECEIVE;
            node.getChildByName("spReceived").active = curTaskData.status == ActiveReceiveStatusType.YET_RECEIVE;
            node.getChildByName("btnToFinisn").active = curTaskData.status == ActiveReceiveStatusType.NO_OPEN;
            node.getChildByName("btnToReceive").on("click", () => {
                let taskType = CarnivalTaskType.Skill;
                let curCfgId = curTaskCfg.id;
                let curCfgKey = curTaskCfg.jnhType;
                let handleValue = JSON.stringify({ "type": taskType, "key": curCfgKey, "taskId": curCfgId });
                ActiveMgr.sendActiveReq(ActiveType.JIA_NIAN_HUA, ActiveHandleType.HANDLE_RECEIVE_REWARD, handleValue);
            })
            node.getChildByName("lbTaskDes").getComponent(cc.Label).string =
                ComUtil.formatStr(ActiveMgr.getTaskName(curTaskCfg.taskType), curTaskCfg.taskTimes);
            node.getChildByName("pbTask").getChildByName("lbTaskValue").getComponent(cc.Label).string =
                ComUtil.formatStr("%s/%s", curTaskData.times, curTaskCfg.taskTimes);
            node.getChildByName("pbTask").getComponent(cc.ProgressBar).progress = curTaskData.times / curTaskCfg.taskTimes;
            node.x = 0;
            node.active = true;
            this.contentTask.addChild(node);
        }
    }

    /**生成熟练技巧横条选择 */
    private createSelectTypeGroup(menuList: ActiveCarnivalMenuConfig[]) {
        ComUtil.destroyAllChildren(this.nodeSelectTypeGroup);
        for (let i = 0; i < menuList.length; i++) {
            let curMenuTypeCfg = menuList[i];
            let node = cc.instantiate(this.nodeTogTypeItem);
            node.getChildByName("taskTypeName").getChildByName("lbTaskTypeName").getComponent(cc.Label).string = curMenuTypeCfg.name;
            node.getChildByName("taskTypeNameSelect").getChildByName("lbTaskTypeNameSelect").getComponent(cc.Label).string = curMenuTypeCfg.name;
            node.y = 0;
            node.active = true;
            this.nodeSelectTypeGroup.addChild(node);
        }
        this.initTogView();
    }

    /**初始化视图 */
    private initTogView() {
        let togList = this.nodeSelectTypeGroup;
        for (let i = 0; i < togList.childrenCount; i++) {
            togList.children[i].on("click", () => {
                this.onTogEvent(i);
            })
        }
        this.creatTaskData();
    }

    /**熟练技巧任务类型切换 */
    private onTogEvent(tag: number) {
        if (this.curSelectType != tag) {
            this.curSelectType = tag;
            this.creatTaskData(tag);
        }
    }


    /**通过动态数据任务类型分类 -最终具体分类任务数据*/
    private getDataTaskListByType(type: string) {
        let rankData = ActiveMgrCarnival.getDataPaiWeiShangFen();
        let curRankTypeData: TaskDetails[] = [];
        for (const iterator of rankData) {
            if (iterator.key == type) {
                curRankTypeData.push(iterator);
            }
        }
        if (curRankTypeData.length > 0) {
            curRankTypeData = this.sortTaskDataByState(curRankTypeData);
        }
        return curRankTypeData;
    }


    /**动态数据分类后根据领取状态排序 */
    private sortTaskDataByState(curRankTypeData: TaskDetails[]) {
        return curRankTypeData.sort(this.order);
    }
    /**升 */
    private order(curRankTypeDataA: TaskDetails, curRankTypeDataB: TaskDetails) {
        return (curRankTypeDataB.status == ActiveReceiveStatusType.NO_RECEIVE ? curRankTypeDataB.status - 10 : curRankTypeDataB.status)
            - (curRankTypeDataA.status == ActiveReceiveStatusType.NO_RECEIVE ? curRankTypeDataA.status - 10 : curRankTypeDataA.status);
    }

    /**根据动态数据获取具体静态配置-已排序 */
    private getCfgTaskListBuyDataOrder(type: string) {
        let orderCfgTypeCfg: ActiveCarnivalTaskConfig[] = [];
        let rankCfgAll = ActiveMgrCarnival.getCfgPaiWeiShangFen().taskList;
        let curTypeAllDataList = this.getDataTaskListByType(type);
        for (const iterator of curTypeAllDataList) {
            for (let i = 0; i < rankCfgAll.length; i++) {
                if (rankCfgAll[i].jnhType == iterator.key) {
                    orderCfgTypeCfg.push(rankCfgAll[i]);
                }
            }
        }
        return orderCfgTypeCfg;
    }

    /**具体任务数据分配 */
    private creatTaskData(tagType: number = 0) {
        let menuList = ActiveMgrCarnival.getCfgPaiWeiShangFen().menuList;
        let rankOrderCfg = this.getCfgTaskListBuyDataOrder(menuList[tagType].key);
        let rankOrderData = this.getDataTaskListByType(menuList[tagType].key);
        this.createTaskList(rankOrderCfg, rankOrderData);
    }



}
