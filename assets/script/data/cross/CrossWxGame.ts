import CrossBase, { CrossType, LoginRes } from "./base/CrossBase";
import mlog from "../../utils/LogUtil";
import { PayType, NetStateType, AccountType } from "../../define/Const";
import ViewUtil from "../../utils/ViewUtil";
import HttpUtil from "../../utils/HttpUtil";
import ChannelBaseBean from "../entity/ChannelBean";
import PopMgr from "../PopMgr";
import glb from "../../utils/glb";

let PAY_ERROR_MAP:{[code:string]:{show:string,info:string}} = {
    "-1"        :{info:"系统失败",show:"支付操作结果:系统失败"},
    "-2"        :{info:"支付取消",show:"支付取消"},
    "-15001"    :{info:"虚拟支付接口错误码，缺少参数",show:"支付异常:缺少参数"},
    "-15002"    :{info:"虚拟支付接口错误码，参数不合法",show:"支付异常:参数不合法"},
    "-15003"    :{info:"虚拟支付接口错误码，订单重复",show:"支付异常:订单重复"},
    "-15004"    :{info:"虚拟支付接口错误码，后台错误",show:"支付异常:后台错误"},
    "-15005"    :{info:"虚拟支付接口错误码，appId权限被封禁",show:"支付异常:appId权限被封禁"},
    "-15006"    :{info:"虚拟支付接口错误码，货币类型不支持",show:"支付异常:货币类型不支持"},
    "-15007"    :{info:"虚拟支付接口错误码，订单已支付",show:"支付异常:订单已支付"},
    "1"         :{info:"虚拟支付接口错误码，用户取消支付",show:"支付取消"},
    "2"         :{info:"虚拟支付接口错误码，客户端错误,判断到小程序在用户处于支付中时,又发起了一笔支付请求",show:"支付异常:多次请求"},
    "3"         :{info:"虚拟支付接口错误码，Android独有错误：用户使用GooglePlay支付，而手机未安装GooglePlay",show:"支付异常:未知原因"},
    "4"         :{info:"虚拟支付接口错误码，用户操作系统支付状态异常",show:"支付异常:状态错误"},
    "5"         :{info:"虚拟支付接口错误码，操作系统错误",show:"支付异常:操作系统错误"},
    "6"         :{info:"虚拟支付接口错误码，其他错误",show:"支付异常:其他错误"},
    "1000"      :{info:"参数错误",show:"支付异常:参数错误"},
    "1003"      :{info:"米大师Portal错误",show:"支付异常:米大师Portal错误"},
}

export default class CrossWxGame implements CrossBase{
    private funCallback:Function;
    private gpsInfoCache;
    private netWorkTypeCache = NetStateType.NST_WIFI;
    private cacheWxStartMsg:string = null;
    private cacheShareObjId:number = null;
    private cacheShareTime:number= null;
    private channelSub:string = "def";
    private channel:string = "wxggw"
    // private wxPayOrderList:{orderId:string,url:string,finish:boolean}[] = [];
    // private wxPayOrderListTimer = null;

    

    initAll(funCallback:Function){
        this.funCallback = funCallback;

        wx.onShow((res)=>{
            // PopMgr.tip(ComUtil.formatDate() + " wx.onShow")
            funCallback(CrossType.LF_GAME_HIDESHOW,JSON.stringify({value:true}));
            if (res.query!=null && res.query.extDataStr!=null) {
                let msgJsonStr = decodeURIComponent(res.query.extDataStr);
                this.saveStartMsgCache(msgJsonStr);
            }else{
                if (this.cacheShareObjId != null && this.cacheShareTime!=null) {
                    if (Date.now() - this.cacheShareTime >= 3000) {
                        funCallback(CrossType.LF_SHARE,JSON.stringify({
                            suc:"true",
                            cancel:"false",
                            shareObjId:this.cacheShareObjId,
                        }));
                    }else{
                        funCallback(CrossType.LF_SHARE,JSON.stringify({
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

            this.wxPayOrderUrlSend();
        });
        let launch = wx.getLaunchOptionsSync();
        if (launch && launch.query) {
            let query = launch.query
            // 获取⼴告channelSub
            let jych:string = query["jych"]
            if (jych && jych!="") {
                mlog.info("微信广告channelSub:",jych)
                this.channelSub = jych
            }
            let extDataStr:string = query["extDataStr"]
            if (extDataStr) {
                this.saveStartMsgCache(decodeURIComponent(extDataStr))
            }
        }

        wx.onHide(()=>{
            // PopMgr.tip(ComUtil.formatDate() + " wx.onShow")
            funCallback(CrossType.LF_GAME_HIDESHOW,JSON.stringify({value:false}));
        });

        // 网络状态切换
        wx.onNetworkStatusChange((res: {
            isConnected: boolean;
            networkType: string;
        })=>{
            if (!res.isConnected) {
                this.netWorkTypeCache = NetStateType.NST_NO;
                funCallback(CrossType.LF_CHECK_NET_STATE,JSON.stringify({value:NetStateType.NST_NO}));
            }else{
                if (res.networkType == "wifi") {
                    this.netWorkTypeCache = NetStateType.NST_WIFI;
                    funCallback(CrossType.LF_CHECK_NET_STATE,JSON.stringify({value:NetStateType.NST_WIFI}));
                }else if (res.networkType == "none") {
                    this.netWorkTypeCache = NetStateType.NST_NO;
                    funCallback(CrossType.LF_CHECK_NET_STATE,JSON.stringify({value:NetStateType.NST_NO}));
                }else {
                    this.netWorkTypeCache = NetStateType.NST_NET;
                    funCallback(CrossType.LF_CHECK_NET_STATE,JSON.stringify({value:NetStateType.NST_NET}));
                }
            }
        });

        wx.getNetworkType({
            success:(res)=>{
                if (res.networkType == "wifi") {
                    this.netWorkTypeCache = NetStateType.NST_WIFI;
                    funCallback(CrossType.LF_CHECK_NET_STATE,JSON.stringify({value:NetStateType.NST_WIFI}));
                }else if (res.networkType == "none") {
                    this.netWorkTypeCache = NetStateType.NST_NO;
                    funCallback(CrossType.LF_CHECK_NET_STATE,JSON.stringify({value:NetStateType.NST_NO}));
                }else {
                    this.netWorkTypeCache = NetStateType.NST_NET;
                    funCallback(CrossType.LF_CHECK_NET_STATE,JSON.stringify({value:NetStateType.NST_NET}));
                }
            }
        })
        // this.initWxPayOrderList();
    }
    
    private saveStartMsgCache(startMsg:string){
        if (startMsg!=null && startMsg!="") {
            this.cacheWxStartMsg = startMsg;
        }
    }
    
    private updateGpsLoc(){
        wx.getLocation({
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


    supportPayList(): { [type: string]: number; } {
        let map:{ [type: string]: number; } = {}
        map["type_"+ PayType.PT_WX_GAME]=56;
        return map;
    }
    prePay(payType: any):Promise<string> {
        return new Promise<string>((res,rej)=>{
            if (payType == PayType.PT_WX_GAME) {
                // 重新登录
                wx.login({
                    success:(loginRes)=>{
                        let finalStr = JSON.stringify({
                            zone_id:"1",
                            code:loginRes.code
                        });
                        res(finalStr);
                    },
                    fail(failRes){
                        rej(failRes);
                    }
                })
                return;
            }
            res(null);
        });
    }

    private getWxPayOrderUrlList(){
        let str:string = glb.getUserData("wxPayOrderList","string","")
        if (!str || str=="") {
            return [];
        }
        let list:string[] = JSON.parse(str);
        return list;
    }

    private saveWxPayOrderUrlList(list:string[]){
        let str = "";
        if (list.length>0) {
            str = JSON.stringify(list);
        }
        glb.setUserData("wxPayOrderList",str,"string")
    }

    private wxPayOrderUrlAdd(payUrl:string){
        let list:string[] = this.getWxPayOrderUrlList();
        for (const urlOne of list) {
            if (urlOne == payUrl) {
                return;
            }
        }
        list.push(payUrl);
        this.saveWxPayOrderUrlList(list);
    }

    private wxPayOrderUrlDel(payUrl:string){
        let list:string[] = this.getWxPayOrderUrlList();
        let newList:string[] = [];
        for (const urlOne of list) {
            if (urlOne != payUrl) {
                newList.push(urlOne);
            }
        }
        this.saveWxPayOrderUrlList(newList);
    }

    public wxPayOrderUrlSend(list?:string[],index?:number){
        if (list!=null && list.length == 0) {
            // 没有了就结束
            return;
        }
        if (!list) {
            list = this.getWxPayOrderUrlList();
            this.wxPayOrderUrlSend(list,0);
        }else{
            let url = list[index];
            // 调用回调
            HttpUtil.get({
                url:url,
                callback:(resStr,errMsg)=>{
                    if (errMsg) {
                        // 失败
                        mlog.debug(url,"error, res:",errMsg);
                        this.wxPayOrderUrlSend(list,index+1);
                        return;
                    }
                    // 成功就删掉
                    this.wxPayOrderUrlDel(url);
                    this.wxPayOrderUrlSend(list,index+1);
                }
            })
        }
    }

    doPay(payType: number, gameOrderNum: string, centerOrderNum: string, price: number, otherParam: any, payId: number): string {
        if (payType == PayType.PT_WX_GAME) {
            let otherJson = JSON.parse(otherParam);
            let cbcUrl = otherJson.wxGameClientCallback+"?orderId="+centerOrderNum;
            // 备份存着
            this.wxPayOrderUrlAdd(cbcUrl);
            // 调用支付
            wx.requestMidasPayment({
                mode:"game",	                    //string		是	支付的类型，不同的支付类型有各自额外要传的附加参数。    game	购买游戏币
                env:otherJson.env,	                //number	0	否	环境配置    0	米大师正式环境  1	米大师沙箱环境
                offerId:otherJson.offerId,	        //string		是	在米大师侧申请的应用 id
                currencyType:"CNY",	                //	string		是	币种
                platform:"android",	                //	string		否	申请接入时的平台，platform 与应用id有关。
                buyQuantity:Math.floor(otherJson.price/100),	//	number		否	购买数量。mode=game 时必填。购买数量。详见 buyQuantity 限制说明。
                zoneId:"1",	                        //	string	1	否	分区 ID
                success:(res)=>{
                    mlog.debug(" wx.requestMidasPayment.success",res);
                    // PopMgr.tip(ComUtil.formatDate() + " requestMidasPayment success")
                    this.funCallback(CrossType.LF_PAY,JSON.stringify({suc:"true",msg:"支付操作完成"}));
                    //
                    this.wxPayOrderUrlSend();
                },	                                //	function		否	接口调用成功的回调函数
                fail:(res)=>{
                    // PopMgr.tip(ComUtil.formatDate() + " requestMidasPayment fail")
                    mlog.debug(" wx.requestMidasPayment.fail",res);
                    let showErr = res.errMsg || "未知错误";
                    if (res.errCode && PAY_ERROR_MAP[res.errCode+""]) {
                        showErr = PAY_ERROR_MAP[res.errCode+""].show;
                    }
                    this.funCallback(CrossType.LF_PAY,JSON.stringify({suc:"false",msg:showErr}));
                    this.wxPayOrderUrlSend();
                },	                                //	function		否	接口调用失败的回调函数
                // complete:0,	//	function		否	接口调用结束的回调函数（调用成功、失败都会执行）
            })
            return;
        }
        return "此支付类型尚未实现";
    }

    /**
     * 微信成功回调（一直到访问成功为止）
     * @param cbcUrl 回调地址
     */
    private callWxPaySuc(cbcUrl:string){
        let funCallAgain = ()=>{
            this.callWxPaySuc(cbcUrl);
        }
        // 调用回调
        HttpUtil.get({
            url:cbcUrl,
            callback:(resStr,errMsg)=>{
                if (errMsg) {
                    // 失败  等0.5秒再来
                    mlog.debug(cbcUrl,"error, res:",errMsg);
                    setTimeout(funCallAgain,500);
                }
            }
        })
    }

    /**
     * 截取图片,并保存为临时文件
     * @param node 截取的节点,为空表示全部
     * @param funSuc 截取成功的回调
     */
    captureToTempFilePath(node:cc.Node,funSuc:(res?:{tempFilePath:string})=>void){
        let canvasSize = cc.view.getCanvasSize();
        let x = 0;
        let y = 0;
        let w  = canvasSize.width;
        let h  = canvasSize.height;
        if (node!=null) {
            let [left,top,width,height] = ViewUtil.getRealScreenInfo(node,canvasSize);
            x = left;
            y = top;
            w = width;
            h = height;
        }

        mlog.debug("captureToTempFilePath",x,y,w,h)
        
        cc.game.canvas["toTempFilePath"]({
            x: x,
            y: y,
            width: w,
            height: h,
            destWidth: 500,
            destHeight: 400,
            success:funSuc
        })
    }

    doShare(params:{shareWxType:number,shareType:number,shareObjId:number,extData?:any,imgPath?:string,linkUrl?:string,title?:string,desc?:string,iconPath?:string}) {
        let extData = params.extData || {}
        extData.soId = params.shareObjId;
        this.cacheShareObjId = params.shareObjId;
        this.cacheShareTime = Date.now();
        wx.shareAppMessage({
            title:params.title || "",
            imageUrl: params.imgPath || "",
            query:"extDataStr="+encodeURIComponent(JSON.stringify(extData))
        })
    }
    checkNetState(): number {
        return this.netWorkTypeCache;
    }
    copyText(text: string): boolean {
        wx.setClipboardData({
            data: text,
            success (res) {
              
            }
        })
        return true;
    }
    getCopyText(res: (value?) => void, rej: (reason?) => void){
        let text = "";
        wx.getClipboardData({
            success (msg){
                mlog.info(msg)
                text = msg.data;
                res(text);
            },
            fail(msg){
                mlog.info(msg)
                res("")
            }
        })
    }
    getPowerLevel(): number {
        let level = 1+Math.floor((Number.parseFloat(wx.getBatteryInfoSync().level)-2)/33)
        return level;
    }
    checkGpsOpen(param:{needNow:boolean}) {
        let lfRes:any = {
            needNow:param?param.needNow:false
        }
        wx.getSetting({
            success: (res) => {
                if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {//非初始化进入该页面,且未授权
                    lfRes.suc = false;
                    this.funCallback(CrossType.LF_GPS_CHECK_OPEN,JSON.stringify(lfRes));
                } else if (res.authSetting['scope.userLocation'] == undefined) {//初始化进入
                    lfRes.suc = false;
                    this.funCallback(CrossType.LF_GPS_CHECK_OPEN,JSON.stringify(lfRes));
                    this.updateGpsLoc();
                } else  { //授权后默认加载
                    lfRes.suc = true;
                    this.funCallback(CrossType.LF_GPS_CHECK_OPEN,JSON.stringify(lfRes));
                }
            },fail:(err)=>{
                mlog.debug("wx.getSetting",err);
                lfRes.suc = false;
                this.funCallback(CrossType.LF_GPS_CHECK_OPEN,JSON.stringify(lfRes));
            }
        })
        
    }
    gpsReqOpen(){
        wx.showModal({
            title: '是否授权当前位置',
            content: '需要获取您的地理位置，请确认授权，否则无法获取您所需数据',
            success: (res:{confirm:boolean,cancel:boolean})=> {
                if (res.confirm) {
                    wx.openSetting({
                        success: (dataAu)=>{
                            if (dataAu.authSetting["scope.userLocation"] == true) {
                                //再次授权，调用getLocationt的API
                                this.updateGpsLoc();
                                this.funCallback(CrossType.LF_GPS_SET_OPEN,JSON.stringify({value:true}));
                            } else {
                                this.funCallback(CrossType.LF_GPS_SET_OPEN,JSON.stringify({value:false}));
                            }
                        }
                    })
                }else{
                    this.funCallback(CrossType.LF_GPS_SET_OPEN,JSON.stringify({value:false}));
                }
            }
        });
    }
    getGpsLoc(): string {
        this.updateGpsLoc();
        return this.gpsInfoCache;
        
    }
    getDeviceVersion(): string {
        return "wxg1";//TODO
    }
    makeShock() {
        // wx.vibrateShort({});
        wx.vibrateLong({});
    }
    getNetLevel(): number {
        return 3;
    }
    getChannelAndCode(): ChannelBaseBean {
        return {channelSub:this.channelSub,plfm:"wxg",channel:this.channel,code:190822};
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
        if (this.cacheWxStartMsg!=null) {
            let xx = this.cacheWxStartMsg;
            this.cacheWxStartMsg = null;
            this.funCallback(CrossType.LF_GET_START_MSG,xx);
        }
    }
    userGameInfo(userInfo: any) {
        
    }

    wxGameLogin(btnNode:cc.Node,funSuc?:Function):any{
        let frameSize = cc.view.getFrameSize();
        let [left,top,width,height] = ViewUtil.getRealScreenInfo(btnNode,frameSize);

        let cfg:any = {
            type: 'text',
            text: "",
            image:"",
			style:{
                left: left,
                top: top,
                width: width,
                height: height,
                lineHeight: 0,
                // backgroundColor: '#000000',
                backgroundColor: '',
                color: '#ffffff',
                textAlign: 'center',
                fontSize: 16,
                borderRadius: 4
            }
        }
        let loginBtn = wx.createUserInfoButton(cfg)
        loginBtn.onTap((res) => {
            if(res.rawData){
                wx.login({
                    timeout:5000,
                    success:(loginRes)=>{
                        loginBtn.destroy();
                        if (funSuc!=null) {
                            funSuc();
                        }
                        
                        this.funCallback(
                            CrossType.LF_SDK_LOGIN,
                            LoginRes.buildSucStr(AccountType.WEIXIN_GAME,
                                JSON.stringify({
                                    wxAppId:"wxb80c412a7bebe3de",
                                    wxCode:loginRes.code,
                                    userInfo:JSON.stringify(res)
                                })
                            )
                        )
                    },
                    fail:(res)=>{
                        // this.funCallback(CrossType.LF_WXGAME_LOGIN,JSON.stringify({suc:false,msg:"未知异常:"+res}))
                    }
                })
            }else{
                // this.funCallback(CrossType.LF_WXGAME_LOGIN,JSON.stringify({suc:false,msg:"登录失败"}))
            }
        })
        return loginBtn;
    }

    sdkLogin(accountType?:number): void {
        PopMgr.tip("暂无可用的登录方式");
    }

    openWxKefu(){
        // wx.showModal({
        //     title: '即将前往客服会话',
        //     content: '',
        //     success: (res:{confirm:boolean,cancel:boolean})=> {
        //         if (res.confirm) {
                    
        //         }else{
        //             //
        //         }
        //     }
        // });
        wx.openCustomerServiceConversation({});
    }

    
}