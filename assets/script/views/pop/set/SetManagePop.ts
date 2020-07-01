import MyPop from "../../../base/MyPop";
import PopMgr from "../../../data/PopMgr";
import { PopLayer, EventType } from "../../../define/Const";
import DependRes from "../../../data/entity/DependRes";
import HeadBoxSprite from "../../common/HeadBoxSprite";
import UserMgr from "../../../data/UserMgr";
import SoundMgr from "../../../data/SoundMgr";
import SetMgr from "../../../data/SetMgr";
import { Texts } from "../../../define/Texts";
import glb from "../../../utils/glb";
import ComUtil from "../../../utils/ComUtil";
import RedPointMgr, { RedPointTypes } from "../../../data/RedPointMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class SetManagePop extends MyPop {
    @property(cc.Node)
    private btnAccountSecurity: cc.Node = null;

    @property(cc.Node)
    private btnEscGame: cc.Node = null;

    @property(cc.Node)
    private btnService: cc.Node = null;

    @property(cc.Node)
    private btnCertification: cc.Node = null;

    @property(cc.Node)
    private btnFeedback: cc.Node = null;

    @property(cc.Node)
    private btnVersion: cc.Node = null;

    @property(cc.Node)
    private spHead: cc.Node = null;

    @property(cc.Toggle)
    private togShock: cc.Toggle = null;

    @property(cc.Toggle)
    private togMusic: cc.Toggle = null;

    @property(cc.Toggle)
    private togEffect: cc.Toggle = null;

    @property(cc.Toggle)
    private togVoice: cc.Toggle = null;

    @property(cc.Toggle)
    private togFace: cc.Toggle = null;


    @property(cc.Label)
    lbNickName: cc.Label = null;

    @property(cc.Label)
    lbID: cc.Label = null;

    protected getDependRes(): DependRes[] {
        return [];// { url: "sound/other", type: cc.AudioClip, dir: true }
    }
    onExtLoad() {
        this.regLis(EventType.RED_POINT_UPDATE, this.updateNewsFeedbackRed);
        glb.regEventLis(EventType.UPDATE_USERINFO, this.updateUsetInfo, this);
        this.initView()
        this.regClick()
        this.updateUsetInfo();
        this.updateNewsFeedbackRed();
    }

    private regClick() {
        this.btnCertification.on("click", () => {
            PopMgr.showPop(PopLayer.POP_SET_CERTIFICATION);
        })

        this.btnFeedback.on("click", () => {
            PopMgr.showPop(PopLayer.POP_SET_FEEDBACK);
        })

        this.btnVersion.on("click", () => {
            PopMgr.tip("客户端版号: " + UserMgr.getVersion())
        })

        this.btnAccountSecurity.on("click", () => {
            PopMgr.showPop(PopLayer.POP_SET_ACCOUNT_SAFETY);
        })



        this.btnEscGame.on("click", () => {
            PopMgr.alert({
                msg: Texts.escGame,
                okCallback: () => {
                    cc.game.end();
                },
                cancelBtn: true
            })
        })

        this.btnService.on("click", () => {
            PopMgr.showPop(PopLayer.POP_SET_CONTACT_SERVICE);
        })
        this.togShock.node.on("toggle", () => {
            SetMgr.setOpenShock(this.togShock.isChecked)
            this.updateShackShow()
        })

        this.togMusic.node.on("toggle", () => {
            if (this.togMusic.isChecked) {
                SoundMgr.setMusicVolume(100)
            } else {
                SoundMgr.setMusicVolume(0)
            }
            this.updateMusicShow()
        })


        this.togEffect.node.on("toggle", () => {
            if (this.togEffect.isChecked) {
                SoundMgr.setEffectVolume(100)
            } else {
                SoundMgr.setEffectVolume(0)
            }
            this.updateEffectShow()
        })

        this.togVoice.node.on("toggle", () => {
            SetMgr.setOpenVoice(this.togVoice.isChecked);
            this.updateVoiceShow()
        })

        this.togFace.node.on("toggle", () => {
            SetMgr.setOpenFace(this.togFace.isChecked);
            this.updateFaceShow()
        })
    }

    private initView() {
        this.spHead.getComponent(HeadBoxSprite).changeHeadImgByUrl(UserMgr.getUserInfo().headImgUrl);
        //this.spHead.getComponent(HeadBoxSprite).changeHeadSkin(UserMgr.getUserInfo().UserUsePropInfo.headSkinJson.cId);

        this.updateShackShow();
        this.updateMusicShow();
        this.updateEffectShow();
        this.updateVoiceShow();
        this.updateFaceShow();
    }

    private updateShackShow() {
        if (SetMgr.getOpenShock()) {
            this.togShock.isChecked = true;
        } else {
            this.togShock.isChecked = false;
        }
    }

    private updateMusicShow() {
        if (SoundMgr.getMusicVolume() > 0) {
            this.togMusic.isChecked = true;
        } else {
            this.togMusic.isChecked = false;
        }

    }


    private updateEffectShow() {
        if (SoundMgr.getEffectVolume() > 0) {
            this.togEffect.isChecked = true;
        } else {
            this.togEffect.isChecked = false;
        }

    }

    private updateVoiceShow() {
        if (SetMgr.getOpenVoice()) {
            this.togVoice.isChecked = true;
        } else {
            this.togVoice.isChecked = false;
        }

    }


    private updateFaceShow() {
        if (SetMgr.getOpenFace()) {
            this.togFace.isChecked = true;
        } else {
            this.togFace.isChecked = false;
        }

    }

    private updateUsetInfo() {
        ComUtil.nodeRedFlush(this.btnAccountSecurity, UserMgr.getUserInfo().UserOtherInfo.mobile.length <= 0);
        this.btnCertification.active = UserMgr.getUserInfo().UserOtherInfo.idCard.length <= 0;

        this.lbNickName.string = UserMgr.getUserInfo().nickName;
        this.lbID.string = UserMgr.getUserInfo().userId.toString();
    }

    private updateNewsFeedbackRed() {
        //意见反馈红点
        RedPointMgr.updateRedPointNode(this.btnFeedback, [RedPointTypes.FeedbackMessage]);
    }


}
