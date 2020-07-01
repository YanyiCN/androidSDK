import MyMgr from "../base/MyMgr";
import mlog from "../utils/LogUtil";
import glb from "../utils/glb";
import { MsgType, PhoneVerificationCodeType, ServerCode, Mid, EventType, UserRealType } from "../define/Const";
import { Lobby } from "../proto/proto";
import PopMap from "../define/PopMap";
import PopMgr from "./PopMgr";

class RealInfoMgr extends MyMgr {
    validMsgTime: number;
    info: any;

    public initByLoad() {
        mlog.info("初始RealInfoMgr");
        glb.regEventLis(Mid.MID_VERIFICATION_CODE_RES, this.onServerRes, this)
        glb.regEventLis(Mid.MID_USER_REAL_RES, this.onUserRealRes, this)
        glb.regEventLis(EventType.RESET_VALID_TIME,this.resetValidMsgTime,this);
        this.info = null
        this.validMsgTime = null
    }
    public initMgr() {

    }
    public uninitMgr() { }

    /**验证码获取响应 */
    public onServerRes(msg: Lobby.VerificationCodeRes) {
        if (msg.code == ServerCode.Succeed) {
            this.validMsgTime = glb.getServerTime();
        } else {
            if (msg.message) {
                PopMgr.tip(msg.message);
            } else {
                PopMgr.tip("验证码获取失败");
            }
        }
    }

    public onUserRealRes(msg: Lobby.UserRealRes) {
        if (msg.code == ServerCode.Succeed) {
            if (msg.handle_type == UserRealType.Phone) {
                glb.sendEvent(EventType.REAL_USER_PHONE_SUCCEED);
            } else if (msg.handle_type == UserRealType.IDcard) {
                glb.sendEvent(EventType.REAL_USER_IDCARD_SUCCEED);
            }
        } else if (msg.code == ServerCode.Failed) {
            PopMgr.alert(msg.message);
        }
    }

    // 剩下需要等待的验证码时间
    public getLastSendValidTime(): number {
        let serverTime = glb.getServerTime();
        if (!this.validMsgTime) {
            return null
        } else {
            if ((serverTime / 1000 - this.validMsgTime / 1000) > 60) {
                return null
            } else {
                return 60 - (Math.floor(serverTime / 1000) - Math.floor(this.validMsgTime / 1000));
            }
        }
    }

    public checkRealMob(): boolean {
        if (!this.getInfo() || !this.getInfo().mobNum || this.getInfo().mobNum.length <= 0) {
            return false
        }
        return this.getInfo().mobNum
    }



    // 绑定信息
    public getInfo(): any {
        return this.info
    }

    /**获取验证码 */
    public reqVerificationCode(handleType: number, phone: string) {
        console.log("req 获取验证码")
        glb.sendMsg(MsgType.VerificationCodeReq, {
            handle_type: handleType,
            phone: phone
        })
    }

    /**玩家认证 */
    public reqUserReal(handleType: number, handleValueStr: string) {
        console.log("req 玩家认证")
        glb.sendMsg(MsgType.UserRealReq, {
            handle_type: handleType,
            handle_value_str: handleValueStr
        })
    }

    /**玩家主观意识关闭验证界面-验证计时清零 */
    public resetValidMsgTime() {
        this.validMsgTime = null;
    }


}
export default new RealInfoMgr();