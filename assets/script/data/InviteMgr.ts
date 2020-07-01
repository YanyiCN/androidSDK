import MyMgr from "../base/MyMgr";
import mlog from "../utils/LogUtil";
import glb from "../utils/glb";
import { MsgType, Mid, EventType } from "../define/Const";
import { Lobby } from "../proto/proto";
import { InviteGiftConfig } from "./config/CfgInviteGift";

const { ccclass } = cc._decorator;

@ccclass
class InviteMgr extends MyMgr {
    private inviteGiftConfig: InviteGiftConfig[] = null;
    public initByLoad() {
        mlog.info("InviteMgr");
        glb.regEventLis(Mid.MID_INVITE_RES, this.onInviteRes, this);
    }
    public initMgr() {
    }
    public uninitMgr() { }

    private onInviteRes(msg: Lobby.InviteRes) {
        if (msg.handle_type == InviteHandleType.List) {

        } else if (msg.handle_type == InviteHandleType.AwardOne) {

        } else if (msg.handle_type == InviteHandleType.AwardAll) {

        }

        glb.sendEvent(EventType.UPDATE_INVITE_INFO, msg.invite_item_list);
    }

    /**
     * 
     * @param handleType 1邀请列表2领取奖励单个3一键领取
     * @param handleValue 领取奖励单个的玩家id
     * @param rewardId 领取奖励单个的奖励id
     */
    public sendInviteReq(handleType: number, handleValue: number = null, rewardId: number = null) {
        glb.sendMsg(MsgType.InviteReq, {
            handle_type: handleType,
            handle_value: handleValue,
            reward_id: rewardId
        });
    }

    /**储存邀请好友礼物配置 */
    public setInviteGiftConfig(cfgInviteGiftList: InviteGiftConfig[]) {
        this.inviteGiftConfig = cfgInviteGiftList;
    }

    /**获取本地储存邀请好友礼物配置 */
    public getInviteGiftConfig() {
        return this.inviteGiftConfig;
    }
}
export default new InviteMgr();

/**邀请上报相关类型  1邀请列表2领取奖励单个3一键领取*/
export const InviteHandleType = {
    List: 1,
    AwardOne: 2,
    AwardAll: 3
}
