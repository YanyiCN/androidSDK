/**皮肤配置 */
export class GameProfileSkinConfig {
    skinId: number;
    skinName: string;
    skinIcon: string;
    skinDesc: string;
    skinType: number;
    timeType: number;
    time: number;
}
//************************************************************************** 


/**道具配置 */
export class GamePropConfig {
    id: number;
    name: string;
    icon: string;
    desc: string;
}
//************************************************************************** 


/**商店配置 */
export class GamePayRmbConfig {
    payId: number;
    name: string;
    num: number;
    sendNum: number;
    rmbFen: number;
}

export class GamePayConfig {
    payId: number;
    name: string;
    num: number;
    diamond: number;
    desc: string;
    itemType: number;
}

export class GamePayTypeConfig {
    id: number;
    name: string;
}
//************************************************************************** 


/**VIP配置 */
export class VIPConfig {
    level: number;
    exp: number;
    permissions: VipPermissions;
    firstRewardList: VipReward[];
    everyDayRewardList: VipReward[];
}

export class VipPermissions {
    jiuJiJin: number;
    signInMultiple: number;
    signInMultipleDay: number[];
    canDiyHeadImg: number;
    canShieldEmoji: number;
}

export class VipReward {
    rewardType: number;
    rewardId: number;
    rewardNum: number;
}
//************************************************************************** 


/**任务配置 */
export class TaskConfig {
    type: number;
    name: string;
}
//************************************************************************** 


/**等级经验配置 */
export class LevelExpConfig {
    level: number;
    exp: number;
}
//**************************************************************************