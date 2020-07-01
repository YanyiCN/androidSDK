const {ccclass, property,menu,executeInEditMode} = cc._decorator;

@ccclass
@executeInEditMode
@menu("my/MyLabel")
export default class MyLabel extends cc.Label {
    @property
    maxLength:number = 0;

    private _cacheOverflow:cc.Label.Overflow;

    constructor(){
        super();
    }
    update (dt) {
        if (super["update"]) {
            super["update"](dt);
        }
        
        if (this.maxLength == null || this.maxLength <= 0) {
            // 已修改过，本次需要还原并清空缓存
            if (this._cacheOverflow != null) {
                this.overflow = this._cacheOverflow;
                this._cacheOverflow = null;
            }
            return;
        }

        // 存在长度限制，并超过长度限制
        if (this.node.width > this.maxLength) {
            // 已修改过，所以需要更新宽度
            if (this._cacheOverflow!=null) {
                this.node.width = this.maxLength;
                return;
            }
            // 缓存原始数据
            this._cacheOverflow = cc.Label.Overflow.NONE;
            // 更新数据
            this.overflow = cc.Label.Overflow.RESIZE_HEIGHT;
            this.node.width = this.maxLength;
        }else if (this.node.width < this.maxLength) {
            // 长度不足最长，则可以取消固定宽度
            
            // 已修改过，本次需要还原并清空缓存
            if (this._cacheOverflow != null) {
                this.overflow = this._cacheOverflow;
                this._cacheOverflow = null;
            }
        }
    }
}
