export class SeasonInfo {
    constructor() { }
    usId: number;
    seasonName: string;
    seasonDan: number;
    seasonStar: number;
    playCount: number;
    victoryCount: number;
    victoryRate: number
    continuousVictory: number;
    seasonStartTime: number;
    seasonEndTime: number;
    rewardReceive_state: number;
}
export const seasonInfo = new SeasonInfo();