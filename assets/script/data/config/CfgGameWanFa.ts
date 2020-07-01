/**游戏玩法配置 */
export class GameWanFaConfig {
    /** 配置类型:0金币房*/
    configType: number;
    /** 游戏玩法ID*/
    gwcId: number;
    /** 游戏名*/
    gameName: string;
    /** 游戏玩法标识*/
    wanfaId: string;
    /** 游戏标签(比如热门/推荐之类)*/
    flags: string[];
    /** 游戏小说明*/
    tip: String;
    /** 金币房金币限制*/
    goldLimit: number[];
    /** 金币房底分*/
    goldBase: number;
    /** 金币房房费*/
    goldTable: number;
    /** 游戏配置菜单条列表*/
    userMenuBars: any[];
}