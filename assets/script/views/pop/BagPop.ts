import MyPop from "../../base/MyPop";
import PopMgr from "../../data/PopMgr";
import BagMgr, { PackageType } from "../../data/BagMgr";
import { EventType, PopLayer, PorpType } from "../../define/Const";
import { Lobby } from "../../proto/proto";
import { GamePropConfig } from "../../data/config/CfgGameTree";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BagPop extends MyPop {

    @property(cc.Node)
    itemExample: cc.Node = null;

    @property(cc.Node)
    contentProp: cc.Node = null;

    @property(cc.Node)
    btnUseProp: cc.Node = null;

    @property(cc.Node)
    nodeCurSelectDes: cc.Node = null;

    private curSelectPropID: number = null;

    onExtLoad() {
        this.regLis(EventType.BAG_LIST, this.updateBagPropsView)
        this.btnUseProp.on("click", () => {
            // let bagPropCfg = BagMgr.getThePropConfig(this.curSelectPropID);
            if (this.curSelectPropID == PorpType.NameCard) {
                PopMgr.showPop(PopLayer.POP_CHANGE_NICK_NAME);
            } else {
                PopMgr.alert("道具跳转相关功能待开放\n敬请期待");
            }
        })
        BagMgr.sendPackageReq(PackageType.List);
    }

    private initView() {
        let propsList = BagMgr.getBagPropsAllData();
        let bagFirstProp = propsList[0];
        if (bagFirstProp) {
            let bagFirstpropCfg = BagMgr.getThePropConfig(bagFirstProp.item_id);
            this.curSelectPropID = bagFirstProp.item_id;
            this.updateCurSelectPropInfo(bagFirstProp, bagFirstpropCfg);
        } else {
            PopMgr.tip("背包空空！！！");
            this.nodeCurSelectDes.active = false;
        }
    }

    private updateBagPropsView() {
        let propsList = BagMgr.getBagPropsAllData();
        for (let i = 0; i < propsList.length; i++) {
            let propData = propsList[i];
            let propCfgInfo = BagMgr.getThePropConfig(propData.item_id);
            let node: cc.Node = cc.instantiate(this.itemExample);
            node.getChildByName("lbPropNum").getComponent(cc.Label).string = "x" + propData.item_num;
            node.getChildByName("lbPropName").getComponent(cc.Label).string = propCfgInfo.name;
            node.on("click", () => {
                if (this.curSelectPropID != propData.item_id) {
                    this.curSelectPropID = propData.item_id
                    this.updateCurSelectPropInfo(propData, propCfgInfo);
                }
            })
            node.active = true;
            this.contentProp.addChild(node);
        }
        this.initView();
    }

    private updateCurSelectPropInfo(propData: Lobby.IPackageItemRes, propCfgInfo: GamePropConfig) {
        this.nodeCurSelectDes.getChildByName("lbnCurSkinName").getComponent(cc.Label).string = propCfgInfo.name;
        this.nodeCurSelectDes.getChildByName("lbCurPropNum").getComponent(cc.Label).string = propData.item_num.toString();
        this.nodeCurSelectDes.getChildByName("lbCurSelectDes").getComponent(cc.Label).string = '        ' + propCfgInfo.desc;
    }




}
