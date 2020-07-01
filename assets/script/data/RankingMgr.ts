import mlog from "../utils/LogUtil";
import MyMgr from "../base/MyMgr";
import glb from "../utils/glb";
import { MsgType, Mid, EventType } from "../define/Const";
import { Lobby } from "../proto/proto";

//1-排行榜，2-财富榜，3-邀请榜
const RankType = {
    Ranking: 1,
    Treasure: 2,
    Invite: 3
}

class RankingMgr extends MyMgr {
    public initByLoad() {
        mlog.info("初始RankingMgr");
        glb.regEventLis(Mid.MID_RANK_RES, this.onRankingRes, this);
    }
    public initMgr() {

    }
    public uninitMgr() { }

    private onRankingRes(msg: Lobby.RankRes) {
        if (msg.handle_type == RankType.Ranking) {
            glb.sendEvent(EventType.RANKING_LIST,msg);
        } else if (msg.handle_type == RankType.Treasure) {
            glb.sendEvent(EventType.RANKING_LIST,msg);
        } else if (msg.handle_type == RankType.Invite) {
            glb.sendEvent(EventType.RANKING_LIST,msg);
        }
    }

    /**用户排行榜 1排位2财富3邀请*/
    public sendRankingReq(handleType: number) {
        glb.sendMsg(MsgType.RankReq, {
            handle_type: handleType
        })
    }
}
export default new RankingMgr();