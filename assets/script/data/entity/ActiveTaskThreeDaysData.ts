import { ActiveData } from "./ReceiveSerDataTree";
import { TaskThreeDaysConfig } from "../config/CfgTaskThreeDays";
//------------------------
//------------------------
/**活动任务每日 */
//------------------------
//------------------------
export class TaskThreeDaysData extends ActiveData<TaskThreeDaysConfig, TaskThreeDaysDynamicData>  { }

export class TaskThreeDaysDynamicData {
    taskList: TaskThreeDaysDetails[];
    boxReceive: number;
}

export class TaskThreeDaysDetails {
    id: number;
    status: number;
    times: number;
}