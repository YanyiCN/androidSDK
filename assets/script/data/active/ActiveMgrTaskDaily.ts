import ActiveMgrBase from "./ActiveMgrBase";
import { ActiveType, ActiveHandleType, EventType } from "../../define/Const";
import { Lobby } from "../../proto/proto";
import { TaskDailyData } from "../entity/ActiveTaskDailyData";
import ActiveMgr from "./ActiveMgr";
import glb from "../../utils/glb";

class ActiveMgrTaskDaily extends ActiveMgrBase<TaskDailyData> {

    public getActiveType(): number {
        return ActiveType.EVERY_DAY_TASK;
    }

    public onActiveMsg(msg: Lobby.ActiveRes) {
        if (msg.handle_type == ActiveHandleType.HANDLE_GET_INFO) {
            //glb.sendEvent(EventType.ACTIVE_TASK_EVERYDAY_UPDATE_DATA);
        }
        glb.sendEvent(EventType.ACTIVE_TASK_EVERYDAY_UPDATE_DATA);
    }

    public getStaticDate() {
        return this.getAllData().activeStatic;
    }

    public getDynamicDate() {
        return this.getAllData().activeDynamic;
    }

}
export default new ActiveMgrTaskDaily();