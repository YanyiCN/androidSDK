import MyMgr from "../base/MyMgr";
import LoadingRes from "../views/common/LoadingRes";
import mlog from "../utils/LogUtil";
import LoadingCon from "../views/common/LoadingCon";
import NetStateTip from "../views/common/NetStateTip";
import ViewUtil from "../utils/ViewUtil";
import ResUtil from "../utils/ResUtil";
import PopMgr from "./PopMgr";
import { PopLayer } from "../define/Const";

class FloatMgr extends MyMgr{
    public initByLoad() {
        mlog.info("初始悬浮层管理器");
    }

    loadingRes:LoadingRes;
    loadingCon:LoadingCon;
    netStateTip:NetStateTip;

    debugBtn:cc.Node;
    
    
    public uninitMgr() {}
    public initMgr() {
        // 将loading提前准备好
        cc.loader.loadRes("prefabs/common/LoadingRes",cc.Prefab,(error,prefab:cc.Prefab)=>{
            let nodeLoading = cc.instantiate(prefab)
            cc.game.addPersistRootNode(nodeLoading)
            nodeLoading.active = false
            this.loadingRes = nodeLoading.getComponent(LoadingRes);
            this.loadingRes.regLis();
        });
        // 将loading提前准备好
        cc.loader.loadRes("prefabs/common/LoadingCon",cc.Prefab,(error,prefab:cc.Prefab)=>{
            let nodeLoading = cc.instantiate(prefab)
            cc.game.addPersistRootNode(nodeLoading)
            nodeLoading.active = false
            this.loadingCon = nodeLoading.getComponent(LoadingCon);
            this.loadingCon.regLis();
        });
        // 将loading提前准备好
        cc.loader.loadRes("prefabs/common/NetStateTip",cc.Prefab,(error,prefab:cc.Prefab)=>{
            let nodeLoading = cc.instantiate(prefab)
            cc.game.addPersistRootNode(nodeLoading)
            nodeLoading.active = false
            this.netStateTip = nodeLoading.getComponent(NetStateTip);
            this.netStateTip.regLis();
        });
    }

    public showDebugPoint(){
        if (this.debugBtn!=null) {
            return;
        }
        this.debugBtn = ViewUtil.imgBtn(ResUtil.getAtlasFrameCom("cm_debug_point"),null,()=>{
            PopMgr.showPop(PopLayer.POP_DEBUG_FUN)
        });
        this.debugBtn.setPosition(50,50)
        cc.game.addPersistRootNode(this.debugBtn);
    }

    

}

export default new FloatMgr();