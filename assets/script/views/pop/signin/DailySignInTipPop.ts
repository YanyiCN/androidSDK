import MyPop from "../../../base/MyPop";
import BagMgr from "../../../data/BagMgr";
import { GamePropConfig } from "../../../data/config/CfgGameTree";

const { ccclass, property } = cc._decorator;

@ccclass
export default class DailySignInTipPop extends MyPop {

    @property(cc.Label)
    lbPropName: cc.Label = null;

    @property(cc.Label)
    lbPropDes: cc.Label = null;

    onExtLoad(propID: number) {
        let propCfg: GamePropConfig = BagMgr.getThePropConfig(propID);
        this.lbPropName.string = propCfg.name;
        this.lbPropDes.string = "       "+propCfg.desc;
    }
}
