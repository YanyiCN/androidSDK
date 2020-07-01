import MyPop from "../../../base/MyPop";
import DependRes from "../../../data/entity/DependRes";
import ResUtil from "../../../utils/ResUtil";
import ComUtil from "../../../utils/ComUtil";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends MyPop {

    @property(cc.Node)
    btnClose: cc.Node = null;

    @property(cc.Node)
    nodeBody: cc.Node = null;

    @property(cc.ToggleContainer)
    private nodeSelectFunction: cc.ToggleContainer = null;

    private pathArray: string[] = null;

    private curSelect: number = null;

    protected getDependRes(): DependRes[] {
        return [{ url: "prefabs/pop/welfare", type: cc.Prefab, dir: true }];
    }
    onExtLoad() {
        this.pathArray = [
            "prefabs/pop/welfare/WelfareGoldLayer",
            "prefabs/pop/welfare/WelfareGemLayer",
            "prefabs/pop/welfare/WelfareCouponLayer"
        ]
        this.btnClose.on("click", () => {
            this.close();
        })

        let node = ResUtil.createCachePrefabsNode(this.pathArray[0]);
        this.nodeBody.addChild(node)
        let togList = this.nodeSelectFunction.toggleItems;
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
