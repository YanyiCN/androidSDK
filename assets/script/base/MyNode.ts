import glb from "../utils/glb";
import { EventType } from "../define/Const";
import ResUtil from "../utils/ResUtil";
import DependRes from "../data/entity/DependRes";
import ComUtil from "../utils/ComUtil";
import SoundMgr from "../data/SoundMgr";
import mlog from "../utils/LogUtil";

/**
 * Node 基类
 * 负责 资源加载/释放监听
 */
export default abstract class MyNode extends cc.Component {
    protected regLis(evtType:number,callbackFun:Function){
        glb.regEventLis(evtType,callbackFun,this);
    }

    constructor(){
        super();
    }

    protected getDependRes():DependRes[]{
        return null;
    }



    /**处理资源依赖 */
    private async handleDependRes(){
        if (!this.getDependRes() || this.getDependRes().length<=0) {
            return;
        }

        let dependList = this.getDependRes();
        await ResUtil.loadListPromiseAllByLimit(dependList,7);
    }
    private sleepByTime(timeMilSec=10){
        return new Promise((resolve)=>{
            setTimeout(()=>{
                resolve();
            },timeMilSec);
        });
    }

    private async onLoadAll(loadCall:Function){
        // 先透明  为了整体动画效果
        let orgOpacity = this.node.opacity;
        this.node.opacity = 0;

        // 人工延长时间 //TODO native这里曾经需要过
        // await this.sleepByTime(10);
        // 加载完成资源需求
        await this.handleDependRes();

        if (!this || !this.isValid) {
            mlog.warn("load after but invalid, so return.")
            return;
        }

        // 还原
        this.node.opacity = orgOpacity;

        // 开始执行逻辑加载
        this.onExtLoad();

        // 成功回调
        loadCall();
    }

    private pmsLoad:Promise<void> = null;
    onLoad(){
        this.pmsLoad = new Promise<void>((resolve, reject) => {
            this.onLoadAll(()=>{
                resolve();
            });
        });
    }
    start(){
        this.pmsLoad.then(()=>{
            this.onExtStart();
        });
    }
    onDestroy(){
        glb.removeTargetAllEventLis(this);
        this.onExtDestory();
    }


    /**
     * 逻辑加载:脚本onLoad后,且资源加载后,调用此方法
     * !!! 请勿直接重写onLoad
     */
    abstract onExtLoad();
    /**
     * 逻辑加载:脚本onExtLoad后,且start后,调用此方法
     * !!! 请勿直接重写onLoad
     */
    protected onExtStart(){
        // mlog.info("onExtStart")
    }
    /**
     * 逻辑加载:脚本onDestroy后,且事件释放后,调用此方法
     * !!! 请勿直接重写onLoad
     */
    protected onExtDestory(){
        // mlog.info("onExtDestory")
    }
    // update (dt) {}
}
