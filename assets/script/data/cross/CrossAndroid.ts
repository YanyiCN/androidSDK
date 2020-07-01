import CrossBase, { CrossType } from "./base/CrossBase";
import { NetStateType, SceneType } from "../../define/Const";
import SceneMgr from "../SceneMgr";
import mlog from "../../utils/LogUtil";
import ChannelBaseBean from "../entity/ChannelBean";
import PopMgr from "../PopMgr";

export default class CrossAndroid implements CrossBase {

    private funCallback: Function;

    private cacheWxStartMsg: string = null;


    private call(funType: number, args?: any): string {
        let jsonStr = JSON.stringify(args || {});
        return this.callJava(funType, jsonStr);
    }
    private callJava(funType: number, jsonStr: string): string {
        let res = jsb.reflection.callStaticMethod("AppController", "gameCall:message:", funType + "", jsonStr);
        mlog.debug("callJava funType:", funType, " res:", res);
        return res;
    }

    /**
     * 调用 Java 静态方法
     * @param classPath Java 包路径的完整类名
     * @param functionName 方法名
     * @param functionFlag 方法签名
     * @param args 参数
     */
    private onCallJava(classPath: string, functionName: string, functionFlag: string, args?: any) {
        let jsonStr = JSON.stringify(args || {});
        console.log("makeShock android shark args   ", jsonStr);
        let res = jsb.reflection.callStaticMethod(classPath, functionName, functionFlag, jsonStr);
        mlog.info("makeShock android shark args end  ", jsonStr);
        return res;
    }

    initAll(funCallback: Function) {
        this.funCallback = funCallback;
    }

    supportPayList(): { [type: string]: number; } {
        return {};
    }
    prePay(payType: any): Promise<string> {
        return new Promise<string>((res, rej) => {
            res(null);
        });
    }

    doPay(payType: number, gameOrderNum: string, centerOrderNum: string, price: number, otherParam: any, payId: number): string {
        throw new Error("Method not implemented.");
    }
    doShare(params: { shareWxType: number; shareType: number; shareObjId: number; extData?: any; imgPath?: string; linkUrl?: string; title?: string; desc?: string; iconPath?: string; }) {
        throw new Error("Method not implemented.");
    }
    checkNetState(): number {
        return 1;
    }
    copyText(text: string): boolean {
        this.onCallJava("org/cocos2dx/javascript/AppActivity", "copyText", "(Ljava/lang/String;)V", { str: text});
        console.log("文本 复制0", text);
        return false;
    }
    getCopyText(res: (value?) => void, rej: (reason?) => void) {
        let rr = this.onCallJava("org/cocos2dx/javascript/AppActivity", "getCopyText", "()Ljava/lang/String;");
        console.log("文本 复制", rr);
    }
    getPowerLevel(): number {
        return 1;
    }
    checkGpsOpen(param: { needNow: boolean; }) {
        let lfRes: any = {
            needNow: param ? param.needNow : false
        }
        lfRes.suc = false;
        this.funCallback(CrossType.LF_GPS_CHECK_OPEN, JSON.stringify(lfRes));
    }
    gpsReqOpen() {
        this.funCallback(CrossType.LF_GPS_SET_OPEN, false);
    }
    getGpsLoc(): string {
        return null;
    }
    getDeviceVersion(): string {
        return "";
    }
    makeShock() {
        mlog.info("makeShock android shark    CrossAndroid");
        this.onCallJava("org/cocos2dx/javascript/AppActivity", "vibrator", "(Ljava/lang/String;)V", { time: 800 });
    }
    getNetLevel(): number {
        return 3;
    }
    getChannelAndCode(): ChannelBaseBean {
        return { channelSub: "def", plfm: "unknown", channel: "unknown", code: 190822 };
    }
    getPushToken(): string {
        return "";
    }
    isExitBySdk(): boolean {
        return false;
    }
    logoutBySdk(): boolean {
        return false;
    }
    checkSdkExist(sdkId: number, sdkName?: string): boolean {
        return false;
    }
    getDeviceId(): string {
        return null;
    }
    getStartMsg() {

    }
    userGameInfo(userInfo: any) {

    }
    sdkLogin(accountType?: number): void {
        PopMgr.tip("暂无可用的登录方式");
    }
}