import { ActiveData } from "./ReceiveSerDataTree";
import { TaskGrowthConfig } from "../config/CfgTaskGrowth";
//------------------------
//------------------------
/**活动任务成长 */
//------------------------
//------------------------
export class TaskTGrowthData extends ActiveData<TaskGrowthStaticData, TaskThreeDaysDynamicData>  { }

export class TaskGrowthStaticData {
    activeItems: TaskGrowthConfig[];
}

export class TaskThreeDaysDynamicData {
    rewardReceiveList: number[];
}