import CrossBase, { CrossType, LoginRes } from "./base/CrossBase";
import { PayType, NetStateType, AccountType } from "../../define/Const";
import mlog from "../../utils/LogUtil";
import ChannelBaseBean from "../entity/ChannelBean";
import PopMgr from "../PopMgr";

let BAIDU_SDK_CONFIG_ID = 53

export default class CrossBaidu implements CrossBase{

    private funCallback:Function;

    private swan:sdks.BaiduGame;

    private cachePowerLevel:number = 3;
    private cacheNetType = 0;
    private gpsInfoCache:string;


    initAll(funCallback:Function){
        this.funCallback = funCallback;
        this.swan = window["swan"];
        this.swan.onShow((showObj:{
            scene:string,
            path:string,
            query:object,
            shareTicket:string,
            referrerInfo:{appId:string,extraData:object},
            entryType:string,
            appURL:string})=>{
                this.funCallback(CrossType.LF_GAME_HIDESHOW,JSON.stringify({value:true}));
            }
        );
        this.swan.onHide(()=>{
            this.funCallback(CrossType.LF_GAME_HIDESHOW,JSON.stringify({value:false}));
        });
    }
    

    supportPayList(): { [type: string]: number; } {
        let map:{ [type: string]: number; } = {}
        map["type_"+ PayType.PT_H5_BAIDU]=BAIDU_SDK_CONFIG_ID;
        return map;
    }
    prePay(payType: any): Promise<string> {
        return new Promise<string>((res,rej)=>{
            res(null);
        });
    }
    doPay(payType: number, gameOrderNum: string, centerOrderNum: string, price: number, otherParam: any, payId: number): string {
        let otherJson = JSON.parse(otherParam);
        this.swan.requestPolymerPayment({
            orderInfo:otherJson,
            success:()=>{
                this.funCallback(CrossType.LF_PAY,JSON.stringify({suc:"true",msg:"支付操作完成"}));
            },
            fail:(err:{errCode:number,errMsg:string})=>{
                this.funCallback(CrossType.LF_PAY,JSON.stringify({suc:"false",msg:err.errMsg}));
                mlog.error(`swan.requestPolymerPayment error, errCode:${err.errCode}, errMsg:${err.errMsg}`);
            }
        })

        return null;
    }
    doShare(params: { shareWxType: number; shareType: number; shareObjId: number; extData?: any; imgPath?: string; linkUrl?: string; title?: string; desc?: string; iconPath?: string; }) {
        // this.swan.openShare({
        //     title:params.title,
        //     content:params.desc,
        //     imageUrl:params.imgPath || params.iconPath,
        //     path
        // })
    }
    checkNetState(): number {
        this.swan.getNetworkType({success:(res:{networkType})=>{
            this.handleNetType(true,res.networkType);
        }});
        
        return this.cacheNetType;
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
    
    copyText(text: string): boolean {
        this.swan.setClipboardData({data:text})
        return true;
    }
    getCopyText(res: (value?) => void, rej: (reason?) => void){
        this.swan.getClipboardData({success:(data)=>{
            res(data.data);
        }})
    }

    private updatePowerLevel(){
        this.swan.getBatteryInfo({success:(ret)=>{
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

    private updateGpsLoc(){
        this.swan.getLocation({
            type: 'wgs84',
            altitude: false,
            success: (res)=>{
                this.gpsInfoCache = JSON.stringify({
                    jin:res.longitude,
                    wei:res.latitude
                });
                this.funCallback(CrossType.LF_GPS_GET_LOC,JSON.stringify({value:this.gpsInfoCache}))
            }
        })
    }
    getGpsLoc(): string {
        this.updateGpsLoc();
        return this.gpsInfoCache;
    }
    getDeviceVersion(): string {
        return "";
    }
    makeShock() {
        this.swan.vibrateLong();
    }
    getNetLevel(): number {
        return 3;
    }
    getChannelAndCode(): ChannelBaseBean {
        return {channelSub:"def",plfm:"h5baidu",channel:"h5baidu",code:190822};
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
            accountType = AccountType.BAIDU_H5;
        }
        if (accountType != AccountType.BAIDU_H5) {
            PopMgr.tip("暂不支持这种登录方式:"+accountType)
            return;
        }
        this.swan.login({
            success:(res:{code:string})=>{
                this.swan.getUserInfo({
                    success:(userInfoRes)=>{
                        let pp = {
                            suc:true,
                            code:res.code,
                            ...userInfoRes,
                            configId:BAIDU_SDK_CONFIG_ID
                        }
                        this.funCallback(
                            CrossType.LF_SDK_LOGIN,
                            LoginRes.buildSucStr(accountType, JSON.stringify(pp))
                        )
                    },
                    fail:(err: { errCode: number, errMsg: string})=>{
                        mlog.error(`swan.login error, errCode:${err.errCode}, errMsg:${err.errMsg}`);
                        this.funCallback(
                            CrossType.LF_SDK_LOGIN,
                            LoginRes.buildFailStr(err.errMsg, accountType)
                        )
                    }
                });
                
            },
            fail:(err:{errCode:number,errMsg:string})=>{
                mlog.error(`swan.login error, errCode:${err.errCode}, errMsg:${err.errMsg}`);
                this.funCallback(
                    CrossType.LF_SDK_LOGIN,
                    LoginRes.buildFailStr(err.errMsg, accountType)
                )
            }
        });
    }

}