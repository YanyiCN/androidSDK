import MyPop from "../../../base/MyPop";

const {ccclass, property} = cc._decorator;

@ccclass
export default class TipPop extends MyPop {

    @property(cc.Node)
    tipNode:cc.Node = null;


    @property(cc.Label)
    labelMsg:cc.Label = null;

    private alertConfig:any;


    constructor(){
        super();
        this.popCfg.ani = false;
        this.popCfg.mask = false;
        this.popCfg.cross = true;
    }
    
    onExtLoad(userConfig:any) {
        let alertConfig = {
            delayShow : 0,
            msg : "提示",
            showTime : 2
        }

        if (userConfig) {
            for (const key in userConfig) {
                if (userConfig.hasOwnProperty(key)) {
                    const val = userConfig[key];
                    alertConfig[key] = val;
                }
            }
        }
        this.alertConfig = alertConfig;

        // 消息内容
        this.labelMsg.string = alertConfig.msg;

        cc.tween(this.tipNode)
            .to(0,{ opacity:0, scale:0.7})
            .delay(alertConfig.delayShow)
            .to(0.15,{ opacity:255, scale:1 },{easing:"backOut"})
            .delay(alertConfig.showTime)
            .call(()=>{this.close()})
            .start();
    }

}
