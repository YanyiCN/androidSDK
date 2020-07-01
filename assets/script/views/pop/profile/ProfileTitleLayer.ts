import MyNode from "../../../base/MyNode";
import PopMgr from "../../../data/PopMgr";
import ProfilePanelPop from "./ProfilePanelPop";
import { PopLayer, UpdataUserInfoTpye, EventType } from "../../../define/Const";
import ProfileMgr from "../../../data/ProfileMgr";
import UserMgr from "../../../data/UserMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ProfileTitleLayer extends MyNode {

    @property(cc.Node)
    nodeContentList: cc.Node = null;

    @property(cc.Node)
    nodeItemExample: cc.Node = null;

    private lastUseTitleID: number = null;

    onExtLoad() {
        this.regLis(EventType.CHANGE_TITLE_SUCCEED, this.onChangeTitle);
        this.initView();
    }

    private initView() {
        let titleCfgList = ProfileMgr.getUserTitleConfig();
        for (let i = 0; i < titleCfgList.length; i++) {
            let node = cc.instantiate(this.nodeItemExample);
            let titleData = titleCfgList[i];
            node.getChildByName("spLockMask").active = !this.ownTheTitle(titleData.id);
            node.getChildByName("spTestIcon").getChildByName("lbTitleName").getComponent(cc.Label).string = titleData.title;
            let btnTouse = node.getChildByName("nodeUseType").getChildByName("btnTouse");
            let btnToget = node.getChildByName("nodeUseType").getChildByName("btnToget");
            let spUsing = node.getChildByName("nodeUseType").getChildByName("spUsing");
            if (this.ownTheTitle(titleData.id)) {
                if (titleData.id == UserMgr.getUserInfo().titleId) {
                    btnTouse.active = false;
                    spUsing.active = true;
                } else {
                    btnTouse.active = true;
                    spUsing.active = false;
                }
                btnToget.active = false;
            } else {
                btnTouse.active = false;
                btnToget.active = true;
                spUsing.active = false;
            }
            node.getChildByName("nodeUseType").getChildByName("btnTouse").on("click", () => {
                this.lastUseTitleID = UserMgr.getUserInfo().titleId;
                UserMgr.sendReqUpdateUser(UpdataUserInfoTpye.USE_TITLE, titleData.id.toString());
            })
            node.active = true;
            this.nodeContentList.addChild(node);
        }
    }

    /**是否拥有此称号 */
    private ownTheTitle(titleID: number): boolean {
        let userTitleIDAll = UserMgr.getUserInfo().UserOtherInfo.titles;
        for (const iterator of userTitleIDAll) {
            if (titleID == iterator)
                return true;
        }
        return false;
    }


    /**用户称号变动View更新 */
    private onChangeTitle(msg) {
        PopMgr.tip(msg.showTxt);
        let usingTitleIdex = UserMgr.getUserInfo().titleId - 1;
        this.nodeContentList.children[usingTitleIdex].getChildByName("nodeUseType").getChildByName("btnTouse").active = false;
        this.nodeContentList.children[usingTitleIdex].getChildByName("nodeUseType").getChildByName("spUsing").active = true;


        let lastUsedTitleIdex = this.lastUseTitleID - 1;
        this.nodeContentList.children[lastUsedTitleIdex].getChildByName("nodeUseType").getChildByName("btnTouse").active = true;
        this.nodeContentList.children[lastUsedTitleIdex].getChildByName("nodeUseType").getChildByName("spUsing").active = false;

    }
}
