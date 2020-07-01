import MyNode from "../../../base/MyNode";
import { ActiveType, PopLayer } from "../../../define/Const";
import PopMgr from "../../../data/PopMgr";
import ComUtil from "../../../utils/ComUtil";
import ActiveMgr from "../../../data/active/ActiveMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class WelfareGoldLayer extends MyNode {

    @property(cc.Node)
    nodeItemWelfare: cc.Node = null;

    @property(cc.Node)
    contentWelfare: cc.Node = null;

    @property(cc.ScrollView)
    svWelfare: cc.ScrollView = null;

    onExtLoad() {
        this.initView();
    }

    private initView() {
        let length = 10;
        let nameArr = ["一本万利", "拜财神活动", '登录有礼', '个人挑战', '每日签到',
            "每日任务", "成长任务", '挑战任务', '嘉年华', '每日签到']
        for (let i = 0; i < length; i++) {
            let node = cc.instantiate(this.nodeItemWelfare);
            node.x = 0;
            node.getChildByName("lbWelfareName").getComponent(cc.Label).string = nameArr[i];
            node.getChildByName("lbWelfareDes").getComponent(cc.Label).string = ComUtil.formatStr("完成%s获得丰富钻石奖励", nameArr[i]);
            node.getChildByName("btnToFinish").on("click", () => {
                PopMgr.showPop(PopLayer.POP_DAILY_SIGNIN);
            })
            node.active = true;
            this.contentWelfare.addChild(node);
        }


        // let v = ActiveMgr.getvvvv();
        // if(v){
        //     this.svWelfare.setContentPosition(v);
        // }
    }

    // onDisable() {
    //     let v = this.svWelfare.getContentPosition();
    //     console.log("onDisable " + v);
    //     ActiveMgr.setvvvv(v);
    // }
}
