import MyPop from "../../base/MyPop";
import { EventType, SendMailType } from "../../define/Const";
import { Lobby } from "../../proto/proto";
import PopMgr from "../../data/PopMgr";
import MailMgr from "../../data/MailMgr";
import ComUtil from "../../utils/ComUtil";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MailListPop extends MyPop {
    @property(cc.Node)
    nodeContent: cc.Node = null;

    @property(cc.Node)
    nodeItemExample: cc.Node = null;

    @property(cc.Node)
    nodeGilf: cc.Node = null;

    @property(cc.Node)
    nodeMailDetails: cc.Node = null;

    @property(cc.Node)
    btnGetAward: cc.Node = null;

    @property([cc.Node])
    nodeCoin: cc.Node[] = [];

    private curSelectMailData: Lobby.MailItemRes = null;

    onExtLoad() {
        this.regLis(EventType.MAIL_UPDATE_LIST, this.initView);
        this.regLis(EventType.MAIL_READ_DETAILS, this.updateTheMailDetails);
        this.regLis(EventType.MAIL_GET_AWARD_SUCCEED, this.updataGetMailAward);
        MailMgr.sendMailReq(SendMailType.List);

        this.btnGetAward.on("click", () => {
            let getMailID = this.curSelectMailData.um_id;
            MailMgr.sendMailReq(SendMailType.Award, getMailID as number);
        })
    }

    private initView(mailList: Lobby.MailItemRes[]) {
        if (mailList.length > 0) {
            mailList.sort(this.sortList);
            MailMgr.sendMailReq(SendMailType.Details, mailList[0].um_id as number);
            this.createmMailList(mailList);
            this.nodeContent.children[0].getComponent(cc.Toggle).isChecked = true;
            this.nodeMailDetails.active = true;
        } else {
            this.nodeMailDetails.active = false;
            PopMgr.tip("您暂未收到邮件");
        }
    }


    private createmMailList(mailList: Lobby.MailItemRes[]) {
        if (mailList.length > 0) {
            for (let i = 0; i < mailList.length; i++) {
                let theMailData = mailList[i];
                let node = cc.instantiate(this.nodeItemExample);
                node.x = 0;
                node.getChildByName("lbMailTheme").getComponent(cc.Label).string = theMailData.title;
                node.getChildByName("lbMailTime").getComponent(cc.Label).string = ComUtil.formatDate(new Date(theMailData.create_time as number), "yyyy-MM-dd")
                ComUtil.nodeRedFlush(node, theMailData.mail_state != 2);
                node.getChildByName("spSvstate").getChildByName("spOpenedIcon").active = theMailData.mail_state != 0;
                node.getChildByName("spSvstate").getChildByName("spUnopenIcon").active = theMailData.mail_state == 0;

                node.on("click", () => {
                    MailMgr.sendMailReq(SendMailType.Details, theMailData.um_id as number);
                })
                node.name = "itme" + theMailData.um_id;
                node.active = true;
                this.nodeContent.addChild(node);
            }
        } else {
            PopMgr.tip("空空如也");
        }
    }

    private updateTheMailDetails(theMail: Lobby.MailItemRes) {
        this.curSelectMailData = theMail;
        this.nodeMailDetails.getChildByName("spTitlebg").getChildByName("lbTitleTheme").getComponent(cc.Label).string = theMail.title + theMail.um_id;
        this.nodeMailDetails.getChildByName("lbMailContent").getComponent(cc.Label).string = theMail.context;//***
        if ((theMail.coin_a > 0 || theMail.coin_b > 0 || theMail.coin_c > 0) && theMail.mail_state != 2) {
            if (theMail.coin_a > 0) {
                this.nodeCoin[0].getChildByName("lbGiftTypeNum").getComponent(cc.Label).string = "金币X" + theMail.coin_a;
                this.nodeCoin[0].active = true;
            } else {
                this.nodeCoin[0].active = false;
            }

            if (theMail.coin_b > 0) {
                this.nodeCoin[1].getChildByName("lbGiftTypeNum").getComponent(cc.Label).string = "钻石X" + theMail.coin_b;
                this.nodeCoin[1].active = true;
            } else {
                this.nodeCoin[1].active = false;
            }

            if (theMail.coin_c > 0) {
                this.nodeCoin[2].getChildByName("lbGiftTypeNum").getComponent(cc.Label).string = "红包X" + theMail.coin_c;
                this.nodeCoin[2].active = true;
            } else {
                this.nodeCoin[2].active = false;
            }

            this.nodeGilf.active = true;
        } else {
            this.nodeGilf.active = false;
        }
    }

    /**邮件奖励已获取 */
    private updataGetMailAward(theMail: Lobby.MailItemRes) {
        this.nodeGilf.active = false;
        let curAwardMail = this.nodeContent.getChildByName("itme" + theMail.um_id);
        ComUtil.nodeRedFlush(curAwardMail, false)
    }


    private sortList(stateA: Lobby.MailItemRes, stateB: Lobby.MailItemRes) {
        return stateA.mail_state - stateB.mail_state;
    }

}
