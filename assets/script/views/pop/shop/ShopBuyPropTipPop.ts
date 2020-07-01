import MyPop from "../../../base/MyPop";
import { GamePayConfig } from "../../../data/config/CfgGameTree";
import UserMgr from "../../../data/UserMgr";
import PopMgr from "../../../data/PopMgr";
import ShopMgr from "../../../data/ShopMgr";
import { ShopType, EventType } from "../../../define/Const";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ShopBuyPropTipPop extends MyPop {

    @property(cc.Label)
    lbPropName: cc.Label = null;

    @property(cc.Label)
    lbPropDes: cc.Label = null;

    @property(cc.Node)
    btnMinusNO: cc.Node = null;

    @property(cc.Node)
    btnMinusOK: cc.Node = null;

    @property(cc.Node)
    btnAddNO: cc.Node = null;

    @property(cc.Node)
    btnAddOK: cc.Node = null;

    @property(cc.Node)
    btnMaxNO: cc.Node = null;

    @property(cc.Node)
    btnMaxOK: cc.Node = null;

    @property(cc.Label)
    lbCurNum: cc.Label = null;

    @property(cc.Node)
    btnPropPrice: cc.Node = null;

    @property(cc.Label)
    lbPropPrice: cc.Label = null;

    private curPropPriceAll: number = null;

    private curPropPriceOne: number = null;

    private curSelectNum: number = null;

    private curPayConfig: GamePayConfig = null;

    //长按+
    private longClickAdd: number = null;

    //长按-
    private longClickMinus: number = null;

    // private speedNum = null;//控制速度

    onExtLoad(propData: GamePayConfig) {
        this.regLis(EventType.SHOP_GEM_PAY_PROP_SUCCEED, () => {
            this.onPropPaySucceed();
        })
        this.curPayConfig = propData;
        this.initView(propData);
        this.btnPropPrice.on("click", () => {
            this.onClickToBuyTheProp();
        })

        this.btnMinusOK.on("click", () => {
            this.onClickBtnToMinus();
        })

        this.btnAddOK.on("click", () => {
            this.onClickBtnToAdd();
        })


        this.btnMaxOK.on("click", () => {
            this.onClickBtnToMax();
        })

        this.btnAddOK.on(cc.Node.EventType.TOUCH_START, () => {
            this.longClickAdd = 1; //this.speedNum = 1;
        })

        this.btnMinusOK.on(cc.Node.EventType.TOUCH_START, () => {
            this.longClickMinus = 1; //this.speedNum = 1;
        })

        this.btnAddOK.on(cc.Node.EventType.TOUCH_END, () => {
            this.longClickAdd = null; //this.speedNum = null;
        })

        this.btnMinusOK.on(cc.Node.EventType.TOUCH_END, () => {
            this.longClickMinus = null; //this.speedNum = null;
        })
    }

    update() {
        if (this.longClickAdd && this.longClickAdd > 0) {
            this.longClickAdd++;
        }

        if (this.longClickMinus && this.longClickMinus > 0) {
            this.longClickMinus++;
        }

        this.updateView();

        // this.speedNum++;
        // if (this.speedNum && this.speedNum > 5) {
        //     this.speedNum = 0;
        //     this.updateView();
        // }
    }

    private initView(propData: GamePayConfig) {
        this.curPropPriceAll = propData.diamond;
        this.curPropPriceOne = propData.diamond;
        this.lbPropName.string = propData.name;
        this.lbPropDes.string = propData.desc;
        this.curSelectNum = Number(this.lbCurNum.string);
        this.updateBtnState();

    }

    private onClickToBuyTheProp() {
        let userGem = UserMgr.getUserInfo().coinB;
        let payConfig = this.curPayConfig;
        let payNum = this.curSelectNum;
        if (userGem >= this.curPropPriceAll) {
            if (payNum > 0) {
                ShopMgr.sendPayPropReq(payConfig.payId, ShopType.Prop, payNum);
            }
        } else {
            PopMgr.tip("钻石不足");
        }

    }

    /**用户选择购买量 - */
    private onClickBtnToMinus() {
        this.curSelectNum -= 1;
        this.curPropPriceAll = this.curSelectNum * this.curPropPriceOne;
        this.lbCurNum.string = this.curSelectNum.toString();
        this.updateBtnState();
    }

    /**用户选择购买量 + */
    private onClickBtnToAdd() {
        this.curSelectNum += 1;
        this.curPropPriceAll = this.curSelectNum * this.curPropPriceOne;
        this.lbCurNum.string = this.curSelectNum.toString();
        this.updateBtnState();
    }

    /**用户选择购买量 max */
    private onClickBtnToMax() {
        let userGem = UserMgr.getUserInfo().coinB;
        let maxNum = Math.floor(userGem / this.curPropPriceOne);
        this.curSelectNum = maxNum;
        this.curPropPriceAll = this.curSelectNum * this.curPropPriceOne;
        this.lbCurNum.string = this.curSelectNum.toString();
        this.updateBtnState();
    }

    /**按钮状态改变 */
    private updateBtnState() {
        let userGem = UserMgr.getUserInfo().coinB;
        let curPropPriceOne = this.curPropPriceOne;
        if (userGem >= this.curPropPriceAll + curPropPriceOne) {
            this.btnAddOK.active = true;
            this.btnAddNO.active = false;

            this.btnMaxOK.active = true;
            this.btnMaxNO.active = false;
        } else {
            this.btnAddOK.active = false;
            this.btnAddNO.active = true;

            this.btnMaxOK.active = false;
            this.btnMaxNO.active = true;
        }

        if (Number(this.curSelectNum) <= 1) {
            this.btnMinusOK.active = false;
            this.btnMinusNO.active = true;
        } else {
            this.btnMinusOK.active = true;
            this.btnMinusNO.active = false;
        }


        this.lbPropPrice.string = this.curPropPriceAll + "钻石";
    }


    //长按刷新视图-1s +- 1
    private updateView() {
        if (this.longClickAdd || this.longClickMinus) {
            let userGem = UserMgr.getUserInfo().coinB;
            if (this.longClickAdd && this.longClickAdd > 0 && this.btnAddOK.active) {
                this.curSelectNum += (Math.floor(this.longClickAdd / 30));
            }

            if (this.longClickMinus && this.longClickMinus > 0 && this.btnMinusOK.active) {
                this.curSelectNum -= (Math.floor(this.longClickMinus / 30));
            }
            this.curPropPriceAll = this.curSelectNum * this.curPropPriceOne;
            this.lbCurNum.string = this.curSelectNum.toString();

            this.updateBtnState();
            if (!this.btnAddOK.active) {
                this.longClickAdd = null;
                let userGem = UserMgr.getUserInfo().coinB;
                let maxNum = Math.floor(userGem / this.curPropPriceOne);
                if (this.curSelectNum > maxNum) {
                    this.curSelectNum = maxNum;
                    this.curPropPriceAll = this.curSelectNum * this.curPropPriceOne;
                    this.lbCurNum.string = this.curSelectNum.toString();
                    this.updateBtnState();
                }
            }

            if (!this.btnMinusOK.active) {
                this.longClickMinus = null;
                if (this.curSelectNum <= 0) {
                    this.curSelectNum = 1;
                    this.curPropPriceAll = this.curSelectNum * this.curPropPriceOne;
                    this.lbCurNum.string = this.curSelectNum.toString();
                    this.updateBtnState();
                }
            }
        }
    }

    private onPropPaySucceed() {
        let thePropInfo = this.curPayConfig;
        let payNum = this.curSelectNum;
        this.close();
        PopMgr.tip(thePropInfo.name + "X" + payNum + "  购买成功");
    }

}
