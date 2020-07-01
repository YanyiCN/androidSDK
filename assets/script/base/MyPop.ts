import glb from "../utils/glb";
import { EventType } from "../define/Const";
import ResUtil from "../utils/ResUtil";
import DependRes from "../data/entity/DependRes";
import ComUtil from "../utils/ComUtil";
import mlog from "../utils/LogUtil";
import PopMap, { PopMapPreUrl } from "../define/PopMap";


/**
 * Pop基类
 * 负责分辨率适配/背景放大/资源加载/释放监听
 */
export default abstract class MyPop extends cc.Component {
    protected regLis(evtType: number, callbackFun: Function) {
        glb.regEventLis(evtType, callbackFun, this);
    }

    constructor() {
        super();
    }

    protected regClickOtherClose(canClickCtn: cc.Node, funClick?: Function) {
        if (!canClickCtn.getComponent(cc.BlockInputEvents)) {
            canClickCtn.addComponent(cc.BlockInputEvents)
        }
        this.node.on(cc.Node.EventType.TOUCH_START, (evt: cc.Event.EventTouch) => {
            if (funClick != null) {
                funClick(evt);
            } else {
                this.close();
            }
        })
    }

    protected popCfg = {
        /**遮罩层 */
        mask: true,
        /**动画 */
        ani: true,
        /**是否可以穿过本窗口 */
        cross: false
    }

    private params: any[] = [];

    private popId: number;
    setPopId(popId: number) {
        this.popId = popId;
    }

    setPopInitParams(...params: any[]) {
        this.params = params;
    }

    close() {
        ComUtil.destroy(this.node);
    }

    protected closeExt() {

    }

    protected getDependRes(): DependRes[] {
        return null;
    }
    protected getDependResAsync(): DependRes[] {
        return null;
    }

    /**处理资源依赖 */
    private async handleDependRes() {
        if (this.getDependRes() && this.getDependRes().length > 0) {
            let dependList = this.getDependRes();
            await ResUtil.loadListPromiseAllByLimit(dependList, 7);
        }

        // 不着急的放在后面异步加载,不用等待
        let dependListAsync = this.getDependResAsync();
        ResUtil.loadListPromiseAllByLimit(dependListAsync, 3);
    }

    private maskSp: cc.Node;

    private addBaseNodes() {
        if (!this.popCfg.cross) {
            this.node.addComponent(cc.BlockInputEvents)
        }
        // 节点拉伸全屏
        ComUtil.fullScreenByResize(this.node);

        // 不需要遮挡
        if (!this.popCfg.mask) {
            return;
        }

        // 添加mask
        let maskSp = new cc.Node();
        maskSp.color = new cc.Color(0, 0, 0);
        maskSp.opacity = 180;
        let spr = maskSp.addComponent(cc.Sprite);
        spr.spriteFrame = ResUtil.getAtlasFrame("plist/common", "cm_black");
        spr.type = cc.Sprite.Type.SLICED;
        spr.sizeMode = cc.Sprite.SizeMode.CUSTOM;
        ComUtil.fullScreenByResize(maskSp);
        // 如果需要动画
        if (this.popCfg.ani) {
            // 提前放大
            // maskSp.scale = 1/0.8;
        }
        // 放置底层
        this.node.addChild(maskSp, -1);

        this.maskSp = maskSp;
    }


    private sleepByTime(timeMilSec = 10) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, timeMilSec);
        });
    }

    private async onLoadAll(loadCall: Function) {
        try {
            // 先隐藏
            this.node.opacity = 0;
            this.addBaseNodes();

            // 人工延长时间(发现在IOS上有问题,RecordPop等)
            // await this.sleepByTime(10);
            // 加载完成资源需求
            await this.handleDependRes();

            if (!this || !this.isValid) {
                mlog.warn("load after but invalid, so return.")
                // 去除加载loading
                glb.sendEvent(EventType.LOADING_SCENE_FINISH);
                return;
            }

            // 开始执行逻辑加载
            let arr = [...this.params[0]];
            await this.onExtLoad(
                arr[0], arr[1], arr[2], arr[3], arr[4],
                arr[5], arr[6], arr[7], arr[8], arr[9]);

            // 成功回调
            loadCall();
        } catch (error) {
            mlog.error("MyPop onExtLoad error", mlog.errorStr(error));
        }

        // 去除加载loading
        glb.sendEvent(EventType.LOADING_SCENE_FINISH);

        // this.node.active = true;

        // 开始动画展示
        if (this.popCfg.ani) {
            // this.node.setScale(0.8);
            this.node.opacity = 255;
            // cc.tween(this.node)
            // .to(0.05,{opacity:255 })
            // .call(()=>{
            //     if (this.maskSp && this.popCfg.mask) {
            //         this.maskSp.scale =1;
            //     }
            // }).start();
        } else {
            this.node.opacity = 255;
        }
    }

    onLoad() {

    }
    start() {
        new Promise<void>((resolve, reject) => {
            this.onLoadAll(() => {
                resolve();
            });
        }).then(() => {
            this.onExtStart();
        });
    }
    onDestroy() {
        glb.removeTargetAllEventLis(this);
        this.onExtDestory();
        this.closeExt();

        // 临时简单预制体释放

        // let popPrefabName = PopMap[this.popId]
        // if (!popPrefabName) {
        //     mlog.error(`popId:[${this.popId}] 在PopMap中不存在`);
        //     return;
        // }
        //     popPrefabName = PopMapPreUrl + popPrefabName;
        // cc.loader.release(popPrefabName);
    }
    public test(str) {
        console.log("父节点脚本 " + str);
    }

    /**
     * 逻辑加载:脚本onLoad后,且资源加载后,调用此方法
     * !!! 请勿直接重写onLoad
     */
    async abstract onExtLoad(...params: any[]);
    /**
     * 逻辑加载:脚本onExtLoad后,且start后,调用此方法
     * !!! 请勿直接重写onLoad
     */
    protected onExtStart() {
        // mlog.info("onExtStart")
    }
    /**
     * 逻辑加载:脚本onDestroy后,且事件释放后,调用此方法
     * !!! 请勿直接重写onLoad
     */
    protected onExtDestory() {
        // mlog.info("onExtDestory")
    }
    // update (dt) {}
}
