import MyNode from "../../../base/MyNode";
import ShopMgr from "../../../data/ShopMgr";
import PopMgr from "../../../data/PopMgr";
import { PopLayer, ShopType } from "../../../define/Const";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ShopGemLayer extends MyNode {
    @property(cc.Node)
    nodeContentGem: cc.Node = null;

    @property(cc.Node)
    nodeItemExample: cc.Node = null;

    onExtLoad() {
        this.initView();
    }

    private initView() {
        let maxHnum = 4;
        let gemConfiglist = ShopMgr.getGamePayGemConfig();
        let ContentWidth = ShopMgr.setContentWidthByNum(gemConfiglist.length, maxHnum, this.nodeItemExample.width, 30);
        this.nodeContentGem.width = ContentWidth;
        for (let i = 0; i < gemConfiglist.length; i++) {
            let gemData = gemConfiglist[i];
            let node = cc.instantiate(this.nodeItemExample);
            node.getChildByName("lbGoodsNum").getComponent(cc.Label).string = gemData.name;
            node.getChildByName("btnGoodsPrice").getChildByName("lbGoodsPrice").getComponent(cc.Label).string = "￥" + (gemData.rmbFen / 100);
            node.getChildByName("btnGoodsPrice").on("click", () => {
                PopMgr.showPop(PopLayer.POP_SHOP_BUY_WAY, gemData, ShopType.Gem);
            })
            node.active = true;
            this.nodeContentGem.addChild(node);
        }
    }

}
