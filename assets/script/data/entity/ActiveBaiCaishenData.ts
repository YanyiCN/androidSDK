import { ActiveData } from "./ReceiveSerDataTree";
import { ActiveBaiCaishenConfig } from "../config/CfgActiveBaiCaishen";
//------------------------
//------------------------
/**活动拜财神 */
//------------------------
//------------------------
export class ActiveBaiCaishenData extends ActiveData<ActiveBaiCaishenStaticData, ActiveBaiCaishenDynamicData>  { }

export class ActiveBaiCaishenStaticData {
    activeItems: ActiveBaiCaishenConfig[];
    weekendMultiple: number;
}

/**领取状态0-未开启,1-开启未领取,2-已经领取 */
export class ActiveBaiCaishenDynamicData {
    receiveStateZao: number;
    receiveStateZhong: number;
    receiveStateWan: number;
    curActive: number;
}