import MyPop from "../../base/MyPop";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PlayingMethodPop extends MyPop {

    @property(cc.Node)
    btnClose: cc.Node = null;

    @property(cc.ToggleContainer)
    nodeBottomTitleGroup: cc.ToggleContainer = null;

    @property(cc.Label)
    lbWanfa: cc.Label = null;

    @property(cc.Label)
    lbRule: cc.Label = null;

    private curSelect: number = null;

    onExtLoad() {
        let togList = this.nodeBottomTitleGroup.toggleItems;
        for (let i = 0; i < togList.length; i++) {
            togList[i].node.on("click", () => {
                this.onTogEvent(i);
            })
        }
    }

    private onTogEvent(tag: number) {
        let roomType = ["经典斗地主", "不洗牌斗地主", "癞子斗地主", "四人斗地主"];
        if (this.curSelect != tag) {
            this.curSelect = tag;
            this.lbWanfa.string = roomType[tag] + "的自我修养";
        }
    }
}
