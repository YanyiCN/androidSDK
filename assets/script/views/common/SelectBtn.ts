import PopMgr from "../../data/PopMgr";
import { PopLayer } from "../../define/Const";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SelectBtn extends cc.Component {
    @property(cc.Node)
    btnSel:cc.Node = null;
    @property(cc.Label)
    private lbSel:cc.Label = null;
    selList:{value:any,show:string}[];
    funChange: Function;
    selValue: any;
    selName: string;
    
    public initBySelects(selList:{value:any,show:string}[],selValue,funChange:Function,maxShow:number=8){
        this.selList = selList
        this.btnSel.on("click",()=>{
            PopMgr.showPop(PopLayer.POP_SELECT_LAYER,this,selList,maxShow)
        })
        
        this.funChange = funChange

        this.updateValueShow(selValue)
    }


    public onChoiceChange(selVal){
        this.updateValueShow(selVal)

        if(this.funChange){
            this.funChange(selVal)
        }
    }


    public updateValueShow(selValue){
        let selList = this.selList
        let showName
        if(selValue==null){
            for (const v of selList) {
                selValue = v.value
                showName = v.show
                break
            }
        }else{
            for (const v of selList) {
                if(v.value == selValue){
                    selValue = v.value
                    showName = v.show
                    break
                }
            }
            if(!showName){
                for (const v of selList) {
                    selValue = v.value
                    showName = v.show
                    break
                }
            }
        }

        this.selValue = selValue
        this.selName = showName

        this.lbSel.string = this.selName;
    }

    


}