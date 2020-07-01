import MyPop from "../../../base/MyPop";
import DependRes from "../../../data/entity/DependRes";
import ResUtil from "../../../utils/ResUtil";

const {ccclass, property} = cc._decorator;

@ccclass
export default class LoadingBar extends MyPop {
    @property(cc.ProgressBar)
    barRes:cc.ProgressBar = null;

    @property(cc.Label)
    lbTip:cc.Label = null;

    private sucCallback:Function;

    onExtLoad(resList:DependRes[],tipStr:string,sucCallback:()=>void,timeMinMSec:number=0) {
        this.lbTip.string = tipStr || "进入游戏中..";
        this.barRes.progress = 0;
        this.sucCallback = sucCallback;
        let nowTime = Date.now();// 毫秒
        ResUtil.loadListPromiseAllByLimit(resList,7,(progress)=>{
            if (!this.barRes || !this.barRes.isValid) {
                return;
            }
            this.barRes.progress = progress.succ/progress.total
            if (this.barRes.progress>=1) {
                if (Date.now() - nowTime >=timeMinMSec) {
                    this.finishAll();
                }else{
                    this.scheduleOnce(this.finishAll,(timeMinMSec+nowTime -Date.now())/1000 );
                }
            }
        });
    }

    private finishAll(){
        if (this.sucCallback!=null) {
            this.close();
            this.sucCallback();
            this.sucCallback = null;
        }
    }
}