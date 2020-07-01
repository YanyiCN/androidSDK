import CrossWeb from "../CrossWeb";
import glb from "../../../utils/glb";
import { EventType, PayType, AccountType } from "../../../define/Const";
import { CrossType, LoginRes } from "../base/CrossBase";
import mlog from "../../../utils/LogUtil";
import ChannelBaseBean from "../../entity/ChannelBean";
import PopMgr from "../../PopMgr";

let WEBXIAOMI_CONFIG_ID = 51

export default class CrossWebXiaomi extends CrossWeb{
    
    hy_wy_sdk:sdks.WebXiaomi = null;
    initAll(funCallback:Function){
        super.initAll(funCallback);
    }

    initXiaomi():Promise<void>{
        return new Promise<void>((resolve,reject)=>{
            // 初始化
            this.hy_wy_sdk = window["hy_wy_sdk"];
            this.hy_wy_sdk.ready({},()=>{
                resolve();
                // 监听事件
                glb.regEventLis(EventType.CROSS_GAME_HIDESHOW,this.onAppHideShow,this)
                //小米jsbridge 处理 屏幕显示
                document.addEventListener('JsBridgeResume', function () {
                    //开始播放
                    window["sound"]&&window["sound"].play();
                })
                //小米jsbridge 处理 息屏
                document.addEventListener('JsBridgePause', function () {
                    window["sound"]&&window["sound"].pause();
                })
                // 监听充值结果
                this.hy_wy_sdk.payResult((resStr:string)=>{
                    mlog.info("hy_wy_sdk.payResult:",resStr);
                    if (resStr == "success") {
                        this.funCallback(CrossType.LF_PAY,JSON.stringify({suc:"true",msg:"支付操作完成"}));
                    }else{
                        this.funCallback(CrossType.LF_PAY,JSON.stringify({suc:"false",msg:"支付失败"}));
                    }
                });
            })
        });
    }

    private onAppHideShow(show){
        if (show) {
            //暂停播放
            window["sound"]&&window["sound"].pause();
        }else{
            //开始播放
            window["sound"]&&window["sound"].play();
        }
    }

    supportPayList(): { [type: string]: number; } {
        let map:{ [type: string]: number; } = {}
        map["type_"+ PayType.PT_WEBXIAOMI]=WEBXIAOMI_CONFIG_ID;
        return map;
    }
    prePay(payType: any):Promise<string> {
        return new Promise<string>((res,rej)=>{
            if (payType == PayType.PT_WEBXIAOMI) {
                // 重新登录
                let param = this.hy_wy_sdk.getBaseData();
                res(JSON.stringify(param));
                return;
            }
            res(null);
        });
    }

    doPay(payType: number, gameOrderNum: string, centerOrderNum: string, price: number, otherParam: any, payId: number): string {
        if (payType == PayType.PT_WEBXIAOMI) {
            let otherJson = JSON.parse(otherParam);
            this.hy_wy_sdk.pay(otherJson)
            return;
        }
        return "此支付类型尚未实现";
    }

    sdkLogin(accountType?:number): void {
        if (!accountType) {
            accountType = AccountType.XIAOMI_H5;
        }
        if (accountType != AccountType.XIAOMI_H5) {
            PopMgr.tip("暂不支持这种登录方式:"+accountType)
            return;
        }
        let param = this.hy_wy_sdk.getBaseData();
        let pp = {
            suc:true,
            userName:param.userName,
            userImage:param.userImage,
            appAccountId:param.appAccountId,
            session:param.session,
            configId:WEBXIAOMI_CONFIG_ID
        }

        this.funCallback(
            CrossType.LF_SDK_LOGIN,
            LoginRes.buildSucStr(accountType, JSON.stringify(pp))
        )
    }

    getChannelAndCode(): ChannelBaseBean {
        return {channelSub:"def",plfm:"webxiaomi",channel:"webxiaomi",code:190822};
    }
}