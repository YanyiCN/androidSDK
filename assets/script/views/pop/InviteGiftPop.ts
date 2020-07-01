import MyPop from "../../base/MyPop";
import InviteMgr, { InviteHandleType } from "../../data/InviteMgr";
import { EventType, ActiveReceiveStatusType } from "../../define/Const";
import { Lobby } from "../../proto/proto";
import ComUtil from "../../utils/ComUtil";
import PopMgr from "../../data/PopMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class InviteGiftPop extends MyPop {

    @property(cc.Node)
    btnClose: cc.Node = null;

    @property(cc.Node)
    nodeItemInviteExample: cc.Node = null;

    @property(cc.Node)
    contentInvite: cc.Node = null;

    @property(cc.Node)
    btnShare: cc.Node = null;

    @property(cc.Node)
    btnReceiveAll: cc.Node = null;

    @property(cc.ScrollView)
    svInviteGroup: cc.ScrollView = null;

    private curContentPosition: cc.Vec2 = null;
    onExtLoad() {
        this.regLis(EventType.UPDATE_INVITE_INFO, this.updateView);
        InviteMgr.sendInviteReq(InviteHandleType.List);
        this.btnClose.on("click", () => {
            this.close();
        })

        this.btnShare.on("click", () => {
            PopMgr.tip("分享成功~");
        })

        this.btnReceiveAll.on("click", () => {
            //一键领取
            this.curContentPosition = this.svInviteGroup.getContentPosition();
            InviteMgr.sendInviteReq(InviteHandleType.AwardAll);
        })
    }

    private updateView(inviteItemRes?: Lobby.IInviteItemRes[]) {
        this.createInviteGroup(inviteItemRes);
        this.btnReceiveAll.getComponent(cc.Button).interactable = this.haveGiftCanReceive(inviteItemRes);
    }

    /**生成邀请有利列表 */
    private createInviteGroup(inviteItemRes?: Lobby.IInviteItemRes[]) {
        if (inviteItemRes.length > 0) {
            ComUtil.destroyAllChildren(this.contentInvite);
            let inviteGiftCfg = InviteMgr.getInviteGiftConfig();
            for (let i = 0; i < inviteItemRes.length; i++) {
                let curinviteData = inviteItemRes[i];
                //此好友所有奖励状态   0不能领取1未领取2已经领取
                let curAwardGroupStateAll: number[] = [curinviteData.reward_one,
                curinviteData.reward_two, curinviteData.reward_three, curinviteData.reward_four]
                let node = cc.instantiate(this.nodeItemInviteExample);
                node.getChildByName("btnAddFriend").active = false;
                node.getChildByName("spHeadImg").active = true;
                let awardGroup = node.getChildByName("nodeAwardGroup");
                for (let j = 0; j < awardGroup.childrenCount; j++) {
                    let curAwarcCfg = inviteGiftCfg[j];
                    awardGroup.children[j].getChildByName("lbAwardNum").getComponent(cc.Label).string = "X" + curAwarcCfg.rewardNum;
                    awardGroup.children[j].getChildByName("btnNotReceive").active = curAwardGroupStateAll[j] == ActiveReceiveStatusType.NO_OPEN;
                    awardGroup.children[j].getChildByName("btnToReceive").active = curAwardGroupStateAll[j] == ActiveReceiveStatusType.NO_RECEIVE;
                    awardGroup.children[j].getChildByName("spReceived").active = curAwardGroupStateAll[j] == ActiveReceiveStatusType.YET_RECEIVE;
                    awardGroup.children[j].getChildByName("btnToReceive").on("click", () => {
                        this.curContentPosition = this.svInviteGroup.getContentPosition();
                        InviteMgr.sendInviteReq(InviteHandleType.AwardOne, curinviteData[j].ui_id, curAwarcCfg.id);
                    })
                }
                node.active = true;
                node.x = 0;
                this.contentInvite.addChild(node);
            }
        } else {
            this.initGiftView();
        }
        if (this.curContentPosition) {
            this.svInviteGroup.setContentPosition(this.curContentPosition);
        }
    }

    /**初始化视图 */
    private initGiftView() {
        let inviteGiftCfg = InviteMgr.getInviteGiftConfig();
        let node = cc.instantiate(this.nodeItemInviteExample);
        let awardGroup = node.getChildByName("nodeAwardGroup");
        node.getChildByName("btnAddFriend").on("click", () => {
            PopMgr.tip("分享成功~");
        })
        for (let i = 0; i < awardGroup.childrenCount; i++) {
            let curAwarcCfg = inviteGiftCfg[i];
            awardGroup.children[i].getChildByName("lbAwardNum").getComponent(cc.Label).string = "X" + curAwarcCfg.rewardNum;
        }
        node.active = true;
        node.x = 0;
        this.contentInvite.addChild(node);
    }

    /**是否有奖励领取 */
    private haveGiftCanReceive(inviteItemRes?: Lobby.IInviteItemRes[]) {
        if (inviteItemRes.length > 0) {
            for (const iterator of inviteItemRes) {
                if (iterator.reward_one == ActiveReceiveStatusType.NO_RECEIVE ||
                    iterator.reward_two == ActiveReceiveStatusType.NO_RECEIVE ||
                    iterator.reward_three == ActiveReceiveStatusType.NO_RECEIVE ||
                    iterator.reward_four == ActiveReceiveStatusType.NO_RECEIVE)
                    return true;
            }
        }
        return false;
    }

}
