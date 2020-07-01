import MyNode from "../../../base/MyNode";
import { EventType, ActiveType, ActiveHandleType, ActiveReceiveStatusType } from "../../../define/Const";
import ActiveMgr from "../../../data/active/ActiveMgr";
import ActiveMgrCarnival from "../../../data/active/ActiveMgrCarnival";
import { ActiveCarnivalSevenConfig } from "../../../data/config/CfgActiveCarnival";
import ComUtil from "../../../utils/ComUtil";

const { ccclass, property } = cc._decorator;

@ccclass
export default class CarnivalSevenSigninLayer extends MyNode {
    @property(cc.Node)
    nodeSigninList: cc.Node = null;

    @property(cc.Node)
    nodeDotGroup: cc.Node = null;

    @property(cc.Node)
    nodeDotItemExample: cc.Node = null;

    @property(cc.Node)
    nodeSigninItemExample: cc.Node = null;

    @property(cc.ProgressBar)
    pbSignin: cc.ProgressBar = null;

    @property(cc.Label)
    lbActiveTime: cc.Label = null;

    onExtLoad() {
        this.regLis(EventType.ACTIVE_CARNIVAL_UPDATE_DATA, this.updateView);
        ActiveMgr.sendActiveReq(ActiveType.JIA_NIAN_HUA, ActiveHandleType.HANDLE_GET_INFO);
    }

    private updateView() {
        let data = ActiveMgrCarnival.getAllData();
        let signinStatic = ActiveMgrCarnival.getStaticData();
        let signinDynamic = ActiveMgrCarnival.getDynamicData();
        this.createSigninListView(signinStatic.sevenRewardItems, signinDynamic.rewardReceiveStatusList, signinDynamic.activeDay);
        // let num = Math.floor(Math.random() * 6);
        this.createDot(signinDynamic.activeDay > 7 ? 7 : signinDynamic.activeDay);
        this.lbActiveTime.string = ComUtil.formatStr("活动累计天数：%s天", signinDynamic.activeDay);
    }

    /**签到奖励信息 */
    private createSigninListView(signinCfg: ActiveCarnivalSevenConfig[], receiveStatusArr: number[], today: number) {
        ComUtil.destroyAllChildren(this.nodeSigninList);
        for (let i = 0; i < signinCfg.length; i++) {
            let curCfg = signinCfg[i];
            let curReceiveState = receiveStatusArr[i];
            let node = cc.instantiate(this.nodeSigninItemExample);
            node.y = -12.5;
            node.getChildByName("lbDay").getComponent(cc.Label).string = ComUtil.formatStr("第%s天", curCfg.day);
            // node.getChildByName("spAwatdIcon")//奖励Icon 预留
            node.getChildByName("lbAwardNum").getComponent(cc.Label).string = ComUtil.awardName(curCfg.rewardType) + "x" + curCfg.rewardNum;
            node.getChildByName("spReceived").active = curReceiveState == ActiveReceiveStatusType.YET_RECEIVE;
            node.getChildByName("btnNotReceive").active = curReceiveState == ActiveReceiveStatusType.NO_OPEN;
            node.getChildByName("btnToReceive").active = curReceiveState == ActiveReceiveStatusType.NO_RECEIVE;
            node.getChildByName("spItembg1").active = curCfg.day != today;
            node.getChildByName("spItembg2").active = curCfg.day == today;
            node.getChildByName("btnToReceive").on("click", () => {
                //领取签到奖励
                let handleValue = curCfg.day.toString();
                ActiveMgr.sendActiveReq(ActiveType.JIA_NIAN_HUA, ActiveHandleType.HANDLE_RECEIVE_REWARD_VIDEO_TRIPLE, handleValue);
            })
            node.active = true;
            this.nodeSigninList.addChild(node);
        }
    }

    /**签到进度视图 */
    private createDot(allSignin: number) {
        if (allSignin > 0) {
            ComUtil.destroyAllChildren(this.nodeDotGroup);
            for (let i = 0; i < allSignin; i++) {
                let curDay = i + 1;
                let node = cc.instantiate(this.nodeDotItemExample);
                node.y = 0;
                node.getChildByName("lbDayNum").getComponent(cc.Label).string = curDay.toString();
                node.active = true;
                this.nodeDotGroup.addChild(node);
            }

            let percent = 1 / 6 * allSignin;
            this.pbSignin.progress = Number(percent.toFixed(3));
            // console.log("progress ", this.pbSignin.progress, "  percent: ", percent)
        }
    }
}
