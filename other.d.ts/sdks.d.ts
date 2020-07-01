/**
 * @author meehu
 * @description 各种sdk的格式定义
 */
declare namespace sdks {
    /** 
     * Web h5 小米
     * @see https://dev.mi.com/console/doc/detail?pId=1777
     */
    export class WebXiaomi {
        /**
         * 初始化SDK[必接]
         * @param config  zIndex:控制SDK悬浮图标的显示层级，默认：9999,pin:吸附位置，0-左中，1-右中，默认：0
         * @param onReady sdk已经加载完成，可执行游戏的初始化逻辑
        */
        ready(config:{zIndex?:number,pin?:number},onReady:Function):void;

        /**
         * 获取当前基本参数[必接]
         * 游戏页面通过调用此接口获得基本参数
         */
        getBaseData():{userName:string,userImage:string,appAccountId:number,session:string};

        /** 重新加载[必接] */
        reload():void;

        /**
         * 调用支付
         * @param orderInfo 需要由游戏服务端生成的订单明细字符串，由下表中的基本参数，加上签名参数构成。参数使用URL编码成字符串
         */
        pay(orderInfo);

        /**
         * 接收支付结果
         * @param cb 回调函数，用于接收支付返回的参数'success'  'fail'
         */
        payResult(cb:(resStr:string)=>void);
    }



    /** 
     * 华为小游戏
     * @see https://developer.huawei.com/consumer/cn/service/hms/catalog/fastgameRuntime.html
     */
    export class HuaweiGame {
        /**
         * 游戏登录
         * @param object
         * forceLogin int	是	玩家未登录华为帐号或鉴权失败时，是否拉起登录页面。0不强制  1强制
                appid	string	是	在华为开发者联盟上创建快游戏后分配的唯一标识。获取方式请参见：创建华为快游戏中“获取APP ID”章节。
                success	Function	否	成功回调，code为0时表示成功。
                    其中data:
                        playerId	String	帐号ID，如果游戏不需要华为帐号的登录结果进行鉴权，那么当返回playgerId的时候就可以使用该值进入游戏。
                        displayName	String	用户的昵称。
                        playerLevel	integer	玩家等级。
                        isAuth	integer	当isAuth为1的时候，应用需要校验返回的参数鉴权签名。
                        ts	string	时间戳，用于鉴权签名校验。
                        gameAuthSign	string	鉴权签名。
                fail	Function	否	失败回调，返回失败原因。
                complete	Function	否	执行结束后的回调。
         */          
        gameLogin(object:{
            forceLogin:number,
            appid:string,
            success?:(data:{playerId:string,displayName:string,playerLevel:number,isAuth:number,ts:string,gameAuthSign:string})=>void,
            fail?:(data:string,code:number)=>void,
            complete?:()=>void,
        });

        /**
         * 显示游戏浮标
         * @param object 
         *  appid	string	是	在华为开发者联盟上创建快游戏后分配的唯一标识。获取方式请参见：创建华为快游戏中“获取APP ID”章节。
         */
        showFloatWindow(object:{
            appid:string,
            success?:()=>void, fail?:()=>void, complete?:()=>void
        });

        /**
         * 隐藏游戏浮标
         * @param object 
         * appid	string	是	在华为开发者联盟上创建快游戏后分配的唯一标识。获取方式请参见：创建华为快游戏中“获取APP ID”章节。
         */
        hideFloatWindow(object:{
            appid:string,
            success?:()=>void, fail?:()=>void, complete?:()=>void
        })

        /** */
        onShow(fun:Function);
        /** */
        onHide(fun:Function);

        /**
         * 华为支付
         * @param object
         *  orderInfo:订单信息json对象
         */
        hwPay(object:{
            orderInfo:string,
            success?:(ret)=>void, fail?:(erromsg, errocode)=>void, complete?:()=>void
        });


        /**
         * 通过系统分享，分享数据到其他app
         * @param object 
         *  type	string	是	数据的MIME TYPE,要求字母全小写。
            data	string	是	分享的数据。
                ● 如果type是text/开头的mimetype（如text/plain），则data是要分享的文本内容
                ● 如果type是其他值，则data是要分享的文件路径
                支持三种文件路径：
                ● 通过hbs.downloadFile下载的文件路径
                ● 通过文件管理器FileSystemManager对象保存文件或者读取目录文件列表获得的文件路径
                ● 以/开头的应用内部的资源文件
            success	Function	否	成功回调，因为大部分原生app都没有正确的返回分享状态，所以即使分享成功了，也可能执行cancel回调，而不是success回调。
            fail	Function	否	失败回调。
            cancel	Function	否	取消回调。
            complete	Function	否	执行结束后的回调。
         */
        systemShare(object:{
            type:string,
            data:string,
            success?:()=>void,
            fail?:()=>void,
            cancel?:()=>void,
            complete?:()=>void
        });


        serviceShare(object:{
            shareType:number,
            title:string,
            summary?:string,
            targetUrl?:string,
            imagePath?:string,
            mediaUrl?:string,
            platforms?:any[],
            success?:()=>void,
            fail?:(data, code)=>void,
            cancel?:()=>void
        });

        /**长震动 */
        vibrateLong(object:{success?:(ret)=>void, fail?:()=>void, complete?:()=>void});

        /**剪贴板 */
        getClipboardData(object:{success?:(ret:{data:string})=>void, fail?:()=>void, complete?:()=>void});

        /**剪贴板 */
        setClipboardData(object:{data:string,success?:()=>void, fail?:()=>void, complete?:()=>void});

        /**
         * 电量 uccess回调函数参数：
            level	String	设备电量，范围 1 – 100。
         * @param object 
         */
        getBatteryInfo(object:{success?:(ret:{level:string})=>void, fail?:()=>void, complete?:()=>void});


        /**
         * 获取网络类型
         * @param object 
         *  networkType	String	网络类型，详细取值请参见“networkType的合法值”。
         */
        getNetworkType(object:{success?:(ret:{networkType:string})=>void, fail?:()=>void, complete?:()=>void});

        /**
         * 监听网络状态回调
         * @param callback 
         */
        onNetworkStatusChange(callback:(isConnected:boolean,networkType:string)=>void);

 
        /**
         * 获取当前的地理位置、速度。
         * success回调函数参数：
            latitude	number	纬度，范围为 -90~90，负数表示南纬。
            longitude	number	经度，范围为 -180~180，负数表示西经。
            speed	number	速度，单位 m/s。
            accuracy	number	位置的精确度。
            altitude	number	高度，单位 m。
            verticalAccuracy	number	垂直精度，单位 m（系统无法获取，返回 0）。
            horizontalAccuracy	number	水平精度，单位 m。
         */
        getLocation(object:{
            type:string,
            altitude:string,
            success?:(ret:{
                latitude:number,
                longitude:number,
                speed:number,
                accuracy:number,
                altitude:number,
                verticalAccuracy:number,
                horizontalAccuracy:number})=>void, 
            fail?:()=>void, complete?:()=>void
        });
    }

    export class BaiduGame {
        
        onShow(call:(showObj:{
            scene:string,
            path:string,
            query:object,
            shareTicket:string,
            referrerInfo:{appId:string,extraData:object},
            entryType:string,
            appURL:string})=>void);
        onHide(call:()=>void);
        onError(call:(object:any)=>void);

        /**使手机发生较长时间的振动（400ms） */
        vibrateLong();


        /**
         * 获取当前的地理位置、速度。当用户离开智能小程序后，此接口无法调用。
         * @param obj 
         *  type	String	否	-	默认为 wgs84 返回 gps 坐标，可选 gcj02 。
            altitude	Boolean	否	-	传入 true 会返回高度信息，获取高度需要较高精度且需要打开 gps ，会很耗时，默认没有用 gps。
            success	Function	否	-	接口调用成功的回调函数，返回内容详见返回参数说明。
            fail	Function	否	-	接口调用失败的回调函数
            complete	Function	否	-	接口调用结束的回调函数（调用成功、失败都会执行）
         * 
         */
        getLocation(obj:{type:string,altitude:boolean,
            success:(res:{
                latitude:number,
                longitude:number,
                speed:number,
                accuracy,
                altitude,
                verticalAccuracy,
                horizontalAccuracy,
                street,
                cityCode,
                city,
                country,
                countryCode,
                province,
                streetNumber,
                district
            })=>void,
            fail?:()=>void,
            complete?:()=>void
        });


        /**
         * 获取网络类型
         * @param object 
         *  networkType	String	网络类型，值有 wifi/2g/3g/4g/unknown (Android 下不常见的网络类型)/none (无网络)。
         */
        getNetworkType(object:{success?:(ret:{networkType:string})=>void, fail?:()=>void, complete?:()=>void});

        /**
         * 监听网络状态回调
         * @param callback 
         */
        onNetworkStatusChange(callback:(res:{isConnected:boolean,networkType:string})=>void);


        /**
         * 支持在小程序内获取当前设备电量。
         * @param object 
         * level	string	设备电量， 范围为1-100
            isCharging	boolean	设备是否正在充电
         */
        getBatteryInfo(object:{success?:(res:{level:string,isCharging:boolean})=>void, fail?:()=>void, complete?:()=>void});


        /**
         * 获取系统剪贴板内容
         * @param object 
         */
        getClipboardData(object:{success?:(res:{data:string})=>void, fail?:()=>void, complete?:()=>void});

        /**
         * 设置系统剪贴板的内容
         * @param object 
         */
        setClipboardData(object:{data:string,success?:()=>void, fail?:()=>void, complete?:()=>void});


        /**
         * 
         * @param object 
         * code	String	用户登录凭证（有效期十分钟）,开发者需要在开发者服务器后台调用 api，使用 code 换取 session_key 等信息。
         */
        login(object:{timeout?:number,success?:(res:{code:string})=>void, fail?:(err:{errCode:number,errMsg:string})=>void, complete?:()=>void});


        /**
         * 百度收银台支付
         * @param object 
         * orderInfo 参数说明：

            参数	必填	说明
            dealId	是	跳转百度收银台支付必带参数之一，是百度收银台的财务结算凭证，与账号绑定的结算协议一一对应，每笔交易将结算到dealId对应的协议主体。详见核心参数获取与组装。
            appKey	是	支付能力开通后分配的支付appKey，用以表示应用身份的唯一ID，在应用审核通过后进行分配，一经分配后不会发生更改，来唯一确定一个应用。详见核心参数获取与组装。
            totalAmount	是	订单金额，单位为人民币分。
            tpOrderId	是	商户平台自己记录的订单ID，当支付状态发生变化时，会通过此订单ID通知商户。
            dealTitle	是	订单的名称
            signFieldsRange	是	固定值1
            rsaSign	是	对appKey+dealId+tpOrderId+totalAmount进行RSA加密后的签名，防止订单被伪造。签名过程见 签名与验签。
            bizInfo	是	订单详细信息，需要是一个可解析为JSON Object的字符串。字段内容见： bizInfo组装。

           bannedChannels 参数说明：

            channel	说明
            Alipay	支付宝
            BDWallet	百度钱包
            WeChat	微信支付
         */
        requestPolymerPayment(object:{orderInfo:any,bannedChannels?:string[],success?:()=>void, fail?:(err:{errCode:number,errMsg:string})=>void, complete?:()=>void});


        /**
         * 
         * @param object 
         *  title	String	否	-	分享标题
            content	String	否	-	分享内容
            imageUrl	String	否	-	分享图标
            path	String	否	-	页面 path ，必须是以 / 开头的完整路径。
         */
        openShare(object:{
            title:string,
            content:string,
            imageUrl:string,
            path:string,
            success?:()=>void, fail?:()=>void, complete?:()=>void
        });

        /**
         * 获取用户信息，首次使用的用户会弹出授权提示窗，若用户同意，则会返回用户的真实数据；若用户未登录或者拒绝授权，会返回默认用户“百度网友”及默认的头像地址。
         * @param object 
         */
        getUserInfo(object:{
            success?:(res:{
                userInfo:{
                    nickName:string,
                    avatarUrl:string,
                    gender:number
                },
                data:string,
                iv:string
            })=>void, fail?:(err:{errCode:number,errMsg:string})=>void, complete?:()=>void
        });

    }
}