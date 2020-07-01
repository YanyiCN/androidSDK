import { ActiveData } from "./ReceiveSerDataTree";
import { TaskDailyConfigActiveItems, TaskDailyConfigHuoyueduItems } from "../config/CfgTaskDaily";
//------------------------
//------------------------
/**活动任务每日 */
//------------------------
//------------------------
export class TaskDailyData extends ActiveData<TaskDailyStaticData, TaskDailyDynamicData>  { }

export class TaskDailyStaticData {
    activeItems: TaskDailyConfigActiveItems[];
    huoyueduItems: TaskDailyConfigHuoyueduItems[]
}

export class TaskDailyDynamicData {
    taskList: TaskDailyDetails[];
    activeScore: number;
    boxReceiveList: number[];
}  

//配置每日任务type--id 
export class TaskDailyDetails {
    id: number;
    status: number;
    times: number;
}