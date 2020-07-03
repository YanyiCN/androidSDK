import glb from "./utils/glb";
import MyMgr from "./base/MyMgr";
import CrossMgr from "./data/CrossMgr";
import MyScene from "./base/MyScene";
import { SceneType } from "./define/Const";
import FloatMgr from "./data/FloatMgr";
import { ClientCfg } from "./define/ClientCfg";
import mlog from "./utils/LogUtil";
import ComUtil from "./utils/ComUtil";
import HttpUtil from "./utils/HttpUtil";
import SoundMgr from "./data/SoundMgr";
import { display } from "./utils/ViewUtil";
import BuglyUtil from "./utils/BuglyUtil";
import TalkMgr from "./data/TalkMgr";
import SceneMgr from "./data/SceneMgr";
import SetMgr from "./data/SetMgr";
import ShopMgr from "./data/ShopMgr";
import UserMgr from "./data/UserMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Main extends MyScene {


    getBgNode(): cc.Node {
        return null;
    }

    public getSceneType(): string {
        throw SceneType.UNKNOWN_SCENE;
    }

    onLoad() {
        try {
            // 强行处理默认值
            glb.isTest = ClientCfg.forceTest;

            mlog.info(
                "cc.sys.isNative:", cc.sys.isNative,
                "cc.sys.isBrowser:", cc.sys.isBrowser,
                "cc.sys.platform:", cc.sys.platform,
                "cc.sys.os:", cc.sys.os)

            super.onLoad();
            this.downloadCfg();
        } catch (error) {
            mlog.error("Main onLoad Faild", mlog.errorStr(error))
        }
    }

    private downloadCfg() {
        let nowHour = ComUtil.formatDate(new Date(), "yyyyMMddHH")
        let jsonUrl = "https://cdn.18juyou.com/config/ddz_config.json?cacheversion=" + nowHour;
        HttpUtil.get({
            url: jsonUrl, callback: (resStr: string, errMsg: string) => {
                if (errMsg) {
                    // 失败  等0.5秒再来
                    mlog.debug(jsonUrl, "error, res:", errMsg);
                    setTimeout(this.downloadCfg.bind(this), 500);
                } else {
                    // 成功  结束
                    try {
                        mlog.debug(jsonUrl, "suc, res:", resStr);
                        let cfgJson = JSON.parse(resStr);
                        this.startInitGame(cfgJson);
                    } catch (error) {
                        mlog.error("downloadCfg Faild", mlog.errorStr(error))
                    }
                }
            }
        })

    }

    private async startInitGame(cfgJson) {
        try {
            display.initDisplay();

            let mgrList: MyMgr[] = MyMgr.getMgrList();
            for (const mgr of mgrList) {
                mgr.initByLoad()
            }
            await CrossMgr.initMgr();
            FloatMgr.initMgr();
            glb.initMgr();
            SetMgr.initMgr();
            ShopMgr.initMgr();
            // bugly
            BuglyUtil.initBugly(glb.ch.channel, glb.ch.code + "");

            let localDeviceVer = glb.ch.channel + "_" + glb.ch.code;
            for (const shVer of cfgJson.shList) {
                if (shVer == localDeviceVer) {
                    glb.isShenhe = true; 
                    break;
                }
            }
            if (!ClientCfg.openVipClub) {
                ClientCfg.simpleVipClub = true
            }
            let jsonstr=JSON.stringify({s:"我的个乖乖！！！"})
            console.log({s:"我的个乖乖！！！"})
            let test=JSON.parse(jsonstr);
            console.log("oopopopop"+test.s);
            SoundMgr.initMgr()
            TalkMgr.initMgr();
            let jsonStr = JSON.stringify({ time: 1500 });
            console.log(jsonStr);
            // 统一按钮音效
            cc.Button.prototype["_onTouchEnded"] = function (t) {
                if (this.interactable && this.enabledInHierarchy) {
                    if (this._pressed) {
                        cc.Component.EventHandler.emitEvents(this.clickEvents, t);
                        SoundMgr.playButton();
                        this.node.emit("click", this);
                    }
                    this._pressed = !1;
                    this._updateState();
                    t.stopPropagation();
                }
            };

            // 之前是不是因为更新自动重启的
            let isBeforeUpdate = glb.getUserData("_is_update_restart", "int", 0)
            // 无论如何都重置状态
            glb.setUserData("_is_update_restart", 0, "int")

            // 是更新的重启,或者是ios系列的,不需要再显示logo了
            if (isBeforeUpdate || cc.sys.platform == cc.sys.IPHONE || cc.sys.platform == cc.sys.IPAD) {
                // 直接更新加载
                // SceneMgr.goUpdateScene();
                SceneMgr.goLogoScene();
            } else {
                // SceneMgr.goUpdateScene();
                SceneMgr.goLogoScene();
            }
        } catch (error) {
            mlog.error("startInitGame Faild", mlog.errorStr(error))
        }
    }

    //main  LogoScene  UpdateScene  LoginScene  LobbyScene   
}
