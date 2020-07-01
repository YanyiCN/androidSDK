import MyPop from "../../../base/MyPop";
import DependRes from "../../../data/entity/DependRes";
import ResUtil from "../../../utils/ResUtil";
import ComUtil from "../../../utils/ComUtil";
import PopMgr from "../../../data/PopMgr";
import { PopLayer, EventType } from "../../../define/Const";
import UserMgr from "../../../data/UserMgr";
import SetMgr from "../../../data/SetMgr";
import RedPointMgr, { RedPointTypes } from "../../../data/RedPointMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class TaskPanelPop extends MyPop {

    @property(cc.Node)
    btnClose: cc.Node = null;

    @property(cc.Node)
    nodeCentre: cc.Node = null;

    @property(cc.ToggleContainer)
    nodeBottomTitleGroup: cc.ToggleContainer = null;

    @property(cc.Node)
    btnBag: cc.Node = null;

    @property(cc.Node)
    btnSet: cc.Node = null;

    @property(cc.Label)
    lbGold: cc.Label = null;

    @property(cc.Label)
    lbGem: cc.Label = null;

    @property(cc.Label)
    lbCoupon: cc.Label = null;

    private pathArray: string[] = null;

    private curSelect: number = null;

    protected getDependRes(): DependRes[] {
        return [{ url: "prefabs/pop/task", type: cc.Prefab, dir: true }];
    }

    onExtLoad() {
        this.regLis(EventType.RED_POINT_UPDATE, this.onUpdateRedManage);
        this.regLis(EventType.UPDATE_USER_MONEY, this.updateUserMoneyView);
        this.pathArray = [
            "prefabs/pop/task/TaskDailyLayer",
            "prefabs/pop/task/TaskChallengeLayer",
            "prefabs/pop/task/TaskThreeDaysLayer",
            "prefabs/pop/task/TaskGrowthLayer"
        ]


        this.btnClose.on("click", () => {
            this.close();
        })

        let node = ResUtil.createCachePrefabsNode(this.pathArray[0]);
        this.nodeCentre.addChild(node)
        let togList = this.nodeBottomTitleGroup.toggleItems;
        for (let i = 0; i < togList.length; i++) {
            togList[i].node.on("click", () => {
                this.onTogEvent(i);
            })
        }

        this.btnBag.on("click", () => {
            PopMgr.showPop(PopLayer.POP_BAG)
        })

        this.btnSet.on("click", () => {
            PopMgr.showPop(PopLayer.POP_SET)
        })


        this.updateUserMoneyView();
        this.onUpdateRedManage();
    }

    private onTogEvent(tag: number) {
        if (this.curSelect != tag) {
            this.curSelect = tag;
            ComUtil.destroyAllChildren(this.nodeCentre);
            let node = ResUtil.createCachePrefabsNode(this.pathArray[tag]);
            this.nodeCentre.addChild(node);
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
