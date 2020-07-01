import MyNode from "../../base/MyNode";
import ActiveMgr from "../../data/active/ActiveMgr";
import AdMgr from "../../data/AdMgr";
import { ActiveType, ActiveHandleType, EventType, PopLayer } from "../../define/Const";
import GetAwardPop from "../pop/common/GetAwardPop";
import PopMgr from "../../data/PopMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class OrdinarySignInNode extends MyNode {

    @property(cc.Node)
    btnClose: cc.Node = null;

    @property(cc.Node)
    btnDoubleAward: cc.Node = null;

    onExtLoad() {
        this.btnDoubleAward.on("click", () => {
            AdMgr.sendAdReq();
            PopMgr.showPop(PopLayer.POP_WATCH_AD, ActiveType.EVERY_SIGN_IN, ActiveHandleType.HANDLE_RECEIVE_REWARD_VIDEO_DOUBLE);
            this.node.parent.parent.getComponent(GetAwardPop).close();
        })

        this.btnClose.on("click", () => {
            this.node.parent.parent.getComponent(GetAwardPop).close();
        })
    }
}
