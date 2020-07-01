import { ActiveData } from "./ReceiveSerDataTree";
import { TaskChallengeConfigActiveItems } from "../config/CfgTaskChallenge";
//------------------------
//------------------------
/**活动任务挑战 */
//------------------------
//------------------------
export class TaskChallengeData extends ActiveData<TaskChallengeStaticData, TaskChallengeDynamicData>  { }

export class TaskChallengeStaticData {
    oneItems: TaskChallengeConfigActiveItems[];
    twoItems: TaskChallengeConfigActiveItems[];
    threeItems: TaskChallengeConfigActiveItems[];
}

export class TaskChallengeDynamicData {
    taskList:TaskChallengeDetails[];
}

export class TaskChallengeDetails {
    id: number;
    status: number;
    times: number;
}