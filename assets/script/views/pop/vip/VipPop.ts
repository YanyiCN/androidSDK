import MyPop from "../../../base/MyPop";
import VipMgr, { VipResType } from "../../../data/VipMgr";
import VipPageViewItemLayer from "./VipPageViewItemLayer";
import { VIPConfig } from "../../../data/config/CfgGameTree";
import UserMgr from "../../../data/UserMgr";
import { EventType, PopLayer } from "../../../define/Const";
import PopMgr from "../../../data/PopMgr";
import SetMgr from "../../../data/SetMgr";
import ComUtil from "../../../utils/ComUtil";
import RedPointMgr, { RedPointTypes } from "../../../data/RedPointMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class VipPop extends MyPop {

    @property(cc.Node)
    contentPageView: cc.Node = null;

    @property(cc.Node)
    pvItemExample: cc.Node = null;

    @property(cc.Node)
    btnToLeft: cc.Node = null;

    @property(cc.Node)
    btnToRight: cc.Node = null;

    @property(cc.PageView)
    pageView: cc.PageView = null;

    @property(cc.Node)
    btnBag: cc.Node = null;

    @property(cc.Node)
    btnSet: cc.Node = null;

    @property(cc.Label)
    lbGold: cc.Label = null;

    @property(cc.Label)
    lbGem: cc.Label = null;

    @property(cc.Label)
    lbCoupon: cc.Label = null;




    onExtLoad() {
        this.regLis(EventType.RED_POINT_UPDATE, this.onUpdateRedManage);
        this.regLis(EventType.UPDATE_USER_MONEY, this.updateUserMoneyView);
        this.regLis(EventType.VIP_INIT_INFO, this.initView);
        this.pageView.node.on('page-turning', this.onPageTurning, this);
        VipMgr.sendVipReq(VipResType.Info);
        if (this.pageView.getCurrentPageIndex() == 0) {
            this.btnToLeft.active = false;
        }
        this.btnToRight.on("click", () => {
            if (this.pageView.getCurrentPageIndex() + 1 < this.pageView.getPages().length) {
                this.pageView.setCurrentPageIndex(this.pageView.getCurrentPageIndex() + 1);
                this.onPageTurning();
            }
        })

        this.btnToLeft.on("click", () => {
            if (this.pageView.getCurrentPageIndex() - 1 >= 0) {
                this.pageView.setCurrentPageIndex(this.pageView.getCurrentPageIndex() - 1);
                this.onPageTurning();
            }
        })

        this.btnBag.on("click", () => {
            PopMgr.showPop(PopLayer.POP_BAG)
        })

        this.btnSet.on("click", () => {
            PopMgr.showPop(PopLayer.POP_SET)
        })


        this.updateUserMoneyView();
        this.onUpdateRedManage();
    }

    private initView() {
        let vipAllData = VipMgr.getVIPConfig();
        for (let i = 0; i < vipAllData.length; i++) {
            let node = cc.instantiate(this.pvItemExample);
            node.getComponent(VipPageViewItemLayer).setCurVipData(vipAllData[i]);
            node.y = 0;
            node.active = true;
            this.pageView.addPage(node);
        }
        let userVipLv = UserMgr.getUserInfo().vipLevel;
        let vipIndex = 0;
        vipIndex = userVipLv <= 0 ? 0 : userVipLv - 1;
        this.pageView.setCurrentPageIndex(vipIndex);
    }

    private onPageTurning() {
        this.btnToLeft.active = this.pageView.getCurrentPageIndex() != 0;
        this.btnToRight.active = this.pageView.getCurrentPageIndex() != this.pageView.getPages().length - 1;
    }

    private updateUserMoneyView() {
        let userInfo = UserMgr.getUserInfo()
        this.lbGold.string = userInfo.coinA.toString();
        this.lbGem.string = userInfo.coinB.toString();
        this.lbCoupon.string = userInfo.coinC.toString();
    }

    /**红点动态刷新 */
    private onUpdateRedManage() {
        //设置红点
        RedPointMgr.updateRedPointNode(this.btnSet, [RedPointTypes.RealId, RedPointTypes.RealPhone, RedPointTypes.FeedbackMessage]);
    }
}
