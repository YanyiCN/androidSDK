import { ActiveData } from "./ReceiveSerDataTree";
import { ActiveProfitsConfig } from "../config/CfgActiveProfits";
//------------------------
//------------------------
/**活动一本万利 */
//------------------------
//------------------------
export class ActiveProfitsData extends ActiveData<ActiveProfitsStaticData, ActiveProfitsDynamicData>  { }

export class ActiveProfitsStaticData {
    activeItems: ActiveProfitsConfig[];
    watchVideoEnable: number;
}


export class ActiveProfitsDynamicData {
    activateState: number;
    receiveLevelList: ProfitsDetails[];
}

//配置一本万利
export class ProfitsDetails {
    id: number;
    status: number;
}