import ActiveMgrBase from "./ActiveMgrBase";
import { ActiveType, ActiveHandleType, EventType, ActiveTaskHandleType } from "../../define/Const";
import { Lobby } from "../../proto/proto";
import { TaskThreeDaysData } from "../entity/ActiveTaskThreeDaysData";
import glb from "../../utils/glb";

class ActiveMgrTaskThreeDays extends ActiveMgrBase<TaskThreeDaysData> {

    public getActiveType(): number {
        return ActiveType.THREE_DAY_TASK;
    }

    public onActiveMsg(msg: Lobby.ActiveRes) {
        if (msg.handle_type == ActiveTaskHandleType.HANDLE_TASK_VIDEO) {
            glb.sendEvent(EventType.ACTIVE_TASK_THREEDAYS_VIDEO_SUCCEED);
        }
        glb.sendEvent(EventType.ACTIVE_TASK_THREEDAYS_UPDATE_DATA);
    }


}
export default new ActiveMgrTaskThreeDays();