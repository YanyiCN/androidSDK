import ActiveMgrBase from "./ActiveMgrBase";
import { ActiveType, ActiveHandleType, EventType, ActiveTaskHandleType } from "../../define/Const";
import { Lobby } from "../../proto/proto";
import glb from "../../utils/glb";
import { ActiveBaiCaishenData } from "../entity/ActiveBaiCaishenData";

class ActiveMgrBaiCaishen extends ActiveMgrBase<ActiveBaiCaishenData> {

    public getActiveType(): number {
        return ActiveType.BAI_CAI_SHEN;
    }

    public onActiveMsg(msg: Lobby.ActiveRes) {
        if (msg.handle_type == ActiveTaskHandleType.HANDLE_TASK_VIDEO) {
            // glb.sendEvent(EventType.ACTIVE_TASK_CHALLENGE_VIDEO_SUCCEED);
        }
        glb.sendEvent(EventType.ACTIVE_BAICAISHEN_UPDATE_DATA);
    }

    public getDynamicData() {
        return this.getAllData().activeDynamic
    }

    public getStaticData() {
        return this.getAllData().activeStatic
    }
}
export default new ActiveMgrBaiCaishen();