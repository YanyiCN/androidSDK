import glb from "../utils/glb";

export default class MyData{
    private lisCount = 0;
    protected regLis(evtType:number,callbackFun:Function){
        glb.regEventLis(evtType,callbackFun,this);
        this.lisCount++;
    }

    public removeAllLis(){
        if (this.lisCount>0) {
            glb.removeTargetAllEventLis(this);
            this.lisCount = 0;
        }
    }

}