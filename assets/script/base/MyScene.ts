import glb from "../utils/glb";
import { EventType } from "../define/Const";
import ResUtil from "../utils/ResUtil";
import DependRes from "../data/entity/DependRes";
import ComUtil from "../utils/ComUtil";
import mlog from "../utils/LogUtil";

/**
 * 场景基类
 * 负责分辨率适配/背景放大/资源加载/释放监听
 */
export default abstract class MyScene extends cc.Component {

    public abstract getSceneType():string;
    

    protected regLis(evtType:number,callbackFun:Function){
        glb.regEventLis(evtType,callbackFun,this);
    }

    public addPop(pop:cc.Node,popName:string){
        this.node.addChild(pop,null,popName);
        // pop.x=0;pop.y=0;--适配
    }

    public findPop(popName:string):cc.Node{
        return this.node.getChildByName(popName);
    }

    protected getDependRes():DependRes[]{
        return null;
    }

    protected getDependResAsync():DependRes[]{
        return null;
    }
    
    protected abstract getBgNode():cc.Node;

    /**处理资源依赖 */
    private async handleDependRes(){
        if (this.getDependRes() && this.getDependRes().length>0) {
            // 发送loading请求
            glb.sendEvent(EventType.LOADING_SCENE_NEED);
            try {
                let dependList = this.getDependRes();
                await ResUtil.loadListPromiseAllByLimit(dependList,7);
            } catch (error) {
                mlog.error("MyScene loadListPromiseAllByLimit error",error);
            }
            
            // 加载完所有
            glb.sendEvent(EventType.LOADING_SCENE_FINISH);
        }
        
        // 不着急的放在后面异步加载,不用等待
        let dependListAsync = this.getDependResAsync();
        ResUtil.loadListPromiseAllByLimit(dependListAsync,3);
    }

    private handleAutoSize(){
        // 适配解决方案
        let _canvas = cc.Canvas.instance;
        // 设计分辨率比
        let _rateR = _canvas.designResolution.height/_canvas.designResolution.width;
        // 显示分辨率比
        let _rateV = cc.sys.getSafeAreaRect().height/cc.sys.getSafeAreaRect().width;
        if (_rateV > _rateR){
            _canvas.fitHeight = false;
            _canvas.fitWidth = true;
        }else{
            _canvas.fitHeight = true;
            _canvas.fitWidth = false;
        }
    }

    private async onLoadAll(loadCall:Function){
        // 动态适配屏幕
        this.handleAutoSize();
        // 背景
        if (this.getBgNode()) {
            ComUtil.fullScreenByScale(this.getBgNode());
        }
        // 加载完成资源需求
        await this.handleDependRes();
        // 
        if (!this || !this.isValid) {
            mlog.warn("load after but invalid, so return.")
            return;
        }
        // 开始执行逻辑加载
        this.onExtLoad();
        this.mySceneStep++;
        // 成功回调
        loadCall();
    }

    private onSceneLaunchedFun:Function;

    public setOnSceneLaunched(launched:Function){
        this.onSceneLaunchedFun = launched;
        this.doSceneLaunched();
    }

    private doSceneLaunched(){
        if (this.mySceneStep == 2 && this.onSceneLaunchedFun!=null) {
            this.mySceneStep++;
            this.onSceneLaunchedFun(this);
        }
    }

    private mySceneStep = 0;

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
            this.mySceneStep++;
            
            this.doSceneLaunched();
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
    protected onExtLoad(){
        // mlog.info("onExtLoad")
    }
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
