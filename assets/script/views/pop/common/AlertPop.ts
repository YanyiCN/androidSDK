import MyPop from "../../../base/MyPop";
import DependRes from "../../../data/entity/DependRes";
import { EventType } from "../../../define/Const";
import ComUtil from "../../../utils/ComUtil";

const {ccclass, property} = cc._decorator;

@ccclass
export default class AlertPop extends MyPop {

    @property(cc.Node)
    btnClose:cc.Node = null;

    @property(cc.Node)
    btnOk:cc.Node = null;

    @property(cc.Node)
    btnCancel:cc.Node = null;

    @property(cc.Label)
    labelMsg:cc.Label = null;


    private alertConfig:any;

    onExtLoad(userConfig:any) {
        //监听
        this.regLis(EventType.REMOVE_SELF_BY_NAME,this.removeSelfByAlertId)
        this.regLis(EventType.BACK_CLICK,this.onBackClick);

        let alertConfig = {
            close : false,
            alertId : null,//用以关闭
            msg : "提示",
            okBtn : true,
            okCallback : null,
            okAutoClose : true,
            cancelBtn : false,
            cancelCallback : null,
            cancelAutoClose : true,
            userBtns : []
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

        // 关闭按钮
        if (!alertConfig.close) {
            this.btnClose.active = false;
        }
        let btnList:cc.Node[] = [];
        // 消息内容
        this.labelMsg.string = alertConfig.msg;
        if (!alertConfig.okBtn) {
            this.btnOk.active = false;
        }else{
            btnList.push(this.btnOk);
        }
        // 标题
        if (!alertConfig.cancelBtn) {
            this.btnCancel.active = false;
        }else{
            btnList.push(this.btnCancel);
        }

        // 传入的按钮
        if (alertConfig.userBtns && alertConfig.userBtns.length>0) {
            for (const btn of alertConfig.userBtns) {
                btnList.push(btn);
                btn.y = this.btnOk.y;
                this.node.addChild(btn);
            }
        }
        let chaNum = 0
        if (btnList.length>3) {
            chaNum = 30;
        }else if (btnList.length==3) {
            chaNum = 50;
        }else if (btnList.length==2) {
            chaNum = 70;
        }

        ComUtil.sortMidByAutoWidth(btnList,cc.v2(0,this.btnOk.y),chaNum)
    }

    onClickOkBtn(){
        if (this.alertConfig.okCallback) {
            this.alertConfig.okCallback()
        }
        if (this.alertConfig && this.alertConfig.okAutoClose) {
            this.close()
        }
    }

    onClickCancelBtn(){
        if (this.alertConfig.cancelCallback) {
            this.alertConfig.cancelCallback()
        }
        if (this.alertConfig && this.alertConfig.cancelAutoClose) {
            this.close()
        }
    }

    
    private onBackClick(){
        if (this.alertConfig.cancelBtn) {
            this.onClickCancelBtn();
        }
    }

    private removeSelfByAlertId(alertId){
        if (alertId!=null && this.alertConfig.alertId!=null && alertId == this.alertConfig.alertId) {
            this.close()
        }
    }

}
