import CrossBase, { CrossType } from "./base/CrossBase";
import glb from "../../utils/glb";
import PopMgr from "../PopMgr";
import ChannelBaseBean from "../entity/ChannelBean";

export default class CrossUnknown implements CrossBase{

    private funCallback:Function;

    initAll(funCallback:Function){
        this.funCallback = funCallback;

    }
    

    supportPayList(): { [type: string]: number; } {
        return {};
    }
    prePay(payType: any): Promise<string> {
        return new Promise<string>((res,rej)=>{
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
        return false;
    }
    getCopyText(res: (value?) => void, rej: (reason?) => void){
        res("");
    }
    getPowerLevel(): number {
        return 1;
    }
    checkGpsOpen(param: { needNow: boolean; }) {
        let lfRes:any = {
            needNow:param?param.needNow:false
        }
        lfRes.suc = false;
        this.funCallback(CrossType.LF_GPS_CHECK_OPEN,JSON.stringify(lfRes));
    }
    gpsReqOpen() {
        this.funCallback(CrossType.LF_GPS_SET_OPEN,false);
    }
    getGpsLoc(): string {
        return null;
    }
    getDeviceVersion(): string {
        return "";
    }
    makeShock() {
        
    }
    getNetLevel(): number {
        return 3;
    }
    getChannelAndCode(): ChannelBaseBean {
        return {channelSub:"def",plfm:"unknown",channel:"unknown",code:190822};
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
    sdkLogin(accountType?:number): void {
        PopMgr.tip("暂无可用的登录方式");
    }

}