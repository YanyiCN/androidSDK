//------------------------
/**活动拜财神配置 */
//------------------------
export class ActiveBaiCaishenConfig {
    endHours: number;
    endMinute: number;
    id: number;
    rewardId: number;
    rewardList: AwardInfo[];
    rewardNum: number;
    rewardType: number;
    startHours: number;
    startMinute: number;
}

export class AwardInfo {
    id: number;
    rewardId: number;
    rewardNum: number;
    rewardType: number;
}