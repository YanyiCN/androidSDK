import MyNode from "../../../base/MyNode";
import { EventType, ActiveType, ActiveHandleType, ActiveReceiveStatusType } from "../../../define/Const";
import ActiveMgr from "../../../data/active/ActiveMgr";
import ActiveMgrBaiCaishen from "../../../data/active/ActiveMgrBaiCaishen";
import { ActiveBaiCaishenConfig, AwardInfo } from "../../../data/config/CfgActiveBaiCaishen";
import ComUtil from "../../../utils/ComUtil";

let time = {
    Morning: 1,
    Noon: 2,
    Afternoon: 3
}

const { ccclass, property } = cc._decorator;

@ccclass
export default class ActiveBaiCaishenLayer extends MyNode {

    @property(cc.Node)
    nodeAwardTypeGroup: cc.Node = null;

    @property(cc.Node)
    nodeItemAward: cc.Node = null;

    @property([cc.Node])
    nodeLuckyBagGroup: cc.Node[] = [];

    @property(cc.Node)
    btnBaiCaishen: cc.Node = null;

    @property(cc.Node)
    nodeCanCanbai: cc.Node = null;

    private curAwardTimeID: number = null;

    onExtLoad() {
        this.regLis(EventType.ACTIVE_BAICAISHEN_UPDATE_DATA, this.initView);
        ActiveMgr.sendActiveReq(ActiveType.BAI_CAI_SHEN, ActiveHandleType.HANDLE_GET_INFO);

        this.btnBaiCaishen.on("click", () => {
            //拜财神
            if (this.curAwardTimeID) {
                let handleValue = this.curAwardTimeID.toString();
                ActiveMgr.sendActiveReq(ActiveType.BAI_CAI_SHEN, ActiveHandleType.HANDLE_RECEIVE_REWARD, handleValue);
            }
        })
    }
    private initView() {
        let baiCaishenStatic = ActiveMgrBaiCaishen.getStaticData();
        let baiCaishenDynamic = ActiveMgrBaiCaishen.getDynamicData();
        let todayAllReceiveStatusInfo: number[] =
            [baiCaishenDynamic.receiveStateZao,
            baiCaishenDynamic.receiveStateZhong,
            baiCaishenDynamic.receiveStateWan];
        this.getCurTimeAward(baiCaishenStatic.activeItems, todayAllReceiveStatusInfo, baiCaishenDynamic.curActive);
        this.createAwardList(baiCaishenStatic.activeItems, todayAllReceiveStatusInfo);
    }

    /**早中晚 奖品池及福袋*/
    private createAwardList(baiCaishenCfg: ActiveBaiCaishenConfig[], receiveStatusList: number[]) {
        let nodeLuckyBagGroup = this.nodeLuckyBagGroup;
        for (let i = 0; i < nodeLuckyBagGroup.length; i++) {
            let nodeLuckyBag = nodeLuckyBagGroup[i];
            let receiveStatus = receiveStatusList[i];
            let luckyBagCfg = baiCaishenCfg[i];
            nodeLuckyBag.getChildByName("spLuckBagToReceive").active = receiveStatus == ActiveReceiveStatusType.NO_RECEIVE;
            nodeLuckyBag.getChildByName("spLuckBagNormal").active = receiveStatus == ActiveReceiveStatusType.NO_OPEN;
            nodeLuckyBag.getChildByName("spLuckBagReceived").active = receiveStatus == ActiveReceiveStatusType.YET_RECEIVE;
            let curCfgTimeStr: string = luckyBagCfg.startHours + ":" + (luckyBagCfg.startMinute < 10 ? "0" + luckyBagCfg.startMinute : luckyBagCfg.startMinute)
                + "~" + luckyBagCfg.endHours + ":" + (luckyBagCfg.endMinute < 10 ? "0" + luckyBagCfg.endMinute : luckyBagCfg.endMinute);
            nodeLuckyBag.getChildByName("lbTime").getComponent(cc.Label).string = curCfgTimeStr;
        }
    }

    /**早中晚 奖品池*/
    private getCurTimeAward(baiCaishenCfg: ActiveBaiCaishenConfig[], receiveStatusList: number[], curActive: number) {
        let rewardList: AwardInfo[] = [];
        for (let i = 0; i < receiveStatusList.length; i++) {
            if (receiveStatusList[i] != ActiveReceiveStatusType.NO_OPEN) {
                rewardList = baiCaishenCfg[i].rewardList;
                this.curAwardTimeID = baiCaishenCfg[i].id;
                break;
            }
        }
        if (rewardList.length <= 0 && curActive) {
            rewardList = baiCaishenCfg[curActive - 1].rewardList;
        }
        if (rewardList.length > 0) {
            ComUtil.destroyAllChildren(this.nodeAwardTypeGroup);
            for (let i = 0; i < rewardList.length; i++) {
                let reward = rewardList[i];
                let node = cc.instantiate(this.nodeItemAward);
                node.y = 0;
                //node.getChildByName("spAwardIcon") 奖品图标
                node.getChildByName("lbAwardNum").getComponent(cc.Label).string = "X" + reward.rewardNum;
                node.active = true;
                this.nodeAwardTypeGroup.addChild(node);
            }
            this.nodeCanCanbai.active = true;
            if (receiveStatusList[curActive - 1] == ActiveReceiveStatusType.NO_RECEIVE) {
                this.btnBaiCaishen.active = true;
            } else {
                this.btnBaiCaishen.active = false;
            }
        } else {
            this.btnBaiCaishen.active = false;
        }
    }

}
