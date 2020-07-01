import glb from "../../utils/glb";
import { EventType } from "../../define/Const";
import ComUtil from "../../utils/ComUtil";
import { Texts } from "../../define/Texts";


const {ccclass, property} = cc._decorator;

@ccclass
export default class NetStateTip extends cc.Component {

    @property(cc.Label)
    lbTxt:cc.Label = null;
    @property(cc.Node)
    spIconNet:cc.Node = null;
    @property(cc.Node)
    spIconWifi:cc.Node = null;


    scheduleHide:Function = null;

    regLis(){
        glb.regEventLis(EventType.NET_STATE_TIP,this.updateLoading,this);
    }

    onLoad(){
        this.node.active = false;
    }

    updateLoading(cfg){
        let tipConfig = {
            msg : "",
            showTime : 1,
            icon : null
        }
        if(cfg){
            // 用户配置
            for (const key in cfg) {
                if (cfg.hasOwnProperty(key)) {
                    const cfgItem = cfg[key];
                    tipConfig[key] = cfgItem;
                }
            }
        }

        this.lbTxt.string = tipConfig.msg;
        this.spIconNet.active = tipConfig.icon == "net";
        this.spIconWifi.active = tipConfig.icon == "wifi";

        ComUtil.fullScreenByResize(this.node);
        this.node.x = this.node.width/2;
        this.node.y = this.node.height/2;
        if (this.scheduleHide!=null) {
            // 先移除旧的定时器
            this.unschedule(this.scheduleHide);
        }
        this.scheduleHide = ()=>{
            this.node.active = false;
            this.scheduleHide = null;
        };
        this.node.active = true;
        this.scheduleOnce(this.scheduleHide,tipConfig.showTime);
    }
}