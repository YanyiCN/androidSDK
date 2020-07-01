import MyNode from "../../../base/MyNode";
import { EventType, ActiveType, ActiveHandleType, ActiveReceiveStatusType, PopLayer, ActiveTaskHandleType } from "../../../define/Const";
import ActiveMgr from "../../../data/active/ActiveMgr";
import ActiveMgrProfits from "../../../data/active/ActiveMgrProfits";
import { ActiveProfitsConfig } from "../../../data/config/CfgActiveProfits";
import { ProfitsDetails } from "../../../data/entity/ActiveProfitsData";
import ComUtil from "../../../utils/ComUtil";
import AdMgr from "../../../data/AdMgr";
import PopMgr from "../../../data/PopMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ActiveProfitsLayer extends MyNode {

    @property(cc.Node)
    btnVideoActive: cc.Node = null;

    @property(cc.Node)
    btnVideoActived: cc.Node = null;

    @property([cc.Node])
    nodeActivateState: cc.Node[] = [];

    @property(cc.Node)
    contentTask: cc.Node = null;

    @property(cc.Node)
    nodeItemExample: cc.Node = null;

    onExtLoad() {
        this.regLis(EventType.ACTIVE_PROFITS_UPDATE_DATA, this.initView);
        ActiveMgr.sendActiveReq(ActiveType.YI_BEN_WAN_LI, ActiveHandleType.HANDLE_GET_INFO);

        this.btnVideoActive.on("click", () => {
            //激活广告
            AdMgr.sendAdReq();
            PopMgr.showPop(PopLayer.POP_WATCH_AD, ActiveType.YI_BEN_WAN_LI, ActiveHandleType.HANDLE_RECEIVE_REWARD_VIDEO_TRIPLE);
        })
    }

    private initView() {
        let profitsStatic = ActiveMgrProfits.getStaticData();
        let profitsDynamic = ActiveMgrProfits.getDynamicData();
        let receiveLevelList = profitsDynamic.receiveLevelList;
        let orderCfgList = this.orderTaskListByState(profitsStatic.activeItems, receiveLevelList);//领取状态排序
        this.createActiveList(orderCfgList, receiveLevelList);
        this.activeAdTimes(profitsStatic.watchVideoEnable, profitsDynamic.activateState);
    }

    /**等级任务 */
    private createActiveList(activeItemsList: ActiveProfitsConfig[], activeDynamic: ProfitsDetails[]) {
        ComUtil.destroyAllChildren(this.contentTask);
        for (let i = 0; i < activeDynamic.length; i++) {
            let taskcfg = activeItemsList[i];
            let taskData = activeDynamic[i];
            let node = cc.instantiate(this.nodeItemExample);
            node.x = 0;
            node.getChildByName("lbGiftNum").getComponent(cc.Label).string = ComUtil.awardName(taskcfg.rewardType) + "X" + taskcfg.rewardNum;
            node.getChildByName("lbTaskDes").getComponent(cc.Label).string = ComUtil.formatStr("等级达到%s级可领取", taskcfg.level);
            node.getChildByName("btnPromptlyGet").active = taskData.status == ActiveReceiveStatusType.NO_RECEIVE;
            node.getChildByName("btnNotGet").active = taskData.status == ActiveReceiveStatusType.NO_OPEN;
            node.getChildByName("btnReceived").active = taskData.status == ActiveReceiveStatusType.YET_RECEIVE;
            node.getChildByName("btnPromptlyGet").on("click", () => {
                //任务奖励领取
                let handleValue = taskcfg.id.toString();
                ActiveMgr.sendActiveReq(ActiveType.YI_BEN_WAN_LI, ActiveHandleType.HANDLE_RECEIVE_REWARD, handleValue);
            })
            node.active = true;
            this.contentTask.addChild(node);
        }
    }

    /**根据领取状态任务列表排序 */
    private orderTaskListByState(cfgList: ActiveProfitsConfig[], taskList: ProfitsDetails[]) {
        let orderList: ActiveProfitsConfig[] = [];
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

    /**
     * 任务激活状态
     * @param cfgADnum 配置要求激活次数
     * @param activateState 目前已激活次数
     */
    private activeAdTimes(cfgADnum: number, activateState: number) {
        this.btnVideoActive.active = activateState < cfgADnum;
        this.btnVideoActived.active = activateState >= cfgADnum;
        for (let i = 0; i < this.nodeActivateState.length; i++) {
            this.nodeActivateState[i].active = false;
        }
        if (activateState < cfgADnum) {
            this.nodeActivateState[activateState].active = true;
        }
    }

}
