import MyMgr from "../base/MyMgr";
import mlog from "../utils/LogUtil";
import glb from "../utils/glb";
import { Mid, MsgType, EventType } from "../define/Const";
import { Lobby } from "../proto/proto";

const { ccclass } = cc._decorator;

@ccclass
class AdMgr extends MyMgr {

    private adID: string = null;
    public initByLoad() {
        mlog.info("初始MailMgr");
        glb.regEventLis(Mid.MID_AD_RES, this.onAdRes, this);
    }
    public initMgr() {
    }
    public uninitMgr() { }

    /**广告响应 */
    private onAdRes(msg: Lobby.AdRes) {
        // glb.sendEvent(EventType.WHATCH_AD_SUCCEED, msg.ad_id);
        this.adID = msg.ad_id;
    }

    /**广告上报 */
    public sendAdReq() {
        glb.sendMsg(MsgType.AdReq, {});
    }

    /**临时广告ID */
    public getADid() {
        return this.adID;
    }

    /**临时广告ID 清除已用 */
    public setADid() {
        this.adID = null;
    }
}
export default new AdMgr();
