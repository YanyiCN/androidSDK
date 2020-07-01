import MyNode from "../../../base/MyNode";
import ComUtil from "../../../utils/ComUtil";
import { GamePayConfig } from "../../../data/config/CfgGameTree";
import ShopMgr from "../../../data/ShopMgr";
import { SkinType, EventType, SendReqType, ShopType } from "../../../define/Const";
import ProfileMgr from "../../../data/ProfileMgr";
import { ClientCfgIconURL } from "../../../define/ClientCfg";
import HeadBoxSprite from "../../common/HeadBoxSprite";
import DependRes from "../../../data/entity/DependRes";
import ResUtil from "../../../utils/ResUtil";
import mlog from "../../../utils/LogUtil";
import UserMgr from "../../../data/UserMgr";
import PopMgr from "../../../data/PopMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ShopSkinLayer extends MyNode {
    //商品列表
    @property(cc.ToggleContainer)
    nodeSelectSkinType: cc.ToggleContainer = null;

    @property(cc.Node)
    nodeContentGoods: cc.Node = null;

    @property(cc.Node)
    itemExample: cc.Node = null;

    //商品描述
    @property(cc.Node)
    nodeCurSelectDes: cc.Node = null;

    @property(cc.Label)
    lbnCurSkinName: cc.Label = null;

    @property(cc.Label)
    lbCurSelectDes: cc.Label = null;

    @property(cc.Label)
    lbSkinPrice: cc.Label = null;

    @property(cc.Node)
    btnToUse: cc.Node = null;

    @property(cc.Node)
    nodeHead: cc.Node = null;

    private curSelectTopType: number = null;

    private curPayConfig: GamePayConfig = null;

    protected getDependRes(): DependRes[] {
        return [{ url: "spine/skin_head", type: sp.SkeletonData, dir: true }];
    }

    onExtLoad() {
        this.regLis(EventType.SHOP_GEM_PAY_SKIN_SUCCEED, this.onSkinPaySucceed);
        this.regLis(EventType.PROFILE_UPDATE_USED_SKIN_LIST, this.initView);
        ProfileMgr.sendUserSkinReq(SendReqType.List);
        this.btnToUse.on("click", () => {
            this.onBtnClickToBuy();
        })

    }

    private initView() {
        if (this.nodeContentGoods.childrenCount <= 0) {
            let togList = this.nodeSelectSkinType.toggleItems;
            for (let i = 0; i < togList.length; i++) {
                togList[i].node.on("click", () => {
                    this.onRefreshScrollView(i + 1);
                })
            }
            let shopHeadCfgAll = ShopMgr.getGamePaySkinHeadConfig();
            let needShowShopHeadCfgAll = this.showNotHaveGoods(shopHeadCfgAll, SkinType.Head);
            this.comCreateGoodsList(needShowShopHeadCfgAll, SkinType.Head);
        }
        let userHeadUrl = UserMgr.getUserInfo().headImgUrl;
        this.nodeHead.getComponent(HeadBoxSprite).changeHeadImgByUrl(userHeadUrl);
    }

    /**刷新皮肤模块视图 */
    private onRefreshScrollView(tagType: number) {
        if (this.curSelectTopType != tagType) {
            this.curSelectTopType = tagType;

            let theShopGoodsCfgALL: GamePayConfig[] = [];
            let needShowShopGoodsCfg: GamePayConfig[] = [];
            let skinType: number = null;
            switch (tagType) {
                case SkinType.Head:
                    theShopGoodsCfgALL = ShopMgr.getGamePaySkinHeadConfig();
                    skinType = SkinType.Head;
                    break;
                case SkinType.Clock:
                    theShopGoodsCfgALL = ShopMgr.getGamePaySkinClockConfig();
                    skinType = SkinType.Clock;
                    break;
                case SkinType.Bubble:
                    theShopGoodsCfgALL = ShopMgr.getGamePaySkinBubbleConfig();
                    skinType = SkinType.Bubble;
                    break;

                default:
                    break;
            }
            needShowShopGoodsCfg = this.showNotHaveGoods(theShopGoodsCfgALL, skinType);
            this.comCreateGoodsList(needShowShopGoodsCfg, skinType);
        }
    }

    /**刷新及创建类型对应商品展示列表 -已做筛选*/
    private comCreateGoodsList(theGoodsItemList: GamePayConfig[], skinType: number) {
        //清扫战场
        ComUtil.destroyAllChildren(this.nodeContentGoods);
        if (!theGoodsItemList || theGoodsItemList.length <= 0) {
            this.nodeCurSelectDes.active = false;
            return;
        }
        for (let i = 0; i < theGoodsItemList.length; i++) {
            let node = cc.instantiate(this.itemExample);
            let itemCfgInfo = theGoodsItemList[i];
            node.on("click", () => {
                this.curSelectGoodsSkinDes(itemCfgInfo, skinType);
            })
            if (skinType == SkinType.Head) {
                node.getChildByName("spItemIcon").active = false;
                let spineData = this.setCfgSkinHead(itemCfgInfo.payId);
                node.getChildByName("spItemBody").getComponent(sp.Skeleton).skeletonData = spineData
            }
            node.active = true;
            this.nodeContentGoods.addChild(node);
        }
        this.nodeContentGoods.children[0].getComponent(cc.Toggle).isChecked = true;
        this.curSelectGoodsSkinDes(theGoodsItemList[0], skinType);
    }

    /**筛选用户未拥有的商店装扮 */
    private showNotHaveGoods(theGoodsItemList: GamePayConfig[], skinType: number) {
        let notHaveGoodsCfgAll: GamePayConfig[] = [];
        if (skinType == SkinType.Head) {
            let userUsedSkinHead = ProfileMgr.getUserUsedSkinHead();
            if (!userUsedSkinHead || userUsedSkinHead.length <= 0) {
                return theGoodsItemList;
            }
            notHaveGoodsCfgAll = this.findAim(theGoodsItemList, userUsedSkinHead);
        } else if (skinType == SkinType.Clock) {
            let userUsedSkinBlock = ProfileMgr.getUserUsedSkinBlock();
            if (!userUsedSkinBlock || userUsedSkinBlock.length <= 0) {
                return theGoodsItemList;
            }
            notHaveGoodsCfgAll = this.findAim(theGoodsItemList, userUsedSkinBlock);
        } else if (skinType == SkinType.Bubble) {
            let userUsedSkinBubble = ProfileMgr.getUserUsedSkinBubble();
            if (!userUsedSkinBubble || userUsedSkinBubble.length <= 0) {
                return theGoodsItemList;
            }
            notHaveGoodsCfgAll = this.findAim(theGoodsItemList, userUsedSkinBubble);
        }
        return notHaveGoodsCfgAll;
    }


    private findAim(theGoodsItemList: GamePayConfig[], userUsedSkin: any[]) {
        let notHaveGoodsCfgAll: GamePayConfig[] = [];
        let isHave: boolean = false;
        for (let i = 0; i < theGoodsItemList.length; i++) {
            for (let j = 0; j < userUsedSkin.length; j++) {
                if (theGoodsItemList[i].payId == userUsedSkin[j].skin_id) {
                    isHave = true;
                    break;
                }
            }
            if (!isHave) {
                notHaveGoodsCfgAll.push(theGoodsItemList[i]);
            }
            isHave = false;
        }
        return notHaveGoodsCfgAll;
    }


    /**
     * 详情描述
     * @param itemCfgInfo 配置信息
     * @param skinType 类型
     */
    private curSelectGoodsSkinDes(itemCfgInfo: GamePayConfig, skinType: number) {
        this.curPayConfig = itemCfgInfo;
        this.lbnCurSkinName.string = itemCfgInfo.name;
        this.lbCurSelectDes.string = itemCfgInfo.desc + itemCfgInfo.payId;
        this.lbSkinPrice.string = itemCfgInfo.diamond + "钻石";
        if (skinType == SkinType.Head) {
            this.onChangeSkinHead(itemCfgInfo.payId);
        }
        this.nodeHead.active = skinType == SkinType.Head;
        this.nodeCurSelectDes.active = true;
    }

    private onBtnClickToBuy() {
        let curPayConfig = this.curPayConfig;
        let userGem = UserMgr.getUserInfo().coinB;
        if (userGem >= curPayConfig.diamond) {
            ShopMgr.sendPayPropReq(curPayConfig.payId, curPayConfig.itemType, curPayConfig.num);
        } else {
            PopMgr.tip("钻石不足");
        }
    }


    /**修改头像框 */
    private onChangeSkinHead(skinHeadcfgID: number) {
        if (skinHeadcfgID > 105) {
            //此判断暂用-因资源不足
            skinHeadcfgID = 105;
        }
        let url = ClientCfgIconURL.skinHead + skinHeadcfgID;
        if (skinHeadcfgID == 100 || !skinHeadcfgID) {//使用默认头像
            url = null;
        }
        this.nodeHead.getComponent(HeadBoxSprite).changeHeadSkin(url);
    }

    /**item 头像框 */
    private setCfgSkinHead(cfgID: number) {
        if (cfgID > 105) {
            //此判断暂用-因资源不足
            cfgID = 105;
        }
        let spineData: sp.SkeletonData = null;
        let url = ClientCfgIconURL.skinHead + cfgID;
        spineData = cc.loader.getRes(url, sp.SkeletonData);
        return spineData;
    }

    private onSkinPaySucceed(itemType: number) {
        let curPayConfig = this.curPayConfig;
        PopMgr.tip(curPayConfig.name + "X" + curPayConfig.num + "  购买成功");
        this.curSelectTopType = null;
        this.onRefreshScrollView(itemType - 3);
    }

}
