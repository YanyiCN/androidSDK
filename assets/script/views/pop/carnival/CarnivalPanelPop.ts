import MyPop from "../../../base/MyPop";
import { EventType, ActiveType, ActiveHandleType } from "../../../define/Const";
import ActiveMgrCarnival from "../../../data/active/ActiveMgrCarnival";
import ActiveMgr from "../../../data/active/ActiveMgr";
import DependRes from "../../../data/entity/DependRes";
import ResUtil from "../../../utils/ResUtil";
import ComUtil from "../../../utils/ComUtil";

const { ccclass, property } = cc._decorator;

@ccclass
export default class CarnivalPanelPop extends MyPop {

    @property(cc.Node)
    btnClose: cc.Node = null;

    @property(cc.Node)
    nodeBody: cc.Node = null;

    @property(cc.ToggleContainer)
    nodeSelectGroup: cc.ToggleContainer = null;

    private pathArray: string[] = [];

    private curSelect: number = null;

    protected getDependRes(): DependRes[] {
        return [{ url: "prefabs/pop/carnival", type: cc.Prefab, dir: true }];
    }

    onExtLoad() {
        this.btnClose.on("click", () => {
            this.close();
        })

        this.pathArray = ["prefabs/pop/carnival/CarnivalSevenSigninLayer",
            "prefabs/pop/carnival/CarnivalSkillsLayer",
            "prefabs/pop/carnival/CarnivalRankLayer",
            "prefabs/pop/carnival/CarnivalGrowthLayer",
            "prefabs/pop/carnival/CarnivalPaixingLayer"];

        let node = ResUtil.createCachePrefabsNode(this.pathArray[0]);
        this.nodeBody.addChild(node)
        let togList = this.nodeSelectGroup.toggleItems;
        for (let i = 0; i < togList.length; i++) {
            togList[i].node.on("click", () => {
                this.onTogEvent(i);
            })
        }
    }

    private onTogEvent(tag: number) {
        if (this.curSelect != tag) {
            this.curSelect = tag;
            ComUtil.destroyAllChildren(this.nodeBody);
            let node = ResUtil.createCachePrefabsNode(this.pathArray[tag]);
            this.nodeBody.addChild(node);
        }
    }
}
