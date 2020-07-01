import MyMgr from "../base/MyMgr";
import mlog from "../utils/LogUtil";
import glb from "../utils/glb";
import { VIPConfig } from "./config/CfgGameTree";
import { Lobby } from "../proto/proto";
import { Mid, MsgType, EventType } from "../define/Const";

class VipMgr extends MyMgr {

    private cfgVIP: VIPConfig[] = null;

    private firstRewardLevel: number[] = [];

    private dayRewardState: boolean = null;

    public initByLoad() {
        mlog.info("初始VipMgr");
        glb.regEventLis(Mid.MID_VIP_RES, this.onVipRes, this);
    }
    public initMgr() { }
    public uninitMgr() { }

    private onVipRes(msg: Lobby.VipRes) {
        if (msg.first_reward_level_str.length > 0) {
            if (msg.first_reward_level_str.length == 1) {
                this.firstRewardLevel.push(Number(msg.first_reward_level_str));
            } else {
                let getFirstRewardArr = msg.first_reward_level_str.split(",");
                for (let i = 0; i < getFirstRewardArr.length; i++) {
                    this.firstRewardLevel.push(Number(getFirstRewardArr[i]));
                }
            }
        } else {
            this.firstRewardLevel = [];
        }

        this.dayRewardState = msg.day_reward_state == 1;
        if (msg.handle_type == VipResType.Reward) {
            glb.sendEvent(EventType.VIP_UPDATE_INFO, msg.handle_value);
        } else if (msg.handle_type == VipResType.Info) {
            glb.sendEvent(EventType.VIP_INIT_INFO);
        }
    }

    //handleType1获取vip信息2领取奖励
    public sendVipReq(handleType: number, handleValue: number = null) {
        glb.sendMsg(MsgType.VipReq, {
            handle_type: handleType,
            handle_value: handleValue
        })
    }

    /**储存vip配置 */
    public setVIPConfig(cfgVIPList: VIPConfig[]) {
        this.cfgVIP = cfgVIPList;
    }

    /**获取本地储存vip配置 */
    public getVIPConfig() {
        return this.cfgVIP;
    }

    /**已领取奖励记录 */
    public getFirstRewardLevel() {
        return this.firstRewardLevel;
    }

    /**当前VIP每日奖励 */
    public getDayRewardState() {
        return this.dayRewardState;
    }
}
export default new VipMgr();

export const VipResType = {
    Info: 1,
    Reward: 2
}