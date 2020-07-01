import MyPop from "../../base/MyPop";
import PopMgr from "../../data/PopMgr";
import ProfileMgr from "../../data/ProfileMgr";
import { UpdataUserInfoTpye, EventType, PorpType } from "../../define/Const";
import UserMgr from "../../data/UserMgr";
import BagMgr from "../../data/BagMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ChangeNickNamePop extends MyPop {

    @property(cc.EditBox)
    txtNickName: cc.EditBox = null;

    @property(cc.Node)
    btnConfirm: cc.Node = null;

    @property(cc.Label)
    lbTip: cc.Label = null;

    constructor() {
        super();
        // this.popCfg.mask=false;
    }

    onExtLoad() {
        this.initView();
        this.regLis(EventType.CHANGE_NICK_NAME_SUCCEED, () => {
            PopMgr.tip("恭喜你，新昵称已生效")
            this.close();
        })
        this.btnConfirm.on("click", () => {
            this.onChangeNickName();
        })
    }

    private initView() {
        let modifyNickName = UserMgr.getUserInfo().UserOtherInfo.modifyNickName;
        let freeChangeName: boolean = modifyNickName == 0;
        this.lbTip.string = freeChangeName ? "首次免费" : "改名卡-1";
    }

    private onChangeNickName() {
        if (this.txtNickName.string.length >= 2) {
            let modifyNickName = UserMgr.getUserInfo().UserOtherInfo.modifyNickName;
            let freeChangeName: boolean = modifyNickName == 0;
            let sendType: number = null;
            if (!freeChangeName) {
                let nameCardProdData = BagMgr.getThePropData(PorpType.NameCard);
                let nameCardProdNum = nameCardProdData ? nameCardProdData.item_num : 0;
                if (nameCardProdNum > 0) {
                    sendType = UpdataUserInfoTpye.CHANGE_NICKNAME_BYPROP;
                } else {
                    PopMgr.tip("改名卡不足!");
                }
            } else {
                sendType = UpdataUserInfoTpye.CHANGE_NICKNAME;
            }
            sendType && UserMgr.sendReqUpdateUser(sendType, this.txtNickName.string);
        } else {
            PopMgr.alert("请核实昵称格式！");
        }
    }

}
