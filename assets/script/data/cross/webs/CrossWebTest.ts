import CrossWeb from "../CrossWeb";
import glb from "../../../utils/glb";
import { EventType, PayType, AccountType, PayWayType } from "../../../define/Const";
import { CrossType, LoginRes } from "../base/CrossBase";
import mlog from "../../../utils/LogUtil";
import ChannelBaseBean from "../../entity/ChannelBean";
import PopMgr from "../../PopMgr";

let WEB_APPLE = 1;
let WEB_WX = 2;
let WEB_ZFB = 3

export default class CrossWebTest extends CrossWeb {

    hy_wy_sdk: sdks.WebXiaomi = null;
    initAll(funCallback: Function) {
        super.initAll(funCallback);
    }

    initXiaomi(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            // 初始化
            this.hy_wy_sdk = window["hy_wy_sdk"];
            this.hy_wy_sdk.ready({}, () => {
                resolve();
                // 监听事件
                glb.regEventLis(EventType.CROSS_GAME_HIDESHOW, this.onAppHideShow, this)
                //小米jsbridge 处理 屏幕显示
                document.addEventListener('JsBridgeResume', function () {
                    //开始播放
                    window["sound"] && window["sound"].play();
                })
                //小米jsbridge 处理 息屏
                document.addEventListener('JsBridgePause', function () {
                    window["sound"] && window["sound"].pause();
                })
                // 监听充值结果
                this.hy_wy_sdk.payResult((resStr: string) => {
                    mlog.info("hy_wy_sdk.payResult:", resStr);
                    if (resStr == "success") {
                        this.funCallback(CrossType.LF_PAY, JSON.stringify({ suc: "true", msg: "支付操作完成" }));
                    } else {
                        this.funCallback(CrossType.LF_PAY, JSON.stringify({ suc: "false", msg: "支付失败" }));
                    }
                });
            })
        });
    }

    private onAppHideShow(show) {
        if (show) {
            //暂停播放
            window["sound"] && window["sound"].pause();
        } else {
            //开始播放
            window["sound"] && window["sound"].play();
        }
    }

    supportPayList(): { [type: string]: number; } {
        let map: { [type: string]: number; } = {}
        map["type_" + PayWayType.APPLE] = WEB_APPLE;
        map["type_" + PayWayType.WX] = WEB_WX;
        map["type_" + PayWayType.ZFB] = WEB_ZFB;
        return map;
    }
    prePay(payType: any): Promise<string> {
        return new Promise<string>((res, rej) => {
            res(null);
        });
    }

    doPay(payType: number, gameOrderNum: string, centerOrderNum: string, price: number, otherParam: any, payId: number): string {
        let randomNum = Math.floor(Math.random() * 3000) + 1000;
        setTimeout(() => {
            glb.sendEvent(EventType.CROSS_SDK_PAY_RES, { suc: "true" });
        }, randomNum);
        return;
    }

    sdkLogin(accountType?: number): void {
        PopMgr.tip("暂无可用的登录方式");
    }

    getChannelAndCode(): ChannelBaseBean {
        return { channelSub: "def", plfm: "webxiaomi", channel: "webxiaomi", code: 190822 };
    }
}