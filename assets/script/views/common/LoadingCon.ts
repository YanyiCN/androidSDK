import glb from "../../utils/glb";
import { EventType } from "../../define/Const";
import ComUtil from "../../utils/ComUtil";
import { Texts } from "../../define/Texts";


const {ccclass, property} = cc._decorator;

@ccclass
export default class LoadingCon extends cc.Component {

    @property(cc.Label)
    lbTxt:cc.Label = null;

    @property(cc.Node)
    spLoading:cc.Node = null;

    

    alertConfig = {
        delay : 0.8,
        title : Texts.defConLoading,
        timeout : 10,
    }

    scheduleShow:Function = null;

    regLis(){
        glb.regEventLis(EventType.LOADING_CON,this.updateLoading,this);
    }

    onLoad(){
        this.updateLoading(false);
        this.lbTxt.string = this.alertConfig.title;

        cc.tween(this.spLoading).repeatForever(
            cc.tween(this.spLoading).by(1.2,{angle:180})
        ).start();
    }

    updateLoading(needLoad){
        if (needLoad) {
            ComUtil.fullScreenByResize(this.node);
            this.node.x = this.node.width/2;
            this.node.y = this.node.height/2;
            if (this.scheduleShow!=null) {
                return;
            }
            this.scheduleShow = ()=>{
                this.node.active = true;
                this.scheduleShow = null;
            };
            this.scheduleOnce(this.scheduleShow,this.alertConfig.delay);
        }else{
            if (this.scheduleShow!=null) {
                this.unschedule(this.scheduleShow);
                this.scheduleShow = null;
            }
            this.node.active = false;
        }
        
    }
}