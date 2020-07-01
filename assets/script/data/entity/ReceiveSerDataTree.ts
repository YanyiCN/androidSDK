export class ClientRewardItem {
    rewardType: number;
    rewardId: number;
    rewardNum: number;
}

export class CurDanEveyrDayAwaryInfo {
    // 当天游戏次数
    playTimes: number;

    //状态 0未领取 1已经领取
    receiveStatus: number;
}

export class ActiveData<T, M> {
    activeStatic: T;
    activeDynamic: M;
}