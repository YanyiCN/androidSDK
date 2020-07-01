import MyPop from "../../../base/MyPop";
import ShopMgr from "../../../data/ShopMgr";
import { PayWayType, ShopType, PopLayer, EventType } from "../../../define/Const";
import { GamePayRmbConfig } from "../../../data/config/CfgGameTree";
import PopMgr from "../../../data/PopMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ShopBuyWay extends MyPop {

    @property(cc.Node)
    nodePayWay: cc.Node = null;

    @property([cc.Node])
    btnPayWayGroup: cc.Node[] = [];

    onExtLoad(goodsData: GamePayRmbConfig, goodsType: number) {
        this.regLis(EventType.UPDATE_USER_MONEY, this.onPaySucceedClose)
        this.initView();

        this.btnPayWayGroup[PayWayType.APPLE - 1].on("click", () => {
            ShopMgr.sendPayReq(goodsData.payId, goodsType);
        })

        this.btnPayWayGroup[PayWayType.WX - 1].on("click", () => {
            ShopMgr.sendPayReq(goodsData.payId, goodsType);
        })

        this.btnPayWayGroup[PayWayType.ZFB - 1].on("click", () => {
            ShopMgr.sendPayReq(goodsData.payId, goodsType);
        })
    }

    private initView() {
        for (const key in PayWayType) {
            if (PayWayType.hasOwnProperty(key)) {
                const element = PayWayType[key];
                let payTypeSupport = ShopMgr.payTypeSupport(element);
                //--支付类型暂时需要节点组对应顺序
                this.btnPayWayGroup[Number(element) - 1].active = payTypeSupport && payTypeSupport > 0;
            }
        }
    }

    private onPaySucceedClose() {
        this.close();
    }
}
