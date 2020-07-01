import MyNode from "../../../base/MyNode";
import { EventType } from "../../../define/Const";
import { Lobby } from "../../../proto/proto";
import PopMgr from "../../../data/PopMgr";
import ProfileMgr from "../../../data/ProfileMgr";
import ComUtil from "../../../utils/ComUtil";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ProfileRecordLayer extends MyNode {

    @property(cc.Node)
    nodeContentList: cc.Node = null;

    @property(cc.Node)
    nodeItemExample: cc.Node = null;

    onExtLoad() {
        this.regLis(EventType.PROFILE_GAME_RECORD_LIST, this.createRecordList);
        ProfileMgr.sendRecordReq();
    }

    private loadTestInitView() {
        let theLogData = {
            game_name: "经典斗地主",
            create_time: 1590725267782,
            game_result: 1,
            user_type: 1,
            multiple: 5120,
            coin: 5462165135
        }
        for (let i = 0; i < 10; i++) {
            let node = cc.instantiate(this.nodeItemExample);
            node.x = 0;
            node.getChildByName("nodeGameType").getChildByName("lbType").getComponent(cc.Label).string = theLogData.game_name;
            node.getChildByName("spTime").getComponent(cc.Label).string = ComUtil.formatDate(new Date(theLogData.create_time as number), "MM-dd HH:mm");
            node.getChildByName("spGameResultSucceed").active = theLogData.game_result == 1;
            node.getChildByName("spGameResultFaild").active = theLogData.game_result == 2;
            node.getChildByName("nodeRole").getChildByName("lbRoleType").getComponent(cc.Label).string = theLogData.user_type == 1 ? "农民" : "地主";
            node.getChildByName("nodeEarnings").getChildByName("spTimes").getChildByName("lbTimesNum").getComponent(cc.Label).string = theLogData.multiple.toString();
            node.getChildByName("nodeEarnings").getChildByName("spGold").getChildByName("lbGoldNum").getComponent(cc.Label).string = theLogData.coin.toString();
            node.active = true;
            this.nodeContentList.addChild(node);
        }
    }

    private createRecordList(logList: Lobby.UserGameLogItemRes[]) {
        if (logList.length > 0) {
            for (let i = 0; i < logList.length; i++) {
                let theLogData = logList[i];
                let node = cc.instantiate(this.nodeItemExample);
                node.x = 0;
                node.getChildByName("nodeGameType").getChildByName("lbType").getComponent(cc.Label).string = theLogData.game_name;
                node.getChildByName("spTime").getComponent(cc.Label).string = ComUtil.formatDate(new Date(theLogData.create_time as number), "MM-dd HH:mm");
                node.getChildByName("spGameResultSucceed").active = theLogData.game_result == 1;
                node.getChildByName("spGameResultFaild").active = theLogData.game_result == 2;
                node.getChildByName("nodeRole").getChildByName("lbRoleType").getComponent(cc.Label).string = theLogData.user_type == 1 ? "农民" : "地主";
                node.getChildByName("nodeEarnings").getChildByName("spTimes").getChildByName("lbTimesNum").getComponent(cc.Label).string = theLogData.multiple.toString();
                node.getChildByName("nodeEarnings").getChildByName("spGold").getChildByName("lbGoldNum").getComponent(cc.Label).string = theLogData.coin.toString();
                node.active = true;
                this.nodeContentList.addChild(node);
            }
        } else {
            PopMgr.tip("暂无战绩,展示虚拟测试数据");
            this.loadTestInitView();
        }
    }
}
