import MyPop from "../../../base/MyPop";
import { ClientRewardItem } from "../../../data/entity/ReceiveSerDataTree";
import { AwardType } from "../../../define/Const";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GetAwardPop extends MyPop {

    @property(cc.Node)
    nodeAwardGroup: cc.Node = null;


    @property(cc.Node)
    nodeOther: cc.Node = null;

    @property(cc.Label)
    lbTip: cc.Label = null;

    private localParams: { anyClose: boolean, nodeExtra: cc.Node };

    onExtLoad(awardArray: ClientRewardItem[], params: { anyClose: boolean, nodeExtra: cc.Node } = null) {
        if (params == null) {
            params = { anyClose: true, nodeExtra: null };
        }

        this.localParams = params;


        if (this.localParams.anyClose) {
            this.node.on("click", () => {
                this.close();
            })
            this.lbTip.node.active = true;
        } else {
            this.lbTip.node.active = false;
        }

        if (this.localParams.nodeExtra && this.localParams.nodeExtra.isValid) {


            // this.localParams.nodeExtra.getComponent(XXXXXXCom).setFunc((type)=>{
            //     type == 1
            //         this.close();
            // });

            this.nodeOther.addChild(this.localParams.nodeExtra);
        }


        for (let i = 0; i < this.nodeAwardGroup.childrenCount; i++) {
            this.nodeAwardGroup.children[i].active = false;
        }
        if (awardArray && awardArray.length > 0) {
            let awardInfo: string = ""
            for (const itemData of awardArray) {
                switch (itemData.rewardType) {
                    case AwardType.Gold:
                        awardInfo = "金币X" + itemData.rewardNum;
                        this.updateAwardView("nodeAwardIGlod", awardInfo);
                        break;

                    case AwardType.Gem:
                        awardInfo = "钻石X" + itemData.rewardNum;
                        this.updateAwardView("nodeAwardGem", awardInfo);
                        break;

                    case AwardType.Coupon:
                        awardInfo = "红包X" + itemData.rewardNum;
                        this.updateAwardView("nodeAwardCoupon", awardInfo);
                        break;

                    case AwardType.Prop:
                        awardInfo = "道具X" + itemData.rewardNum;
                        this.updateAwardView("nodeAwardProp", awardInfo);
                        break;

                    case AwardType.Skin:
                        awardInfo = "皮肤X" + itemData.rewardNum;
                        this.updateAwardView("nodeAwardSkin", awardInfo);
                        break;

                    default:
                        break;
                }
            }
        }
    }

    private updateAwardView(nodeName: string, awardInfo: string) {
        let nodeTheAward = this.nodeAwardGroup.getChildByName(nodeName);
        nodeTheAward.getChildByName("lbAwardNum").getComponent(cc.Label).string = awardInfo;
        nodeTheAward.active = true;
    }
}
