import MyMgr from "../base/MyMgr";
import mlog from "../utils/LogUtil";
import glb from "../utils/glb";
import { Mid, MsgType, EventType, SendReqType, ServerCode, SkinType, SendSeasonReqType } from "../define/Const";
import { Lobby } from "../proto/proto";
import { seasonInfo, SeasonInfo } from "./entity/SeasonInfo";
import { UserGameData, UserGamedata } from "./entity/UserGameData";
import PopMgr from "./PopMgr";
import { GameProfileSkinConfig, LevelExpConfig } from "./config/CfgGameTree";
import { Dan } from "./config/CfgDan";
import { CurDanEveyrDayAwaryInfo } from "./entity/ReceiveSerDataTree";

class ProfileMgr extends MyMgr {
    cfgUserTitle: [{ id: number, level: number, title: string, getWay: string }] = null;
    cfgUserSkinHead: [GameProfileSkinConfig] = null;
    cfgUserSkinBlock: [GameProfileSkinConfig] = null;
    cfgUserSkinBubble: [GameProfileSkinConfig] = null;
    cfgLevelExp: LevelExpConfig[] = null;
    cfgDan: Dan = null;
    cfgGameHeadImgUrl: [string];

    userUsedSkinHead: any[] = null;
    userUsedSkinBlock: any[] = null;
    userUsedSkinBubble: any[] = null;

    userGameData: UserGameData = null;
    curSeasonInfo: SeasonInfo = null;

    lastSeasonInfo: SeasonInfo = null;

    curDanEveryDayAwardInfo: CurDanEveyrDayAwaryInfo = null;

    public initByLoad() {
        mlog.info("初始ProfileMgr");
        glb.regEventLis(Mid.MID_SEASON_RES, this.onSeasonRes, this);
        glb.regEventLis(Mid.MID_USER_GAME_DATA_RES, this.onUserGameDataRes, this);
        glb.regEventLis(Mid.MID_SKIN_RES, this.onUserUsedSkinRes, this);
        glb.regEventLis(Mid.MID_GAME_LOG_RES, this.onGameRecordRes, this);
    }
    public initMgr() {
    }
    public uninitMgr() { }

    /**赛季荣耀 */
    private onSeasonRes(msg: Lobby.SeasonRes) {
        if (msg.handle_type == SendSeasonReqType.List) {
            glb.sendEvent(EventType.PROFILE_SEASON_LIST, msg.season_list);
        } else if (msg.handle_type == SendSeasonReqType.CurSeasonInfo || msg.handle_type == SendSeasonReqType.LastSeasonAward) {
            let seasonItem = msg.season_item;
            let curSeason = {
                usId: seasonItem.us_id as number,
                seasonName: seasonItem.season_name,
                seasonDan: seasonItem.season_dan,
                seasonStar: seasonItem.season_star,
                playCount: seasonItem.play_count,
                victoryCount: seasonItem.victory_count,
                victoryRate: seasonItem.victory_rate,
                continuousVictory: seasonItem.continuous_victory,
                seasonStartTime: seasonItem.season_start_time as number,
                seasonEndTime: seasonItem.season_end_time as number,
                rewardReceive_state: seasonItem.reward_receive_state
            }
            this.curSeasonInfo = curSeason;

            if (msg.last_season_item) {
                let lastSeasonItem = msg.last_season_item;
                let lastSeason = {
                    usId: seasonItem.us_id as number,
                    seasonName: lastSeasonItem.season_name,
                    seasonDan: lastSeasonItem.season_dan,
                    seasonStar: lastSeasonItem.season_star,
                    playCount: lastSeasonItem.play_count,
                    victoryCount: lastSeasonItem.victory_count,
                    victoryRate: lastSeasonItem.victory_rate,
                    continuousVictory: lastSeasonItem.continuous_victory,
                    seasonStartTime: lastSeasonItem.season_start_time as number,
                    seasonEndTime: lastSeasonItem.season_end_time as number,
                    rewardReceive_state: lastSeasonItem.reward_receive_state
                }
                this.lastSeasonInfo = lastSeason;
            }
            glb.sendEvent(EventType.UPDATE_DAN_INFO);
        }
    }

    /**皮肤  type 1-列表，2-使用 */
    private onUserUsedSkinRes(msg: Lobby.SkinRes) {
        if (msg.handle_type == SendReqType.List) {
            this.userUsedSkinHead = msg.touxiang_list;
            this.userUsedSkinBlock = msg.naozhong_list;
            this.userUsedSkinBubble = msg.qipao_list;
            glb.sendEvent(EventType.PROFILE_UPDATE_USED_SKIN_LIST, [msg.touxiang_list, msg.naozhong_list, msg.qipao_list]);
        } else {
            if (msg.code == ServerCode.Succeed) {
                let changeSkinType = Math.floor((msg.handle_value as number) / 100);
                glb.sendEvent(EventType.PROFILE_CHANGE_SKIN_SUCCEED, { tip: msg.message, cfgID: msg.handle_value, skinType: changeSkinType })
                if (changeSkinType == SkinType.Head) {
                    glb.sendEvent(EventType.SKIN_HEAD_CHANGE_SUCCEED, msg.handle_value);
                }
            }
        }
    }

    private onUserGameDataRes(msg: Lobby.UserGameDataRes) {
        UserGamedata.curDan = msg.cur_dan;
        UserGamedata.curStar = msg.cur_star;
        UserGamedata.maxStar = msg.max_star;
        UserGamedata.playCount = msg.play_count;
        UserGamedata.victoryCount = msg.victory_count;
        UserGamedata.springCount = msg.spring_count;
        UserGamedata.bombCount = msg.bomb_count;
        UserGamedata.maxMultiple = msg.max_multiple;
        UserGamedata.maxVictory = msg.max_victory;
        UserGamedata.victoryRate = msg.victory_rate;
        this.userGameData = UserGamedata;
        glb.sendEvent(EventType.PROFILE_USERGAMEDATA);
    }

    /**根据配置表获取当前小段位信息 */
    public getCurDanName(id: number) {
        let danListAll = this.getDanList();
        for (const iterator of danListAll) {
            if (iterator.id == id) {
                return iterator;
            }
        }
    }

    /**根据配置表获取当前大段位详情信息 */
    public getCurBigDanInfo(id: number) {
        let danInfoListAll = this.getDanInfoList();
        for (const iterator of danInfoListAll) {
            if (iterator.id == id) {
                return iterator;
            }
        }
    }

    /**更新段位日任务信息 */
    public setDanEveryDayInfo(curDanDay: CurDanEveyrDayAwaryInfo) {
        this.curDanEveryDayAwardInfo = curDanDay;
    }

    /**获取段位日任务信息 */
    public getDanEveryDayInfo() {
        return this.curDanEveryDayAwardInfo;
    }

    /**战绩 */
    private onGameRecordRes(msg: Lobby.UserGameLogRes) {
        glb.sendEvent(EventType.PROFILE_GAME_RECORD_LIST, msg.game_log_list);
    }

    /**用户游戏信息 */
    public sendUserGameDataReq() {
        glb.sendMsg(MsgType.UserGameDataReq, {})
    }

    /**荣誉 */
    public sendSeasonReq(handleType: number, handleValue: number = null) {
        glb.sendMsg(MsgType.SeasonReq, {
            handle_type: handleType,
            handle_value: handleValue
        })
    }

    /**皮肤 */
    public sendUserSkinReq(handleType: number, handleValue: number = null) {
        glb.sendMsg(MsgType.SkinReq, {
            handle_type: handleType,
            handle_value: handleValue
        })
    }

    /**战绩 */
    public sendRecordReq() {
        glb.sendMsg(MsgType.UserGameLogReq, {})
    }

    /**获取上赛季信息 */
    public getLastSeasonInfo() {
        return this.lastSeasonInfo;
    }

    /**获取当前赛季信息 */
    public getCurSeasonInfo() {
        return this.curSeasonInfo;
    }

    public getUserGameData() {
        if (!this.userGameData) {
            this.userGameData = UserGamedata;
        }
        return this.userGameData;
    }

    /**小段位列表 */
    public getDanList() {
        return this.cfgDan.danList;
    }

    /**大段位列表信息 */
    public getDanInfoList() {
        return this.cfgDan.danInfoList;
    }

    /**赛季信息 */
    public getDanSeasonExplain() {
        return this.cfgDan.seasonExplain;
    }

    /**更新段位配置 */
    public setDanConfig(danCfgList: Dan) {
        this.cfgDan = danCfgList;
    }

    /**获取本地储存段位配置 */
    public getDanConfig() {
        return this.cfgDan;
    }

    /**更新等级经验配置 */
    public setLevelExpConfig(cfgLevelExpList: LevelExpConfig[]) {
        this.cfgLevelExp = cfgLevelExpList;
    }

    /**获取本地储存等级经验配置 */
    public getLevelExpConfig() {
        return this.cfgLevelExp;
    }

    /**获取当前等级经验 */
    public getCurLevelExpCfg(level: number): number {
        return this.cfgLevelExp[level - 1].exp;
    }


    /**更新称号配置 */
    public setUserTitleConfig(cfgUserTitleList: [{ id: number, level: number, title: string, getWay: string }]) {
        this.cfgUserTitle = cfgUserTitleList;
    }

    /**获取本地储存称号配置 */
    public getUserTitleConfig() {
        return this.cfgUserTitle;
    }

    /**更新用户头像配置 */
    public setUserSkinHeadConfig(cfgUserSkinHeadList: [GameProfileSkinConfig]) {
        this.cfgUserSkinHead = cfgUserSkinHeadList;
    }

    /**获取本地储存用户头像配置 */
    public getUserSkinHeadConfig() {
        return this.cfgUserSkinHead;
    }

    /**更新用户闹钟配置 */
    public setUserSkinClockConfig(cfgUserSkinBlockList: [GameProfileSkinConfig]) {
        this.cfgUserSkinBlock = cfgUserSkinBlockList;
    }

    /**获取本地储存用户闹钟配置 */
    public getUserSkinClockConfig() {
        return this.cfgUserSkinBlock;
    }

    /**更新用户气泡配置 */
    public setUserSkinBubbleConfig(cfgUserSkinBubbleList: [GameProfileSkinConfig]) {
        this.cfgUserSkinBubble = cfgUserSkinBubbleList;
    }

    /**获取本地储存用户气泡配置 */
    public getUserSkinBubbleConfig() {
        return this.cfgUserSkinBubble;
    }

    /**更新游戏默认头像配置 */
    public setGameHeadImgUrlConfig(cfgGameHeadImgUrlList: [string]) {
        this.cfgGameHeadImgUrl = cfgGameHeadImgUrlList;
    }

    /**获取本地储存游戏默认头像配置 */
    public getGameHeadImgUrlConfig() {
        return this.cfgGameHeadImgUrl;
    }


    /**用户拥有头像框集合 */
    public getUserUsedSkinHead() {
        return this.userUsedSkinHead;
    }

    /**用户拥有闹钟集合 */
    public getUserUsedSkinBlock() {
        return this.userUsedSkinBlock;
    }

    /**用户拥有气泡集合 */
    public getUserUsedSkinBubble() {
        return this.userUsedSkinBubble;
    }

}
export default new ProfileMgr();