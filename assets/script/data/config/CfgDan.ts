/**段位配置 段位说明 */
export class Dan {
    //段位列表
    danList: DanRanking[];
    //大段位列表
    danInfoList: DanInfo[];
    //赛季信息
    seasonExplain: SeasonExplain[];
}

/**小段位详情 */
export class DanRanking {
    id: number;
    name: string;
    infoId: number;
}

/**大段位详情 */
export class DanInfo {
    //段位id
    id: number;
    //段位名称
    name: string;
    //胜利获得星数
    victoryStar: number;
    //失败扣掉星数
    failureStar: number;
    //是否有等级保护 0 没有 1有
    levelProtect: number;
    //连胜多少把额外加星
    continuousVictoryStar: number;
    //每日工资需要赢多少吧获得
    everyDayVictoryStar: number;
    //每日工资
    everyDayWage: DanReward[];
    //赛季奖励
    seasonReward: DanReward[];
}

/**段位奖励 */
export class DanReward {
    rewardType: number;
    rewardId: number;
    rewardNum: number;
}

/**赛季信息 */
export class SeasonExplain {
    //基本玩法
    playingMethod: string;
    //基本规则
    theRules: string;
}