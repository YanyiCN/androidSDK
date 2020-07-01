import MyPop from "../../../base/MyPop";
import PopMgr from "../../../data/PopMgr";
import { PopLayer, EventType } from "../../../define/Const";
import glb from "../../../utils/glb";
import SetMgr, { FeedbackType } from "../../../data/SetMgr";
import { Lobby } from "../../../proto/proto";
import ComUtil from "../../../utils/ComUtil";
import { UserDynamicData } from "../../../data/entity/UserData";
import RedPointMgr, { RedPointTypes } from "../../../data/RedPointMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class SetFeedbackPop extends MyPop {

    @property(cc.ToggleContainer)
    private nodeSelectFunction: cc.ToggleContainer = null;

    @property(cc.Node)
    private nodeIdea: cc.Node = null;

    @property(cc.Node)
    private nodeNews: cc.Node = null;

    @property(cc.EditBox)
    private txtIdeaMsg: cc.EditBox = null;

    @property(cc.Node)
    private btnSubmit: cc.Node = null;

    @property(cc.Node)
    private itemExample: cc.Node = null;

    @property(cc.Node)
    private contentNews: cc.Node = null;

    @property(cc.Node)
    private nodeNoselectName: cc.Node = null;

    private haveNewIdea: boolean = null;

    onExtLoad() {
        this.regLis(EventType.RED_POINT_UPDATE, this.updateNewsFeedbackRed);
        this.regLis(EventType.SET_FEEDBACK_LIST, this.createNewsList)
        this.regLis(EventType.SET_FEEDBACK_IDEA_SUCCEED, this.submitIdeaSucceed)
        this.btnSubmit.on("click", () => {
            if (this.txtIdeaMsg.string.length > 0) {
                SetMgr.sendFeedbackReq(FeedbackType.Idea, null, this.txtIdeaMsg.string);
            }
            this.txtIdeaMsg.string = "";
        })
        this.onTogEvent(0);
        let togList = this.nodeSelectFunction.toggleItems;
        for (let i = 0; i < togList.length; i++) {
            togList[i].node.on("click", () => {
                this.onTogEvent(i);
            })
        }
        this.updateNewsFeedbackRed();
    }

    private onTogEvent(tag: number) {
        if (tag == 0) {
            this.nodeIdea.active = true;
            this.nodeNews.active = false;
        } else if (tag == 1) {
            if (this.contentNews.childrenCount <= 0 || this.haveNewIdea) {
                SetMgr.sendFeedbackReq(FeedbackType.List);
                this.haveNewIdea = false;
            }
            this.nodeIdea.active = false;
            this.nodeNews.active = true;
        }
    }

    private createNewsList(newsList: Lobby.FeedbackItemRes[]) {
        if (newsList.length > 0) {
            ComUtil.destroyAllChildren(this.contentNews);
            for (let i = 0; i < newsList.length; i++) {
                let newsData = newsList[i];
                let node: cc.Node = cc.instantiate(this.itemExample);
                node.x = 0;
                if (newsData.uf_content.length > 12) {
                    node.getChildByName("lbTheme").getComponent(cc.Label).string = newsData.uf_content.substring(0, 12) + "......";
                } else {
                    node.getChildByName("lbTheme").getComponent(cc.Label).string = newsData.uf_content;
                }
                node.getChildByName("lbTime").getComponent(cc.Label).string = ComUtil.formatDate(new Date(newsData.create_time as number), "yyyy-MM-dd  HH:mm:ss");
                node.getChildByName("lbStateDispose").active = newsData.uf_status == 0;
                node.getChildByName("lbStateReply").active = newsData.uf_status == 1;
                ComUtil.nodeRedFlush(node, (newsData.uf_status == 1 && newsData.uf_read == 0));
                node.on("click", () => {
                    PopMgr.showPop(PopLayer.POP_SET_FEEDBACK_DETAILS, newsData);
                    if (newsData.uf_status == 1 && newsData.uf_read == 0) {
                        ComUtil.nodeRedFlush(node, false);
                    }
                })
                node.active = true;
                this.contentNews.addChild(node);
            }
        }
    }

    /**
     * 意见反馈成功
     * @param message 意见反馈提示
     */
    private submitIdeaSucceed(message: string) {
        PopMgr.alert("感谢您的反馈,我们将尽快处理。");
        this.haveNewIdea = true;
    }

    /**
     * 我的消息红点刷新，基于接收后端用户动态数据刷新
     */
    private updateNewsFeedbackRed() {
        RedPointMgr.updateRedPointNode(this.nodeNoselectName, [RedPointTypes.FeedbackMessage]);
    }
}
