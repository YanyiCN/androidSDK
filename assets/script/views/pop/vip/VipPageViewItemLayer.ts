import MyNode from "../../../base/MyNode";
import { VIPConfig, VipPermissions, VipReward } from "../../../data/config/CfgGameTree";
import UserMgr from "../../../data/UserMgr";
import VipMgr, { VipResType } from "../../../data/VipMgr";
import { AwardType, EventType } from "../../../define/Const";

const { ccclass, property } = cc._decorator;

@ccclass
export default class VipPageViewItemLayer extends MyNode {

    @property(cc.Label)
    lbCurPrivilegeName: cc.Label = null;

    @property(cc.Node)
    nodeCurVipLv: cc.Node = null;

    @property(cc.Node)
    nodeNextVipLv: cc.Node = null;

    @property(cc.Label)
    lbNextLv: cc.Label = null;

    @property(cc.Label)
    lbNeedExp: cc.Label = null;

    @property(cc.ProgressBar)
    nodeProgressBar: cc.ProgressBar = null;

    @property(cc.Label)
    lbBarExp: cc.Label = null;

    @property(cc.Node)
    nodeCurPrivilegeDes: cc.Node = null;

    @property(cc.Node)
    nodeCurGiftName: cc.Node = null;

    @property(cc.Node)
    nodeFirstGift: cc.Node = null;

    @property(cc.Node)
    nodeDayGift: cc.Node = null;

    @property(cc.Node)
    btnGetGift: cc.Node = null;

    @property(cc.Node)
    btnLessLevel: cc.Node = null;

    @property(cc.Node)
    btnReceived: cc.Node = null;

    @property(cc.Node)
    spReceivedFirstAwatdIcon: cc.Node = null;

    @property(cc.Node)
    spReceivedDayAwatdIcon: cc.Node = null;

    private vipConfig: VIPConfig = null;

    onExtLoad() {
        this.regLis(EventType.VIP_UPDATE_INFO, this.onUpdateVipAwatdStateInfo);
        this.initView()
        this.btnGetGift.on("click", () => {
            this.onToGetVIPGift();
        })
    }

    private initView() {
        if (this.vipConfig) {
            //进度
            let vipAllData = VipMgr.getVIPConfig();
            let curVIPData = this.vipConfig;
            let privilegeData = curVIPData.permissions;
            let firstRewardList = curVIPData.firstRewardList;
            let everyDayRewardList = curVIPData.everyDayRewardList;
            let userInfo = UserMgr.getUserInfo();
            let userVip = userInfo.vipLevel;//用户VIP等级
            let curCfgVip = curVIPData.level;//当前配置表VIP等级配置信息
            let userExp = userInfo.vipExp;
            let maxExpLvIndex = userVip >= vipAllData.length ? vipAllData.length - 1 : userVip;
            let curVIPMaxExp = vipAllData[maxExpLvIndex].exp;
            if (curVIPMaxExp == 0) {
                curVIPMaxExp = 100;//配置表出问题
            }
            this.nodeCurVipLv.children[userVip].active = true;
            if (userVip >= vipAllData.length) {
                this.nodeNextVipLv.children[userVip].active = true;
                this.lbNextLv.string = vipAllData.length.toString();
                this.lbNeedExp.string = 0 + "";
            } else {
                this.nodeNextVipLv.children[userVip + 1].active = true;
                this.lbNextLv.string = (userVip + 1).toString();
                this.lbNeedExp.string = (curVIPMaxExp - userExp).toString();
            }
            this.nodeProgressBar.progress = userExp / curVIPMaxExp;
            if (this.nodeProgressBar.progress > 1) {
                this.nodeProgressBar.progress = 1;
            }
            this.lbBarExp.string = userExp + "/" + curVIPMaxExp;
            //特权
            this.lbCurPrivilegeName.string = "VIP" + curCfgVip + "特权";
            let privilegeArr: string[] = [];
            if (privilegeData.jiuJiJin > 0) {
                let showStr = "单次领取救济金@" + privilegeData.jiuJiJin;
                privilegeArr.push(showStr);
            }
            if (privilegeData.signInMultiple > 0) {
                let showStr = "月签到可@" + "翻倍";
                privilegeArr.push(showStr);
            }
            if (privilegeData.canDiyHeadImg > 0) {
                let showStr = "可以上传@" + "自定义头像";
                privilegeArr.push(showStr);
            }
            if (privilegeData.canShieldEmoji > 0) {
                let showStr = "设置内可以@" + "屏蔽表情";
                privilegeArr.push(showStr);
            }

            for (let i = 0; i < privilegeArr.length; i++) {
                let nodeCurPrivilegeDes = this.nodeCurPrivilegeDes.children[i];
                let desInfoArr = privilegeArr[i].split("@");
                nodeCurPrivilegeDes.getChildByName("nodeDes").getChildByName("lbOrder").getComponent(cc.Label).string = (i + 1) + ".";
                nodeCurPrivilegeDes.getChildByName("nodeDes").getChildByName("lbDes").getComponent(cc.Label).string = desInfoArr[0];
                nodeCurPrivilegeDes.getChildByName("nodeDes").getChildByName("lbDetails").getComponent(cc.Label).string = desInfoArr[1];
                nodeCurPrivilegeDes.active = true;
            }
            //奖励领取

            this.nodeCurGiftName.children[curCfgVip - 1].active = true;
            this.rewardShow(firstRewardList, this.nodeFirstGift);
            this.rewardShow(everyDayRewardList, this.nodeDayGift);

            this.onUpdateVipAwatdStateInfo();
        }
    }

    public setCurVipData(vipConfig: VIPConfig) {
        this.vipConfig = vipConfig;
    }

    public rewardShow(firstRewardList: VipReward[], nodeGroup: cc.Node) {
        for (let i = 0; i < firstRewardList.length; i++) {
            let rewardInfo = firstRewardList[i];
            let rewatdGroupIndex = rewardInfo.rewardType - 1;
            let rewatdNodeItem = nodeGroup.children[rewatdGroupIndex];
            rewatdNodeItem.getChildByName("lbGiftNum").getComponent(cc.Label).string = rewardInfo.rewardNum.toString();
            rewatdNodeItem.active = true;
        }
    }

    private onToGetVIPGift() {
        let curVIPData = this.vipConfig;
        VipMgr.sendVipReq(VipResType.Reward, curVIPData.level);
    }

    /**用户领取VIP奖励视图刷新 */
    private onUpdateVipAwatdStateInfo() {
        let userVip = UserMgr.getUserInfo().vipLevel;
        let curCfgVip = this.vipConfig.level;
        this.btnLessLevel.active = false;
        this.btnReceived.active = false;
        this.btnGetGift.active = false;

        this.spReceivedFirstAwatdIcon.active = false;
        this.spReceivedDayAwatdIcon.active = false;

        if (userVip >= curCfgVip) {
            if (this.returnCurFirstAwardState(curCfgVip)) {
                this.btnGetGift.active = true;
            } else {
                this.spReceivedFirstAwatdIcon.active = true;
            }

            if (this.returnCurDayAwardState(userVip, curCfgVip)) {
                this.btnGetGift.active = true;
            } else {
                this.spReceivedDayAwatdIcon.active = true;
            }
        } else {
            this.btnLessLevel.active = true;
        }

    }

    /**当前配置视图首次可否领取奖励 */
    private returnCurFirstAwardState(curCfgVip: number) {
        let firstAwardLog = VipMgr.getFirstRewardLevel();
        if (firstAwardLog.length > 0) {
            for (let i = 0; i < firstAwardLog.length; i++) {
                if (firstAwardLog[i] == curCfgVip) {
                    return false;
                }
            }
        }
        return true;
    }

    /**当前配置视图每天可否领取奖励 */
    private returnCurDayAwardState(userVip: number, curCfgVip: number) {
        let dayReward = VipMgr.getDayRewardState();
        if (userVip == curCfgVip && !dayReward) {
            return true;
        }
        return false;
    }



}
