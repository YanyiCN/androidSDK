import mlog from "../utils/LogUtil";
import MyMgr from "../base/MyMgr";
import glb from "../utils/glb";
import UserMgr from "./UserMgr";
import { EventType, MsgType, Mid, ServerCode } from "../define/Const";
import { Lobby } from "../proto/proto";
import PopMgr from "./PopMgr";
import { UserDynamicData } from "./entity/UserData";

class SetMgr extends MyMgr {
    openShock: boolean;
    openVoice: boolean;
    openFace: boolean;
    public initByLoad() {
        mlog.info("初始SetMgr");
        glb.regEventLis(Mid.MID_FEEDBACK_RES, this.onFeedbackRes, this);
    }
    public initMgr() {
        this.openShock = glb.getUserData("openShock", "int", 1) == 1;
        this.openVoice = glb.getUserData("openVoice", "int", 1) == 1;
        this.openFace = glb.getUserData("openFace", "int", 1) == 1;
    }
    public uninitMgr() { }

    /**
     * 意见反馈事件响应
     * @param msg Lobby.FeedbackRes
     */
    private onFeedbackRes(msg: Lobby.FeedbackRes) {
        if (msg.code == ServerCode.Succeed) {
            switch (msg.handle_type) {
                case FeedbackType.List:
                    glb.sendEvent(EventType.SET_FEEDBACK_LIST, msg.feedback_list);
                    break;
                case FeedbackType.Idea:
                    glb.sendEvent(EventType.SET_FEEDBACK_IDEA_SUCCEED, msg.message);
                    break;
                case FeedbackType.Read:

                    break;

                default:
                    break;
            }
        } else {
            if (msg.message && msg.message.length > 0) {
                PopMgr.alert(msg.message);
            }
        }
    }

    /**
     * 意见反馈
     * @param handleType 1反馈列表2提交意见3阅读
     * @param handleValue 阅读时的数据id
     * @param handleValueStr 提交意见的提交内容	
     */
    public sendFeedbackReq(handleType: number, handleValue: number = null, handleValueStr: string = null) {
        glb.sendMsg(MsgType.FeedBackReq, {
            handle_type: handleType,
            handle_value: handleValue,
            handle_value_str: handleValueStr
        });
    }

    public getOpenShock() {
        return this.openShock;
    }

    public getOpenVoice() {
        return this.openVoice;
    }

    public getOpenFace() {
        return this.openFace;
    }

    public setOpenFace(isOpen: boolean) {
        this.openFace = isOpen;
        if (!isOpen) {
            glb.setUserData("openFace", 0, "int")
        } else {
            glb.setUserData("openFace", 1, "int")
        }
    }

    public setOpenShock(isOpen: boolean) {
        this.openShock = isOpen;
        if (!isOpen) {
            glb.setUserData("openShock", 0, "int")
        } else {
            glb.setUserData("openShock", 1, "int")
        }
    }

    public setOpenVoice(isOpen: boolean) {
        this.openVoice = isOpen;
        if (!isOpen) {
            glb.setUserData("openVoice", 0, "int")
        } else {
            glb.setUserData("openVoice", 1, "int")
        }
    }

    /**设置红点系统 */
    public getRedManage(): SetRedManage {
        let redManage = {
            realID: UserMgr.getUserInfo().UserOtherInfo.idCard.length <= 0,
            realPhone: UserMgr.getUserInfo().UserOtherInfo.mobile.length <= 0,
            feedbackMessage: UserDynamicData.receiveFeedback > 0
        }
        return redManage
    }
}
export default new SetMgr();

export const FeedbackType = {
    List: 1,
    Idea: 2,
    Read: 3
}

class SetRedManage {
    realID: boolean;
    realPhone: boolean;
    feedbackMessage: boolean;
}