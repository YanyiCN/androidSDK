import MyPop from "../../../base/MyPop";

const {ccclass, property} = cc._decorator;

@ccclass
export default class WebViewPop extends MyPop {

    @property(cc.Node)
    nodeCtn:cc.Node = null;

    @property(cc.Node)
    btnClose:cc.Node = null;

    @property(cc.WebView)
    wvMain:cc.WebView = null;

    private alertConfig:any;

    onExtLoad(userConfig:any) {
        let alertConfig = {
            url : "http://baidu.com",
            size : cc.size(640,480),
            close : true,
            onLoadUrl : null,
            closeByUrlFlag : "closePopEmpty"
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

        
        // 开始初始化
        this.initAll();
    }

    private initAll(){
        //
        this.nodeCtn.width = this.alertConfig.size.width;
        this.nodeCtn.height = this.alertConfig.size.height;

        // 关闭按钮
        if (!this.alertConfig.close) {
            this.btnClose.active = false;
        }

        this.wvMain.url = this.alertConfig.url;
        this.wvMain.node.on("loading",(a,b)=>{
            // console.log("loading")
            // console.log(a,b)
        });
        this.wvMain.node.on("loaded",(a,b)=>{
            // console.log("loaded")
            // console.log(a,b)
        });
    }
}
