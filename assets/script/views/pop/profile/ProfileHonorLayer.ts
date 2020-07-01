import MyNode from "../../../base/MyNode";
import { MsgType, EventType, SendSeasonReqType } from "../../../define/Const";
import { Lobby } from "../../../proto/proto";
import ComUtil from "../../../utils/ComUtil";
import ProfileMgr from "../../../data/ProfileMgr";
import PopMgr from "../../../data/PopMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ProfileHonorLayer extends MyNode {
    @property(cc.Node)
    nodeContentList: cc.Node = null;

    @property(cc.Node)
    nodeItemExample: cc.Node = null;
    onExtLoad() {
        this.regLis(EventType.PROFILE_SEASON_LIST, this.onUpdateList)
        ProfileMgr.sendSeasonReq(SendSeasonReqType.List);
    }

    private onUpdateList(list: Lobby.SeasonItemRes[]) {
        if (list.length > 0) {
            ComUtil.destroyAllChildren(this.nodeContentList);
            for (let i = 0; i < list.length; i++) {
                let node = cc.instantiate(this.nodeItemExample);
                node.y = 0;
                let seasonInfo: Lobby.SeasonItemRes = list[i];
                node.getChildByName("spTitlebg").getChildByName("lbSeasonName").getComponent(cc.Label).string = seasonInfo.season_name;
                node.getChildByName("lbDan").getComponent(cc.Label).string = "铂金"// + ComUtil.numToHan(seasonInfo.season_level);
                let startTime = ComUtil.formatDate(new Date(seasonInfo.season_start_time as number), "yy年MM月dd日");
                let endTime = ComUtil.formatDate(new Date(seasonInfo.season_end_time as number), "yy年MM月dd日");
                node.getChildByName("lbSeasonTime").getComponent(cc.Label).string = startTime + " - " + endTime;
                node.getChildByName("nodeSeasonData").getChildByName("lbSession").getChildByName("lbSessionNum").getComponent(cc.Label).string = seasonInfo.play_count.toString();
                node.getChildByName("nodeSeasonData").getChildByName("lbWins").getChildByName("lbWinsNum").getComponent(cc.Label).string = seasonInfo.victory_count.toString();
                node.getChildByName("nodeSeasonData").getChildByName("lbStreaking").getChildByName("lbStreakingNum").getComponent(cc.Label).string = seasonInfo.continuous_victory.toString();
                node.getChildByName("nodeSeasonData").getChildByName("lbWinRate").getChildByName("lbWinRateNum").getComponent(cc.Label).string = seasonInfo.victory_rate + "%";
                node.active = true;
                this.nodeContentList.addChild(node);
            }
        } else {
            PopMgr.tip("no data");
        }
    }
}
