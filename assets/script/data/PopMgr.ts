import MyMgr from "../base/MyMgr";
import glb from "../utils/glb";
import MyPop from "../base/MyPop";
import {EventType, PopLayer } from "../define/Const";
import PopMap, { PopMapPreUrl } from "../define/PopMap";
import ResUtil from "../utils/ResUtil";
import SceneMgr from "./SceneMgr";
import ViewUtil from "../utils/ViewUtil";
import ComUtil from "../utils/ComUtil";
import MyLayer from "../base/MyLayer";
import mlog from "../utils/LogUtil";

class PopMgr extends MyMgr{
    public initByLoad() {
        mlog.info("初始Pop弹框管理器");
    }

    public uninitMgr() {}
    public initMgr() {}

    

    /**
     * 弹出框
     * @param popId 弹框ID
     * @param args 初始化参数
     */
    public async showPop(popId:number,...args:any[]){
        let popPrefabName = PopMap[popId]
        if (!popPrefabName) {
            mlog.error(`popId:[${popId}] 在PopMap中不存在`);
            return;
        }
        try {
            popPrefabName = PopMapPreUrl + popPrefabName;

            // 发送loading请求
            glb.sendEvent(EventType.LOADING_SCENE_NEED);
            // 得到预制体
            let popPrefab = await ResUtil.loadResAuto(popPrefabName,cc.Prefab);
            // 创建预制体
            let popNode:cc.Node = cc.instantiate(popPrefab);
            // 参数设置
            let popScript:MyPop = popNode.getComponent(MyPop);
            popScript.setPopId(popId);
            popScript.setPopInitParams(args);
            // 添加到当前场景
            SceneMgr.getCurScene().addPop(popNode,"pop_type_" + popId);
        } catch (error) {
            mlog.error(`showPop error showPopId:[${popId}]`,mlog.errorStr(error))
            glb.sendEvent(EventType.LOADING_SCENE_FINISH);
        }
        
    }

    /**
     * 弹出框
     * @param popId 弹框ID
     * @param args 初始化参数
     */
    public createLayer(layerUrl,...args:any[]):cc.Node{
        let nodeLayer = ResUtil.createCachePrefabsNode(layerUrl);
        if (!nodeLayer) {
            return;
        }
        // 参数设置
        let popScript:MyLayer = nodeLayer.getComponent(MyLayer);
        popScript.setLayerInitParams(args);

        return nodeLayer;
    }

    
    //通过类型寻找弹框
    public findPopByType( popType ):cc.Node{
        return SceneMgr.getCurScene().findPop("pop_type_" + popType);
    }


    public async alert(param:string);
    public async alert(param:{
        close? : boolean,
        alertId? : number,//用以关闭
        alertTagId? : any,
        msg? : string,
        okBtn? : boolean,
        okCallback? : Function,
        okAutoClose? : boolean,
        cancelBtn? : boolean,
        cancelCallback? : Function,
        cancelAutoClose? : boolean,
        userBtns? : cc.Node[] });
    public async alert(param?:any){
        if (typeof param === "string") {
            this.showPop(PopLayer.POP_ALERT,{msg:param})
        }else{
            this.showPop(PopLayer.POP_ALERT,param)
        }
    }

    public async tip(param:string);
    public async tip(param:{ msg? : string, delayShow?:number, showTime?:number});
    public async tip(param?:any){
        if (typeof param === "string") {
            this.showPop(PopLayer.POP_TIP,{msg:param})
        }else{
            this.showPop(PopLayer.POP_TIP,param)
        }
    }
}
export default new PopMgr();