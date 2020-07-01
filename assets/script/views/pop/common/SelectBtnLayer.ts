import MyPop from "../../../base/MyPop";
import SelectBtn from "../../common/SelectBtn";
import { display } from "../../../utils/ViewUtil";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SelectBtnLayer extends MyPop {


    @property(cc.ScrollView)
    private svSel:cc.ScrollView = null;

    @property(cc.Node)
    private btnExample:cc.Node = null;

    constructor(){
        super();
        this.popCfg.ani = false;
        this.popCfg.mask = false;
        this.popCfg.cross = false;
    }

    onExtLoad(selectBtn:SelectBtn,selList:{value:any,show:string}[],maxShow) {
        this.regClickOtherClose(this.svSel.node);
        let worldP = selectBtn.node.getParent().convertToWorldSpaceAR(selectBtn.node.getPosition());

        this.svSel.node.position = cc.v3(display.worldToCanvas(worldP));
        this.svSel.node.y-=16;


        this.btnExample.active = false;

        let i = 0;
        for (const v of selList) {
            let btn = cc.instantiate(this.btnExample);
            btn.x= 0;
            btn.active = true;

            btn.on("click",()=>{
                selectBtn.onChoiceChange(v.value);
                this.close();
            })
            i++;
            if (i==8) {
                this.svSel.content.getComponent(cc.Layout).updateLayout();
                this.svSel.node.height = this.svSel.content.height;
            }
            btn.getChildByName("lbTxt").getComponent(cc.Label).string = v.show;

            this.svSel.content.addChild(btn);
        }
        if (i<maxShow) {
            this.svSel.content.getComponent(cc.Layout).updateLayout();
            this.svSel.node.height = this.svSel.content.height;
        }
    }

}