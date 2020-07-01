import mlog from "../utils/LogUtil";
import MyMgr from "../base/MyMgr";
import { GamePayConfig, GamePayRmbConfig, GamePayTypeConfig } from "./config/CfgGameTree";
import { Lobby } from "../proto/proto";
import glb from "../utils/glb";
import { MsgType, ServerCode, Mid, EventType, ShopType, PopLayer } from "../define/Const";
import PopMgr from "./PopMgr";
import CrossMgr from "./CrossMgr";

class ShopMgr extends MyMgr {
    private cfgGamePayGold: GamePayRmbConfig[] = null;
    private cfgGamePayGem: GamePayRmbConfig[] = null;
    private cfgGamePayProp: GamePayConfig[] = null;
    private cfgGamePaySkinHead: GamePayConfig[] = null;
    private cfgGamePaySkinClock: GamePayConfig[] = null;
    private cfgGamePaySkinBubble: GamePayConfig[] = null;
    private cfgGamePayType: GamePayTypeConfig[] = null;

    deviceSupportPayTypeList: { [type: string]: number };
    public initByLoad() {
        mlog.info("初始ShopMgr");
        glb.regEventLis(Mid.MID_PAY_PROP_RES, this.onPayPropRes, this);
        glb.regEventLis(Mid.MID_PAY_RES, this.onPayPropRes, this);
    }
    public initMgr() {
        this.deviceSupportPayTypeList = CrossMgr.supportPayList();
    }
    public uninitMgr() { }

    /**支付结果回调 */
    private onPayPropRes(msg: Lobby.PayRes) {
        if (msg.code == ServerCode.Succeed) {
            if (msg.item_type == ShopType.Gem || msg.item_type == ShopType.Gold) {
                // 调用SDK
                let sdkErrMsg = CrossMgr.doPay(msg.pay_type, msg.game_order_num, msg.center_order_num, msg.price_fen, msg.other_param, msg.item_id)
                if (sdkErrMsg) {
                    this.onPayError(sdkErrMsg);
                    return;
                }
                PopMgr.showPop(PopLayer.POP_SHOP_PAY_LOADING);
            } else if (msg.item_type == ShopType.Prop) {
                glb.sendEvent(EventType.SHOP_GEM_PAY_PROP_SUCCEED);
            } else {
                glb.sendEvent(EventType.SHOP_GEM_PAY_SKIN_SUCCEED, msg.item_type);
            }
        } else {
            PopMgr.tip(msg.message);
        }
    }

    /**
      * 现金支付
      * @param itemId 商品id
      * @param itemType 商品类型1金币2钻石3道具4头像装扮5闹钟6气泡
      * @param payNum 购买数量--1
      * @param payType 支付类型(读取配置)--1
      * @param configId 支付配置id--1
      * @param other 其他参数json
      */
    public async sendPayReq(itemId: number, itemType: number, payNum: number = 1, payType: number = 1, configId: number = 1) {
        // mlog.info("用户点击支付",payId,typeId,orderType)

        let prepayStr = await CrossMgr.prePay(payType);
        glb.sendMsg(MsgType.PayReq, {
            item_id: itemId,
            item_type: itemType,
            pay_type: payType,
            config_id: configId,
            pay_num: payNum,
            other: prepayStr
        })
    }



    /**
     * 钻石支付
     * @param itemId 商品id
     * @param itemType 商品类型1金币2钻石3道具4头像装扮5闹钟6气泡
     * @param payNum 购买数量
     * @param payType 支付类型(读取配置)
     * @param configId 支付配置id
     * @param other 其他参数json
     */
    public sendPayPropReq(itemId: number, itemType: number, payNum: number, payType: number = null, configId: number = null, other: string = null) {
        glb.sendMsg(MsgType.PayPropReq, {
            item_id: itemId,
            item_type: itemType,
            pay_type: payType,
            config_id: configId,
            pay_num: payNum,
            other: other
        })
    }


    /**支付异常 */
    public onPayError(errMsg) {
        // 移除loading
        glb.sendEvent(EventType.SHOP_MONEY_PAY_LOADING_CLOSE);
        // 弹框 
        PopMgr.alert(errMsg)
    }

    /**平台支付类型 */
    public payTypeSupport(pType): number {
        return this.deviceSupportPayTypeList["type_" + pType]
    }

    /**
     * 设置可滚动展示节点宽度-横向
     * @param num 总容器内数量
     * @param maxHnum 第一排静态可容量
     * @param itemWidth 容器内单目标宽度
     * @param spacingX 横向间隔
     */
    public setContentWidthByNum(num: number, maxHnum: number = 5, itemWidth: number = 201, spacingX: number = 30): number {
        let firstNum = Math.floor(num / 2) + num % 2;
        if (num <= maxHnum) {
            firstNum = num;
        } else if (num > maxHnum && num <= (maxHnum * 2)) {
            firstNum = maxHnum;
        }
        let ContentWidth = firstNum * (itemWidth + spacingX);
        return ContentWidth;
    }

    /**储存金币商店配置 */
    public setGamePayGoldConfig(cfgGamePayGoldList: GamePayRmbConfig[]) {
        this.cfgGamePayGold = cfgGamePayGoldList;
    }

    /**获取本地储存金币商店配置 */
    public getGamePayGoldConfig() {
        return this.cfgGamePayGold;
    }

    /**储存钻石商店配置 */
    public setGamePayGemConfig(cfgGamePayGemList: GamePayRmbConfig[]) {
        this.cfgGamePayGem = cfgGamePayGemList;
    }

    /**获取本地储存钻石商店配置 */
    public getGamePayGemConfig() {
        return this.cfgGamePayGem;
    }

    /**储存道具商店配置 */
    public setGamePayPropConfig(cfgGamePayPropList: GamePayConfig[]) {
        this.cfgGamePayProp = cfgGamePayPropList;
    }

    /**获取本地储存道具商店配置 */
    public getGamePayPropConfig() {
        return this.cfgGamePayProp;
    }

    /**储存头像框皮肤商店配置 */
    public setGamePaySkinHeadConfig(cfgGamePaySkinHeadList: GamePayConfig[]) {
        this.cfgGamePaySkinHead = cfgGamePaySkinHeadList;
    }

    /**获取本地储存头像框皮肤商店配置 */
    public getGamePaySkinHeadConfig() {
        return this.cfgGamePaySkinHead;
    }

    /**储存闹钟皮肤商店配置 */
    public setGamePaySkinClockConfig(cfgGamePaySkinClockList: GamePayConfig[]) {
        this.cfgGamePaySkinClock = cfgGamePaySkinClockList;
    }

    /**获取本地储存闹钟皮肤商店配置 */
    public getGamePaySkinClockConfig() {
        return this.cfgGamePaySkinClock;
    }

    /**储存气泡皮肤商店配置 */
    public setGamePaySkinBubbleConfig(cfgGamePaySkinBubbleList: GamePayConfig[]) {
        this.cfgGamePaySkinBubble = cfgGamePaySkinBubbleList;
    }

    /**获取本地储存气泡皮肤商店配置 */
    public getGamePaySkinBubbleConfig() {
        return this.cfgGamePaySkinBubble;
    }

    /**储存商店支付方式配置 */
    public setGamePayTypeConfig(cfgGamePayTypeList: GamePayTypeConfig[]) {
        this.cfgGamePayType = cfgGamePayTypeList;
    }

    /**获取本地储存商店支付方式配置 */
    public getGamePayTypeConfig() {
        return this.cfgGamePayType;
    }
}
export default new ShopMgr();