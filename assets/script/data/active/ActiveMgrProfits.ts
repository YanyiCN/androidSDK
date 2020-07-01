import ActiveMgrBase from "./ActiveMgrBase";
import { ActiveType, ActiveHandleType, EventType, ActiveTaskHandleType } from "../../define/Const";
import { Lobby } from "../../proto/proto";
import glb from "../../utils/glb";
import { ActiveProfitsData } from "../entity/ActiveProfitsData";

class ActiveMgrProfits extends ActiveMgrBase<ActiveProfitsData> {

    public getActiveType(): number {
        return ActiveType.YI_BEN_WAN_LI;
    }

    public onActiveMsg(msg: Lobby.ActiveRes) {
        if (msg.handle_type == ActiveHandleType.HANDLE_RECEIVE_REWARD_VIDEO_TRIPLE) {
            //一本万利视频观看成功
            glb.sendEvent(EventType.ACTIVE_PROFITS_VIDEO_SUCCEED);
        }
        glb.sendEvent(EventType.ACTIVE_PROFITS_UPDATE_DATA);
    }

    /**一本万利动态数据 */
    public getDynamicData() {
        return this.getAllData().activeDynamic
    }

    /**一本万利静态数据 */
    public getStaticData() {
        return this.getAllData().activeStatic
    }
}
export default new ActiveMgrProfits();