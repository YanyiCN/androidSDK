import MyPop from "../../../base/MyPop";
import ViewUtil from "../../../utils/ViewUtil";
import mlog from "../../../utils/LogUtil";
import HttpUtil from "../../../utils/HttpUtil";
import CrossMgr from "../../../data/CrossMgr";
import PopMgr from "../../../data/PopMgr";
import glb from "../../../utils/glb";
import { PopLayer } from "../../../define/Const";
// import ShareMgr from "../../../data/ShareMgr";


const {ccclass, property} = cc._decorator;

@ccclass
export default class DebugFunPop extends MyPop {

    @property(cc.Node)
    btnExample:cc.Node = null;
    @property(cc.ScrollView)
    svMain:cc.ScrollView = null;
   
    onExtLoad() {
        this.btnExample.active = false;
        // 重连
        this.svMain.content.addChild(this.createBtn("重连",()=>{
            glb.getSocket().reConnect(true);
        }));
        // HttpUtil测试
        this.svMain.content.addChild(this.createBtn("HttpUtil测试",()=>{
            let strSuc = "https://cdn.18juyou.com/config/ddz_config.json";
            mlog.info("httpgeturl",strSuc)
            HttpUtil.get({url:strSuc,callback:(resTxt,errMsg)=>{
                if (errMsg) {
                    mlog.info("httgetpurl",strSuc,"err:",errMsg)
                }else{
                    mlog.info("httgetpurl",strSuc,"suc:",resTxt)
                }
            }})

            let strErr = "https://cdn.18juyou.com/config/ddz_config11111.json";
            mlog.info("httpgeturl",strErr)
            HttpUtil.get({url:strErr,callback:(resTxt,errMsg)=>{
                if (errMsg) {
                    mlog.info("httpgeturl",strErr,"err:",errMsg)
                }else{
                    mlog.info("httpgeturl",strErr,"suc:",resTxt)
                }
            }})


            let strPostSuc = "http://pay.18juyou.com/order/wxGameClientCallback";
            let xx = HttpUtil.createParamStr({
                orderId:"WXG11908171542314444"
            });
            mlog.info("httpposturl",strPostSuc)
            HttpUtil.post({
                url:strPostSuc,
                body:xx,
                callback:(resTxt,errMsg)=>{
                if (errMsg) {
                    mlog.info("httpposturl",strPostSuc,"err:",errMsg)
                }else{
                    mlog.info("httpposturl",strPostSuc,"suc:",resTxt)
                }
            }})
        }));
        // 震动
        this.svMain.content.addChild(this.createBtn("震动",()=>{
            CrossMgr.makeShock();
        }));
        // GPS检测现在的开关
        this.svMain.content.addChild(this.createBtn("GPS.checkOpen",()=>{
            PopMgr.tip(CrossMgr.checkGpsOpen(null)+"")
        }));
        // GPS请求打开GPS
        this.svMain.content.addChild(this.createBtn("GPS.reqOpen",()=>{
            PopMgr.tip(CrossMgr.gpsReqOpen()+"")
        }));
        // GPS获取
        this.svMain.content.addChild(this.createBtn("GPS获取",()=>{
            PopMgr.tip(CrossMgr.getGpsLoc())
        }));
        // Pay
        this.svMain.content.addChild(this.createBtn("PayLoading",()=>{
            PopMgr.showPop(PopLayer.LAYER_PAY_LOADING,
                111,
                "支付中\n...",
                10,
                {delayShowSec:5})
        }));

        // 截图 分享
        // this.svMain.content.addChild(this.createBtn("截图分享",()=>{
        //     ShareMgr.shareFixCapture(null,null,null,(ff)=>{
        //         PopMgr.alert("截图成功:"+ff)
        //     })
        // }));
        
    }

    private createBtn(txt,funByClick){
        let btn = cc.instantiate(this.btnExample);
        btn.active = true;
        btn.getChildByName("lbTxt").getComponent(cc.Label).string = txt;
        btn.on("click",funByClick)
        return btn;
    }

  
}
