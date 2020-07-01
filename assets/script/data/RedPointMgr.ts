import MyMgr from "../base/MyMgr";
import mlog from "../utils/LogUtil";
import { EventType } from "../define/Const";
import glb from "../utils/glb";
import UserMgr from "./UserMgr";
import SetMgr from "./SetMgr";
import { UserDynamicData } from "./entity/UserData";

/** 红点类型定义 */
class RedPointDefine {
    /** 是否红点*/
    red: boolean;
    /** 事件类型列表*/
    eventList: number[];
    /** 生成是否红点数据的方法*/
    isRedFun: () => boolean;

    constructor(isRedFun: () => boolean, eventList: number[]) {
        this.isRedFun = isRedFun;
        this.eventList = eventList;
    }
}
/** 所有红点类型 */
export const RedPointTypes = {
    RealId: new RedPointDefine(() => { return UserMgr.getUserInfo().UserOtherInfo.idCard.length <= 0; }, [EventType.UPDATE_USERINFO]),
    RealPhone: new RedPointDefine(() => { return UserMgr.getUserInfo().UserOtherInfo.mobile.length <= 0; }, [EventType.UPDATE_USERINFO]),
    FeedbackMessage: new RedPointDefine(() => { return UserDynamicData.receiveFeedback > 0; }, [EventType.DYNAMIC_DATA_UPDATE_FEEDBACK]),
    Mail: new RedPointDefine(() => { return UserDynamicData.receiveMail > 0; }, [EventType.DYNAMIC_DATA_UPDATE_MAIL]),
}

class RedPointMgr extends MyMgr {
    /** 事件类型对应的红点key列表*/
    private eventKeysMap: { [eventType: number]: string[] } = {};

    public initByLoad() {
        mlog.info("初始RedPointMgr");

        // 将所有红点定义遍历处理 生成以事件ID为key,红点类型列表为值的数据
        for (const key in RedPointTypes) {
            let redDef: RedPointDefine = null;
            if (RedPointTypes.hasOwnProperty(key)) {
                redDef = RedPointTypes[key];
                if (!(redDef instanceof RedPointDefine)) {
                    continue;
                }
            }

            for (const eventType of redDef.eventList) {
                let keyList = this.eventKeysMap[eventType];
                if (!keyList) {
                    keyList = [];
                    this.eventKeysMap[eventType] = keyList;
                }
                keyList.push(key);
            }
        }

        // 将上面的事件数据分别进行监听
        for (const eventTypeStr in this.eventKeysMap) {
            if (this.eventKeysMap.hasOwnProperty(eventTypeStr)) {
                let eventType = Number(eventTypeStr);
                const keyList = this.eventKeysMap[eventType];
                glb.regEventLis(eventType, () => {
                    this.onRedPointDataUpdate(keyList);
                }, this);
            }
        }
        //当大登录成功强行刷新数据---事件注册后
        glb.regEventLis(EventType.LOGIN_DYNAMIC_DATA_SUCCEED, this.forceUpdateAllNodes, this);
    }
    public initMgr() {
        console.log("Init RedPointMgr ......");

    }
    public uninitMgr() { }


    /** 某事件触发对应的红点数据更新*/
    private onRedPointDataUpdate(keyList: string[]) {
        for (const key of keyList) {
            const item: RedPointDefine = RedPointTypes[key];
            item.red = item.isRedFun();
        }

        glb.sendEvent(EventType.RED_POINT_UPDATE);
    }


    /**
     * 更新红点节点
     * @param nodeParent 需要更新的红点的父节点
     * @param redTypes 红点的定义
     */
    public updateRedPointNode(nodeParent: cc.Node, redTypes: RedPointDefine[]) {
        if (!redTypes || redTypes.length == 0) {
            return;
        }
        let isRed = false;
        for (const redItem of redTypes) {
            if (redItem.red) {
                isRed = true;
                break;
            }
        }

        this.updateRedPointNodeSimple(nodeParent, isRed);
    }

    /**
     * 更新红点节点
     * @param nodeParent 需要更新的红点的父节点
     * @param showRed 是否显示红点
     */
    public updateRedPointNodeSimple(nodeParent: cc.Node, showRed: boolean) {
        if (!nodeParent || !nodeParent.isValid) {
            return;
        }
        const spRed = nodeParent.getChildByName("spRed");
        if (spRed == null) {
            return;
        }
        if (spRed.active != showRed) {
            spRed.active = showRed;
        }
    }


    /** 强行更新所有节点 */
    public forceUpdateAllNodes() {
        for (const eventTypeStr in this.eventKeysMap) {
            if (this.eventKeysMap.hasOwnProperty(eventTypeStr)) {
                let eventType = Number(eventTypeStr);
                const keyList = this.eventKeysMap[eventType];
                for (const key of keyList) {
                    const item: RedPointDefine = RedPointTypes[key];
                    item.red = item.isRedFun();
                }
            }
        }

        // 发送一个事件
        glb.sendEvent(EventType.RED_POINT_UPDATE);
    }

}
export default new RedPointMgr();
