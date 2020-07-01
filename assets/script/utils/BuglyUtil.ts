import mlog from "../utils/LogUtil";
import glb from "./glb";

export default class BuglyUtil{
    public static initBugly(channel:string,version:string){
        if (!this.supportBugly()) {
            mlog.info("BuglyMgr.initMgr 不支持bugly")
            return;
        }
        meehu.Bugly.buglySetAppChannel(channel);
        meehu.Bugly.buglySetAppVersion(version);
    }

    public static buglySetUserId(userId:number){
        if (!this.supportBugly()) {
            return;
        }
        meehu.Bugly.buglySetUserId(userId.toString());
    }

    public static supportBugly():boolean{
        if(window["meehu"]&&window["meehu"].Bugly){
            return true;
        }
        return false;
    }

    //@param level 日志级别 {Off=0, Error=1,Warning=2,Info=3,Debug=4,Verbose=5}
    public static log(logType,msg,...subst: any[]){
        if (!this.supportBugly()) {
            return;
        }
        msg = msg || "";
        if (subst && subst.length>0) {
            for (const sss of subst) {
                msg+=sss;
            }
        }
        meehu.Bugly.buglyLog(3,glb.clientVersion,msg);
    }
}