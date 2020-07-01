import MyPop from "../../base/MyPop";
import PopMgr from "../../data/PopMgr";
import ProfileMgr from "../../data/ProfileMgr";
import mlog from "../../utils/LogUtil";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ChangeHeadPhotoPop extends MyPop {
    @property(cc.Node)
    nodeContentList: cc.Node = null;

    @property(cc.Node)
    nodeItemExample: cc.Node = null;

    onExtLoad() {
        this.initView();
    }


    private initView() {
        let headUrlCfgList = ProfileMgr.getGameHeadImgUrlConfig();
        for (let i = 0; i < headUrlCfgList.length; i++) {
            let node = cc.instantiate(this.nodeItemExample);
            let urlStr = headUrlCfgList[i];
            cc.loader.load({ url: urlStr, type: "png" }, (err, texture) => {
                if (err) {
                    mlog.error("下载头像异常-更换头像 ERROR", err);
                    return;
                }
                node.getChildByName("spBodyPhoto").getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
                console.log("下载头像正常 URL:{0}  --SSS -OK", urlStr)
            })
            node.active = true;
            this.nodeContentList.addChild(node);
        }
        //ps：上传头像特殊处理
        let toggleItems = this.nodeContentList.getComponent(cc.ToggleContainer).toggleItems;
        for (let index = 0; index < toggleItems.length; index++) {
            toggleItems[index].node.on("click", () => {
                this.onTogEvent(index);
            })

        }
    }

    private onTogEvent(tag: number) {
        if (tag == 0) {
            PopMgr.alert("不充钱，传个锤子的头像0.0");
        } else {
            PopMgr.tip("头像id：00" + tag);
        }
    }
}
