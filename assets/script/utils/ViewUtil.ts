import ResUtil from "./ResUtil";
import ImgBtnNode from "./view/ImgBtnNode";
import mlog from "./LogUtil";

export default class ViewUtil{
    static imgBtn(bgSpFrame:cc.SpriteFrame,txtSpFrame:cc.SpriteFrame,callback:Function=null,eventData:any = null,params?:{txtMove?:cc.Vec2}):ImgBtnNode{
        return ImgBtnNode.create(bgSpFrame,txtSpFrame,callback,eventData,params);
    }

    static createSpNode(plistUrl:string,imgName:string):cc.Node{
        let node = new cc.Node();
        let sp = node.addComponent(cc.Sprite);
        // sp.trim = false;
        // sp.sizeMode = cc.Sprite.SizeMode.RAW;
        sp.spriteFrame = ResUtil.getAtlasFrame(plistUrl,imgName);

        return node;
    }

    static createSpNodeImg(imgName:string):cc.Node{
        let node = new cc.Node();
        let sp = node.addComponent(cc.Sprite);
        sp.spriteFrame = ResUtil.getCacheImg(imgName);

        return node;
    }

    static createLbNode(txt?:string,fontAliasUrl?:string):cc.Node{
        let node = new cc.Node();
        let label = node.addComponent(cc.Label);
        if (fontAliasUrl && fontAliasUrl.length>0) {
            label.font = ResUtil.getCacheFont(fontAliasUrl);
        }
        if (txt && txt.length>0) {
            label.string = txt;
        }
        return node;
    }

    static getRealScreenInfo(nodeItem:cc.Node,otherSize:cc.Size):number[]{
        // 制作一个认证按钮覆盖在原有的按钮上
        let loc = nodeItem.getParent().convertToWorldSpaceAR(nodeItem.getPosition());
        let nodeSize = cc.size(nodeItem.width,nodeItem.height);
		
		let winSize = cc.director.getWinSize();
		//适配不同机型来创建微信授权按钮
		let left = (loc.x-nodeSize.width*0.5)/winSize.width*otherSize.width;
		let top = (winSize.height-loc.y-nodeSize.height*0.5)/winSize.height*otherSize.height;
		let width = nodeSize.width/winSize.width*otherSize.width;
        let height = nodeSize.height/winSize.height*otherSize.height;
        return [left,top,width,height];
    }


    /**
     * 创建动画节点
     * @param clipUrl 资源路径
     * @param playOnLoad 是否加载是播放
     */
    static createAniNode(clipUrl:string,playOnLoad=true):cc.Node{
        let node = new cc.Node();
        let ani = node.addComponent(cc.Animation);
        let clip = ResUtil.getCacheAsset(clipUrl,cc.AnimationClip);
        ani.playOnLoad = playOnLoad;
        ani.defaultClip = clip;
        ani.addClip(clip);
        return node;
    }

    static createSpineNode(url:string,params?:{
            destoryByEnd?:boolean,
            endFun?:Function,
            loop?:boolean,
            animation?:string,
            alpha?:boolean}){
        let node = new cc.Node();
        let spine = node.addComponent(sp.Skeleton);
        if (!params) {
            params = {} as any;
        }
        if (params.destoryByEnd==null) {
            params.destoryByEnd = false;
        }
        if (params.loop==null) {
            params.loop = false;
        }
        if (params.animation==null) {
            params.animation = "animation";
        }
        if (params.alpha==null) {
            params.alpha = true;
        }
        spine.setCompleteListener(()=>{
            if (params.endFun) {
                params.endFun();
            }
            if (params.destoryByEnd) {
                if (node.isValid) {
                    node.destroy();
                }
            }
        })
        
        
        cc.loader.loadRes(url,sp.SkeletonData,(error: Error, resource: any)=>{
            if (!spine.isValid) {
                return;
            }
            spine.skeletonData = resource;
            spine.setAnimationCacheMode(sp.Skeleton.AnimationCacheMode.REALTIME)
            spine.premultipliedAlpha = params.alpha
            spine.setAnimation(0,params.animation,params.loop);
            
        });
        return node;
    }


    static createSpineNodeByUrl(spinePath:string,spineNameNoExt:string,params?:{
        destoryByEnd?:boolean,
        endFun?:Function,
        loop?:boolean,
        animation?:string,
        alpha?:boolean}){
        let node = new cc.Node();
        let spine = node.addComponent(sp.Skeleton);
        if (!params) {
            params = {} as any;
        }
        if (params.destoryByEnd==null) {
            params.destoryByEnd = false;
        }
        if (params.loop==null) {
            params.loop = false;
        }
        if (params.animation==null) {
            params.animation = "animation";
        }
        if (params.alpha==null) {
            params.alpha = true;
        }
        spine.setCompleteListener(()=>{
            if (params.endFun) {
                params.endFun();
            }
            if (params.destoryByEnd) {
                if (node.isValid) {
                    node.destroy();
                }
            }
        })
        
        ResUtil.loadSpineDataByUrl(spinePath,spineNameNoExt,(skeletonData:sp.SkeletonData)=>{
            if (!spine.isValid) {
                return;
            }
            spine.skeletonData = skeletonData;
            spine.setAnimationCacheMode(sp.Skeleton.AnimationCacheMode.REALTIME)
            spine.premultipliedAlpha = params.alpha
            spine.setAnimation(0,params.animation,params.loop);
        });
        return node;
    }

    // 找到对象的中心点的位置
    static findNodeCenterInWorld(node:cc.Node):cc.Vec2{
        if (node==null || !node.isValid || !node.parent) {
            mlog.error("findNodeCenterInWorld node is null")
            return cc.v2(0,0);
        }
        let pInWorld = node.parent.convertToWorldSpaceAR(cc.v2(node.position));
        return pInWorld.sub(cc.v2(node.width*(node.anchorX - 0.5),node.height*(node.anchorY - 0.5)))
    }
}

export class display {
    static size:cc.Size;
    static width:number;
    static height:number;
    static cx :number;
    static cy :number;
    static bottom:number;
    static top:number;
    static left:number;
    static right:number;

    static center:cc.Vec2;
    static world:{
        cx :number;
        cy :number;
        bottom:number;
        top:number;
        left:number;
        right:number;
    
        center:cc.Vec2;
    }

    public static initDisplay(){
        // this.size=cc.sys.getSafeAreaRect().size,
        // this.width=cc.sys.getSafeAreaRect().width,
        // this.height=cc.sys.getSafeAreaRect().height,
        // this.cx = cc.sys.getSafeAreaRect().width/2,
        // this.cy = cc.sys.getSafeAreaRect().height/2,
        // this.bottom=0,
        // this.top=cc.sys.getSafeAreaRect().height,
        // this.left=0,
        // this.right=cc.sys.getSafeAreaRect().width,

        // this.center=cc.v2(cc.sys.getSafeAreaRect().width/2,cc.sys.getSafeAreaRect().height/2)

        this.size=cc.sys.getSafeAreaRect().size;
        this.width=cc.sys.getSafeAreaRect().width;
        this.height=cc.sys.getSafeAreaRect().height;
        this.cx = 0;
        this.cy = 0;
        this.bottom=-cc.sys.getSafeAreaRect().height/2;
        this.top=cc.sys.getSafeAreaRect().height/2;
        this.left=-cc.sys.getSafeAreaRect().width/2;
        this.right=cc.sys.getSafeAreaRect().width/2;

        this.center=cc.v2(0,0);

        this.world={
            cx : cc.sys.getSafeAreaRect().width/2,
            cy : cc.sys.getSafeAreaRect().height/2,
            bottom: 0,
            top: cc.sys.getSafeAreaRect().height,
            left: 0,
            right: cc.sys.getSafeAreaRect().width,
        
            center: cc.v2(cc.sys.getSafeAreaRect().width/2,cc.sys.getSafeAreaRect().height/2)
        }
    }

    public static canvasToWorld<T extends cc.Vec2 | cc.Vec3>(pCvs:T):T{
        if (pCvs instanceof cc.Vec3) {
            return (pCvs as cc.Vec3).add(cc.v3(this.world.center)) as T;
        }
        return (pCvs as cc.Vec2).add(this.world.center) as T;
    }
    public static worldToCanvas<T extends cc.Vec2 | cc.Vec3>(pWrd:T):T{
        if (pWrd instanceof cc.Vec3) {
            return (pWrd as cc.Vec3).sub(cc.v3(this.world.center)) as T;
        }
        return (pWrd as cc.Vec2).sub(this.world.center) as T;
    }

    // 物体中心点在父节点上的位置
    // public static findSpInPrt(mjSp:cc.Node):cc.Vec2{
    //     let startP = mjSp.parent.convertToWorldSpaceAR(mjSp.getPosition());
    //     return startP
    // }
}