import { Lobby } from "../proto/proto";

export const MCOLOR_DEF = cc.color(159, 98, 58);

export const MCOLOR_DEF_STR = "#9f623a";

/**glb.regEventLis 监听服务端消息类型 */
export const Mid = {

    //大厅-1

    //异常提示
    MID_SERVER_ERROR_RES: 5,

    //游戏静态配置
    MID_GAME_STATIC_CONFIG_REQ: 11,
    MID_GAME_STATIC_CONFIG_RES: 12,

    //登录
    MID_LOGIN_REQ: 21,
    MID_LOGIN_RES: 22,

    //发送验证码
    MID_VERIFICATION_CODE_REQ: 31,
    MID_VERIFICATION_CODE_RES: 32,

    //活动
    MID_ACTIVE_REQ: 41,
    MID_ACTIVE_RES: 42,

    //意见反馈
    MID_FEEDBACK_REQ: 51,
    MID_FEEDBACK_RES: 52,

    //邮件
    MID_MAIL_REQ: 61,
    MID_MAIL_RES: 62,

    //背包
    MID_PACKAGE_REQ: 71,
    MID_PACKAGE_RES: 72,

    //支付-现金
    MID_PAY_REQ: 81,
    MID_PAY_RES: 82,

    //排行榜
    MID_RANK_REQ: 91,
    MID_RANK_RES: 92,

    //用户数据（大厅）
    MID_USER_DATA_REQ: 101,
    MID_USER_DATA_RES: 102,

    //玩家游戏信息总览
    MID_USER_GAME_DATA_REQ: 111,
    MID_USER_GAME_DATA_RES: 112,

    //玩家认证
    MID_USER_REAL_REQ: 121,
    MID_USER_REAL_RES: 122,

    //游戏-2


    //心跳-3
    MID_HEART_BEAT_REQ: 131,
    MID_HEART_BEAT_RES: 132,

    //赛季荣耀
    MID_SEASON_REQ: 141,
    MID_SEASON_RES: 142,

    //用户信息修改
    MID_UPDATE_USER_REQ: 151,
    MID_UPDATE_USER_RES: 152,

    //装扮
    MID_SKIN_REQ: 161,
    MID_SKIN_RES: 162,

    //购买道具-钻石
    MID_PAY_PROP_REQ: 171,
    MID_PAY_PROP_RES: 172,
    //战绩
    MID_GAME_LOG_REQ: 181,
    MID_GAME_LOG_RES: 182,

    //VIP
    MID_VIP_REQ: 191,
    MID_VIP_RES: 192,

    //邀请有利
    MID_INVITE_REQ: 201,
    MID_INVITE_RES: 202,

    //断线重连
    MID_RE_CONNECTION_REQ: 211,
    MID_RE_CONNECTION_RES: 212,

    //广告
    MID_AD_REQ: 221,
    MID_AD_RES: 222,

};

/**消息类型1大厅2游戏3心跳包 */
export const MidType = {
    LOBBY: 1,
    GAME: 2,
    BEAT: 3
}

/**glb.sendMsg 发送服务端请求类型 */
export const MsgType = {
    // 共用部分
    ServerErrorRes: [Mid.MID_SERVER_ERROR_RES, Lobby.ServerErrorRes, MidType.LOBBY],

    LoginReq: [Mid.MID_LOGIN_REQ, Lobby.LoginReq, MidType.LOBBY, { autoCloseMsg: [Mid.MID_LOGIN_RES] }],
    LoginRes: [Mid.MID_LOGIN_RES, Lobby.LoginRes, MidType.LOBBY],

    ReConnectionReq: [Mid.MID_RE_CONNECTION_REQ, Lobby.ReConnectionReq, MidType.LOBBY, { autoCloseMsg: [Mid.MID_RE_CONNECTION_RES] }],
    ReConnectionRes: [Mid.MID_RE_CONNECTION_RES, Lobby.ReConnectionRes],

    VerificationCodeReq: [Mid.MID_VERIFICATION_CODE_REQ, Lobby.VerificationCodeReq, MidType.LOBBY],
    VerificationCodeRes: [Mid.MID_VERIFICATION_CODE_RES, Lobby.VerificationCodeRes, MidType.LOBBY],


    HeartBeatReq: [Mid.MID_HEART_BEAT_REQ, Lobby.HeartBeatReq, MidType.BEAT],
    HeartBeatRes: [Mid.MID_HEART_BEAT_RES, Lobby.HeartBeatRes, MidType.BEAT],

    UserRealReq: [Mid.MID_USER_REAL_REQ, Lobby.UserRealReq, MidType.LOBBY, { autoCloseMsg: [Mid.MID_USER_REAL_RES] }],
    UserRealRes: [Mid.MID_USER_REAL_RES, Lobby.UserRealRes],

    UpdateUserReq: [Mid.MID_UPDATE_USER_REQ, Lobby.UpdateUserReq, MidType.LOBBY],
    UpdateUserRes: [Mid.MID_UPDATE_USER_RES, Lobby.UpdateUserRes],

    SeasonReq: [Mid.MID_SEASON_REQ, Lobby.SeasonReq, MidType.LOBBY, { autoCloseMsg: [Mid.MID_SEASON_RES] }],
    SeasonRes: [Mid.MID_SEASON_RES, Lobby.SeasonRes],

    UserGameDataReq: [Mid.MID_USER_GAME_DATA_REQ, Lobby.UserGameDataReq, MidType.LOBBY, { autoCloseMsg: [Mid.MID_USER_GAME_DATA_RES] }],
    UserGameDataRes: [Mid.MID_USER_GAME_DATA_RES, Lobby.UserGameDataRes],

    GameStaticConfigReq: [Mid.MID_GAME_STATIC_CONFIG_REQ, Lobby.GameStaticConfigReq, MidType.LOBBY, { autoCloseMsg: [Mid.MID_GAME_STATIC_CONFIG_RES] }],
    GameStaticConfigRes: [Mid.MID_GAME_STATIC_CONFIG_RES, Lobby.GameStaticConfigRes],

    SkinReq: [Mid.MID_SKIN_REQ, Lobby.SkinReq, MidType.LOBBY, { autoCloseMsg: [Mid.MID_SKIN_RES] }],
    SkinRes: [Mid.MID_SKIN_RES, Lobby.SkinRes],

    MailReq: [Mid.MID_MAIL_REQ, Lobby.MailReq, MidType.LOBBY, { autoCloseMsg: [Mid.MID_MAIL_RES] }],
    MailRes: [Mid.MID_MAIL_RES, Lobby.MailRes],

    UserDataReq: [Mid.MID_USER_DATA_REQ, Lobby.UserDataReq, MidType.LOBBY, { autoCloseMsg: [Mid.MID_USER_DATA_RES] }],
    UserDataRes: [Mid.MID_USER_DATA_RES, Lobby.UserDataRes],

    UserGameLogReq: [Mid.MID_GAME_LOG_REQ, Lobby.UserGameLogReq, MidType.LOBBY, { autoCloseMsg: [Mid.MID_GAME_LOG_RES] }],
    UserGameLogRes: [Mid.MID_GAME_LOG_RES, Lobby.UserGameLogRes],

    RankReq: [Mid.MID_RANK_REQ, Lobby.RankReq, MidType.LOBBY, { autoCloseMsg: [Mid.MID_RANK_RES] }],
    RankRes: [Mid.MID_RANK_RES, Lobby.RankRes],

    FeedBackReq: [Mid.MID_FEEDBACK_REQ, Lobby.FeedbackReq, MidType.LOBBY, { autoCloseMsg: [Mid.MID_FEEDBACK_RES] }],
    FeedBackRes: [Mid.MID_FEEDBACK_RES, Lobby.FeedbackRes],

    PackageReq: [Mid.MID_PACKAGE_REQ, Lobby.PackageReq, MidType.LOBBY, { autoCloseMsg: [Mid.MID_PACKAGE_RES] }],
    PackageRes: [Mid.MID_PACKAGE_RES, Lobby.PackageRes],

    VipReq: [Mid.MID_VIP_REQ, Lobby.VipReq, MidType.LOBBY, { autoCloseMsg: [Mid.MID_VIP_RES] }],
    VipRes: [Mid.MID_VIP_RES, Lobby.VipRes],

    PayReq: [Mid.MID_PAY_REQ, Lobby.PayReq, MidType.LOBBY, { autoCloseMsg: [Mid.MID_PAY_RES] }],
    PayRes: [Mid.MID_PAY_RES, Lobby.PayRes],

    PayPropReq: [Mid.MID_PAY_PROP_REQ, Lobby.PayReq, MidType.LOBBY, { autoCloseMsg: [Mid.MID_PAY_PROP_RES] }],
    PayPropRes: [Mid.MID_PAY_PROP_RES, Lobby.PayRes],

    ActiveReq: [Mid.MID_ACTIVE_REQ, Lobby.ActiveReq, MidType.LOBBY, { autoCloseMsg: [Mid.MID_ACTIVE_RES] }],
    ActiveRes: [Mid.MID_ACTIVE_RES, Lobby.ActiveRes],

    AdReq: [Mid.MID_AD_REQ, Lobby.AdReq, MidType.LOBBY, { autoCloseMsg: [Mid.MID_AD_RES] }],
    AdRes: [Mid.MID_AD_RES, Lobby.AdRes],

    InviteReq: [Mid.MID_INVITE_REQ, Lobby.InviteReq, MidType.LOBBY, { autoCloseMsg: [Mid.MID_INVITE_RES] }],
    InviteRes: [Mid.MID_INVITE_RES, Lobby.InviteRes]


};

/**glb.sendEvent 发送游戏内部自定义事件类型 */
export const EventType = {
    //消息事件从1-9999
    //普通事件从10000开始
    NETWORK_CHANGE: 10000,
    REMOVE_SELF_BY_NAME: 10004,

    CROSS_SDK_LOGIN_RES: 10011,
    CROSS_SDK_PAY_RES: 10012,
    CROSS_WX_SHARE_RES: 10013,
    CROSS_WX_START_RES: 10014,
    CROSS_SYS_EXIT_BTN: 10015,
    CROSS_GPS_GET_DETAIL: 10016,
    CROSS_LOGOUT_BY_SDK: 10018,
    CROSS_NET_TYPE_CHANGE: 10031,
    CROSS_NET_LEVEL_CHANGE: 10032,
    SERVER_CONNECT_CHANGE: 10033,
    SERVER_DELAY_CHANGE: 10034,

    CROSS_GAME_HIDESHOW: 10036,
    CROSS_GPS_CHECK_OPEN: 10038,
    CROSS_GPS_REQ_OPEN: 10039,
    CROSS_GPS_GET_LOC: 10040,

    GAME_CHAT_FILE_START_END: 10050,

    LOADING_SCENE_NEED: 10060,
    LOADING_SCENE_FINISH: 10061,

    BACK_CLICK: 10070,
    LOADING_CON: 10071,
    NET_STATE_TIP: 10072,
    LOADING_MSG_NEED: 10073,
    LOADING_MSG_FINISH: 10074,

    LOGIN_SUCCEED: 10100,
    LOGIN_TOKEN_LOGIN_FAILED: 10101,

    UPDATE_USERINFO: 10102,

    REAL_USER_PHONE_SUCCEED: 10103,
    REAL_USER_IDCARD_SUCCEED: 10104,

    RESET_VALID_TIME: 10105,

    PROFILE_USERGAMEDATA: 10106,
    PROFILE_SEASON_LIST: 10107,

    CHANGE_NICK_NAME_SUCCEED: 10108,
    CHANGE_TITLE_SUCCEED: 10109,

    PROFILE_UPDATE_USED_SKIN_LIST: 10110,
    PROFILE_CHANGE_SKIN_SUCCEED: 10111,

    MAIL_UPDATE_LIST: 10112,
    MAIL_GET_AWARD_SUCCEED: 10113,
    MAIL_READ_DETAILS: 10114,

    DYNAMIC_DATA_UPDATE_MAIL: 10115,
    DYNAMIC_DATA_UPDATE_FEEDBACK: 10116,
    DYNAMIC_DATA_UPDATE_WELFARE: 10117,

    UPDATE_USER_MONEY: 10150,

    PROFILE_GAME_RECORD_LIST: 10151,

    UPDATE_USER_SKIN: 10152,

    RANKING_LIST: 10153,

    SET_FEEDBACK_LIST: 10154,
    SET_FEEDBACK_IDEA_SUCCEED: 10155,
    SET_FEEDBACK_READ: 10156,

    BAG_LIST: 10157,
    BAG_USE_PROP: 10158,
    BAG_FIND_PROP: 10159,

    SKIN_HEAD_CHANGE_SUCCEED: 10160,

    VIP_INIT_INFO: 10161,
    VIP_UPDATE_INFO: 10162,

    SHOP_GEM_PAY_PROP_SUCCEED: 10163,
    SHOP_GEM_PAY_SKIN_SUCCEED: 10164,
    SHOP_MONEY_PAY_SUCCEED: 10165,
    SHOP_MONEY_PAY_LOADING_CLOSE: 10166,

    WHATCH_AD_SUCCEED: 10167,

    ACTIVE_SIGNIN_UPDATE_INFO: 10168,
    ACTIVE_SIGNIN_TRIPLE_AWARD: 10169,
    ACTIVE_TASK_EVERYDAY_UPDATE_DATA: 10170,
    ACTIVE_TASK_CHALLENGE_UPDATE_DATA: 10171,
    ACTIVE_TASK_THREEDAYS_UPDATE_DATA: 10172,
    ACTIVE_TASK_GROWTH_UPDATE_DATA: 10173,
    ACTIVE_TASK_CHALLENGE_VIDEO_SUCCEED: 10174,
    ACTIVE_TASK_THREEDAYS_VIDEO_SUCCEED: 10175,
    ACTIVE_PROFITS_UPDATE_DATA: 10176,
    ACTIVE_LOGIN_SIGNIN_UPDATE_DATA: 10177,
    ACTIVE_BAICAISHEN_UPDATE_DATA: 10178,
    ACTIVE_PROFITS_VIDEO_SUCCEED: 10179,
    ACTIVE_CARNIVAL_UPDATE_DATA: 10180,
    ACTIVE_DAN_EVERYDAY_AWARD: 10181,

    UPDATE_DAN_INFO: 10250,
    UPDATE_INVITE_INFO: 10251,
    RED_POINT_UPDATE : 10252,

    LOGIN_DYNAMIC_DATA_SUCCEED: 10255,

    Cocos2dxJavascriptJavaBridge:10256,
};


/**预留场景类型 */
export const SceneType = {
    UNKNOWN_SCENE: "UNKNOWN_SCENE",
    UPDATE_SCENE: "UPDATE_SCENE",
    LOGO_SCENE: "LOGO_SCENE",
    LOBBY_SCENE: "LOBBY_SCENE",
    LOGIN_SCENE: "LOGIN_SCENE",
}

/**prefabs/pop/ */
export const PopLayer = {
    POP_TIP: 1,
    POP_ALERT: 2,
    POP_GET_AWARD: 3,
    POP_SELECT_LAYER: 10,
    POP_RE_ENTER: 20,
    LAYER_PAY_LOADING: 30,
    POP_DEBUG_FUN: 40,
    POP_LOGIN_PHONE: 100,
    POP_PROFILE_PANEL: 101,
    POP_SHOP: 102,
    POP_BAG: 103,
    POP_RANKING: 104,
    POP_SET: 105,
    POP_SET_ACCOUNT_SAFETY: 106,
    POP_SET_BIND_PHONE: 107,
    POP_SET_CERTIFICATION: 108,
    POP_SET_CHANGE_PHONE: 109,
    POP_SET_CONTACT_SERVICE: 110,
    POP_SET_FEEDBACK_DETAILS: 111,
    POP_SET_FEEDBACK: 112,
    POP_LOGIN_AGREEMENT: 113,
    POP_CHANGE_HEAD_PHOTO: 114,
    POP_CHANGE_NICK_NAME: 115,
    POP_MAIL: 116,
    POP_SHOP_BUY_PROP_TIP: 118,
    POP_VIP: 119,
    POP_DAILY_SIGNIN: 120,
    POP_DAILY_SIGNIN_TIP: 121,
    POP_SHOP_BUY_WAY: 122,
    POP_SHOP_PAY_LOADING: 123,
    POP_WATCH_AD: 124,
    POP_TASK: 125,
    POP_ACTIVE: 126,
    POP_WELFARE: 127,
    POP_CARNIVAL: 128,
    POP_WANFA: 129,
    POP_RANKING_EXPLAIN: 130,
    POP_PLAYING_METHOD: 131,
    POP_INVITE_GIFT: 132
}

export const NetStateType = {
    NST_NO: 0,
    NST_WIFI: 1,
    NST_NET: 2
}

export const GameChannel = [
    { name: "yyb", id: 5, sdkLogin: true, sdkAutoLogin: true, sdkLogout: false, editInfo: true },
    { name: "xiaomi", id: 6, sdkLogin: true, sdkAutoLogin: true, sdkLogout: false, editInfo: true },
    { name: "oppo", id: 7, sdkLogin: true, sdkAutoLogin: true, sdkLogout: false, editInfo: true },
    { name: "vivo", id: 8, sdkLogin: true, sdkAutoLogin: true, sdkLogout: false, editInfo: true },
    { name: "vivo_single", id: 11, sdkLogin: false, sdkAutoLogin: false, sdkLogout: false, editInfo: true },
    { name: "lenovo_sgl", id: 12, sdkLogin: false, sdkAutoLogin: false, sdkLogout: false, editInfo: false },
    { name: "huawei", id: 13, sdkLogin: true, sdkAutoLogin: true, sdkLogout: false, editInfo: true },
    { name: "baidu_sgl", id: 15, sdkLogin: true, sdkAutoLogin: true, sdkLogout: false, editInfo: true },
    { name: "meizu", id: 16, sdkLogin: true, sdkAutoLogin: true, sdkLogout: false, editInfo: true },
    { name: "qh360", id: 18, sdkLogin: true, sdkAutoLogin: true, sdkLogout: false, editInfo: true },
    { name: "meizu_sgl", id: 19, sdkLogin: false, sdkAutoLogin: false, sdkLogout: false, editInfo: false },
]

export const PayType = {
    PT_JFT_ALI: 9,
    PT_JFT_WX: 10,
    PT_ALI_H5: 20,
    PT_WX_GAME: 21,
    PT_WEBXIAOMI: 23,
    PT_H5_HUAWEI: 24,
    PT_H5_BAIDU: 25,
}

export const AccountType = {
    GUEST: 0,
    PHONE_NUM: 1,
    WEIXIN: 2,
    ACCOUNT: 3,
    // XIANLIAO : 4,
    WEIXIN_GAME: 5,
    // DUOLIAO : 6,
    // THIRD : 10

    YYB: 11,	//应用宝
    XIAOMI: 12,	//小米
    OPPO: 13,	//oppo
    VIVO: 14,	//vivo
    BAIDU: 15,	//百度
    MEIZU: 17,	//魅族
    HUAWEI: 18,	//华为
    MEIZU_SGL: 19,	//魅族单机
    XIAOMI_H5: 20,	//小米H5
    HUAWEI_H5: 21,	//华为H5
    BAIDU_H5: 22,	//百度H5
    ALIGAME: 23,	//阿里游戏
}

// 分享内容形式
export const ShareType = {
    ST_IMG: 1,
    ST_LINK: 2,
    ST_LINK_APP: 3,
    ST_TEXT: 4
}

// 分享场景类型
export const ShareWxType = {
    SHARE_FRIEND: 0,
    SHARE_TIMELINE: 1,
    SHARE_XIANLIAO: 2,
    SHARE_DUOLIAO: 3,
}


// 聊天类型
export const ChatType = {
    FIX_MSG: 0,
    TXT: 1,
    AUDIO: 2,
    GIF: 3,
    GIF_2_SEAT: 4,
    FACE_EFFECT: 5
}

//获取手机验证码类型
export const PhoneVerificationCodeType = {
    Login: 1,
    BIND: 2,
    CHANGE: 3
}

export const LoginType = {
    Visitor: 1,
    Phone: 2,
    WX: 3,
    Token: 4
}

/**服务端结果  0-失败，1-成功 */
export const ServerCode = {
    Failed: 0,
    Succeed: 1
}

/**用户认证 */
export const UserRealType = {
    Phone: 1,
    IDcard: 2
}

let msgTypeMap: { [mType: number]: any } = {}
for (const msgKey in MsgType) {
    const oneType = MsgType[msgKey];
    msgTypeMap[oneType[0]] = oneType[1];
}

export const MsgTypeMap = msgTypeMap;


export const UpdataUserInfoTpye = {
    NEWES_INFO: 1,
    CHANGE_NICKNAME: 2,
    UPLOAD_PHOTO: 3,
    USE_TITLE: 4,
    USER_MONEY: 5,
    CHANGE_NICKNAME_BYPROP: 6
}

/**游戏静态配置 */
export const GameStaticConfigType = {
    //大厅
    GAME_PROP_CONFIG: "game_prop_config",
    GAME_SKIN_CONFIG: "game_skin_config",
    USER_TITLE_CONFIG: "user_title_config",
    GAME_PUBLIC_CONFIG: "game_public_config",
    GAME_CLIENT_CONFIG: "game_client_config",
    GAME_PAY_CONFIG: "game_pay_config",
    VIP_CONFIG: "vip_config",
    TASK_CONFIG: "task_config",
    WELFARE_SIGNIN: "active_sign_in",
    ACTIVE_TASK_EVERYDAY: "active_task_everyday",
    ACTIVE_TASK_TIAOZHAN: "active_task_tiaozhan",
    ACTIVE_TASK_THREEDAY: "active_task_threeday",
    ACTIVE_TASK_CHENGZHANG: "active_task_chengzhang",
    LEVEL_EXP_CONFIG: "level_exp_config",
    ACTIVE_YIBENWANLI: "active_yibenwanli",
    ACTIVE_LOGIN: "active_login",
    ACTIVE_BAICAISHEN: "active_baicaishen",
    ACTIVE_CARNIVAL: "active_jianianhua",
    DAN_CONFIG: "dan_config",
    INVITE_CONFIG: "invite_config",
    //游戏
    GAME_WANFA: "game_wanfa_config"
}

/**用户动态数据 */
export const UserDynamicType = {
    Mail: 1,
    Feedback: 2,
    Welfare: 3,
    SignIn: 4
}

export const SendReqType = {
    List: 1,
    Other: 2
}

export const SendSeasonReqType = {
    List: 1,
    CurSeasonAward: 2,
    CurSeasonInfo: 3,
    LastSeasonAward: 4
}

export const SkinType = {
    Head: 1,
    Clock: 2,
    Bubble: 3
}

export const SendMailType = {
    List: 1,
    Award: 2,
    Details: 3
}

/**道具类型 */
export const PorpType = {
    NameCard: 8
}

/**奖励下发类型 */
export const AwardType = {
    Gold: 1,
    Gem: 2,
    Coupon: 3,
    Prop: 4,
    Skin: 5
}

/**商店购买类型 */
export const ShopType = {
    Gold: 1,
    Gem: 2,
    Prop: 3,
    HeadSkin: 4,
    ClickSkin: 5,
    BubbleSkin: 6
}
/**活动类型 */
export const ActiveType = {
    //一本万利
    YI_BEN_WAN_LI: 1,
    //拜财神活动
    BAI_CAI_SHEN: 2,
    //登录有礼
    LOGIN_GIFT: 3,
    //个人挑战
    GE_REN_TIAO_ZHAN: 4,
    //每日签到
    EVERY_SIGN_IN: 5,
    //每日任务
    EVERY_DAY_TASK: 6,
    //成长任务
    CHENG_ZHANG_TASK: 7,
    //挑战任务
    TIAO_ZHAN_TASK: 8,
    //三日任务
    THREE_DAY_TASK: 9,
    //嘉年华
    JIA_NIAN_HUA: 10,
    //看视频送钻石
    VIDEO_DET_GEM: 11,
    //每日工资
    DAN_EVERY_DAY_AWARD: 12
}

/**操作类型 */
export const ActiveHandleType = {
    //获取活动信息
    HANDLE_GET_INFO: 1,
    //领取活动奖励-一倍
    HANDLE_RECEIVE_REWARD: 2,
    //领取连续签到奖励
    HANDLE_RECEIVE_REWARD_CONTINUOUS_SIGNIN: 3,
    //看视频三倍奖励/嘉年华七日礼包
    HANDLE_RECEIVE_REWARD_VIDEO_TRIPLE: 4,
    //看视频补签
    HANDLE_RECEIVE_REWARD_VIDEO_RETROACTIVE: 5,
    //看视频二倍奖励
    HANDLE_RECEIVE_REWARD_VIDEO_DOUBLE: 6
}

/**操作类型 任务*/
export const ActiveTaskHandleType = {
    //获取活动信息
    HANDLE_GET_INFO: 1,
    //领取任务奖励
    HANDLE_TASK_GIFT: 2,
    //领取任务宝箱
    HANDLE_TASK_BOX: 3,
    //看视频刷新任务
    HANDLE_TASK_VIDEO: 4
}

//支付方式类型
export const PayWayType = {
    APPLE: 1,
    WX: 2,
    ZFB: 3
}

/**用户资金变化原因 */
export const UpdateUserReasonType = {
    //签到一倍奖励领取
    ORDINARY_SIGN_IN: "ordinary_sign_in"
}

/**
 * 活动任务领取状态
 */
export const TaskReceiveState = {
    NO_OPEN: -1,//未开启
    NO_COMPLETE: 0,//未完成
    YET_COMPLETE: 1,//已完成
    YET_RECEIVE: 2//已领取
}

/**活动奖励领取状态 0-未开启,1-开启未领取,2-已经领取*/
export const ActiveReceiveStatusType = {
    NO_OPEN: 0,
    NO_RECEIVE: 1,
    YET_RECEIVE: 2
}

/**房间玩法类型 */
export const GameWanfaType = {
    /**经典玩法 */
    Classic_Mode: "ddz3"
}


