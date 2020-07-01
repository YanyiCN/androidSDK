import MyNode from "../../../base/MyNode";
import ProfileMgr from "../../../data/ProfileMgr";
import ComUtil from "../../../utils/ComUtil";
import { SendReqType, EventType, SkinType } from "../../../define/Const";
import UserMgr from "../../../data/UserMgr";
import { SkinInfo } from "../../../data/entity/UserInfo";
import PopMgr from "../../../data/PopMgr";
import { GameProfileSkinConfig } from "../../../data/config/CfgGameTree";
import HeadBoxSprite from "../../common/HeadBoxSprite";
import { ClientCfgIconURL } from "../../../define/ClientCfg";
import DependRes from "../../../data/entity/DependRes";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ProfileSkinLayer extends MyNode {
    @property(cc.ToggleContainer)
    nodeSelectSkinType: cc.ToggleContainer = null;

    @property(cc.Node)
    nodeContentHeadList: cc.Node = null;

    @property(cc.Node)
    nodeContentBlockList: cc.Node = null;

    @property(cc.Node)
    nodeContentBubbleList: cc.Node = null;

    @property(cc.Node)
    nodeSkinHead: cc.Node = null;

    @property(cc.Node)
    nodeSkinBlock: cc.Node = null;

    @property(cc.Node)
    nodeSkinBubble: cc.Node = null;

    @property(cc.Node)
    nodeItemExample: cc.Node = null;

    @property(cc.Node)
    nodeCurSelectDes: cc.Node = null;

    @property(cc.Node)
    btnToUseSkin: cc.Node = null;

    @property(cc.Node)
    nodeHead: cc.Node = null;

    private curSelectTop: number = null;

    private nodeContentArr: cc.Node[] = null;

    private contentList: cc.Node[] = null;

    private skinCfgListData: any[] = null;

    private userOwnSkinAll: any[] = null;

    private lastSelectSkinData: SkinInfo;

    private curSeletSkinData: GameProfileSkinConfig;

    protected getDependRes(): DependRes[] {
        return [{ url: "spine/skin_head", type: sp.SkeletonData, dir: true }];
    }

    onExtLoad() {
        this.regLis(EventType.PROFILE_CHANGE_SKIN_SUCCEED, this.updateSkinState);
        this.regLis(EventType.PROFILE_UPDATE_USED_SKIN_LIST, this.initView);
        ProfileMgr.sendUserSkinReq(SendReqType.List);
        this.nodeContentArr = [this.nodeSkinHead, this.nodeSkinBlock, this.nodeSkinBubble];
        this.contentList = [this.nodeContentHeadList, this.nodeContentBlockList, this.nodeContentBubbleList];
        let togList = this.nodeSelectSkinType.toggleItems;
        for (let i = 0; i < togList.length; i++) {
            togList[i].node.on("click", () => {
                this.onTogEvent(i);
            })
        }
        this.btnToUseSkin.on("click", () => {
            this.setLastSelectSkinData(this.curSeletSkinData.skinType);
            let toUseSkinID = this.getCurSelectSkinID(this.curSeletSkinData);
            ProfileMgr.sendUserSkinReq(SendReqType.Other, toUseSkinID);
        })

        let userHeadUrl = UserMgr.getUserInfo().headImgUrl;
        this.nodeHead.getComponent(HeadBoxSprite).changeHeadImgByUrl(userHeadUrl);
    }

    private initView(skinAll: any[]) {
        this.userOwnSkinAll = skinAll;
        let headCfgListData = this.orderList(ProfileMgr.getUserSkinHeadConfig());
        let blockCfgListData = this.orderList(ProfileMgr.getUserSkinClockConfig());
        let bubbleCfgListData = this.orderList(ProfileMgr.getUserSkinBubbleConfig());
        this.skinCfgListData = [headCfgListData, blockCfgListData, bubbleCfgListData];
        this.comCreateCfgList(this.skinCfgListData[SkinType.Head - 1], this.nodeContentHeadList);
    }
    private comCreateCfgList(cfgData: [GameProfileSkinConfig], nodeContent: cc.Node) {
        for (let i = 0; i < cfgData.length; i++) {
            let theCfgData = cfgData[i];
            let node = cc.instantiate(this.nodeItemExample);
            if (this.ownTheSkin(theCfgData.skinType, theCfgData.skinId)) {
                node.getChildByName("spLock").active = false;
                if (this.usingTheSkin(theCfgData.skinType, theCfgData.skinId)) {
                    node.getChildByName("spUsingIcon").active = true;
                } else {
                    node.getChildByName("spUsingIcon").active = false;
                }
            } else {
                node.getChildByName("spLock").active = true;
            }
            node.on("click", () => {
                this.updateCurSelectSkinInfo(theCfgData);
            })
            if (theCfgData.skinType == SkinType.Head) {
                let spineData = this.setCfgSkinHead(theCfgData.skinId);
                node.getChildByName("spItemBodySpine").getComponent(sp.Skeleton).skeletonData = spineData;
                node.getChildByName("spItemBody").active = false;
            }
            node.active = true;
            node.name = "item" + theCfgData.skinId;//排序&挂载脚本
            nodeContent.addChild(node);
            nodeContent.children[0].getComponent(cc.Toggle).isChecked = true;
            this.updateCurSelectSkinInfo(cfgData[0]);
        }
    }

    /**刷新当前选择皮肤信息 */
    private updateCurSelectSkinInfo(theCfgData: GameProfileSkinConfig) {
        this.curSeletSkinData = theCfgData;
        this.nodeCurSelectDes.getChildByName("spCurSkinNamebg").getChildByName("lbnCurSkinName").getComponent(cc.Label).string = theCfgData.skinName;
        this.nodeCurSelectDes.getChildByName("lbCurSelectDes").getComponent(cc.Label).string = ComUtil.formatStr("%s %s,\n%s", theCfgData.skinName, theCfgData.skinId, theCfgData.skinDesc);
        let curSkinTime = this.ownTheSkinTime(theCfgData.skinType, theCfgData.skinId);
        let lbCurSkinTime = this.nodeCurSelectDes.getChildByName("lbCurSkinResidueTime").getComponent(cc.Label);
        if (curSkinTime) {
            if (curSkinTime == 0) {
                lbCurSkinTime.string = "拥有期限:永久";
            } else {
                lbCurSkinTime.string = "截止日期：" + ComUtil.formatDate(new Date(curSkinTime), "yyyy-MM-dd");
            }
        } else {
            lbCurSkinTime.string = "未获得";
        }
        this.nodeHead.active = theCfgData.skinType == SkinType.Head;
        if (theCfgData.skinType == SkinType.Head) {
            this.onChangeSkinHead(theCfgData.skinId);
        }
        if (this.ownTheSkin(theCfgData.skinType, theCfgData.skinId)) {
            if (this.usingTheSkin(theCfgData.skinType, theCfgData.skinId)) {
                this.btnToUseSkin.active = false;
            } else {
                this.btnToUseSkin.active = true;
            }
        } else {
            this.btnToUseSkin.active = false;
        }
    }

    private onTogEvent(tag: number) {
        if (this.curSelectTop != tag) {
            this.curSelectTop = tag;
            let nodeContentArr = this.nodeContentArr;
            for (let i = 0; i < nodeContentArr.length; i++) {
                nodeContentArr[i].active = false;
            }
            if (this.contentList[tag].childrenCount <= 0) {
                this.comCreateCfgList(this.skinCfgListData[tag], this.contentList[tag]);
            } else {
                this.updateCurSelectSkinInfo(this.skinCfgListData[tag][0]);
                this.nodeContentArr[tag].getComponent(cc.ScrollView).scrollToTop();
            }
            nodeContentArr[tag].active = true;
            this.contentList[tag].children[0].getComponent(cc.Toggle).isChecked = true;
        }
    }

    /**是否拥有此皮肤 */
    private ownTheSkin(skinType: number, skinID: number): boolean {
        let ownSkinList = this.userOwnSkinAll[(skinType - 1)];
        for (const iterator of ownSkinList) {
            if (skinID == iterator.skin_id) {
                return true;
            }
        }
        return false;
    }

    /**正在穿戴此皮肤 */
    private usingTheSkin(skinType: number, skinID: number): boolean {
        let usingHeadID: number = UserMgr.getUserInfo().UserUsePropInfo.headSkinJson.cId;
        let usingClockID: number = UserMgr.getUserInfo().UserUsePropInfo.clockSkinJson.cId;
        let usingBubbleID: number = UserMgr.getUserInfo().UserUsePropInfo.bubbleSkinJson.cId;
        switch (skinType) {
            case SkinType.Head:
                if (!usingHeadID && skinID == skinType * 100) {
                    return true;
                }
                if (skinID == usingHeadID) {
                    return true;
                }
                break;
            case SkinType.Clock:
                if (!usingClockID && skinID == skinType * 100) {
                    return true;
                }
                if (skinID == usingClockID) {
                    return true;
                }
                break;
            case SkinType.Bubble:
                if (!usingBubbleID && skinID == skinType * 100) {
                    return true;
                }
                if (skinID == usingBubbleID) {
                    return true;
                }
                break;
            default:
                break;
        }
        return false;
    }

    /**获得想换上的皮肤usID，cfgData-->serData */
    private getCurSelectSkinID(curCfgData: GameProfileSkinConfig) {
        let ownSkinList = this.userOwnSkinAll[(curCfgData.skinType - 1)];
        for (const iterator of ownSkinList) {
            if (curCfgData.skinId == iterator.skin_id) {
                return iterator.us_id;
            }
        }
        // let serData: Lobby.SkinItemRes = {
        //     us_id: serID,
        //     skin_id: curCfgData.skinId,
        //     skin_type: curCfgData.skinType,
        //     expire_time: null,
        //     toJSON: null
        // }
    }

    /**记录即将换掉的皮肤，cfgData-->serData */
    private setLastSelectSkinData(curSkinType: number) {
        let serData: SkinInfo = null;
        switch (curSkinType) {
            case SkinType.Head:
                serData = UserMgr.getUserInfo().UserUsePropInfo.headSkinJson;
                break;
            case SkinType.Clock:
                serData = UserMgr.getUserInfo().UserUsePropInfo.clockSkinJson;
                break;
            case SkinType.Bubble:
                serData = UserMgr.getUserInfo().UserUsePropInfo.bubbleSkinJson;
                break;

            default:
                break;
        }
        this.lastSelectSkinData = serData;
    }

    /**解锁排序 */
    private orderList(cfgList: GameProfileSkinConfig[]) {
        switch (cfgList[0].skinType) {
            case SkinType.Head:
                if (!ProfileMgr.getUserUsedSkinHead() || ProfileMgr.getUserUsedSkinHead().length <= 0) {
                    return cfgList;
                }
                break;
            case SkinType.Clock:
                if (!ProfileMgr.getUserUsedSkinBlock() || ProfileMgr.getUserUsedSkinBlock().length <= 0) {
                    return cfgList;
                }
                break;
            case SkinType.Bubble:
                if (!ProfileMgr.getUserUsedSkinBubble() || ProfileMgr.getUserUsedSkinBubble().length <= 0) {
                    return cfgList;
                }
                break;

            default:
                break;
        }
        let unlock: GameProfileSkinConfig[] = [];
        let noUnlock: GameProfileSkinConfig[] = [];
        for (const obj of cfgList) {
            if (this.ownTheSkin(obj.skinType, obj.skinId)) {
                unlock.push(obj);
            } else {
                noUnlock.push(obj);
            }
        }
        for (const iterator of noUnlock) {
            unlock.push(iterator);
        }
        return unlock;
    }

    /**拥有此皮肤期限 */
    private ownTheSkinTime(skinType: number, skinID: number) {
        let ownSkinList = this.userOwnSkinAll[(skinType - 1)];
        for (const iterator of ownSkinList) {
            if (skinID == iterator.skin_id) {
                return iterator.expire_time;
            }
        }
        return null;
    }

    /**用户更换皮肤刷新View 使用状态 */
    private updateSkinState(msg) {
        PopMgr.tip(msg.tip);
        let changeSkinType = Math.floor(msg.cfgID / 100);
        let curUsingSkinNodeName = "item" + msg.cfgID;
        this.contentList[changeSkinType - 1].getChildByName(curUsingSkinNodeName).getChildByName("spUsingIcon").active = true;
        let lastUsedSkinNodeName = "item" + (this.lastSelectSkinData.cId);
        if (!this.lastSelectSkinData.cId) {
            lastUsedSkinNodeName = "item" + changeSkinType * 100;
        }
        this.contentList[changeSkinType - 1].getChildByName(lastUsedSkinNodeName).getChildByName("spUsingIcon").active = false;
        this.btnToUseSkin.active = false;

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


}
