import { EventType, GameChannel } from "../define/Const";
import MyMgr from "../base/MyMgr";
import mlog from "../utils/LogUtil";
import glb from "../utils/glb";
import CrossBase, { CrossType } from "./cross/base/CrossBase";
import CrossWeb from "./cross/CrossWeb";
import CrossWxGame from "./cross/CrossWxGame";
import CrossIos from "./cross/CrossIos";
import CrossWin from "./cross/CrossWin";
import UmengMgr from "./UmengMgr";
import CrossMac from "./cross/CrossMac";
import CrossUnknown from "./cross/CrossUnknown";
import CrossOppo from "./cross/CrossOppo";
import CrossHuawei from "./cross/CrossHuawei";
import CrossWebXiaomi from "./cross/webs/CrossWebXiaomi";
import CrossBaidu from "./cross/CrossBaidu";
import ChannelBaseBean, { ChannelBean } from "./entity/ChannelBean";
import CrossWebTest from "./cross/webs/CrossWebTest";
import CrossAndroid from "./cross/CrossAndroid";




class CrossMgr extends MyMgr {
    private crossBean: CrossBase;
    // 保存复制的文本  防止自己复制  混乱自己的逻辑
    private cacheCopyText: string = null;

    public initByLoad() {
        mlog.info("初始跨平台管理器");
    }
    public async initMgr() {
        let staticChannel = window["__staticChannel"];
        mlog.info("__staticChannel:", staticChannel)
        let Test = false;//安卓环境关闭
        if (Test) {
            mlog.info(" new CrossWebTest");
            this.crossBean = new CrossWebTest();
        } else {
            if (cc.sys.platform == cc.sys.WECHAT_GAME) {
                this.crossBean = new CrossWxGame();
            } else if (cc.sys.platform == cc.sys.ANDROID) {
                mlog.info(" new CrossAndroid  ", cc.sys.platform);
                this.crossBean = new CrossAndroid();
            } else if (cc.sys.platform == cc.sys.IPHONE || cc.sys.platform == cc.sys.IPAD) {
                this.crossBean = new CrossIos();
            } else if (cc.sys.platform == cc.sys.WIN32) {
                this.crossBean = new CrossWin();
            } else if (cc.sys.platform == cc.sys.MACOS) {
                this.crossBean = new CrossMac();
            } else if (cc.sys.platform == cc.sys.OPPO_GAME) {
                this.crossBean = new CrossOppo();
            } else if (cc.sys.platform == cc.sys.HUAWEI_GAME) {
                this.crossBean = new CrossHuawei();
            } else if (cc.sys.platform == cc.sys.BAIDU_GAME) {
                this.crossBean = new CrossBaidu();
            } else if (staticChannel && staticChannel == "webxiaomi") {
                this.crossBean = new CrossWebXiaomi();
            } else if (cc.sys.isBrowser) {
                this.crossBean = new CrossWeb();
            }

            if (this.crossBean == null) {
                this.crossBean = new CrossUnknown();
                mlog.error("未知的平台适配");
            }
        }
        this.crossBean.initAll(this.onCrossCall.bind(this));
        if (this.crossBean instanceof CrossWebXiaomi) {
            await this.crossBean.initXiaomi();
        }
    }
    public getCrossWxGame(): CrossWxGame {
        if (this.crossBean instanceof CrossWxGame) {
            return this.crossBean;
        }
        return null;
    }
    public uninitMgr() { }

    private onCrossCall(callId: number, paramsStr: string) {
        console.log("init all  android ");
        mlog.debug("callGame trans:", callId, paramsStr)
        let params = null;
        if (paramsStr != null && paramsStr != "") {
            params = JSON.parse(paramsStr)
        }
        if (callId == CrossType.LF_SDK_LOGIN) {
            glb.sendEvent(EventType.CROSS_SDK_LOGIN_RES, params)
        } else if (callId == CrossType.LF_PAY) { 
            console.log("支付-LF_PAY 1" + params)
            glb.sendEvent(EventType.CROSS_SDK_PAY_RES, params)
        } else if (callId == CrossType.LF_PAY_FAILD) {
            console.log("支付-LF_PAY 0" + params)
            glb.sendEvent(EventType.CROSS_SDK_PAY_RES, params)
        } else if (callId == CrossType.LF_SHARE) {
            glb.sendEvent(EventType.CROSS_WX_SHARE_RES, params)
        } else if (callId == CrossType.LF_GET_START_MSG) {
            glb.sendEvent(EventType.CROSS_WX_START_RES, params)
        } else if (callId == CrossType.LF_SYS_BACK_BTN) {
            glb.sendEvent(EventType.CROSS_SYS_EXIT_BTN, params)
        } else if (callId == CrossType.LF_GPS_GET_LOC) {
            glb.sendEvent(EventType.CROSS_GPS_GET_DETAIL, params)
        } else if (callId == CrossType.LF_LOGOUT_BY_SDK) {
            glb.sendEvent(EventType.CROSS_LOGOUT_BY_SDK, params)
        } else if (callId == CrossType.LF_CHECK_NET_STATE) {
            glb.sendEvent(EventType.CROSS_NET_TYPE_CHANGE, params.value)
        } else if (callId == CrossType.LF_NET_LEVEL) {
            let vv = Number.parseInt(params.value)
            if (vv < 1 || vv > 3) {
                vv = 3
            }
            glb.sendEvent(EventType.CROSS_NET_LEVEL_CHANGE, vv)
        } else if (callId == CrossType.LF_GAME_HIDESHOW) {
            glb.sendEvent(EventType.CROSS_GAME_HIDESHOW, params.value);
        } else if (callId == CrossType.LF_GPS_CHECK_OPEN) {
            glb.sendEvent(EventType.CROSS_GPS_CHECK_OPEN, params)
        } else if (callId == CrossType.LF_GPS_SET_OPEN) {
            glb.sendEvent(EventType.CROSS_GPS_REQ_OPEN, params.value)
        } else if (callId == CrossType.LF_GPS_GET_LOC) {
            glb.sendEvent(EventType.CROSS_GPS_GET_LOC, params.value)
        }
    }


    supportPayList(): { [type: string]: number; } {
        return this.crossBean.supportPayList();
    }
    prePay(payType: any): Promise<string> {
        return this.crossBean.prePay(payType);
    }
    doPay(payType: number, gameOrderNum: string, centerOrderNum: string, price: number, otherParam: any, payId: number): string {
        return this.crossBean.doPay(payType, gameOrderNum, centerOrderNum, price, otherParam, payId);
    }
    doShare(params: { shareWxType: number, shareType: number, shareObjId: number, extData?: any, imgPath?: string, linkUrl?: string, title?: string, desc?: string, iconPath?: string }) {
        glb.isOutBySelf = true;
        if (!params.extData) {
            params.extData = {};
        }
        if (!params.extData.value) {
            params.extData.value = "empty";
        }
        this.crossBean.doShare(params);
        UmengMgr.event("evt_share_out", params ? params.shareObjId : null)
    }
    checkNetState(): number {
        return this.crossBean.checkNetState();
    }
    copyText(text: string): boolean {
        let suc = this.crossBean.copyText(text)
        if (suc) {
            this.cacheCopyText = text;
        }
        return suc;
    }
    getCopyText(): Promise<string> {
        return new Promise<string>((res, rej) => {
            let funRes = (value?) => {
                if (this.cacheCopyText == value) {
                    value = null;
                } else {
                    this.cacheCopyText = null;
                }
                res(value);
            }
            this.crossBean.getCopyText(funRes, rej);
        });
    }
    getPowerLevel(): number {
        return this.crossBean.getPowerLevel();
    }
    checkGpsOpen(param: { needNow: boolean }) {
        this.crossBean.checkGpsOpen(param);
    }
    gpsReqOpen(): boolean {
        return this.crossBean.gpsReqOpen();
    }
    getGpsLoc(): string {
        return this.crossBean.getGpsLoc();
    }
    getDeviceVersion(): string {
        return this.crossBean.getDeviceVersion();
    }
    makeShock() {
        this.crossBean.makeShock();
    }
    getNetLevel(): number {
        return this.crossBean.getNetLevel();
    }
    getChannelAndCode(): ChannelBean {
        let chBase: ChannelBaseBean = this.crossBean.getChannelAndCode();
        let ch = new ChannelBean();
        ch.channel = chBase.channel;
        ch.code = chBase.code;
        ch.channelSub = chBase.channelSub;
        ch.plfm = chBase.plfm;
        for (const chObj of GameChannel) {
            if (chObj.name == ch.plfm) {
                ch.chObj = chObj as any;
                break;
            }
        }
        return ch;
    }
    getPushToken(): string {
        return this.crossBean.getPushToken();
    }
    isExitBySdk(): boolean {
        return this.crossBean.isExitBySdk();
    }
    logoutBySdk(): boolean {
        return this.crossBean.logoutBySdk();
    }
    checkSdkExist(sdkId: number, sdkName?: string): boolean {
        return this.crossBean.checkSdkExist(sdkId, sdkName);
    }
    getDeviceId(): string {
        return this.crossBean.getDeviceId();
    }
    getStartMsg() {
        this.crossBean.getStartMsg();
    }
    userGameInfo(userInfo: any) {
        this.crossBean.userGameInfo(userInfo);
    }
    sdkLogin(accountType?: number): void {
        this.crossBean.sdkLogin(accountType);
    }
}
export default new CrossMgr();