import { ActiveData } from "./ReceiveSerDataTree";
import { ActiveCarnivalSevenConfig, ActiveCarnivalConfig } from "../config/CfgActiveCarnival";
//------------------------
//------------------------
/**嘉年华 */
//------------------------
//------------------------
export class ActiveCarnivalData extends ActiveData<CarnivaStaticData, CarnivaDynamicData>  { }

export class CarnivaStaticData {
    /**七日礼包 */
    sevenRewardItems: ActiveCarnivalSevenConfig[];
    /**熟练技巧 */
    shulianjiqiaoTask: ActiveCarnivalConfig;
    /**排位上分 */
    paiweishangfenTask: ActiveCarnivalConfig;
    /**成长任务 */
    chengzhangrenwuTask: ActiveCarnivalConfig;
    /**牌型任务 */
    paixingrenwuTask: ActiveCarnivalConfig;
}

export class CarnivaDynamicData {
    //活动剩余时间
    activeRemainingTime:number;
    //活动的第几天
    activeDay: number;
    /**7天奖励已经领取的天数 */
    rewardReceiveStatusList: number[];
    /**熟练技巧 */
    taskList1: TaskTypeData;
    /**排位上分 */
    taskList2: TaskTypeData;
    /**成长任务 */
    taskList3: TaskTypeData;
    /**牌型任务 */
    taskList4: TaskTypeData;
}

/**嘉年华大任务 */
export class TaskTypeData {
    taskList: TaskDetails[];
}

/**任务详情 */
export class TaskDetails {
    id: number;
    key: string;
    status: number;
    times: number;
}