import MyNode from "../../../base/MyNode";
import ComUtil from "../../../utils/ComUtil";
import { EventType, ActiveType, ActiveHandleType, ActiveTaskHandleType } from "../../../define/Const";
import ActiveMgr from "../../../data/active/ActiveMgr";
import ActiveMgrTaskGrowth from "../../../data/active/ActiveMgrTaskGrowth";
import { TaskGrowthConfig } from "../../../data/config/CfgTaskGrowth";
import UserMgr from "../../../data/UserMgr";
import ProfileMgr from "../../../data/ProfileMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class TaskGrowthLayer extends MyNode {


    @property(cc.Node)
    nodeItemRouteExample: cc.Node = null;

    @property(cc.Node)
    contentGrowthRoute: cc.Node = null;

    @property(cc.Label)
    lbTaskDes: cc.Label = null;

    @property(cc.ScrollView)
    svRoute: cc.ScrollView = null;

    @property(cc.ProgressBar)
    pbActive: cc.ProgressBar = null;

    @property(cc.Label)
    lbActivebar: cc.Label = null;

    @property(cc.Node)
    nodeAwardGorup: cc.Node = null;

    @property(cc.Node)
    btnToFinish: cc.Node = null;

    @property(cc.Node)
    btnToGet: cc.Node = null;

    @property(cc.Node)
    btnReceived: cc.Node = null;

    private initViewBool: boolean = false;

    private curSelectLv: number = null;

    private lastSelectNode: cc.Node = null;

    onExtLoad() {
        this.regLis(EventType.ACTIVE_TASK_GROWTH_UPDATE_DATA, this.initView);
        ActiveMgr.sendActiveReq(ActiveType.CHENG_ZHANG_TASK, ActiveHandleType.HANDLE_GET_INFO);
        this.btnToGet.on("click", () => {
            let lv = this.curSelectLv.toString();
            //领取成长任务奖励
            ActiveMgr.sendActiveReq(ActiveType.CHENG_ZHANG_TASK, ActiveTaskHandleType.HANDLE_TASK_GIFT, lv);
            this.curSelectLv = null;
        })
    }

    private initView() {
        let userLv = UserMgr.getUserInfo().level;
        this.curSelectLv = userLv;
        let allLvCfg = this.orderAllLevelCfg();
        this.createGrowthRoute(allLvCfg);
        this.curSelectLvInfo(this.curSelectLv, allLvCfg[this.curSelectLv - 1]);
    }

    /**成长路线 */
    private createGrowthRoute(allLvCfg: TaskGrowthConfig[]) {
        ComUtil.destroyAllChildren(this.contentGrowthRoute);
        let userLevel = UserMgr.getUserInfo().level;
        for (let i = 0; i < allLvCfg.length; i++) {
            let curLvCfg = allLvCfg[i];
            let curCfgLv = i + 1;
            let node = cc.instantiate(this.nodeItemRouteExample);
            node.y = -80;
            node.getChildByName("nodeStateUp").active = curCfgLv % 2 == 1;
            node.getChildByName("nodeStateDown").active = curCfgLv % 2 == 0;
            let showNode = curCfgLv % 2 == 0 ? node.getChildByName("nodeStateDown") : node.getChildByName("nodeStateUp");
            if (this.curSelectLv == curCfgLv) {
                this.lastSelectNode = showNode.getChildByName("spMilestoneSelect");
            }
            if (i == allLvCfg.length - 1) {
                showNode.getChildByName("spRoute").active = false;
            }
            showNode.getChildByName("lbCurLv").getComponent(cc.Label).string = "Lv:" + curCfgLv;
            showNode.getChildByName("lbCurMissLv").getComponent(cc.Label).string = "Lv:" + curCfgLv;

            showNode.getChildByName("spMilestoneSelect").active = curCfgLv == userLevel
            showNode.getChildByName("spLandlord").active = curCfgLv == userLevel;
            showNode.getChildByName("spMilestoneOpen").active = curCfgLv <= userLevel;
            showNode.getChildByName("spMilestoneClose").active = curCfgLv > userLevel;
            showNode.getChildByName("lbCurLv").active = curCfgLv <= userLevel;
            showNode.getChildByName("lbCurMissLv").active = curCfgLv > userLevel;
            showNode.getChildByName("spMilestoneOpen").on("click", () => {
                if (this.curSelectLv != curCfgLv) {
                    this.curSelectLv = curCfgLv;
                    if (this.lastSelectNode) {
                        this.lastSelectNode.active = false;
                    }
                    showNode.getChildByName("spMilestoneSelect").active = true;
                    this.curSelectLvInfo(curCfgLv, curLvCfg);
                    this.lastSelectNode = showNode.getChildByName("spMilestoneSelect");
                }
            })

            showNode.getChildByName("spMilestoneClose").on("click", () => {
                if (this.curSelectLv != curCfgLv) {
                    this.curSelectLv = curCfgLv;
                    this.curSelectLvInfo(curCfgLv, curLvCfg);
                }
            })
            node.active = true;
            this.contentGrowthRoute.addChild(node);
        }

        let percent = userLevel / 200;
        if (this.curSelectLv) {
            percent = this.curSelectLv / 200;
        }
        percent = percent > 0.01 ? percent - 0.01 : percent;
        if (!this.initViewBool && percent >= 0.01) {
            this.initViewBool = true;
            this.svRoute.scrollToPercentHorizontal(percent, percent);
        }
        // console.log("百分比   ", percent);
    }

    /**生成整体等级配置数据 */
    private orderAllLevelCfg() {
        let allLvConfig: TaskGrowthConfig[] = [];
        let taskGrowthData = ActiveMgrTaskGrowth.getAllData();
        let growthCfg = taskGrowthData.activeStatic.activeItems;
        for (let i = 0; i < growthCfg.length; i++) {
            let stateNum = growthCfg[i].level - (i != 0 ? growthCfg[i - 1].level : 0);
            for (let j = 0; j < stateNum; j++) {
                allLvConfig.push(growthCfg[i]);
            }
        }
        return allLvConfig;
    }

    /**当前选择等级任务信息 */
    private curSelectLvInfo(selectLv: number, curLvCfg: TaskGrowthConfig) {
        let userLv = UserMgr.getUserInfo().level;
        let userExp = UserMgr.getUserInfo().exp;
        this.lbTaskDes.string = ComUtil.formatStr("斗地主等级达到%s级", selectLv);

        let curLevelExp = ProfileMgr.getCurLevelExpCfg(selectLv);
        curLevelExp = curLevelExp > 0 ? curLevelExp : 1;
        if (selectLv <= 1) {
            userExp = 1;
        } else {
            if (selectLv <= userLv) {
                userExp = curLevelExp;
            }
        }
        this.lbActivebar.string = userExp + "/" + curLevelExp;//等级经验
        this.pbActive.progress = userExp / curLevelExp;
        this.btnReceived.active = false;
        this.btnToGet.active = false;
        this.btnToFinish.active = false;
        if (selectLv <= userLv) {//允许领取
            if (this.isReceivedGift(selectLv)) {
                this.btnReceived.active = true;
            } else {
                this.btnToGet.active = true;
            }
        } else {//去完成
            this.btnToFinish.active = true;
        }

        for (let i = 0; i < this.nodeAwardGorup.childrenCount; i++) {
            this.nodeAwardGorup.children[i].active = false;
        }
        this.nodeAwardGorup.children[curLvCfg.rewardType - 1].getChildByName("lbAwardNum").getComponent(cc.Label).string = "x" + curLvCfg.rewardNum;
        this.nodeAwardGorup.children[curLvCfg.rewardType - 1].active = true;
    }

    /**此等级已领取奖励 */
    private isReceivedGift(level: number) {
        let taskGrowthData = ActiveMgrTaskGrowth.getAllData();
        let receivedGiftLvList = taskGrowthData.activeDynamic.rewardReceiveList;
        if (receivedGiftLvList.length <= 0)
            return false;

        for (let i = 0; i < receivedGiftLvList.length; i++) {
            if (receivedGiftLvList[i] == level) {
                return true;
            }
        }
        return false;
    }


}
