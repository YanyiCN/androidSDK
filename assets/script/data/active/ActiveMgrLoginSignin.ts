import ActiveMgrBase from "./ActiveMgrBase";
import { ActiveType, ActiveHandleType, EventType, ActiveTaskHandleType } from "../../define/Const";
import { Lobby } from "../../proto/proto";
import glb from "../../utils/glb";
import { ActiveLoginSigninData } from "../entity/ActiveLoginSigninData";

class ActiveMgrLoginSignin extends ActiveMgrBase<ActiveLoginSigninData> {

    public getActiveType(): number {
        return ActiveType.LOGIN_GIFT;
    }

    public onActiveMsg(msg: Lobby.ActiveRes) {
        if (msg.handle_type == ActiveTaskHandleType.HANDLE_TASK_VIDEO) {
            // glb.sendEvent(EventType.ACTIVE_TASK_CHALLENGE_VIDEO_SUCCEED);
        }
        glb.sendEvent(EventType.ACTIVE_LOGIN_SIGNIN_UPDATE_DATA);
    }

    public getStaticData() {
        return this.getAllData().activeStatic;
    }

    public getDynamicData() {
        return this.getAllData().activeDynamic;
    }
}
export default new ActiveMgrLoginSignin();