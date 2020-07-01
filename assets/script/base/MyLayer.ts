import glb from "../utils/glb";
import ComUtil from "../utils/ComUtil";
import ResUtil from "../utils/ResUtil";

export default abstract class MyLayer extends cc.Component {
    maskSp: cc.Node;
    protected regLis(evtType:number,callbackFun:Function){
        glb.regEventLis(evtType,callbackFun,this);
    }

    protected regClickOtherClose(canClickCtn:cc.Node,funClick?:Function){
        if (!canClickCtn.getComponent(cc.BlockInputEvents)) {
            canClickCtn.addComponent(cc.BlockInputEvents)
        }
        this.node.on(cc.Node.EventType.TOUCH_START,(evt:cc.Event.EventTouch)=>{
            if (funClick!=null) {
                funClick(evt);
            }else{
                this.close();
            }
        })
    }

    protected fullScreen(){
        // 节点拉伸全屏
        ComUtil.fullScreenByResize(this.node);
    }

    protected addMask(){
        if (this.maskSp!=null) {
            return;
        }
        // 添加mask
        let maskSp = new cc.Node();
        maskSp.color = new cc.Color(0,0,0);
        maskSp.opacity = 180;
        let spr = maskSp.addComponent(cc.Sprite);
        spr.spriteFrame = ResUtil.getAtlasFrame("plist/common","cm_black");
        spr.type = cc.Sprite.Type.SLICED;
        spr.sizeMode = cc.Sprite.SizeMode.CUSTOM;
        ComUtil.fullScreenByResize(maskSp);
        // 放置底层
        this.node.addChild(maskSp,-1);

        this.maskSp = maskSp;
    }

    close(){
        ComUtil.destroy(this.node);
    }


    onLoad(){
        ComUtil.fullScreenByResize(this.node);
        // 开始执行逻辑加载
        if (this.params.length>0) {
            let arr = [...this.params[0]];
        
            this.onExtLoad(
                arr[0],arr[1],arr[2],arr[3],arr[4],
                arr[5],arr[6],arr[7],arr[8],arr[9]);
        }else{
            this.onExtLoad();
        }
        
    }
    start(){
        this.onExtStart();
    }
    onDestroy(){
        glb.removeTargetAllEventLis(this);
        this.onExtDestory();
    }

    private params:any[] = [];
    setLayerInitParams( ...params:any[]){
        this.params = params;
    }


    /**
     * 逻辑加载:脚本onLoad后,且资源加载后,调用此方法
     * !!! 请勿直接重写onLoad
     */
    abstract onExtLoad(...params:any[]);
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
