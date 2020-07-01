import MyNode from "../../base/MyNode";
import { TaskGrowthConfig } from "../../data/config/CfgTaskGrowth";
import ComUtil from "../../utils/ComUtil";
import UserMgr from "../../data/UserMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GrowthRouteNode extends MyNode {
    @property(cc.ScrollView)
    svRoute: cc.ScrollView = null;

    @property(cc.Node)
    nodeItemRouteExample: cc.Node = null;

    @property(cc.Node)
    contentGrowthRoute: cc.Node = null;

    private initViewBool: boolean = false;

    private lastSelectNode: cc.Node = null;

    private curSelectLv: number = null;

    onExtLoad() {
        this.createGrowthRoute();
    }

    /**成长路线 */
    private createGrowthRoute(allLvCfg?: TaskGrowthConfig[]) {
        let length = 200;
        ComUtil.destroyAllChildren(this.contentGrowthRoute);
        let userLevel = UserMgr.getUserInfo().level;
        for (let i = 0; i < length; i++) {
            // let curLvCfg = allLvCfg[i];
            let curCfgLv = i + 1;
            let node = cc.instantiate(this.nodeItemRouteExample);
            node.y = -80;
            node.getChildByName("nodeStateUp").active = curCfgLv % 2 == 1;
            node.getChildByName("nodeStateDown").active = curCfgLv % 2 == 0;
            let showNode = curCfgLv % 2 == 0 ? node.getChildByName("nodeStateDown") : node.getChildByName("nodeStateUp");
            if (this.curSelectLv == curCfgLv) {
                this.lastSelectNode = showNode.getChildByName("spMilestoneSelect");
            }
            if (i == length - 1) {
                showNode.getChildByName("spRoute").active = false;
            }
            showNode.getChildByName("lbCurLv").getComponent(cc.Label).string = "Lv:" + curCfgLv;
            showNode.getChildByName("lbCurMissLv").getComponent(cc.Label).string = "Lv:" + curCfgLv;

            showNode.getChildByName("spMilestoneSelect").active = curCfgLv == userLevel
            showNode.getChildByName("spLandlord").active = curCfgLv == userLevel;
            showNode.getChildByName("spMilestoneOpen").active = curCfgLv <= userLevel;
            showNode.getChildByName("spMilestoneClose").active = curCfgLv > userLevel;
            showNode.getChildByName("lbCurLv").active = curCfgLv <= userLevel;
            showNode.getChildByName("lbCurMissLv").active = curCfgLv > userLevel;
            showNode.getChildByName("spMilestoneOpen").on("click", () => {
                if (this.curSelectLv != curCfgLv) {
                    this.curSelectLv = curCfgLv;
                    if (this.lastSelectNode) {
                        this.lastSelectNode.active = false;
                    }
                    showNode.getChildByName("spMilestoneSelect").active = true;
                    // this.curSelectLvInfo(curCfgLv, curLvCfg);
                    this.lastSelectNode = showNode.getChildByName("spMilestoneSelect");
                }
            })

            showNode.getChildByName("spMilestoneClose").on("click", () => {
                if (this.curSelectLv != curCfgLv) {
                    this.curSelectLv = curCfgLv;
                    // this.curSelectLvInfo(curCfgLv, curLvCfg);
                }
            })
            node.active = true;
            this.contentGrowthRoute.addChild(node);
        }

        let percent = userLevel / 200;
        if (this.curSelectLv) {
            percent = this.curSelectLv / 200;
        }
        percent = percent > 0.01 ? percent - 0.01 : percent;
        if (!this.initViewBool) {
            this.initViewBool = true;
            this.svRoute.scrollToPercentHorizontal(percent, percent);
        }
        // console.log("百分比   ", percent);
    }
}
