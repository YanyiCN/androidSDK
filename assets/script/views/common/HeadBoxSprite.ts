import ResUtil from "../../utils/ResUtil";
import mlog from "../../utils/LogUtil";
import { Texts } from "../../define/Texts";
import PopMgr from "../../data/PopMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class HeadBoxSprite extends cc.Component {
    @property(cc.Sprite)
    spHeadIcon: cc.Sprite = null;

    @property(cc.Mask)
    maskHead: cc.Mask = null;

    @property(sp.Skeleton)
    spineFrame: sp.Skeleton = null;

    @property(cc.Sprite)
    spSkin: cc.Sprite = null;

    private spfHead: cc.SpriteFrame = null;
    private spineData: sp.SkeletonData = null;
    private spfMask: cc.SpriteFrame = null;
    private cacheHeadUrl: string;
    private cacheSex: number;
    private headSkincfgID: number;
    private spfHeadSkin: cc.SpriteFrame = null;

    onLoad() {
        this.updateShow();
    }

    private updateShow() {
        if (this.spHeadIcon != null && this.spfHead != null) {
            this.spHeadIcon.spriteFrame = this.spfHead;
            this.spfHead = null;
        }
        if (this.spineFrame != null) {
            if (this.spineData != null) {
                this.spineFrame.node.active = true;
                this.spineFrame.skeletonData = this.spineData;
                this.spineFrame.animation = "animation";
                this.spineData = null;
            } else {
                this.spineFrame.node.active = false;
                this.spineFrame.skeletonData = null;
            }
        }
        if (this.maskHead != null && this.spfMask != null) {
            this.maskHead.spriteFrame = this.spfMask;
            this.spfMask = null;
        }

        if (this.spSkin != null && this.spfHeadSkin != null) {
            this.spSkin.spriteFrame = this.spfHeadSkin;
            this.spfHeadSkin = null;
        }

    }

    changeHeadImg(headFrame: cc.SpriteFrame, sex: number = 1) {
        if (sex == 2 && headFrame == null) {
            headFrame = ResUtil.getAtlasFrame("plist/common", "cm_head_wm");
        }
        this.spfHead = headFrame;
        this.updateShow();
    }

    /**修改头像图片 */
    changeHeadImgByUrl(url: string, sex: number = 1) {
        if (this.cacheHeadUrl == url && this.cacheSex == sex) {
            return;
        }
        if (url != null && url.length > 0) {
            this.cacheHeadUrl = url;
            this.cacheSex = sex;
            cc.loader.load({ url: url, type: "png" }, (err, texture) => {
                if (err) {
                    mlog.error("下载头像异常", err);
                    return;
                }
                if (!this.isValid) {
                    return;
                }
                this.changeHeadImg(new cc.SpriteFrame(texture), sex);
            })
        } else {
            this.changeHeadImg(null, sex);
        }
    }
    changeMask(frame: cc.SpriteFrame) {
        this.spfMask = frame;
        this.updateShow();
    }

    removeBg() {
        this.node.removeComponent(cc.Sprite);
    }

    /**远端修改头像框 */
    async changeHeadFrame(themeId: string) {
        if (themeId == null || themeId.length <= 0) {
            this.spineData = null;
            this.updateShow();
            return;
        }
        this.spineData = await ResUtil.loadSpineDataByUrlAuto(Texts.headFrameIconUrl, `hf_${themeId}`)

        this.updateShow();
    }

    /**本地修改头像框 */
    async changeHeadSkin(url: string) {
        if (url == null || url.length <= 0) {
            this.spineData = null;
            this.updateShow();
            return;
        }
        this.spineData = await ResUtil.loadResAuto(url, sp.SkeletonData, (error: Error, resource) => {
            if (error) {
                mlog.error("头像框异常", error);
                return;
            }
            this.spineData = resource;
        })
        this.updateShow();

    }


    /**修改头像皮肤 已废 */
    agoChangeHeadSkin(cfgID: number) {
        if (this.headSkincfgID == cfgID) return;
        // PopMgr.tip("此头像皮肤美术正在出图，敬请期待");
        return;
        if (cfgID && cfgID > 0) {
            this.headSkincfgID = cfgID;
            this.spfHeadSkin = ResUtil.getAtlasFrame("", ("" + cfgID));
            this.updateShow();
        }
    }

}