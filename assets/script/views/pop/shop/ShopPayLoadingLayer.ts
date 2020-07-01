import MyPop from "../../../base/MyPop";
import { EventType } from "../../../define/Const";
import PopMgr from "../../../data/PopMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ShopPayLoadingLayer extends MyPop {

    @property(cc.Node)
    btnCancepay: cc.Node = null;

    @property(cc.Label)
    lbPayState: cc.Label = null;

    onExtLoad() {
        this.regLis(EventType.CROSS_SDK_PAY_RES, this.onSdkPayRes)
        this.btnCancepay.opacity = 0;
        this.regLis(EventType.SHOP_MONEY_PAY_LOADING_CLOSE, this.onPayLoadingClose)
        this.regLis(EventType.UPDATE_USER_MONEY, this.onPayLoadingClose)
        this.btnCancepay.on("click", () => {
            this.close();
        })

        setTimeout(() => {
            cc.tween(this.btnCancepay).to(0.5, { opacity: 255 }).start();
        }, 2000);
    }


    private onPayLoadingClose() {
        this.close();
    }

    private onSdkPayRes(params) {
        if (params.cancel == "true") {
            this.close();
            return
        }
        if (params.suc == "true") {
            this.lbPayState.string = "支付成功等待到账...";
        } else {
            this.close();
            PopMgr.alert(params.msgMsg)
        }
    }
}
