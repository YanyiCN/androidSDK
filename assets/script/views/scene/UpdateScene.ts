import SceneMgr from "../../data/SceneMgr";
import MyScene from "../../base/MyScene";
import { SceneType } from "../../define/Const";
import ResUtil from "../../utils/ResUtil";
import DependRes from "../../data/entity/DependRes";
import glb from "../../utils/glb";
import mlog from "../../utils/LogUtil";
import { ClientCfg, ClientGameType } from "../../define/ClientCfg";
import { Texts } from "../../define/Texts";


const { ccclass, property } = cc._decorator;

let preLoadList: DependRes[] = [
    // { url: "sound/bgm", type: cc.AudioClip, dir: true },
    { url: "plist/common", type: cc.SpriteAtlas },
    { url: "plist/other", type: cc.SpriteAtlas },
    { url: "prefabs/pop/common/TipPop", type: cc.Prefab },
    { url: "prefabs/common/HeadBoxSprite", type: cc.Prefab },

    //-----测试加载速度
    // { url: "prefabs/pop", type: cc.Prefab, dir: true },
];


@ccclass
export default class UpdateScene extends MyScene {

    @property(cc.Node)
    private bgQP: cc.Node = null;


    @property(cc.ProgressBar)
    barRes: cc.ProgressBar = null;

    @property(cc.Label)
    lbTip: cc.Label = null;

    @property(cc.Node)
    nodeSpineLoading: cc.Node = null;

    @property(cc.Node)
    nodeBar: cc.Node = null;

    // @property({ type: cc.Asset })
    // manifestUrl: cc.Asset = null;


    private _am: any;
    private _updating: boolean;
    private _canRetry: boolean;
    protected getDependResAsync(): DependRes[] {
        return null;
        // [    { url: "sound/other", type: cc.AudioClip, dir: true }];
    }


    getBgNode(): cc.Node {
        return this.bgQP;
    }

    public getSceneType(): string {
        return SceneType.UPDATE_SCENE;
    }

    // 自定义load方法
    onExtLoad() {
    }
    // 自定义start方法
    onExtStart() {
        this.schedule(() => {
            this.lbTip.string = Texts.loadTip[Math.floor(Math.random() * 3)];
        }, 10)

        // mlog.info(this.manifestUrl);
        this.getBgNode().opacity = 255;

        this.bgQP.active = true;
        mlog.info("预加载 ");

        // 预加载
        SceneMgr.preloadLoginScene(); 
        mlog.info(" 是否需要更新 ");
        // 如果有更新就不进入场景了
        // if (this.checkOrUpdate()) {
        //     return;
        // }

        // 开始加载资源并进入下个场景
        this.doLoadResAndNextScene();
    }

    // 加载资源并进入下个场景
    async doLoadResAndNextScene() {
        mlog.info("加载资源并进入下个场景 ");
        this.barRes.progress = 0;
        let self = this;
        await ResUtil.loadListPromiseAllByLimit(preLoadList, 7, (progress) => {
            self.barRes.progress = progress.succ / progress.total;
            self.nodeSpineLoading.x = (self.nodeBar.width - 685);
        });
        SceneMgr.goLoginScene();
    }

    // 
    private checkOrUpdate(): boolean {
        if (glb.isShenhe) {
            return false;
        }
        if (cc.sys.platform != cc.sys.ANDROID
            && cc.sys.platform != cc.sys.IPHONE
            && cc.sys.platform != cc.sys.IPAD
            && cc.sys.platform != cc.sys.WIN32) {
            return false;
        }
        return true;
    }



    // 自定义destory方法
    onExtDestory() { }
}
