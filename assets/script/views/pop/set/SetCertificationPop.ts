import MyPop from "../../../base/MyPop";
import RealInfoMgr from "../../../data/RealInfoMgr";
import { UserRealType, EventType } from "../../../define/Const";
import PopMgr from "../../../data/PopMgr";
import glb from "../../../utils/glb";

const { ccclass, property } = cc._decorator;

@ccclass
export default class SetCertificationPop extends MyPop {

    @property(cc.Node)
    btnSubmit: cc.Node = null;

    @property(cc.EditBox)
    txtName: cc.EditBox = null;

    @property(cc.EditBox)
    txtIDcard: cc.EditBox = null;

    onExtLoad() {
        glb.regEventLis(EventType.REAL_USER_IDCARD_SUCCEED,this.realIdSucceed,this);
        this.btnSubmit.on("click", () => {
            let userName: string = this.txtName.string;
            let userIDcard: string = this.txtIDcard.string;
            if (userName.length < 2 || userIDcard.length < 10) {
                PopMgr.alert("请输入真实姓名和身份证号");
            } else {
                RealInfoMgr.reqUserReal(UserRealType.IDcard, JSON.stringify({ idNum: userIDcard, realName: userName }));
            }
        })
    }

    private realIdSucceed(){
        this.close();
    }
}
