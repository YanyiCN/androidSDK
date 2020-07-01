import ChannelBaseBean from "../../entity/ChannelBean";
//平台 sdk  各不同 各自桥梁
export default interface CrossBase{

    initAll(funCallback:Function);

    /** 获取支持的充值类型map*/
    supportPayList():{[type:string]:number};

    /**
     * 获取SDK预支付参数
     * @param payType 支付类型
     */
    prePay(payType):Promise<string>;

    /**
     * 调用支付
     * @param payType 支付类型
     * @param gameOrderNum 游戏订单号
     * @param centerOrderNum 充值中心订单
     * @param price 整数金额(分)
     * @param otherParam 其他参数
     * @param payId 充值项ID
     * 
     * @returns 返回为错误字符串
     */
    doPay(payType:number,gameOrderNum:string,centerOrderNum:string,price:number,otherParam:any,payId:number):string;

    /**
     * 调用分享
     * @param params 分享参数
     */
    doShare(params:{shareWxType:number,shareType:number,shareObjId:number,extData?:any,imgPath?:string,linkUrl?:string,title?:string,desc?:string,iconPath?:string});

    /** 获取网络状态*/ 
    checkNetState():number;

    /**
     * 复制文字
     * @returns 是否成功
     */
    copyText(text:string):boolean;
    /**获取粘贴板中的文字*/
    getCopyText(res: (value?) => void, rej: (reason?) => void);
    /** 获取电池电量 (1-3)*/
    getPowerLevel():number;
    /** GPS是否已开启*/
    checkGpsOpen(param:{needNow:boolean});
    /** GPS请求开启*/
    gpsReqOpen();
    /** GPS地址(返回JSON字符串)*/
    getGpsLoc():string;
    /** 获取手机硬件版本*/
    getDeviceVersion():string;
    /** 手机振动*/
    makeShock();
    /** 手机信号(0-3)*/
    getNetLevel():number;
    /** 获取包的渠道和编号*/
    getChannelAndCode():ChannelBaseBean;
    /** 推送编号(硬件ID,表示唯一)*/
    getPushToken():string;
    /** 调用sdk退出*/
    isExitBySdk():boolean;
    /** 调用登出*/
    logoutBySdk():boolean;
    /**
     * 检测SDK是否存在
     * @param sdkName sdkKey
     */
    checkSdkExist(sdkId:number,sdkName?:string):boolean;
    /** 获取设备硬件编码*/
    getDeviceId():string;

    /** 获取sdk中的启动消息(内部会发送事件)*/
    getStartMsg();
    /**
     * 上传用户游戏数据给SDK
     * @param userInfo 用户参数
     */
    userGameInfo(userInfo);


    /** 调起sdk登录*/
    sdkLogin(accountType:number):void;
}




export const  CrossType = {
    LF_INIT_CALLBACK:1,
    LF_SDK_LOGIN:2,
    LF_PAY:3,
    LF_CHECK_NET_STATE:4,
    LF_CHECK_POWER_LEVEL:5,
    LF_COPY_TEXT:6,
    LF_SUPPORT_PAY_LIST:7,
    LF_GPS_CHECK_OPEN:8,
    LF_GPS_SET_OPEN:9,
    LF_GPS_GET_LOC:10,
    LF_MAKE_SHOCK:11,
    LF_DEVICE_VERSION:12,
    LF_PRE_PAY :13,
    LF_NET_LEVEL:14,
    LF_SHARE:15,
    LF_GET_START_MSG:16,
    LF_CHANNEL_AND_CODE:17,
    LF_SYS_BACK_BTN:18,
    LF_GET_DEVICE_ID:19,
    LF_GET_PUSH_TOKEN:20,
    LF_PUSH_MSG:21,
    LF_GET_COPY_TXT:22,
    LF_EXIT_BY_SDK:24,
    LF_LOGOUT_BY_SDK:25,
    LF_SDK_EXIST:27, // 判读sdk是否存在
    LF_USER_GAME_INFO:28, // 获得用户游戏信息
    LF_GAME_HIDESHOW:29
}

export class LoginRes {
    suc:boolean;
    msg:string;
    accountType:number;
    accountParams:string;

    public static buildSucStr(accountType:number,accountParams:string):string{
        return JSON.stringify(this.buildSuc(accountType,accountParams))
    }
    private static buildSuc(accountType:number,accountParams:string):LoginRes{
        var res = new LoginRes();
        res.suc = true;
        res.msg = null;
        res.accountType = accountType;
        res.accountParams = accountParams;
        return res;
    }

    public static buildFailStr(errMsg="未知异常",accountType?:number):string{
        return JSON.stringify(this.buildFail(errMsg,accountType));
    }
    private static buildFail(errMsg="未知异常",accountType?:number):LoginRes{
        var res = new LoginRes();
        res.suc = false;
        res.msg = errMsg;
        res.accountType = accountType;
        res.accountParams = null;
        return res;
    }
}