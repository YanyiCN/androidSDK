import MyPop from "../../../base/MyPop";
import ComUtil from "../../../utils/ComUtil";

const { ccclass, property } = cc._decorator;

@ccclass
export default class RankingExplainPop extends MyPop {

    @property(cc.ToggleContainer)
    nodeSelectFunction: cc.ToggleContainer = null;

    @property([cc.Node])
    itemExample: cc.Node[] = [];

    @property([cc.Node])
    nodeScrollView: cc.Node[] = [];

    @property([cc.Node])
    nodeContent: cc.Node[] = [];

    private curSelectType: number = null;

    onExtLoad() {
        let togList = this.nodeSelectFunction.toggleItems;
        for (let i = 0; i < togList.length; i++) {
            togList[i].node.on("click", () => {
                this.onTogEvent(i);
            })
        }
    }

    private initView() {

    }

    private onTogEvent(tag: number) {
        if (this.curSelectType != tag) {
            this.curSelectType == tag;
            for (let i = 0; i < this.nodeScrollView.length; i++) {
                if (i == tag) {
                    if (i != 0) {
                        if (this.nodeContent[i - 1].childrenCount <= 0) {
                            ComUtil.destroyAllChildren(this.nodeContent[i - 1]);
                            for (let j = 0; j < 10; j++) {
                                let node = cc.instantiate(this.itemExample[i - 1]);
                                node.x = 0;
                                node.active = true;
                                this.nodeContent[i - 1].addChild(node);
                            }
                        }
                    }
                    this.nodeScrollView[i].active = true
                } else {
                    this.nodeScrollView[i].active = false;
                }

            }
        }
    }

}
