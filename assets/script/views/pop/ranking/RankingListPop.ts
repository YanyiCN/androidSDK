import MyPop from "../../../base/MyPop";
import { Lobby } from "../../../proto/proto";
import ComUtil from "../../../utils/ComUtil";
import { EventType } from "../../../define/Const";
import RankingMgr from "../../../data/RankingMgr";

const { ccclass, property } = cc._decorator;

//1-排行榜，2-财富榜，3-邀请榜
const RankType = {
   Ranking: 1,
   Treasure: 2,
   Invite: 3
}

@ccclass
export default class RankingListPop extends MyPop {
   @property(cc.ToggleContainer)
   nodeSelectFunction: cc.ToggleContainer = null;

   @property([cc.Node])
   itemExample: cc.Node[] = [];

   @property([cc.Node])
   nodeScrollView: cc.Node[] = [];

   @property([cc.Node])
   nodeContent: cc.Node[] = [];

   @property([cc.Node])
   nodeMyselfInfo: cc.Node[] = [];

   private curSelectType: number = null;

   onExtLoad() {
      this.regLis(EventType.RANKING_LIST, this.onComUpdateRankingData);
      let togList = this.nodeSelectFunction.toggleItems;
      for (let i = 0; i < togList.length; i++) {
         togList[i].node.on("click", () => {
            this.onTogEvent(i);
         })
      }

      RankingMgr.sendRankingReq(RankType.Ranking);
   }

   private onTogEvent(tag: number) {
      if (this.curSelectType != tag) {
         this.curSelectType == tag;
         for (let i = 0; i < this.nodeScrollView.length; i++) {
            if (i == tag) {
               if (this.nodeContent[i].childrenCount <= 0) {
                  RankingMgr.sendRankingReq(i + 1);
               } else {
                  this.nodeScrollView[i].active = true;
                  this.nodeMyselfInfo[i].active = true;
               }
            } else {
               this.nodeScrollView[i].active = false;
               this.nodeMyselfInfo[i].active = false;
            }
         }
      }

   }


   /**生成数据展示 */
   private onComUpdateRankingData(rankingData: Lobby.RankRes) {
      this.comCreateRankingList(rankingData.rank_list, rankingData.handle_type);
      this.comCreateMyselfInfo(rankingData.self_item, rankingData.rank_num as number, rankingData.handle_type)
   }

   /**列表 */
   private comCreateRankingList(listData: Lobby.IRankItemRes[], rankType: number) {
      let rankTypeIndex = rankType - 1;
      if (this.nodeContent[rankTypeIndex].childrenCount <= 0) {
         ComUtil.destroyAllChildren(this.nodeContent[rankTypeIndex]);
         for (let i = 0; i < listData.length; i++) {
            let itemData = listData[i];
            let node = cc.instantiate(this.itemExample[rankTypeIndex]);
            node.getChildByName("nodeItembg").getChildByName("spDarkbg").active = i >= 3;
            node.getChildByName("nodeItembg").getChildByName("spBrightbg").active = i < 3;
            this.rankingNumIcon(node, (i + 1));
            // ComUtil.initUserHead(node.getChildByName("HeadBoxSprite"),itemData.head_img_url,null);
            node.getChildByName("lbName").getComponent(cc.Label).string = itemData.nick_name;
            node.getChildByName("lbID").getComponent(cc.Label).string = itemData.user_id.toString();
            node.x = 0;
            node.active = true;
            this.nodeContent[rankTypeIndex].addChild(node);
            this.rankingDetails(rankType, node.getChildByName("nodeDetails"), itemData);
         }
      }
      this.nodeScrollView[rankTypeIndex].active = true;
   }

   /**个人排行信息 */
   private comCreateMyselfInfo(selfItem: Lobby.IRankItemRes, rankNum: number, rankType: number) {
      let rankTypeIndex = rankType - 1;
      if (selfItem) {
         let nodeRanking: cc.Node = this.nodeMyselfInfo[rankTypeIndex].getChildByName("nodeMyslfRanking").getChildByName("nodeRanking");
         let nodeNotonList: cc.Node = this.nodeMyselfInfo[rankTypeIndex].getChildByName("nodeMyslfRanking").getChildByName("nodeNotonList");
         // ComUtil.initUserHead(this.nodeMyselfInfo[rankTypeIndex].getChildByName("HeadBoxSprite"), selfItem.head_img_url, null);
         if (rankNum <= 200) {
            this.rankingNumIcon(nodeRanking, rankNum);
         }
         nodeRanking.active = rankNum <= 200;
         nodeNotonList.active = rankNum > 200;
         this.nodeMyselfInfo[rankTypeIndex].getChildByName("lbName").getComponent(cc.Label).string = selfItem.nick_name == "" ? "周武王" : selfItem.nick_name;
         this.rankingDetails(rankType, this.nodeMyselfInfo[rankTypeIndex].getChildByName("nodeMyselfBody"), selfItem);
      }
      this.nodeMyselfInfo[rankTypeIndex].active = true;
   }


   /**提取排行名次显示逻辑
    * @param node 目标节点
    * @param rankingNum 排名
    */
   private rankingNumIcon(node: cc.Node, rankingNum: number) {
      if (rankingNum <= 10) {
         node.getChildByName("nodeRankingIconbg").getChildByName("spRanking_0").active = rankingNum == 1;
         node.getChildByName("nodeRankingIconbg").getChildByName("spRanking_1").active = rankingNum == 2;
         node.getChildByName("nodeRankingIconbg").getChildByName("spRanking_2").active = rankingNum == 3;
         node.getChildByName("nodeRankingIconbg").getChildByName("spRanking_3").active = rankingNum > 3 && rankingNum <= 10;
         node.getChildByName("nodeRankingIconbg").getChildByName("spRanking_3").getChildByName("lbRankingNum").getComponent(cc.Label).string = rankingNum.toString();
         node.getChildByName("nodeRankingIconbg").active = true;
         node.getChildByName("lbRankingNum").active = false;
      } else {
         node.getChildByName("nodeRankingIconbg").active = false;
         node.getChildByName("lbRankingNum").getComponent(cc.Label).string = rankingNum.toString();
         node.getChildByName("lbRankingNum").active = true;
      }
   }

   /**
    * 排行对比详情
    * @param type 排行类型
    * @param node 目标节点
    * @param itemData 排行依据数据
    */
   private rankingDetails(type: number, node: cc.Node, itemData: Lobby.IRankItemRes) {
      switch (type) {
         case RankType.Ranking:
            node.getChildByName("spDanIcon").active = true;//段位Icon未出图
            node.getChildByName("lbDan").active = true;//段位Icon未出图
            node.getChildByName("lbStar").getComponent(cc.Label).string = "×"+itemData.score.toString();
            break;
         case RankType.Treasure:
            node.getChildByName("lbTreasureNum").getComponent(cc.Label).string = itemData.score.toString();
            break;
         case RankType.Invite:
            node.getChildByName("lbInvitePlayerNum").getComponent(cc.Label).string = itemData.score+"人";
            break;

         default:
            break;
      }
   }


}
