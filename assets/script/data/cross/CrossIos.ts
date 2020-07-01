import CrossBase, { CrossType } from "./base/CrossBase";
import { NetStateType, SceneType } from "../../define/Const";
import SceneMgr from "../SceneMgr";
import mlog from "../../utils/LogUtil";
import ChannelBaseBean from "../entity/ChannelBean";

export default class CrossIos implements CrossBase{

    private funCallback:Function;
    private gpsInfoCache;
    private netWorkTypeCache = NetStateType.NST_WIFI;
    private cacheWxStartMsg:string = null;
    private cacheShareObjId:number = null;
    private cacheShareTime:number= null;

    private call(funType:number,args?:any):string{
        let jsonStr = JSON.stringify(args || {});
        return this.callOc(funType,jsonStr);
    }
    private callOc(funType:number,jsonStr:string):string{
        let res = jsb.reflection.callStaticMethod("AppController","gameCall:message:",funType+"",jsonStr);
        // mlog.debug("callOc funType:",funType," res:",res);
        return res;
    }

    initAll(funCallback:Function){
        this.funCallback = funCallback;
        window["ocCall"]=(lfType:number,jsonStr:string)=>{
            mlog.debug("ocCall lfType:",lfType," jsonStr:",jsonStr);
            if (lfType == CrossType.LF_GET_START_MSG) {
                // 微信消息特殊处理
                this.handleStartMsg(jsonStr);
                return "ok";
            }
            this.funCallback(lfType,jsonStr);
            return "ok";
        }

        // 初始化一下   标记认为已初始化OK
        this.call(CrossType.LF_INIT_CALLBACK,{callbackId:1})
        cc.game.on(cc.game.EVENT_SHOW,()=>{
            funCallback(CrossType.LF_GAME_HIDESHOW,JSON.stringify({value:true}));
        });
        cc.game.on(cc.game.EVENT_HIDE,()=>{
            funCallback(CrossType.LF_GAME_HIDESHOW,JSON.stringify({value:false}));
        });
    }
    
    private handleStartMsg(startMsg:string){
        if (startMsg!=null && startMsg!="") {
            this.cacheWxStartMsg = startMsg;
        }
        if (SceneMgr.getCurSceneType() == SceneType.LOGO_SCENE){
            // 不合适发
            return;
        }else{
            if (this.cacheWxStartMsg!=null) {
                let xx = this.cacheWxStartMsg;
                this.cacheWxStartMsg = null;
                this.funCallback(CrossType.LF_GET_START_MSG,xx);
            }
        }
    }

    supportPayList(): { [type: string]: number; } {
        let res = this.call(CrossType.LF_SUPPORT_PAY_LIST);
        return JSON.parse(res);
    }
    prePay(payType: any): Promise<string> {
        return new Promise<string>((res,rej)=>{
            res(this.call(CrossType.LF_PRE_PAY,{payType:payType}));
        });
    }

    doPay(payType: number, gameOrderNum: string, centerOrderNum: string, price: number, otherParam: any, payId: number): string {
        this.call(CrossType.LF_PAY,{
            payType : payType,
            gameOrderNum:gameOrderNum,
            centerOrderNum:centerOrderNum,
            price:price,
            otherParam:otherParam,
            payId:payId
        })
        return null;
    }
    doShare(params: { shareWxType: number; shareType: number; shareObjId: number; extData?: any; imgPath?: string; linkUrl?: string; title?: string; desc?: string; iconPath?: string; }) {
        this.call(CrossType.LF_SHARE,params);
    }
    checkNetState(): number {
        let stateStr = this.call(CrossType.LF_CHECK_NET_STATE)
        return Number.parseInt(stateStr);
    }
    copyText(text: string): boolean {
        this.call(CrossType.LF_COPY_TEXT,{text:text});
        return false;
    }
    getCopyText(res: (value?) => void, rej: (reason?) => void){
        res(this.call(CrossType.LF_GET_COPY_TXT));
    }
    getPowerLevel(): number {
        let intStr = this.call(CrossType.LF_CHECK_POWER_LEVEL)
        let num = Number.parseInt(intStr);
        if (num<=0) {
            num = 1;
        }else if(num>=99){
            num = 98;
        }
        num = Math.ceil(num/33)
        return num;
    }
    checkGpsOpen(param: { needNow: boolean; }) {
        let resOk:string = this.call(CrossType.LF_GPS_CHECK_OPEN);
        let ok = resOk == "true";
        let lfRes:any = {
            needNow:param?param.needNow:false,
            suc : ok
        }
        this.funCallback(CrossType.LF_GPS_CHECK_OPEN,JSON.stringify(lfRes));
    }
    gpsReqOpen() {
        let resOk:string = this.call(CrossType.LF_GPS_SET_OPEN);
        let ok = resOk == "true";
        this.funCallback(CrossType.LF_GPS_SET_OPEN,JSON.stringify({value:ok}));
    }
    getGpsLoc(): string {
        return this.funCallback(CrossType.LF_GPS_GET_LOC);
    }
    getDeviceVersion(): string {
        return this.call(CrossType.LF_DEVICE_VERSION);
    }
    makeShock() {
        this.call(CrossType.LF_MAKE_SHOCK)
    }
    getNetLevel(): number {
        let intStr = this.call(CrossType.LF_NET_LEVEL)
        return Number.parseInt(intStr);
    }
    getChannelAndCode(): ChannelBaseBean {
        let resStr = this.call(CrossType.LF_CHANNEL_AND_CODE)
        return JSON.parse(resStr);
    }
    getPushToken(): string {
        let resStr = this.call(CrossType.LF_GET_PUSH_TOKEN)
        return resStr;
    }
    isExitBySdk(): boolean {
        // 用不到的
        return false;
    }
    logoutBySdk(): boolean {
        // 用不到的
        return false;
    }
    checkSdkExist(sdkId: number, sdkName?: string): boolean {
        let resOk:string = this.call(CrossType.LF_SDK_EXIST,{name:sdkName,id:sdkId});
        let ok = resOk == "true";
        return ok;
    }
    getDeviceId(): string {
        let resStr = this.call(CrossType.LF_GET_DEVICE_ID)
        return resStr;
    }
    getStartMsg() {
        let resStr = this.call(CrossType.LF_GET_START_MSG);
        this.handleStartMsg(resStr);
    }
    userGameInfo(userInfo: any) {
        // 用不到的
    }
    sdkLogin(accountType?:number): void {
        this.call(CrossType.LF_SDK_LOGIN,{accountType:accountType});
    }
}