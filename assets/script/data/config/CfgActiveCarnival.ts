//------------------------
/**嘉年华配置 */
//------------------------
//七日礼包
export class ActiveCarnivalSevenConfig {
    id: number;
    day: number;
    rewardId: number;
    rewardNum: number;
    rewardType: number;

}

//嘉年华静态配置
export class ActiveCarnivalConfig {
    menuList: ActiveCarnivalMenuConfig[];
    taskList: ActiveCarnivalTaskConfig[];
}

//任务系列-任务菜单
export class ActiveCarnivalMenuConfig {
    name: string;
    key: string;
}

//任务系列-任务详情配置
export class ActiveCarnivalTaskConfig {
    id: number;
    jnhType: string;
    taskType: number;
    taskTimes: number;
    rewardType: number;
    rewardId: number;
    rewardNum: number;
}