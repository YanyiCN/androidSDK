import ActiveMgrBase from "./ActiveMgrBase";
import { ActiveType, ActiveHandleType, EventType } from "../../define/Const";
import { Lobby } from "../../proto/proto";
import glb from "../../utils/glb";
import { ActiveData } from "../entity/ReceiveSerDataTree";

class ActiveMgrSignin extends ActiveMgrBase<ActiveData<any, any>> {

    public getActiveType(): number {
        return ActiveType.EVERY_SIGN_IN;
    }

    public onActiveMsg(msg: Lobby.ActiveRes) {
        if (msg.handle_type == ActiveHandleType.HANDLE_RECEIVE_REWARD_VIDEO_TRIPLE
            || msg.handle_type == ActiveHandleType.HANDLE_RECEIVE_REWARD_VIDEO_RETROACTIVE ||
            ActiveHandleType.HANDLE_RECEIVE_REWARD_VIDEO_DOUBLE) {
            //广告奖励发放
            glb.sendEvent(EventType.ACTIVE_SIGNIN_TRIPLE_AWARD);
        }
        glb.sendEvent(EventType.ACTIVE_SIGNIN_UPDATE_INFO);
    }
}
export default new ActiveMgrSignin();