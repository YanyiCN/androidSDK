import MyMgr from "../base/MyMgr";
import glb from "../utils/glb";
import { MsgType, Mid, EventType, LoginType, SceneType, UpdataUserInfoTpye, GameStaticConfigType, UserDynamicType, ServerCode, PopLayer, ActiveType, UpdateUserReasonType, SendSeasonReqType } from "../define/Const";
import CrossMgr from "./CrossMgr";
import GpsLocUtil from "../utils/gps/GpsLocUtil";
import mlog from "../utils/LogUtil";
import { Lobby } from "../proto/proto";
import PopMgr from "./PopMgr";
import UserInfo from "./entity/UserInfo";
import { userInfo } from "os";
import SceneMgr from "./SceneMgr";
import ComUtil from "../utils/ComUtil";
import FileUtil from "../utils/FileUtil";
import ProfileMgr from "./ProfileMgr";
import { UserDynamicData } from "./entity/UserData";
import BagMgr, { PackageType } from "./BagMgr";
import ShopMgr from "./ShopMgr";
import VipMgr from "./VipMgr";
import ActiveMgr from "./active/ActiveMgr";
import GameMgr from "./game/GameMgr";
import InviteMgr from "./InviteMgr";

class UserMgr extends MyMgr {
    openGps: boolean;    //gps开启
    gpsLoc: string;
    public initByLoad() {
        glb.regEventLis(Mid.MID_GAME_STATIC_CONFIG_RES, this.onNetGameStaticConfigRes, this);
        glb.regEventLis(Mid.MID_USER_DATA_RES, this.onUserDataRes, this);
        glb.regEventLis(Mid.MID_LOGIN_RES, this.onLoginRes, this);
        glb.regEventLis(Mid.MID_RE_CONNECTION_RES, this.onReConnectionRes, this)
        glb.regEventLis(Mid.MID_SERVER_ERROR_RES, this.onServerError, this);
        glb.regEventLis(Mid.MID_UPDATE_USER_RES, this.onUpdateUser, this);
        glb.regEventLis(EventType.SERVER_CONNECT_CHANGE, this.onServerConChange, this);
    }
    public initMgr() {
        this.openGps = true;
    }
    public uninitMgr() { }

    /**用户动态数据刷新 */
    private onUserDataRes(msg: Lobby.UserDataRes) {
        if (msg.config_list && msg.config_list.length > 0) {
            for (let i = 0; i < msg.config_list.length; i++) {
                let configType = msg.config_list[i].config_type;
                let configJson = msg.config_list[i].config_json;
                this.updateUserDynamicData(configType, configJson);
            }
        }
        //动态数据已获取-进入游戏
        glb.sendEvent(EventType.LOGIN_DYNAMIC_DATA_SUCCEED);
    }

    /**服务端游戏配置初始或变动本地存储*/
    private onNetGameStaticConfigRes(msg: Lobby.GameStaticConfigRes) {
        if (msg.config_list && msg.config_list.length > 0) {
            for (let i = 0; i < msg.config_list.length; i++) {
                let typeTitle = msg.config_list[i].config_type;
                let json = msg.config_list[i].config_str;
                let md5 = msg.config_list[i].config_md5;
                if (md5 && md5.length > 0) {
                    this.saveNetGameStaticToCache(typeTitle, json, md5);
                    if (!this.getIsInitMgr()) {
                        this.updateConfigMgrData(typeTitle, json);
                    }
                }
            }
        }
        if (this.getIsInitMgr()) {
            this.getAllConfigList();
        }
    }

    /**请求服务端游戏静态配置 */
    public getServerStaticConfig() {
        let configList: any[] = [];
        for (const key in GameStaticConfigType) {
            if (GameStaticConfigType.hasOwnProperty(key)) {
                const element = GameStaticConfigType[key];
                let configJson = this.loadNetGameStaticFromCache(element);
                let configItem = { config_type: element, config_md5: (configJson ? configJson.cfgMd5 : null) }
                configList.push(configItem);
            }
        }

        glb.sendMsg(MsgType.GameStaticConfigReq, {
            config_list: configList
        })
    }

    /**服务端游戏配置本地存储Mgr管理类分布数据储存*/
    private updateConfigMgrData(typeTitle, strJson) {
        if (typeTitle == GameStaticConfigType.GAME_PROP_CONFIG) {
            // 业务更新初始化
            let jsonObject = JSON.parse(strJson)
            BagMgr.setGamePropConfig(jsonObject.propList)
        } else if (typeTitle == GameStaticConfigType.GAME_SKIN_CONFIG) {
            let jsonObject = JSON.parse(strJson)
            ProfileMgr.setUserSkinHeadConfig(jsonObject.head);
            ProfileMgr.setUserSkinClockConfig(jsonObject.block);
            ProfileMgr.setUserSkinBubbleConfig(jsonObject.bubble);
        } else if (typeTitle == GameStaticConfigType.USER_TITLE_CONFIG) {
            let jsonObject = JSON.parse(strJson);
            ProfileMgr.setUserTitleConfig(jsonObject.titleList);
        } else if (typeTitle == GameStaticConfigType.GAME_PUBLIC_CONFIG) {
            let jsonObject = JSON.parse(strJson)
            ProfileMgr.setGameHeadImgUrlConfig(jsonObject.headImgUrlList)
        } else if (typeTitle == GameStaticConfigType.GAME_CLIENT_CONFIG) {
            let jsonObject = JSON.parse(strJson)

        } else if (typeTitle == GameStaticConfigType.GAME_PAY_CONFIG) {
            let jsonObject = JSON.parse(strJson);
            ShopMgr.setGamePayGoldConfig(jsonObject.payGoldList);
            ShopMgr.setGamePayGemConfig(jsonObject.payDiamondList);
            ShopMgr.setGamePayPropConfig(jsonObject.payPropList);
            ShopMgr.setGamePaySkinHeadConfig(jsonObject.payHeadSkinList);
            ShopMgr.setGamePaySkinClockConfig(jsonObject.payClockSkinList);
            ShopMgr.setGamePaySkinBubbleConfig(jsonObject.payBubbleSkinList);
            ShopMgr.setGamePayTypeConfig(jsonObject.payTypeList);
        } else if (typeTitle == GameStaticConfigType.VIP_CONFIG) {
            let jsonObject = JSON.parse(strJson)
            VipMgr.setVIPConfig(jsonObject.vipList)
        } else if (typeTitle == GameStaticConfigType.WELFARE_SIGNIN) {
            let jsonObject = JSON.parse(strJson)
            ActiveMgr.setActiveData(ActiveType.EVERY_SIGN_IN, jsonObject);
        } else if (typeTitle == GameStaticConfigType.ACTIVE_TASK_EVERYDAY) {
            let jsonObject = JSON.parse(strJson)
            ActiveMgr.setActiveData(ActiveType.EVERY_DAY_TASK, jsonObject);
        } else if (typeTitle == GameStaticConfigType.ACTIVE_TASK_TIAOZHAN) {
            let jsonObject = JSON.parse(strJson)
            ActiveMgr.setActiveData(ActiveType.TIAO_ZHAN_TASK, jsonObject);
        } else if (typeTitle == GameStaticConfigType.ACTIVE_TASK_THREEDAY) {
            let jsonObject = JSON.parse(strJson)
            ActiveMgr.setActiveData(ActiveType.THREE_DAY_TASK, jsonObject);
        } else if (typeTitle == GameStaticConfigType.ACTIVE_TASK_CHENGZHANG) {
            let jsonObject = JSON.parse(strJson)
            ActiveMgr.setActiveData(ActiveType.CHENG_ZHANG_TASK, jsonObject);
        } else if (typeTitle == GameStaticConfigType.TASK_CONFIG) {
            let jsonObject = JSON.parse(strJson)
            ActiveMgr.setTaskConfig(jsonObject.taskList)
        } else if (typeTitle == GameStaticConfigType.LEVEL_EXP_CONFIG) {
            let jsonObject = JSON.parse(strJson)
            ProfileMgr.setLevelExpConfig(jsonObject.levelExpList)
        } else if (typeTitle == GameStaticConfigType.ACTIVE_YIBENWANLI) {
            let jsonObject = JSON.parse(strJson)
            ActiveMgr.setActiveData(ActiveType.YI_BEN_WAN_LI, jsonObject);
        } else if (typeTitle == GameStaticConfigType.ACTIVE_LOGIN) {
            let jsonObject = JSON.parse(strJson)
            ActiveMgr.setActiveData(ActiveType.LOGIN_GIFT, jsonObject);
        } else if (typeTitle == GameStaticConfigType.ACTIVE_BAICAISHEN) {
            let jsonObject = JSON.parse(strJson)
            ActiveMgr.setActiveData(ActiveType.BAI_CAI_SHEN, jsonObject);
        } else if (typeTitle == GameStaticConfigType.ACTIVE_CARNIVAL) {
            let jsonObject = JSON.parse(strJson)
            ActiveMgr.setActiveData(ActiveType.JIA_NIAN_HUA, jsonObject);
        } else if (typeTitle == GameStaticConfigType.GAME_WANFA) {
            let jsonObject = JSON.parse(strJson)
            GameMgr.setGameWanfaCfg(jsonObject.goldWanfaList);
        } else if (typeTitle == GameStaticConfigType.DAN_CONFIG) {
            let jsonObject = JSON.parse(strJson)
            ProfileMgr.setDanConfig(jsonObject)
        } else if (typeTitle == GameStaticConfigType.INVITE_CONFIG) {
            let jsonObject = JSON.parse(strJson)
            InviteMgr.setInviteGiftConfig(jsonObject.inviteConfigList)
        }
    }

    /**本地json文件检测 */
    private loadNetGameStaticFromCache(cacheFileName: string): any {
        let path = ComUtil.formatStr("%sstaticCfgs/%s", FileUtil.getWritablePath(), cacheFileName)
        if (FileUtil.checkTxtFile(path)) {
            let cfgStr = FileUtil.readTxtFile(path)
            if (cfgStr && cfgStr != "") {
                return JSON.parse(cfgStr)
            }
            return null
        } else {
            return null
        }
    }

    /**初始-all配置表Mgr数据分发  */
    private getAllConfigList() {
        for (const key in GameStaticConfigType) {
            if (GameStaticConfigType.hasOwnProperty(key)) {
                const element = GameStaticConfigType[key];
                let configJson = this.loadNetGameStaticFromCache(element);
                this.updateConfigMgrData(element, configJson.cfgStr);
            }
        }
    }

    /**服务端游戏配置本地储存***   */
    private saveNetGameStaticToCache(cacheFileName, cfgStr, cfgMd5) {
        let path = ComUtil.formatStr("%sstaticCfgs/%s", FileUtil.getWritablePath(), cacheFileName)
        let cfg = {
            cfgStr: cfgStr,
            cfgMd5: cfgMd5
        }
        FileUtil.writeTxtFile(path, JSON.stringify(cfg))
    }

    /**判断是否为初始赋值Mgr 业务逻辑-配合优化本地储存配置表 */
    private getIsInitMgr(): boolean {
        let initTest = VipMgr.getVIPConfig();
        if (!initTest || initTest == null) {
            return true;
        }
        return false;
    }

    private onUpdateUser(msg: Lobby.UpdateUserRes) {
        let userInfo = this.getUserInfo();
        if (msg.user_info) {
            let user_info = msg.user_info;
            glb.setUserData("userId", msg.user_info.user_id, "int")
            glb.setUserData("loginToken", msg.user_info.login_token)
            userInfo.userId = user_info.user_id as number;
            userInfo.loginToken = user_info.login_token;
            userInfo.nickName = user_info.nick_name;
            userInfo.headImgUrl = user_info.head_img_url;
            userInfo.sex = user_info.sex;
            userInfo.coinA = user_info.coin_a as number;
            userInfo.coinB = user_info.coin_b as number;
            userInfo.coinC = user_info.coin_c as number;
            userInfo.level = user_info.level;
            userInfo.exp = user_info.exp as number;
            userInfo.vipLevel = user_info.vip_level;
            userInfo.vipExp = user_info.vip_exp as number;
            userInfo.titleId = user_info.title_id;
            userInfo.curGameServerId = user_info.cur_game_server_id;
            userInfo.curRoomUniqueId = user_info.cur_room_unique_id;
        }
        if (msg.user_other_info) {
            let user_other_info = msg.user_other_info;
            let UserOtherInfo = {
                mobile: user_other_info.mobile || "",
                mobileBindTime: (user_other_info.mobile_bind_time || 0) as number,
                idCard: user_other_info.id_card || "",
                modifyNickName: user_other_info.modify_nick_name || 0,
                firstTixian: user_other_info.first_tixian || 0,
                titles: user_other_info.titles || [],
            }
            userInfo.UserOtherInfo = UserOtherInfo;
        }

        if (msg.user_use_prop_info) {
            let user_use_prop_info = msg.user_use_prop_info;
            let UserUsePropInfo = {
                headSkinJson: ComUtil.jsonParse(user_use_prop_info.head_skin_json),
                clockSkinJson: ComUtil.jsonParse(user_use_prop_info.clock_skin_json),
                bubbleSkinJson: ComUtil.jsonParse(user_use_prop_info.bubble_skin_json),
                propJson: ComUtil.jsonParse(user_use_prop_info.prop_json),
            }
            userInfo.UserUsePropInfo = UserUsePropInfo;
        }


        if (msg.handle_type == UpdataUserInfoTpye.CHANGE_NICKNAME ||
            msg.handle_type == UpdataUserInfoTpye.CHANGE_NICKNAME_BYPROP) {
            glb.sendEvent(EventType.CHANGE_NICK_NAME_SUCCEED, { showTxt: msg.show_json });
        } else if (msg.handle_type == UpdataUserInfoTpye.USE_TITLE) {
            glb.sendEvent(EventType.CHANGE_TITLE_SUCCEED, { showTxt: msg.show_json });
        } else if (msg.handle_type == UpdataUserInfoTpye.UPLOAD_PHOTO) {

        } else if (msg.handle_type == UpdataUserInfoTpye.USER_MONEY) {
            glb.sendEvent(EventType.UPDATE_USER_MONEY);
            // PopMgr.tip("奖励已发放请核实");
            if (msg.show_json && msg.show_json.length > 0) {
                if (msg.reason_type == UpdateUserReasonType.ORDINARY_SIGN_IN) {
                    let node = null;
                    cc.loader.loadRes("prefabs/node/OrdinarySignInNode", (err, res) => {
                        node = cc.instantiate(res)
                        PopMgr.showPop(PopLayer.POP_GET_AWARD, ComUtil.jsonParse(msg.show_json), { anyClose: false, nodeExtra: node });
                    })
                } else {
                    PopMgr.showPop(PopLayer.POP_GET_AWARD, ComUtil.jsonParse(msg.show_json));
                }
            }
        } else {
            // 用户信息刷新 NEWES_INFO
            if (msg.user_use_prop_info) {
                glb.sendEvent(EventType.UPDATE_USER_SKIN);
            } else {
                glb.sendEvent(EventType.UPDATE_USERINFO);
            }
        }
    }

    private onLoginRes(msg?: Lobby.LoginRes) {
        if (msg.code == ServerCode.Succeed) {
            mlog.info("登录成功")
            glb.setUserData("userId", msg.user_info.user_id, "int")
            glb.setUserData("loginToken", msg.user_info.login_token)
            BagMgr.sendPackageReq(PackageType.List);
            let userInfo = this.getUserInfo();
            if (msg.user_info) {
                let user_info = msg.user_info;
                userInfo.userId = user_info.user_id as number;
                userInfo.loginToken = user_info.login_token;
                userInfo.nickName = user_info.nick_name;
                userInfo.headImgUrl = user_info.head_img_url;
                userInfo.sex = user_info.sex;
                userInfo.coinA = user_info.coin_a as number;
                userInfo.coinB = user_info.coin_b as number;
                userInfo.coinC = user_info.coin_c as number;
                userInfo.level = user_info.level;
                userInfo.exp = user_info.exp as number;
                userInfo.vipLevel = user_info.vip_level;
                userInfo.vipExp = user_info.vip_exp as number;
                userInfo.titleId = user_info.title_id;
                userInfo.address = msg.address || "上海市普陀区";
                userInfo.curGameServerId = user_info.cur_game_server_id;
                userInfo.curRoomUniqueId = user_info.cur_room_unique_id;
            }

            if (msg.user_other_info) {
                let user_other_info = msg.user_other_info;
                let UserOtherInfo = {
                    mobile: user_other_info.mobile || "",
                    mobileBindTime: (user_other_info.mobile_bind_time || 0) as number,
                    idCard: user_other_info.id_card || "",
                    modifyNickName: user_other_info.modify_nick_name || 0,
                    firstTixian: user_other_info.first_tixian || 0,
                    titles: user_other_info.titles || [],
                }
                userInfo.UserOtherInfo = UserOtherInfo;
            } else {
                userInfo.UserOtherInfo = {
                    mobile: "",
                    mobileBindTime: 0,
                    idCard: "",
                    modifyNickName: 0,
                    firstTixian: 0,
                    titles: []
                }
            }

            if (msg.user_use_prop_info) {
                let user_use_prop_info = msg.user_use_prop_info;
                let UserUsePropInfo = {
                    headSkinJson: ComUtil.jsonParse(user_use_prop_info.head_skin_json),
                    clockSkinJson: ComUtil.jsonParse(user_use_prop_info.clock_skin_json),
                    bubbleSkinJson: ComUtil.jsonParse(user_use_prop_info.bubble_skin_json),
                    propJson: ComUtil.jsonParse(user_use_prop_info.prop_json),
                }
                userInfo.UserUsePropInfo = UserUsePropInfo;
            } else {
                userInfo.UserUsePropInfo = {
                    headSkinJson: ComUtil.jsonParse(""),
                    clockSkinJson: ComUtil.jsonParse(""),
                    bubbleSkinJson: ComUtil.jsonParse(""),
                    propJson: ComUtil.jsonParse(""),
                }
            }
            this.sendUserDataReq([UserDynamicType.Mail, UserDynamicType.Feedback, UserDynamicType.SignIn, UserDynamicType.Welfare]);
            // glb.sendEvent(EventType.LOGIN_SUCCEED);
        } else if (msg.code == 2) {
            glb.sendEvent(EventType.LOGIN_TOKEN_LOGIN_FAILED);
            PopMgr.alert(msg.message);
        } else if (msg.code == ServerCode.Failed) {
            mlog.info("登录失败")
            glb.sendEvent(EventType.LOGIN_TOKEN_LOGIN_FAILED);
            PopMgr.alert(msg.message);
        }
    }


    private onReConnectionRes(msg: Lobby.ReConnectionRes) {
        if (msg.code == ServerCode.Succeed) {
            mlog.info("重连成功")
            glb.setUserData("userId", msg.user_info.user_id, "int")
            glb.setUserData("loginToken", msg.user_info.login_token)
            BagMgr.sendPackageReq(PackageType.List);
            let userInfo = this.getUserInfo();
            if (msg.user_info) {
                let user_info = msg.user_info;
                userInfo.userId = user_info.user_id as number;
                userInfo.loginToken = user_info.login_token;
                userInfo.nickName = user_info.nick_name;
                userInfo.headImgUrl = user_info.head_img_url;
                userInfo.sex = user_info.sex;
                userInfo.coinA = user_info.coin_a as number;
                userInfo.coinB = user_info.coin_b as number;
                userInfo.coinC = user_info.coin_c as number;
                userInfo.level = user_info.level;
                userInfo.exp = user_info.exp as number;
                userInfo.vipLevel = user_info.vip_level;
                userInfo.vipExp = user_info.vip_exp as number;
                userInfo.titleId = user_info.title_id;
                userInfo.address = msg.address || "上海市普陀区";
                userInfo.curGameServerId = user_info.cur_game_server_id;
                userInfo.curRoomUniqueId = user_info.cur_room_unique_id;
            }

            if (msg.user_other_info) {
                let user_other_info = msg.user_other_info;
                let UserOtherInfo = {
                    mobile: user_other_info.mobile || "",
                    mobileBindTime: (user_other_info.mobile_bind_time || 0) as number,
                    idCard: user_other_info.id_card || "",
                    modifyNickName: user_other_info.modify_nick_name || 0,
                    firstTixian: user_other_info.first_tixian || 0,
                    titles: user_other_info.titles || [],
                }
                userInfo.UserOtherInfo = UserOtherInfo;
            } else {
                userInfo.UserOtherInfo = {
                    mobile: "",
                    mobileBindTime: 0,
                    idCard: "",
                    modifyNickName: 0,
                    firstTixian: 0,
                    titles: []
                }
            }

            if (msg.user_use_prop_info) {
                let user_use_prop_info = msg.user_use_prop_info;
                let UserUsePropInfo = {
                    headSkinJson: ComUtil.jsonParse(user_use_prop_info.head_skin_json),
                    clockSkinJson: ComUtil.jsonParse(user_use_prop_info.clock_skin_json),
                    bubbleSkinJson: ComUtil.jsonParse(user_use_prop_info.bubble_skin_json),
                    propJson: ComUtil.jsonParse(user_use_prop_info.prop_json),
                }
                userInfo.UserUsePropInfo = UserUsePropInfo;
            } else {
                userInfo.UserUsePropInfo = {
                    headSkinJson: ComUtil.jsonParse(""),
                    clockSkinJson: ComUtil.jsonParse(""),
                    bubbleSkinJson: ComUtil.jsonParse(""),
                    propJson: ComUtil.jsonParse(""),
                }
            }
            this.sendUserDataReq([UserDynamicType.Mail, UserDynamicType.Feedback, UserDynamicType.SignIn, UserDynamicType.Welfare]);
            // glb.sendEvent(EventType.LOGIN_SUCCEED);
        } else if (msg.code == 2) {
            glb.sendEvent(EventType.LOGIN_TOKEN_LOGIN_FAILED);
            PopMgr.alert(msg.message);
        } else if (msg.code == ServerCode.Failed) {
            mlog.info("登录失败")
            glb.sendEvent(EventType.LOGIN_TOKEN_LOGIN_FAILED);
            PopMgr.alert(msg.message);
        }
    }

    /**更新用户动态数据 */
    private updateUserDynamicData(configType: number, configJson: string) {
        if (!configJson || configJson.length <= 0) return;
        switch (configType) {
            case UserDynamicType.Mail:
                UserDynamicData.receiveMail = Number.parseInt(configJson);
                glb.sendEvent(EventType.DYNAMIC_DATA_UPDATE_MAIL);
                break;

            case UserDynamicType.Feedback:
                UserDynamicData.receiveFeedback = Number.parseInt(configJson);
                glb.sendEvent(EventType.DYNAMIC_DATA_UPDATE_FEEDBACK);
                break;

            case UserDynamicType.SignIn:
                ActiveMgr.setActiveData(ActiveType.EVERY_SIGN_IN, null, JSON.parse(configJson));
                break;
            case UserDynamicType.Welfare:
                let test = JSON.parse(configJson)
                // ActiveMgr.setActiveData(ActiveType.EVERY_SIGN_IN, null, JSON.parse(configJson));
                break;
            default:
                break;
        }
    }

    //code 0普通弹框  1未登录
    private onServerError(msg: Lobby.ServerErrorRes) {
        if (msg.error_code == 0) {
            PopMgr.alert(msg.error_msg);
        } else if (msg.error_code == 1) {
            this.onServerConChange(true);
        }
    }

    /**更新用户信息 */
    public sendReqUpdateUser(handleType: number, handleValue: string) {
        glb.sendMsg(MsgType.UpdateUserReq, {
            handle_type: handleType,
            handle_value: handleValue
        })
    }

    /**用户登录 */
    public sendReqServerLogin(loginType: number, accountParamStr: string = "") {
        glb.sendMsg(MsgType.LoginReq, {
            login_type: loginType,
            account_params: accountParamStr,
            client_info: this.createClientInfo()
        });
    }

    /**客户端信息 */
    private createClientInfo() {
        return {
            gps_loc: this.getGpsLoc(),
            version: this.getVersion(),
            device_type: this.getDeviceType(),
            channel: glb.ch.channel || "",
        }
    }

    /**用户GPS信息 */
    public getGpsLoc() {
        if (!this.openGps) {
            this.gpsLoc = "";
            return this.gpsLoc;
        }

        let loc = CrossMgr.getGpsLoc()
        if (loc && loc != "") {
            let locJson
            try {
                locJson = JSON.parse(loc)
                if (locJson && (cc.sys.platform == cc.sys.IPHONE || cc.sys.platform == cc.sys.IPAD)) {
                    locJson = GpsLocUtil.gcj_encrypt(Number.parseFloat(locJson.wei), Number.parseFloat(locJson.jin))
                }
            } catch (error) {
                mlog.error("loc err", loc, error)
            }

            if (locJson) {
                this.gpsLoc = locJson.jin + "," + locJson.wei
            }
        }
        return this.gpsLoc || ""
    }

    /**客户端版号 */
    public getVersion() {
        let deviceVersion = CrossMgr.getDeviceVersion()
        return glb.clientVersion + deviceVersion
    }

    /**设备类型 */
    private getDeviceType() {
        if (cc.sys.os == cc.sys.OS_IOS) {
            return 2
        } else if (cc.sys.os == cc.sys.OS_ANDROID) {
            return 1
        } else if (cc.sys.os == cc.sys.OS_WINDOWS) {
            return 3
        }
    }


    public tokenLogin(): boolean {
        let loginToken = glb.getUserData("loginToken")
        let userId = glb.getUserData("userId", "int")
        if (userId == null || userId == 0
            || !loginToken || loginToken == "") {
            return false
        }
        return true
    }

    public getUserInfo() {
        return UserInfo.getInstance();
    }

    public getOpenGps() {
        return true//this.openGps
    }

    //断线检测-已重新连接
    private onServerConChange(suc, msg = null, reConnet = null) {
        let userInfo = this.getUserInfo();
        if (!userInfo || userInfo.userId == null || userInfo.userId <= 0) {
            return
        }
        if (suc) {
            if (this.tokenLogin()) {
                let loginToken = glb.getUserData("loginToken")//"20200513181745290170"
                let userId = glb.getUserData("userId", "int")//1764739
                this.sendReConnectionReq(loginToken, userId);
            } else {
                PopMgr.tip("账号异常重新登录")//---****
                if (SceneMgr.getCurSceneType() != SceneType.LOGIN_SCENE) {
                    // 跳转去登录界面
                    SceneMgr.goLoginScene()
                }
            }
        }

    }

    /**游戏重连 */
    public sendReConnectionReq(token: string, uid: number,) {
        glb.sendMsg(MsgType.ReConnectionReq, {
            token: token,
            uid: uid,
            client_info: this.createClientInfo()
        });
    }

    /**请求用户动态数据 */
    public sendUserDataReq(configType: number[]) {
        glb.sendMsg(MsgType.UserDataReq, {
            config_type_list: configType
        });
    }
}
export default new UserMgr();