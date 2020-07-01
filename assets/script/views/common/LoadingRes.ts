import glb from "../../utils/glb";
import { EventType, Mid } from "../../define/Const";
import ComUtil from "../../utils/ComUtil";
import { Lobby } from "../../proto/proto";
import mlog from "../../utils/LogUtil";
import PopMgr from "../../data/PopMgr";


const {ccclass, property} = cc._decorator;

@ccclass
export default class LoadingRes extends cc.Component {
    
    @property(cc.Node)
    mask:cc.Node = null;

    @property(cc.Node)
    spLoading:cc.Node = null;

    @property(cc.Label)
    lbTxt:cc.Label = null;

    private SHOW_TIMEOUT_SEC = 15;

    private startShowTime:number;
    private sceneNeedCount:number = 0;
    private msgNeedCount:number = 0;
    private isShowing = false;

    private msgDataMap:{[reqMsgId:string]:{mtype:number,reqMsgId:number, autoCloseMsg:number[]}} = {};

    regLis(){
        glb.regEventLis(EventType.LOADING_SCENE_NEED,this.onNeedSceneLoading,this);
        glb.regEventLis(EventType.LOADING_SCENE_FINISH,this.onFinishSceneLoading,this);

        glb.regEventLis(EventType.LOADING_MSG_NEED,this.onNeedMsgLoading,this);
        glb.regEventLis(EventType.LOADING_MSG_FINISH,this.onFinishMsgLoading,this);
        
    }

    onLoad(){
        this.node.active = false;
        this.mask.active = false;
        this.lbTxt.node.active = false;
        this.spLoading.active = false;
        this.isShowing = false;

        this.startShowTime = Date.now();
        
        cc.tween(this.spLoading).repeatForever(
            cc.tween(this.spLoading).by(1.2,{angle:-180})
        ).start();
        this.lbTxt.string = "";
        this.updateLoading();

        this.schedule(this.checkTimeout,1)
    }

    onNeedMsgLoading(loadingData:{mtype:number,reqMsgId:number, autoCloseMsg:number[]}){
        this.msgDataMap[loadingData.reqMsgId] = loadingData;
        this.msgNeedCount++;
        this.updateLoading();
    }
    onFinishMsgLoading(mtype:number,msg:any,cleanAll:boolean=false){
        if (cleanAll) {
            this.msgDataMap = {};
            if (this.msgNeedCount>0) {
                glb.getSocket().hasMsgNoSuc = true;
            }
            this.msgNeedCount=0;
            this.updateLoading();
            return;
        }
        
        if (mtype == Mid.MID_SERVER_ERROR_RES) {
            let reqMsgId = ((msg as Lobby.IServerErrorRes).req_id) as number;

            if (reqMsgId && this.msgDataMap[reqMsgId]!=null) {
                this.msgNeedCount--;
                this.msgDataMap[reqMsgId] = undefined;
            }
        }
        
        let keyList:string[] = [];
        for (const key in this.msgDataMap) {
            if (this.msgDataMap.hasOwnProperty(key)) {
                const data = this.msgDataMap[key];
                if (!data || !data.autoCloseMsg || data.autoCloseMsg.length<=0) {
                    continue;
                }
                for (const msgType of data.autoCloseMsg) {
                    if (msgType == mtype) {
                        keyList.push(key);
                        break;
                    }
                }
            }
        }
        for (const key of keyList) {
            
            this.msgDataMap[key] = undefined;
            delete this.msgDataMap[key];
            this.msgNeedCount--;
        }
        this.updateLoading();
    }

    onNeedSceneLoading(){
        this.sceneNeedCount++;
        this.updateLoading();
    }
    onFinishSceneLoading(){
        this.sceneNeedCount--;
        this.updateLoading();
    }

    private checkTimeout(){
        if (!this.isShowing) {
            return;
        }
        if (Date.now() - this.startShowTime < this.SHOW_TIMEOUT_SEC * 1000) {
            return;
        }
        PopMgr.tip("加载超时...");
        this.forceClean();
    }

    // 强行清空
    private forceClean(){
        mlog.error("LoadingRes forceClean sceneNeedCount:",this.sceneNeedCount,"msgNeedCount:",this.msgNeedCount)
        this.sceneNeedCount = 0;
        this.msgNeedCount = 0;
        this.msgDataMap = {};
        this.startShowTime = Date.now();
        this.unschedule(this.delayToShow);
        this.updateLoading();
    }

    updateLoading(){
        if (this.sceneNeedCount<0) {
            this.sceneNeedCount=0;
        }
        if (this.msgNeedCount<0) {
            this.msgNeedCount=0;
        }
        let show = (this.sceneNeedCount>0 || this.msgNeedCount>0);
        if (show) {
            ComUtil.fullScreenByResize(this.node);
            this.node.x = this.node.width/2;
            this.node.y = this.node.height/2;
        }
        
        if (show) {
            this.startShowTime = Date.now();
            if (this.isShowing) {
                return;
            }
            this.node.active = true;
            this.mask.active = false;
            this.lbTxt.node.active = false;
            this.spLoading.active = false;
            this.isShowing = true;
            this.scheduleOnce(this.delayToShow.bind(this),0.3);
        }else{
            if (this.isShowing) {
                this.unschedule(this.delayToShow);
            }
            this.node.active = false;
            this.mask.active = false;
            this.spLoading.active = false;
            this.lbTxt.node.active = false;
            this.isShowing = false;
        }
    }

    private delayToShow(){
        this.mask.active = true;
        this.lbTxt.node.active = true;
        this.spLoading.active = true;
        this.isShowing = true;
    }
}