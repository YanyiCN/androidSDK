import CrossBase, { CrossType } from "./base/CrossBase";
import mlog from "../../utils/LogUtil";
import glb from "../../utils/glb";
import { PayType, NetStateType } from "../../define/Const";
import PopMgr from "../PopMgr";
import ChannelBaseBean from "../entity/ChannelBean";

export default class CrossWeb implements CrossBase{
    protected funCallback:Function;
    private gpsInfoCache;
    private batteryLevel:number = 3;

    initAll(funCallback:Function){
        this.funCallback = funCallback;
        // 前后台切换 普通WEB有效,微信内WEB有效
        var visibilityChange
        if (typeof document.hidden !== "undefined") {
            visibilityChange = "visibilitychange";
        } else if (typeof document["webkitHidden"] !== "undefined") {
            visibilityChange = 'webkitvisibilitychange';
        }
        document.addEventListener(visibilityChange, () => {
            if (document.hidden) {
                funCallback(CrossType.LF_GAME_HIDESHOW,JSON.stringify({value:false}));
            }else {
                funCallback(CrossType.LF_GAME_HIDESHOW,JSON.stringify({value:true}));
            }
        });
        // 网络状态切换
        window.addEventListener('online', function(){
            funCallback(CrossType.LF_CHECK_NET_STATE,JSON.stringify({value:NetStateType.NST_WIFI}));
        })
        window.addEventListener('offline', function(){
            funCallback(CrossType.LF_CHECK_NET_STATE,JSON.stringify({value:NetStateType.NST_NO}));
        })
        // if (navigator["connection"]!=null) {
        //     navigator["connection"]["onchange"] = (effectiveType:string)=>{
        //         if (navigator["connection"]["type"]!=null) {
        //             if (navigator["connection"]["type"]=="none") {
        //                 funCallback(CrossType.LF_CHECK_NET_STATE,{value:NetStateType.NST_NO});
        //             }else{
        //                 funCallback(CrossType.LF_CHECK_NET_STATE,{value:NetStateType.NST_WIFI});
        //             }
        //         }
        //     }
        // }
        
        // this.updateGpsLoc();
        // this.updateBatteryLevel();
    }

    
    private updateGpsLoc(){
        // GPS 
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position)=>{
                    this.gpsInfoCache = position.coords.latitude+","+position.coords.longitude;
                },
                (error)=>{
                    mlog.info("------------游戏gps:navigator.geolocation.getCurrentPosition err",error);
                },{
                    timeout : 5000,// 指定获取地理位置的超时时间，默认不限时，单位为毫秒  
                    maximumAge : 3000 // 最长有效期，在重复获取地理位置时，此参数指定多久再次获取位置。  
                }
            );
        }
    }

    private updateBatteryLevel(){
        if (!navigator || navigator["getBattery"]==null) {
            return;
        }
        let batteryPms = navigator["getBattery"]();
        batteryPms.then((battery)=>{
            this.batteryLevel = 1+Math.floor((Number.parseFloat(battery.level)*100-2)/33)
            if (battery["onlevelchange"]==null) {
                mlog.debug("onlevelchange == null");
                battery["onlevelchange"] = (aaa)=>{
                    this.batteryLevel = 1+Math.floor((Number.parseFloat(battery.level)*100-2)/33)
                }
            }
        });
    }





    supportPayList(): { [type: string]: number; } {
        let map:{ [type: string]: number; } = {}
        if(glb.isTest){
            map["type_"+ 1]=1;
            map["type_"+ 2]=1;
        }
        return map;
    }
    prePay(payType: any):Promise<string> {
        return new Promise((res,rej)=>{
            res(null);
        });
    }
    doPay(payType: number, gameOrderNum: string, centerOrderNum: string, price: number, otherParam: any, payId: number): string {
        return "此支付类型尚未实现";
    }
    doShare(params:{shareWxType:number,shareType:number,shareObjId:number,extData?:any,imgPath?:string,linkUrl?:string,title?:string,desc?:string,iconPath?:string}) {
        if(glb.isTest){
            this.funCallback(CrossType.LF_SHARE,JSON.stringify({
                suc:"true",
                cancel:"false",
                shareObjId:params.shareObjId,
            }));
        }else{
            PopMgr.tip("暂不支持web分享")
        }
    }
    checkNetState(): number {
        if (navigator.onLine!=null) {
            if (navigator.onLine) {
                return NetStateType.NST_WIFI;
            } else {
                return NetStateType.NST_NO;
            }
        }
        return NetStateType.NST_WIFI;
    }
    copyText(text: string): boolean {
        // try {
        //     var textArea = document.getElementById("_copy_clipBoard");
        //     if (textArea === null) {
        //         textArea = document.createElement("textarea");
        //         textArea.id = "_copy_clipBoard";
        //         textArea.textContent = text;
        //         document.body.appendChild(textArea);
        //     }
        //     textArea["select"]();
        //     const copySuc = document.execCommand('copy');
        //     document.body.removeChild(textArea);
        //     return copySuc;
        // } catch (err) {
        //     mlog.error("copyText error",err)
        //     return false;
        // }

        var input = text;
        const el = document.createElement('textarea');
        el.value = input;
        el.setAttribute('readonly', '');
        // el.style.contain = 'strict';
        el.style.position = 'absolute';
        el.style.left = '-9999px';
        el.style.fontSize = '12pt'; // Prevent zooming on iOS
        const selection = getSelection();
        var originalRange;
        if (selection.rangeCount > 0) {
            originalRange = selection.getRangeAt(0);
        }
        document.body.appendChild(el);
        el.select();
        el.selectionStart = 0;
        el.selectionEnd = input.length;

        var success = false;
        try {
            success = document.execCommand('copy');
        } catch (err) {}

        document.body.removeChild(el);

        if (originalRange) {
            selection.removeAllRanges();
            selection.addRange(originalRange);
        }
        return success;
    }
    getCopyText(res: (value?) => void, rej: (reason?) => void){
        res("");
    }
    getPowerLevel(): number {
        this.updateBatteryLevel();
        return this.batteryLevel;
    }
    checkGpsOpen(param:{needNow:boolean}) {
        // if (navigator.geolocation==null) {
        //     return false;
        // }
        // return true;
    }
    gpsReqOpen(){
        // return false;
    }
    getGpsLoc(): string {
        this.updateGpsLoc();
        return this.gpsInfoCache;
        
    }
    getDeviceVersion(): string {
        return "web";
    }
    makeShock() {
        navigator.vibrate(1000);
    }
    getNetLevel(): number {
        return 3;
    }
    getChannelAndCode(): ChannelBaseBean {
        return {channelSub:"def",plfm:"web",channel:"web",code:190822};
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
    checkSdkExist(sdkId:number,sdkName?:string):boolean {
        return false;
    }
    getDeviceId(): string {
        return "";
    }
    getStartMsg() {
        
    }
    userGameInfo(userInfo: any) {
        
    }
    sdkLogin(accountType?:number): void {
        PopMgr.tip("暂无可用的登录方式");
    }
}