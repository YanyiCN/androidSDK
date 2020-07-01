import MyNode from "../../../base/MyNode";
import { EventType, ActiveType, ActiveHandleType, ActiveReceiveStatusType } from "../../../define/Const";
import ActiveMgr from "../../../data/active/ActiveMgr";
import ActiveMgrLoginSignin from "../../../data/active/ActiveMgrLoginSignin";
import { ActiveLoginSigninConfig } from "../../../data/config/CfgActiveLoginSignin";
import ComUtil from "../../../utils/ComUtil";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ActiveSigninLayer extends MyNode {

    @property(cc.Node)
    nodeSigninItem: cc.Node = null;

    @property(cc.Node)
    nodeSigninList: cc.Node = null;

    @property(cc.ProgressBar)
    pbSignin: cc.ProgressBar = null;

    @property(cc.Label)
    lbActiveTime: cc.Label = null;

    @property(cc.Node)
    btnQuickReceive: cc.Node = null;

    @property(cc.Node)
    nodeDotGroup: cc.Node = null;

    @property(cc.Node)
    nodeDotItem: cc.Node = null;

    onExtLoad() {
        this.regLis(EventType.ACTIVE_LOGIN_SIGNIN_UPDATE_DATA, this.initView);
        ActiveMgr.sendActiveReq(ActiveType.LOGIN_GIFT, ActiveHandleType.HANDLE_GET_INFO);

        this.btnQuickReceive.on("click", () => {
            //一键领取
            ActiveMgr.sendActiveReq(ActiveType.LOGIN_GIFT, ActiveHandleType.HANDLE_RECEIVE_REWARD_CONTINUOUS_SIGNIN);
        })
    }

    private initView() {
        let profitsStatic = ActiveMgrLoginSignin.getStaticData();
        let profitsDynamic = ActiveMgrLoginSignin.getDynamicData();

        this.createSigninListView(profitsStatic.activeItems, profitsDynamic.rewardReceiveStatusList, profitsDynamic.loginDay);
        this.createDot(profitsDynamic.loginDay);

        let quickReceive = this.findCanReceive();
        this.btnQuickReceive.active = quickReceive;
        this.lbActiveTime.string = ComUtil.formatStr("活动时间:  %s至%s", profitsStatic.startTime, profitsStatic.endTime);
    }

    /**签到奖励信息 */
    private createSigninListView(signinCfg: ActiveLoginSigninConfig[], receiveStatusArr: number[], today: number) {
        ComUtil.destroyAllChildren(this.nodeSigninList);
        for (let i = 0; i < signinCfg.length; i++) {
            let curCfg = signinCfg[i];
            let curReceiveState = receiveStatusArr[i];
            let node = cc.instantiate(this.nodeSigninItem);
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
                let handleValue = curCfg.id.toString();
                ActiveMgr.sendActiveReq(ActiveType.LOGIN_GIFT, ActiveHandleType.HANDLE_RECEIVE_REWARD, handleValue);
            })
            node.active = true;
            this.nodeSigninList.addChild(node);
        }
    }

    /**是否还有奖励可以领取 */
    private findCanReceive() {
        let profitsDynamic = ActiveMgrLoginSignin.getDynamicData();
        let receiveStatusList = profitsDynamic.rewardReceiveStatusList;
        for (let i = 0; i < receiveStatusList.length; i++) {
            if (receiveStatusList[i] == ActiveReceiveStatusType.NO_RECEIVE) {
                return true
            }
        }
        return false;
    }

    /**签到进度视图 */
    private createDot(allSignin: number) {
        if (allSignin > 0) {
            ComUtil.destroyAllChildren(this.nodeDotGroup);
            for (let i = 0; i < allSignin; i++) {
                let curDay = i + 1;
                let node = cc.instantiate(this.nodeDotItem);
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
