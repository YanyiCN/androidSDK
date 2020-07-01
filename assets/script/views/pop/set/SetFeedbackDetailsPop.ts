import MyPop from "../../../base/MyPop";
import { Lobby } from "../../../proto/proto";
import SetMgr, { FeedbackType } from "../../../data/SetMgr";
import ComUtil from "../../../utils/ComUtil";

const { ccclass, property } = cc._decorator;

@ccclass
export default class SetFeedbackDetailsPop extends MyPop {

    //反馈
    @property(cc.Label)
    lbFeedbackTime: cc.Label = null;

    @property(cc.Label)
    lbFeedbackContent: cc.Label = null;

    //回复
    @property(cc.Label)
    lbReplyTime: cc.Label = null;

    @property(cc.Label)
    lbReplyContent: cc.Label = null;

    @property(cc.Node)
    nodeReply: cc.Node = null;

    @property(cc.Node)
    nodeDisposing: cc.Node = null;

    onExtLoad(feedbackData: Lobby.FeedbackItemRes) {
        if (feedbackData) {
            this.lbFeedbackTime.string = ComUtil.formatDate(new Date(feedbackData.create_time as number), "MM-dd  HH:mm");
            this.lbFeedbackContent.string = "     " + feedbackData.uf_content;
            if (feedbackData.uf_status == 1) {//已经处理 
                if (feedbackData.uf_read == 0) {//未读
                    SetMgr.sendFeedbackReq(FeedbackType.Read, feedbackData.uf_id as number);
                }
                this.lbReplyTime.string = ComUtil.formatDate(new Date(feedbackData.reply_time as number), "MM-dd  HH:mm");
                this.lbReplyContent.string = "     " + feedbackData.uf_reply;
            }
            this.nodeReply.active = feedbackData.uf_status == 1;
            this.nodeDisposing.active = feedbackData.uf_status == 0;
        }

    }

}
