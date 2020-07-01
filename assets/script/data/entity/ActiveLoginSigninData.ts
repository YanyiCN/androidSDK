import { ActiveData } from "./ReceiveSerDataTree";
import { ActiveLoginSigninConfig } from "../config/CfgActiveLoginSignin";
//------------------------
//------------------------
/**活动登录签到 */
//------------------------
//------------------------
export class ActiveLoginSigninData extends ActiveData<ActiveLoginSigninStaticData, ActiveLoginSigninDynamicData>  { }

export class ActiveLoginSigninStaticData {
    activeItems: ActiveLoginSigninConfig[];
    endTime: string;
    endTimeMs: number;
    startTime: string;
    startTimeMs: number;
}


export class ActiveLoginSigninDynamicData {
    loginDay: number;
    rewardReceiveStatusList: number[];
}