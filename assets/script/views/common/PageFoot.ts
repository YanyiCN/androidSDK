const {ccclass, property} = cc._decorator;

@ccclass
export default class PageFoot extends cc.Component {
    @property(cc.Node)
    private btnNext:cc.Node = null;
    @property(cc.Node)
    private btnPre:cc.Node = null;
    @property(cc.Label)
    private lbNum:cc.Label = null;

    private _pageCount:number = 0;
    private _pageCur:number = 0;
    private _funToClick:Function = null;

    getPageCur(){
        return this._pageCur;
    }

    onLoad(){
        this.btnNext.on("click",()=>{
            this.getPageData(this._pageCur+1);
        });
        this.btnPre.on("click",()=>{
            this.getPageData(this._pageCur-1);
        });
        this.updateShow();
    }

    private updateShow(){
        if (this._pageCur==0 && this._pageCount==0) {
            this.lbNum.node.active = false;
            this.btnNext.active = false;
            this.btnPre.active = false;
            return;
        }
        this.lbNum.node.active = true;
        this.lbNum.string = (this._pageCur+1)+"/"+this._pageCount;
        this.btnPre.active = this._pageCur>0;
        this.btnNext.active = this._pageCur+1<this._pageCount;
    }

    private getPageData(page:number){
        if (page > this._pageCount) {
            page = this._pageCount;
        }else if (page < 0) {
            page = 0;
        }
        this._pageCur = page;
        if (this._funToClick!=null) {
            this._funToClick(this._pageCur);
        }
    }

    /**
     * 初始化分页
     * @param clickPage 点击页面的事件,传递一个number类型的参数page
     */
    public initPage(clickPage:Function,defPage?:number){
        this._funToClick = clickPage;

        if (clickPage!=null) {
            if (defPage!=null) {
                this.getPageData(defPage);
                this.updateShow();
            }
        }
    }

    public reloadPage(){
        if (this._funToClick!=null) {
            this._funToClick(this._pageCur);
        }
    }

    /**
     * 更新
     * @param curPage 当前页码(0开始)
     * @param totalPage (总页数)
     */
    public updatePage(curPage:number,totalPage:number){
        this._pageCur = curPage;
        this._pageCount = totalPage;

        this.updateShow();
    }

}