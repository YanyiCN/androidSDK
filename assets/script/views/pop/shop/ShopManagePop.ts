import MyPop from "../../../base/MyPop";
import DependRes from "../../../data/entity/DependRes";
import ResUtil from "../../../utils/ResUtil";
import PopMgr from "../../../data/PopMgr";
import { PopLayer, EventType } from "../../../define/Const";
import UserMgr from "../../../data/UserMgr";
import SetMgr from "../../../data/SetMgr";
import ComUtil from "../../../utils/ComUtil";
import RedPointMgr, { RedPointTypes } from "../../../data/RedPointMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ShopManagePop extends MyPop {


    @property(cc.ToggleContainer)
    private nodeSelectFunction: cc.ToggleContainer = null;

    @property(cc.Node)
    private btnSet: cc.Node = null;

    @property(cc.Node)
    private btnBag: cc.Node = null;

    @property(cc.Node)
    private nodeCentre: cc.Node = null;

    @property(cc.Label)
    private lbGold: cc.Label = null;

    @property(cc.Label)
    private lbGem: cc.Label = null;

    @property(cc.Label)
    private lbCoupon: cc.Label = null;

    private curSelect: number = null;

    private pathArray: { glodPath: string, gemPath: string, skinPath: string, propPath: string };


    protected getDependRes(): DependRes[] {
        return [{ url: "prefabs/pop/shop", type: cc.Prefab, dir: true }];
    }
    onExtLoad() {
        this.regLis(EventType.RED_POINT_UPDATE, this.onUpdateRedManage);
        this.regLis(EventType.UPDATE_USER_MONEY, this.updateUserMoneyView);
        this.pathArray = {
            glodPath: "prefabs/pop/shop/ShopGoldLayer",
            gemPath: "prefabs/pop/shop/ShopGemLayer",
            skinPath: "prefabs/pop/shop/ShopSkinLayer",
            propPath: "prefabs/pop/shop/ShopPropLayer"
        }
        this.btnSet.on("click", () => {
            PopMgr.showPop(PopLayer.POP_SET);
        })

        this.btnBag.on("click", () => {
            PopMgr.showPop(PopLayer.POP_BAG);
        })

        let node = ResUtil.createCachePrefabsNode(this.pathArray.glodPath);
        this.nodeCentre.children[0].addChild(node);
        let togList = this.nodeSelectFunction.toggleItems;
        for (let i = 0; i < togList.length; i++) {
            togList[i].node.on("click", () => {
                this.onTogEvent(i);
            })
        }

        this.updateUserMoneyView();
        this.onUpdateRedManage();
    }

    private onTogEvent(tag: number) {
        if (this.curSelect != tag) {
            this.curSelect = tag;
            for (let i = 0; i < this.nodeCentre.childrenCount; i++) {
                if (this.nodeCentre.children[i].childrenCount > 0) {
                    this.nodeCentre.children[i].active = false;
                }
            }
            if (this.nodeCentre.children[tag].childrenCount > 0) {
                this.nodeCentre.children[tag].active = true;
            } else {
                let path: string = "";
                switch (tag) {
                    case 0:
                        path = this.pathArray.glodPath;
                        break;
                    case 1:
                        path = this.pathArray.gemPath;
                        break;
                    case 2:
                        path = this.pathArray.skinPath;
                        break;
                    case 3:
                        path = this.pathArray.propPath;
                        break;

                    default:
                        break;
                }
                let node = ResUtil.createCachePrefabsNode(path);
                this.nodeCentre.children[tag].addChild(node);
            }
        }
    }

    private updateUserMoneyView() {
        let userInfo = UserMgr.getUserInfo()
        this.lbGold.string = userInfo.coinA.toString();
        this.lbGem.string = userInfo.coinB.toString();
        this.lbCoupon.string = userInfo.coinC.toString();
    }

    /**红点动态刷新 */
    private onUpdateRedManage() {
        //设置红点
        RedPointMgr.updateRedPointNode(this.btnSet, [RedPointTypes.RealId, RedPointTypes.RealPhone, RedPointTypes.FeedbackMessage]);
    }
}
