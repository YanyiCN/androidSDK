import ActiveMgrBase from "./ActiveMgrBase";
import { ActiveType, ActiveHandleType, EventType, ActiveTaskHandleType } from "../../define/Const";
import { Lobby } from "../../proto/proto";
import glb from "../../utils/glb";
import { ActiveCarnivalData } from "../entity/ActiveCarnivalData";

class ActiveMgrCarnival extends ActiveMgrBase<ActiveCarnivalData> {

    public getActiveType(): number {
        return ActiveType.JIA_NIAN_HUA;
    }

    public onActiveMsg(msg: Lobby.ActiveRes) {
        glb.sendEvent(EventType.ACTIVE_CARNIVAL_UPDATE_DATA);
    }

    public getStaticData() {
        return this.getAllData().activeStatic;
    }

    public getDynamicData() {
        return this.getAllData().activeDynamic;
    }

    /**熟练技巧静态配置 */
    public getCfgShuLianJiQiao() {
        return this.getStaticData().shulianjiqiaoTask;
    }

    /**排位上分静态配置 */
    public getCfgPaiWeiShangFen() {
        return this.getStaticData().paiweishangfenTask;
    }

    /**成长任务静态配置 */
    public getCfgChengZhangRenWu() {
        return this.getStaticData().chengzhangrenwuTask;
    }

    /**牌型任务静态配置 */
    public getCfgPaiXingRenWu() {
        return this.getStaticData().paixingrenwuTask;
    }

    /**熟练技巧动态数据 */
    public getDataShuLianJiQiao() {
        return this.getDynamicData().taskList1.taskList;
    }

    /**排位上分动态配置数据 */
    public getDataPaiWeiShangFen() {
        return this.getDynamicData().taskList2.taskList;
    }

    /**成长任务动态数据 */
    public getDataChengZhangRenWu() {
        return this.getDynamicData().taskList3.taskList;
    }

    /**牌型任务动态数据 */
    public getDataPaiXingRenWu() {
        return this.getDynamicData().taskList4.taskList;
    }



    /**七日签到配置 */
    public getDataSevenSignin() {
        return this.getDynamicData().rewardReceiveStatusList;
    }

    /**七日签到动态数据 */
    public getCfgSevenSignin() {
        return this.getStaticData().sevenRewardItems;
    }
}
export default new ActiveMgrCarnival();

export const CarnivalTaskType = {
    Skill: 1,
    Rank: 2,
    Growth: 3,
    Paixing: 4
}