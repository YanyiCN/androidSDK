import MyMgr from "../../base/MyMgr";
import mlog from "../../utils/LogUtil";
import { Lobby } from "../../proto/proto";
import { ActiveType, MsgType, Mid, ActiveHandleType, EventType } from "../../define/Const";
import glb from "../../utils/glb";
import ActiveMgrSignin from "./ActiveMgrSignin";
import ActiveMgrTaskDaily from "./ActiveMgrTaskDaily";
import { TaskConfig } from "../config/CfgGameTree";
import ActiveMgrTaskChallenge from "./ActiveMgrTaskChallenge";
import ActiveMgrTaskThreeDays from "./ActiveMgrTaskThreeDays";
import ActiveMgrTaskGrowth from "./ActiveMgrTaskGrowth";
import ActiveMgrProfits from "./ActiveMgrProfits";
import ActiveMgrLoginSignin from "./ActiveMgrLoginSignin";
import ActiveMgrBaiCaishen from "./ActiveMgrBaiCaishen";
import ActiveMgrCarnival from "./ActiveMgrCarnival";
import ProfileMgr from "../ProfileMgr";

class ActiveMgr extends MyMgr {
    private activeData: { [key: number]: { activeStatic: any, activeDynamic: any } };
    private taskConfig: TaskConfig[] = null;
    public initByLoad() {
        mlog.info("初始ActiveMgr");
        glb.regEventLis(Mid.MID_ACTIVE_RES, this.onActiveRes, this);
        this.initMgr();
    }
    public initMgr() {
        this.activeData = {};
    }
    public uninitMgr() { }


    /**活动数据 */
    private onActiveRes(msg: Lobby.ActiveRes) {
        switch (msg.active_type) {
            case ActiveType.EVERY_SIGN_IN:
                this.setActiveData(ActiveType.EVERY_SIGN_IN, null, JSON.parse(msg.handle_value_json_res));
                ActiveMgrSignin.onActiveMsg(msg);
                break;

            case ActiveType.EVERY_DAY_TASK:
                this.setActiveData(ActiveType.EVERY_DAY_TASK, null, JSON.parse(msg.handle_value_json_res));
                ActiveMgrTaskDaily.onActiveMsg(msg);
                break;

            case ActiveType.TIAO_ZHAN_TASK:
                this.setActiveData(ActiveType.TIAO_ZHAN_TASK, null, JSON.parse(msg.handle_value_json_res));
                ActiveMgrTaskChallenge.onActiveMsg(msg);
                break;

            case ActiveType.THREE_DAY_TASK:
                this.setActiveData(ActiveType.THREE_DAY_TASK, null, JSON.parse(msg.handle_value_json_res));
                ActiveMgrTaskThreeDays.onActiveMsg(msg);
                break;

            case ActiveType.CHENG_ZHANG_TASK:
                this.setActiveData(ActiveType.CHENG_ZHANG_TASK, null, JSON.parse(msg.handle_value_json_res));
                ActiveMgrTaskGrowth.onActiveMsg(msg);
                break;
            case ActiveType.YI_BEN_WAN_LI:
                this.setActiveData(ActiveType.YI_BEN_WAN_LI, null, JSON.parse(msg.handle_value_json_res));
                ActiveMgrProfits.onActiveMsg(msg);
                break;
            case ActiveType.LOGIN_GIFT:
                this.setActiveData(ActiveType.LOGIN_GIFT, null, JSON.parse(msg.handle_value_json_res));
                ActiveMgrLoginSignin.onActiveMsg(msg);
                break;
            case ActiveType.BAI_CAI_SHEN:
                this.setActiveData(ActiveType.BAI_CAI_SHEN, null, JSON.parse(msg.handle_value_json_res));
                ActiveMgrBaiCaishen.onActiveMsg(msg);
                break;
            case ActiveType.JIA_NIAN_HUA:
                this.setActiveData(ActiveType.JIA_NIAN_HUA, null, JSON.parse(msg.handle_value_json_res));
                ActiveMgrCarnival.onActiveMsg(msg);
                break;
            case ActiveType.DAN_EVERY_DAY_AWARD:
                ProfileMgr.setDanEveryDayInfo(JSON.parse(msg.handle_value_json_res));
                glb.sendEvent(EventType.ACTIVE_DAN_EVERYDAY_AWARD, JSON.parse(msg.handle_value_json_res));
                break;

            default:
                break;
        }
        let test = JSON.parse(msg.handle_value_json_res);
    }


    /**活动 */
    public sendActiveReq(activeType: number, handleType: number, handleValue: string = null) {
        glb.sendMsg(MsgType.ActiveReq, {
            active_type: activeType,
            handle_type: handleType,
            handle_value: handleValue
        })
    }

    /**
     * 储存活动相关数据  {type-{static,dynamic}}
     * @param activeType 活动类型-Key
     * @param activeStatic 静态配置-Value
     * @param activeDynamic 动态配置-Value
     */
    public setActiveData(activeType: number, activeStatic: any = null, activeDynamic: any = null) {
        if (!this.activeData[activeType]) {
            this.activeData[activeType] = { activeStatic: activeStatic, activeDynamic: activeDynamic };
        } else {
            if (activeStatic) {
                this.activeData[activeType].activeStatic = activeStatic;
            }

            if (activeDynamic) {
                this.activeData[activeType].activeDynamic = activeDynamic;
            }
        }
    }

    /**
     * 获取活动相关数据 {type-{static,Dynamic}}
     * @param activeType 活动类型-Key
     * @param activeStatic 静态配置-boolean
     * @param activeDynamic 动态配置-boolean
     */
    public getActiveData(activeType: number, activeStatic: any = null, activeDynamic: any = null) {
        if (activeStatic && !activeDynamic) {
            return this.activeData[activeType].activeStatic;
        }

        if (activeDynamic && !activeStatic) {
            return this.activeData[activeType].activeDynamic;
        }

        return this.activeData[activeType];
    }

    /**更新任务配置 */
    public setTaskConfig(taskCfg: TaskConfig[]) {
        this.taskConfig = taskCfg;
    }

    /**获取任务配置 */
    public getTaskConfig() {
        return this.taskConfig;
    }


    /**根据每日任务配置类型获取任务名称 */
    public getTaskName(taskType: number): string {
        let taskCfg = this.taskConfig;
        for (const iterator of taskCfg) {
            if (iterator.type == taskType) {
                return iterator.name;
            }
        }
    }

}
export default new ActiveMgr();