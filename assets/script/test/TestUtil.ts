import ComUtil from "../utils/ComUtil";

export class TestUtil {
    public static ConsoleLog(msg: string, num: number = 100) {
        let Dates = new Date();
        console.log(msg + "打印测试  " + "  \n打印时间  " + Dates.toLocaleString());
        for (let i = 0; i < num; i++) {
            console.log(msg + "打印测试  " + i);
        }
    }
}