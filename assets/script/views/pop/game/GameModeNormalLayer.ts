import MyNode from "../../../base/MyNode";
import PopMgr from "../../../data/PopMgr";
import { PopLayer, GameWanfaType } from "../../../define/Const";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameModeNormalLayer extends MyNode {

    @property(cc.Node)
    btnNotShuffle: cc.Node = null;

    @property(cc.Node)
    btnClassicModel: cc.Node = null;

    @property(cc.Node)
    btnTDLZ: cc.Node = null;

    @property(cc.Node)
    btnFourDDZ: cc.Node = null;

    @property(cc.Label)
    lbNotShufflePlayerNum: cc.Label = null;

    @property(cc.Label)
    lbClassicModelPlayerNum: cc.Label = null;
    onExtLoad() {
        this.btnClassicModel.on("click", () => {
            PopMgr.showPop(PopLayer.POP_WANFA, GameWanfaType.Classic_Mode);
        })
    }
}
