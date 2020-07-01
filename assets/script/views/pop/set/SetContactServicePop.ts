import MyPop from "../../../base/MyPop";
import CrossMgr from "../../../data/CrossMgr";
import { Texts } from "../../../define/Texts";
import PopMgr from "../../../data/PopMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class SetContactServicePop extends MyPop {

    @property(cc.Node)
    btnCopy: cc.Node = null;

    onExtLoad() {
        this.btnCopy.on("click", () => {
            if (CrossMgr.copyText(Texts.officialAccounts)) {
                PopMgr.alert({
                    msg: Texts.copySucceedTip + "\n" + Texts.officialAccounts
                })
            }
        })
    }
}
