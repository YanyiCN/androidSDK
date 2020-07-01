import ActiveMgrBase from "./ActiveMgrBase";
import { ActiveType, ActiveHandleType, EventType, ActiveTaskHandleType } from "../../define/Const";
import { Lobby } from "../../proto/proto";
import { TaskChallengeData } from "../entity/ActiveTaskChallengeData";
import glb from "../../utils/glb";

class ActiveMgrTaskChallenge extends ActiveMgrBase<TaskChallengeData> {

    public getActiveType(): number {
        return ActiveType.TIAO_ZHAN_TASK;
    }

    public onActiveMsg(msg: Lobby.ActiveRes) {
        if (msg.handle_type == ActiveTaskHandleType.HANDLE_TASK_VIDEO) {
            glb.sendEvent(EventType.ACTIVE_TASK_CHALLENGE_VIDEO_SUCCEED);
        }
        glb.sendEvent(EventType.ACTIVE_TASK_CHALLENGE_UPDATE_DATA);
    }

    public getStaticDate() {
        return this.getAllData().activeStatic;
    }
}
export default new ActiveMgrTaskChallenge();