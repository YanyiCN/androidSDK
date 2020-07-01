
import MyScene from "../../base/MyScene";
import { SceneType } from "../../define/Const";
import mlog from "../../utils/LogUtil";
import glb from "../../utils/glb";
import SceneMgr from "../../data/SceneMgr";

const {ccclass, property} = cc._decorator;

@ccclass
export default class LogoScene extends MyScene {

    @property(cc.Node)
    private nodeBg:cc.Node = null;

    
    public getSceneType(): string {
        return SceneType.LOGO_SCENE;
    }

    getBgNode():cc.Node{
        return this.nodeBg;
    }

    onExtLoad() {
        mlog.info("LogoScene onLoad")

      
    }


    onExtStart() {
        if (glb.isTest) {
            SceneMgr.goUpdateScene(100);
        }else{
            SceneMgr.goUpdateScene(1000);
        }
    }

}
