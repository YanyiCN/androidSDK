import MyMgr from "../base/MyMgr";
import mlog from "../utils/LogUtil";
import glb from "../utils/glb";
import { MsgType, Mid, SendMailType, EventType } from "../define/Const";
import { Lobby } from "../proto/proto";

const { ccclass } = cc._decorator;

@ccclass
class MailMgr extends MyMgr {
    public initByLoad() {
        mlog.info("初始MailMgr");
        glb.regEventLis(Mid.MID_MAIL_RES, this.onMailRes, this);
    }
    public initMgr() {
    }
    public uninitMgr() { }

    private onMailRes(msg: Lobby.MailRes) {
        if (msg.handle_type == SendMailType.List) {
            glb.sendEvent(EventType.MAIL_UPDATE_LIST, msg.mail_list);
        } else if (msg.handle_type == SendMailType.Award) {
            glb.sendEvent(EventType.MAIL_GET_AWARD_SUCCEED,msg.mail_info);
        } else if (msg.handle_type == SendMailType.Details) {
            glb.sendEvent(EventType.MAIL_READ_DETAILS, msg.mail_info)
        }
    }

    public sendMailReq(handleType: number, handleValue: number = null) {
        glb.sendMsg(MsgType.MailReq, {
            handle_type: handleType,
            handle_value: handleValue
        });
    }
}
export default new MailMgr();
