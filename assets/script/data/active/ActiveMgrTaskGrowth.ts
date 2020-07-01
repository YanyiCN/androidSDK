import ActiveMgrBase from "./ActiveMgrBase";
import { ActiveType, ActiveHandleType, EventType } from "../../define/Const";
import { Lobby } from "../../proto/proto";
import glb from "../../utils/glb";
import { TaskTGrowthData } from "../entity/ActiveTaskGrowthData";

class ActiveMgrTaskGrowth extends ActiveMgrBase<TaskTGrowthData> {

    public getActiveType(): number {
        return ActiveType.CHENG_ZHANG_TASK;
    }

    public onActiveMsg(msg: Lobby.ActiveRes) {
        if (msg.handle_type == ActiveHandleType.HANDLE_GET_INFO) {
            // glb.sendEvent(EventType.ACTIVE_TASK_GROWTH_UPDATE_DATA);
        }
        glb.sendEvent(EventType.ACTIVE_TASK_GROWTH_UPDATE_DATA);
    }



}
export default new ActiveMgrTaskGrowth();