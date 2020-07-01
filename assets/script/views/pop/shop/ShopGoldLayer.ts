import MyNode from "../../../base/MyNode";
import ShopMgr from "../../../data/ShopMgr";
import PopMgr from "../../../data/PopMgr";
import { PopLayer, ShopType } from "../../../define/Const";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ShopGoldLayer extends MyNode {

    @property(cc.Node)
    nodeContentGold: cc.Node = null;

    @property(cc.Node)
    nodeItemExample: cc.Node = null;

    onExtLoad() {
        this.initView();
    }

    private initView() {
        let maxHnum = 5;
        let goldConfiglist = ShopMgr.getGamePayGoldConfig();
        let ContentWidth = ShopMgr.setContentWidthByNum(goldConfiglist.length, maxHnum, this.nodeItemExample.width, 30);
        this.nodeContentGold.width = ContentWidth;
        for (let i = 0; i < goldConfiglist.length; i++) {
            let glodData = goldConfiglist[i];
            let node = cc.instantiate(this.nodeItemExample);
            node.getChildByName("lbGoodsNum").getComponent(cc.Label).string = glodData.name;
            node.getChildByName("btnGoodsPrice").getChildByName("lbGoodsPrice").getComponent(cc.Label).string = "￥" + (glodData.rmbFen / 100);
            node.getChildByName("btnGoodsPrice").on("click", () => {
                PopMgr.showPop(PopLayer.POP_SHOP_BUY_WAY, glodData, ShopType.Gold);
            })
            node.active = true;
            this.nodeContentGold.addChild(node);
        }
    }

}
