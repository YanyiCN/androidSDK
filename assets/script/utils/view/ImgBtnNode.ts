export default class ImgBtnNode extends cc.Node {

    btn:cc.Button;
    bgSp:cc.Sprite;
    txtNode:cc.Node;
    txtSp:cc.Sprite;

    private initByCreate(bgSpFrame:cc.SpriteFrame,txtSpFrame:cc.SpriteFrame,callback:Function=null,eventData:any = null,params?:{txtMove?:cc.Vec2}){
        if (bgSpFrame) {
            this.addComponent(cc.Sprite);
            this.bgSp = this.getComponent(cc.Sprite);
            this.bgSp.spriteFrame = bgSpFrame;
        }
        

        this.addComponent(cc.Button);
        let btn = this.getComponent(cc.Button);
        this.btn = btn;
        btn.transition = cc.Button.Transition.SCALE;
        btn.duration = 0.1;
        btn.zoomScale = 0.97;

        if (callback) {
            this.on("click",(btn:any)=>{
                callback(btn,eventData);
            });
        }
        if (txtSpFrame) {
            let txtNode = new cc.Node();
            this.txtNode = txtNode;
            let txtSp = txtNode.addComponent(cc.Sprite);
            txtSp.spriteFrame = txtSpFrame;
            this.txtSp = txtSp;

            if (params && params.txtMove) {
                txtNode.setPosition(params.txtMove);
            }
            this.addChild(txtNode);
        }
    }

    private setGray(open){
        if (open) {
            this.color = cc.color(150,150,150);
            if (this.txtNode) {
                this.txtNode.color = cc.color(150,150,150);
            }
        }else{
            this.color = cc.color(255,255,255);
            if (this.txtNode) {
                this.txtNode.color = cc.color(255,255,255);
            }
        }
    }


    public setEnable(open){
        if (!this.btn) {
            this.btn = this.getComponent(cc.Button);
        }
        this.btn.enabled = open;
    }
    public setEnableWithColor(open){
        this.setEnable(open);
        this.setGray(!open);
    }


    static create(bgSpFrame:cc.SpriteFrame,txtSpFrame:cc.SpriteFrame,callback:Function=null,eventData:any = null,params?:{txtMove?:cc.Vec2}):ImgBtnNode{
        let btn = new ImgBtnNode();
        btn.initByCreate(bgSpFrame,txtSpFrame,callback,eventData,params);
        return btn;
    }
}