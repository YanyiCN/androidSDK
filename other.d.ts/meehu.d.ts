declare namespace meehu {
    export class Gcloud {
        constructor();
        init(appId:string,appKey:string,userId:string): c;
        setNotify(
            funUploadFile:(code:number,filePath:string,fileId:string)=>void,
            funDownloadFile:(code:number,filePath:string,fileId:string)=>void,
            funPlayRecordedFile:(code:number,filePath:string)=>void,
            funApplyMessageKey:(code:number)=>void,
            funJoinRoom:(code:number,roomName:string,memberID:number)=>void,
            funQuitRoom:(code:number,roomName:string)=>void,
            funMemberVoice:(members:number,count:number)=>void,
            funSpeechToText:(code:number,fileId:string,result:string)=>void
        ): void;
        setMode(mode: number): number;
        applyMessageKey(msTimeout = 10000): number;
        startRecording(filePath: string): number;
        stopRecording(): number;
        uploadRecordedFile(filePath:string,msTimeout = 60000): number;
        downloadRecordedFile(fileId:string,filePath:string,msTimeout = 60000): number;
        playRecordedFile(filePath:string): number;
        stopPlayFile(): number;
        poll(): void;
        speechToText(fileId:string,msTimeout = 60000,language=0): number;

        setMicVolume(val:number): number;
        getMicLevel(fadeOut:boolean): number;
        getSpeakerLevel(): number;
        setSpeakerVolume(val:number): number;
        getFileParam(filePath:string): number[];
        captureMicrophoneData(bCapture:boolean): number;
    }

    export class Bugly{
        /** 设置应用的用户唯一标识 */
        static buglySetUserId(userId:string):void;
        /** 设置应用渠道标识 */
        static buglySetAppChannel(channel:string):void;
        /** 设置应用版本标识 */
        static buglySetAppVersion(version:string):void;

        /** 设置自定义标签，标签需预先在Bugly平台定义 */
        static buglySetTag(tag:number):void;
        /** 设置自定义Key-Value */
        static buglyAddUserValue(key:string,value:string):void;
        /** 记录日志
         *    @param level 日志级别 {Off=0, Error=1,Warning=2,Info=3,Debug=4,Verbose=5}
         *    @param tag   日志标签
         *    @param fmt   日志内容
         */
        static buglyLog(level:number,tag:string,msg:string):void;
    }


    export class Umeng{
        /** 初始化sdk
         @param void.
         @return .
         @exception .
         */
        
        static init():void;
        /** 设置是否打印sdk的log信息,默认不开启
         @param value 设置为true,umeng SDK 会输出log信息,记得release产品时要设置回false.
         @return .
         @exception .
         */
        
        static setLogEnabled(value:boolean):void;
        
        /** 设置是否在android 6.0下获取mac信息,默认不开启
         @param value 设置为true,umeng SDK 采集mac信息.
         @return .
         @exception .
         */
        
        static setCheckDevice(value:boolean):void;
        
        
        /** 设置app切到后台经过多少秒之后，切到前台会启动新session,默认30
         @param seconds 秒数
         @return .
         @exception .
         */
        static setSessionIdleLimit(seconds:number):void;
        
        /** 设置是否对日志信息进行加密, 默认false(不加密).
         @param value 设置为true, umeng SDK 会将日志信息做加密处理
         @return void.
         */
        static setEncryptEnabled(value:boolean):void;
        
        /** 设置app版本号。由于历史原因需要和xcode3工程兼容,友盟提取的是Build号(CFBundleVersion)，
         如果需要和App Store上的版本一致,请调用此方法。
         @param appVersion 版本号，例如设置成`XcodeAppVersion`.
         @return void.
         */
        ///---------------------------------------------------------------------------------------
        /// @name  事件统计
        ///---------------------------------------------------------------------------------------
        
        
        /** 自定义事件,数量统计.
         使用前，请先到友盟App管理后台的设置->编辑自定义事件 中添加相应的事件ID，然后在工程中传入相应的事件ID
         
         @param  eventId 网站上注册的事件Id.
         @param  label 分类标签。不同的标签会分别进行统计，方便同一事件的不同标签的对比,为NULL或空字符串时后台会生成和eventId同名的标签.
         @return void.
         */
        static event(eventId:string, label?:string):void;
        /** 自定义事件,数量统计.
         请注意：key不能含有“,”字符，value不能含有"|"字符
         这是因为不同shared library之间传递std对象可能引发兼容性问题，所以需要先将std对象转换成c语言的基本类型，
         在这里我会把eventDict转换成“k1,v1|k2,v2”形式的字符串
         
         使用前，请先到友盟App管理后台的设置->编辑自定义事件 中添加相应的事件ID，然后在工程中传入相应的事件ID
         */
        static event(eventId:string, attributes:any, counter:number):void;

        
        static event(eventId:string, attributes:any):void;
        ///---------------------------------------------------------------------------------------
        /// @name  页面计时
        ///---------------------------------------------------------------------------------------
        
        
        /** 页面时长统计,记录某个view被打开多长时间,可以自己计时也可以调用beginLogPageView,endLogPageView自动计时
         
         @param pageName 需要记录时长的view名称.
         @return void.
         */
        
        static beginLogPageView(pageName:string):void;
        static endLogPageView(pageName:string):void;
        /**
         * 设置属性 键值对 会覆盖同名的key
         * 将该函数指定的key-value写入专用文件；APP启动时会自动读取该文件的所有key-value，并将key-value自动作为后续所有track事件的属性。
         */
        static registerSuperProperty(property:any):void;
        
        /**
         *
         * 从专用文件中删除指定key-value
         @param propertyName
         */
        static unregisterSuperProperty(propertyName:string):void;
        
        /**
         * 返回专用文件中的所有key-value；如果不存在，则返回空。
         */
        static getSuperProperties():string;
        
        /**
         *清空专用文件中的所有key-value。
         */
        static clearSuperProperties():void;
        
        /**
         * 设置关注事件是否首次触发,只关注eventList前五个合法eventID.只要已经保存五个,此接口无效
         */
        static setFirstLaunchEvent(eventIdList:string[]):void;
        
        //游戏统计开始
        
        ///---------------------------------------------------------------------------------------
        /// @name  账号
        ///---------------------------------------------------------------------------------------
        
        /** active user sign-in.
         使用sign-In函数后，如果结束该PUID的统计，需要调用sign-Off函数
         @param puid : user's ID
         @param provider : 不能以下划线"_"开头，使用大写字母和数字标识; 如果是上市公司，建议使用股票代码。
         @return void.
         */
        static profileSignIn(puid:string, provider?:string):void;
        
        /** active user sign-off.
         停止sign-in PUID的统计
         @return void.
         */
        static profileSignOff():void;
        
        ///---------------------------------------------------------------------------------------
        /// @name  玩家属性设置
        ///---------------------------------------------------------------------------------------
        
        /** 设置玩家的等级、游戏中的唯一Id、性别、年龄和来源.
         */
        
        /** 设置玩家等级属性.
         @param level 玩家等级
         @return void
         */
        static setUserLevel(level:number):void;
        
        
        ///---------------------------------------------------------------------------------------
        /// @name  关卡统计
        ///---------------------------------------------------------------------------------------
        
        /** 记录玩家进入关卡，通过关卡及失败的情况.
         */
        
        
        /** 进入关卡.
         @param level 关卡
         @return void
         */
        static startLevel(level:string):void;
        
        /** 通过关卡.
         @param level 关卡,如果level == NULL 则为当前关卡
         @return void
         */
        static finishLevel(level:string):void;
        
        /** 未通过关卡.
         @param level 关卡,如果level == NULL 则为当前关卡
         @return void
         */
        
        static failLevel(level:string):void;
        
        ///---------------------------------------------------------------------------------------
        /// @name  支付统计
        ///---------------------------------------------------------------------------------------
        
        /** 记录玩家使用真实货币的消费情况
         */
        
        
        /** 玩家支付货币兑换虚拟币.
         @param cash 真实货币数量
         @param source 支付渠道
         @param coin 虚拟币数量
         @return void
         */
        
        static pay(cash:number, source:number, coin:number):void;
        
        /** 玩家支付货币购买道具.
         @param cash 真实货币数量
         @param source 支付渠道
         @param item 道具id
         @param amount 道具数量
         @param price 道具单价
         @return void
         */
        static pay(cash:number, source:number, item:string, amount:number, price:number):void;
        
        ///---------------------------------------------------------------------------------------
        /// @name  虚拟币购买统计
        ///---------------------------------------------------------------------------------------
        
        /** 记录玩家使用虚拟币的消费情况
         */
        
        
        /** 玩家使用虚拟币购买道具
         @param item 道具id
         @param amount 道具数量
         @param price 道具单价
         @return void
         */
        static buy(item:string, amount:number, price:number):void;
        
        
        ///---------------------------------------------------------------------------------------
        /// @name  道具消耗统计
        ///---------------------------------------------------------------------------------------
        
        /** 记录玩家道具消费情况
         */
        
        
        /** 玩家使用虚拟币购买道具
         @param item 道具id
         @param amount 道具数量
         @param price 道具单价
         @return void
         */
        
        static use(item:string, amount:number, price:number):void;
        
        
        ///---------------------------------------------------------------------------------------
        /// @name  虚拟币及道具奖励统计
        ///---------------------------------------------------------------------------------------
        
        /** 记录玩家获赠虚拟币及道具的情况
         */
        
        
        /** 玩家获虚拟币奖励
         @param coin 虚拟币数量
         @param source 奖励方式
         @return void
         */
        
        static bonus(coin:number, source:number):void;
        
        /** 玩家获道具奖励
         @param item 道具id
         @param amount 道具数量
         @param price 道具单价
         @param source 奖励方式
         @return void
         */
        
        static bonus(item:string, amount:number, price:number, source:number):void;
        
        /** 记录玩家交易兑换货币的情况
         @param currencyAmount 现金或等价物总额
         @param currencyType 为ISO4217定义的3位字母代码，如CNY,USD等（如使用其它自定义等价物作为现金，可使用ISO4217中未定义的3位字母组合传入货币类型）
         @param virtualAmount 虚拟币数量
         @param channel 支付渠道
         @param orderId 交易订单ID
         @return void
         */
        
        static exchange(orderId:string, currencyAmount:number, currencyType:string,virtualAmount:number,channel:number):void;
        //游戏统计结束
        
        /*如果使用,在启动sdk之前调用*/
        static setLatency(latency:number):void;
    }
}