import MyNode from "../../../base/MyNode";
import ShopMgr from "../../../data/ShopMgr";
import PopMgr from "../../../data/PopMgr";
import { PopLayer } from "../../../define/Const";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ShopPropLayer extends MyNode {

    @property(cc.Node)
    nodeContentProp: cc.Node = null;

    @property(cc.Node)
    nodeItemExample: cc.Node = null;

    onExtLoad() {
        this.initView();
    }

    private initView() {
        let maxHnum = 5;
        let propConfiglist = ShopMgr.getGamePayPropConfig();
        let ContentWidth = ShopMgr.setContentWidthByNum(propConfiglist.length, maxHnum, this.nodeItemExample.width, 30);
        this.nodeContentProp.width = ContentWidth;
        for (let i = 0; i < propConfiglist.length; i++) {
            let propData = propConfiglist[i];
            let node = cc.instantiate(this.nodeItemExample);
            node.getChildByName("lbPropName").getComponent(cc.Label).string = propData.name;
            node.getChildByName("btnPropPrice").getChildByName("lbPropPrice").getComponent(cc.Label).string = propData.diamond + "钻石";
            node.on("click", () => {
                PopMgr.showPop(PopLayer.POP_SHOP_BUY_PROP_TIP, propData);
            })

            node.getChildByName("btnPropPrice").on("click", () => {
                PopMgr.showPop(PopLayer.POP_SHOP_BUY_PROP_TIP, propData);
            })
            node.active = true;
            this.nodeContentProp.addChild(node);
        }
    }
}
