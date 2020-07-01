import MyPop from "../../../base/MyPop";
import DependRes from "../../../data/entity/DependRes";
import ResUtil from "../../../utils/ResUtil";
import ComUtil from "../../../utils/ComUtil";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ProfilePanelPop extends MyPop {

    @property(cc.Node)
    private nodeCentre: cc.Node = null;

    @property(cc.ToggleContainer)
    private nodeSelectFunction: cc.ToggleContainer = null;

    private curSelect: number = null;

    private pathArray: { dataPath: string, skinPath: string, honorPath: string, recordPath: string, titlePath: string }

    protected getDependRes(): DependRes[] {
        return [{ url: "prefabs/pop/profile", type: cc.Prefab, dir: true }];
    }
    onExtLoad() {
        this.pathArray = {
            dataPath: "prefabs/pop/profile/ProfileDataLayer",
            skinPath: "prefabs/pop/profile/ProfileSkinLayer",
            honorPath: "prefabs/pop/profile/ProfileHonorLayer",
            recordPath: "prefabs/pop/profile/ProfileRecordLayer",
            titlePath: "prefabs/pop/profile/ProfileTitleLayer"
        }
        let node = ResUtil.createCachePrefabsNode(this.pathArray.dataPath);
        this.nodeCentre.children[0].addChild(node)
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
                        path = this.pathArray.dataPath;
                        break;
                    case 1:
                        path = this.pathArray.skinPath;
                        break;
                    case 2:
                        path = this.pathArray.honorPath;
                        break;
                    case 3:
                        path = this.pathArray.recordPath;
                        break;
                    case 4:
                        path = this.pathArray.titlePath;
                        break;

                    default:
                        break;
                }
                let node = ResUtil.createCachePrefabsNode(path);
                this.nodeCentre.children[tag].addChild(node);
            }
        }
    }


}
