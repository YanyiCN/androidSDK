import CrossBase, { CrossType, LoginRes } from "./base/CrossBase";
import { PayType, ShareType, ShareWxType, NetStateType, AccountType } from "../../define/Const";
import mlog from "../../utils/LogUtil";
import ChannelBaseBean from "../entity/ChannelBean";
import PopMgr from "../PopMgr";

let HUAWEI_SDK_CONFIG_ID = 52;
let HUAWEI_APP_ID="101133763"

export default class CrossHuawei implements CrossBase{

    private funCallback:Function;

    private hbs:sdks.HuaweiGame;

    private cacheShareObjId:number = null;
    private cacheShareTime:number= null;

    private cachePowerLevel:number = 3;
    private cacheNetType = 0;
    private gpsInfoCache:string;


    initAll(funCallback:Function){
        this.funCallback = funCallback;
        this.hbs = window["hbs"];

        this.hbs.onShow(()=>{
            funCallback(CrossType.LF_GAME_HIDESHOW,JSON.stringify({value:true}));
            this.hbs.showFloatWindow({
                appid:HUAWEI_APP_ID
            })

            this.handleShareResult();
            
        })
        this.hbs.onHide(()=>{
            funCallback(CrossType.LF_GAME_HIDESHOW,JSON.stringify({value:false}));
            this.hbs.hideFloatWindow({
                appid:HUAWEI_APP_ID
            })
        })

        this.hbs.onNetworkStatusChange((isConnected:boolean,networkType:string)=>{
            this.handleNetType(isConnected,networkType);
            funCallback(CrossType.LF_CHECK_NET_STATE,JSON.stringify({value:this.cacheNetType}));
        })
    }


    private updateGpsLoc(){
        this.hbs.getLocation({
            type: 'wgs84',
            altitude: "true",
            success: (res)=>{
                this.gpsInfoCache = JSON.stringify({
                    jin:res.longitude,
                    wei:res.latitude
                });
                this.funCallback(CrossType.LF_GPS_GET_LOC,JSON.stringify({value:this.gpsInfoCache}))
            }
        })
    }

    private handleNetType(isConnected:boolean,networkType:string){
        if (!isConnected) {
            this.cacheNetType = NetStateType.NST_NO
            return;
        }
        if (networkType =="wifi") {
            this.cacheNetType = NetStateType.NST_WIFI;
        }else if(!networkType || networkType =="none"){
            this.cacheNetType = NetStateType.NST_NO
        }else{
            this.cacheNetType = NetStateType.NST_NET;
        }
    }

    private updatePowerLevel(){
        this.hbs.getBatteryInfo({success:(ret)=>{
            let num = Number.parseInt(ret.level);
            if (num<=0) {
                num = 1;
            }else if(num>=99){
                num = 98;
            }
            num = Math.ceil(num/33)
            this.cachePowerLevel = num;
        }})
    }

    private handleShareResult(forceFail=false){
        if (this.cacheShareObjId != null && this.cacheShareTime!=null) {
            if (!forceFail && Date.now() - this.cacheShareTime >= 3000) {
                this.funCallback(CrossType.LF_SHARE,JSON.stringify({
                    suc:"true",
                    cancel:"false",
                    shareObjId:this.cacheShareObjId,
                }));
            }else{
                this.funCallback(CrossType.LF_SHARE,JSON.stringify({
                    suc:"false",
                    cancel:"false",
                    shareObjId:this.cacheShareObjId,
                    msg:"分享失败,请再次尝试"
                }));
            }
            this.cacheShareObjId = null;
            this.cacheShareTime = null;
        }
    }

    

    supportPayList(): { [type: string]: number; } {
        let map:{ [type: string]: number; } = {}
        map["type_"+ PayType.PT_H5_HUAWEI]=HUAWEI_SDK_CONFIG_ID;
        return map;
    }
    prePay(payType: any): Promise<string> {
        return new Promise<string>((res,rej)=>{
            res(null);
        });
    }
    doPay(payType: number, gameOrderNum: string, centerOrderNum: string, price: number, otherParam: any, payId: number): string {
        let otherJson = JSON.parse(otherParam);
        this.hbs.hwPay({
            orderInfo:otherJson,
            success:()=>{
                this.funCallback(CrossType.LF_PAY,JSON.stringify({suc:"true",msg:"支付操作完成"}));
            },
            fail:(erromsg, errocode)=>{
                this.funCallback(CrossType.LF_PAY,JSON.stringify({suc:"false",msg:"支付失败"}));
                mlog.error(`hbs.doPay error, res:${erromsg}, code:${errocode}`);
            }
        });
        return null;
    }
    doShare(params: { shareWxType: number; shareType: number; shareObjId: number; extData?: any; imgPath?: string; linkUrl?: string; title?: string; desc?: string; iconPath?: string; }) {
        let platform = "";
        if (params.shareWxType==ShareWxType.SHARE_FRIEND) {
            platform="WEIXIN";
        }else if (params.shareWxType==ShareWxType.SHARE_TIMELINE) {
            platform="WEIXIN_CIRCLE";
        }else{
            return;
        }
        let hwShareType = 0;
        if (params.shareType == ShareType.ST_IMG) {
            hwShareType=2;
        }else if (params.shareType == ShareType.ST_LINK) {
            hwShareType=0;
        }else{
            return;
        }
        this.hbs.serviceShare({
            shareType: hwShareType,
            title: params.title,
            summary: params.desc,
            imagePath: params.imgPath || params.iconPath,
            targetUrl: params.linkUrl,
            // mediaUrl: 'https://ss0.bdstatic.com/-0U0bnSm1A5BphGlnYG/cae-legoup-video-target/93be3d88-9fc2-4fbd-bd14-833bca731ca7.mp4',
            platforms: [platform],
            fail: (data, code)=> {
                this.handleShareResult(true);
            },
            cancel: ()=> {
                this.handleShareResult(true);
            }
        })

        this.cacheShareObjId = params.shareObjId;
        this.cacheShareTime = Date.now();
    }
    checkNetState(): number {
        this.hbs.getNetworkType({success:(res:{networkType})=>{
            this.handleNetType(true,res.networkType);
        }});
        
        return this.cacheNetType;
    }
    copyText(text: string): boolean {
        this.hbs.setClipboardData({data:text})
        return false;
    }
    getCopyText(res: (value?) => void, rej: (reason?) => void){
        this.hbs.getClipboardData({
            success:(data)=>{
                res(data.data);
            }
        })
    }
    getPowerLevel(): number {
        this.updatePowerLevel();
        return this.cachePowerLevel;
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
        this.updateGpsLoc();
        return this.gpsInfoCache;
    }
    getDeviceVersion(): string {
        return "";
    }
    makeShock() {
        this.hbs.vibrateLong({});
    }
    getNetLevel(): number {
        return 3;
    }
    getChannelAndCode(): ChannelBaseBean {
        return {channelSub:"def",plfm:"h5huawei",channel:"h5huawei",code:190822};
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
        if (!accountType) {
            accountType = AccountType.HUAWEI_H5;
        }
        if (accountType != AccountType.HUAWEI_H5) {
            PopMgr.tip("暂不支持这种登录方式:"+accountType)
            return;
        }
        this.hbs.gameLogin({
            forceLogin:1,
            appid:HUAWEI_APP_ID,
            success:(data:{playerId:string,displayName:string,playerLevel:number,isAuth:number,ts:string,gameAuthSign:string})=>{
                let pp = {
                    suc:true,
                    ...data,
                    configId:HUAWEI_SDK_CONFIG_ID
                }
                this.funCallback(
                    CrossType.LF_SDK_LOGIN,
                    LoginRes.buildSucStr(accountType, JSON.stringify(pp))
                )
            },
            fail:(res,code)=>{
                mlog.error(`hbs.gameLogin error, res:${res}, code:${code}`);
                this.funCallback(
                    CrossType.LF_SDK_LOGIN,
                    LoginRes.buildFailStr(res, accountType)
                )
            }
        });
    }
}