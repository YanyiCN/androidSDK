import MyPop from "../../../base/MyPop";

const {ccclass, property} = cc._decorator;

@ccclass
export default class LoginAgreementPop extends MyPop {

    @property(cc.Label)
    label: cc.Label = null;

    onExtLoad(){

    }
}
