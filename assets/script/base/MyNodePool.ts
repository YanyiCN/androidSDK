import mlog from "../utils/LogUtil";
import ComUtil from "../utils/ComUtil";

/**
 * Map对象池 
 * 采用key-value的方式缓存显示节点,提高性能
 */
export default class MyNodeMapPool{
    /** 键值对保存的缓存池*/
    private cacheMap:{[key:string]:cc.Node} = {};

    /** 废弃的处理函数 */
    private unuseFun?:(node:cc.Node)=>void;
    /** 重用的处理函数 */
    private reuseFun?:(node:cc.Node)=>void;

    constructor(unuseFun?:(node:cc.Node)=>void,reuseFun?:(node:cc.Node)=>void){
        this.unuseFun = unuseFun;
        this.reuseFun = reuseFun;
    }

    /**采用key的方式 放入缓存池(放入后调用unuseFun),如果重复会覆盖*/
    public put(node:cc.Node,key:string|number,remove = true){
        if (!node || !node.isValid) {
            mlog.warn("MyNodeMapPool put() node is null or not isValid!!!!!!!");
            return;
        }
        let strKey = String(key)
        // 老节点
        let oldNode = this.cacheMap[strKey];
        if (oldNode && oldNode.isValid) {
            //  需要先彻底销毁
            ComUtil.destroy(oldNode);
        }
        if (remove) {
            // 将节点从父节点移除
            ComUtil.remove(node);
        }
        
        // 调用不使用的方法
        if (this.unuseFun) {
            this.unuseFun(node);
        }

        // 放入新节点
        this.cacheMap[strKey] = node;
    }

    // 从缓存池中根据key获取节点(返回前调用reuseFun)
    public get(key:string|number):cc.Node{

        let strKey = String(key)
        // 节点
        let node = this.cacheMap[strKey];
        // 废弃的节点
        if (node!=null && !node.isValid) {
            this.cacheMap[strKey] = null;
            node = null;
        }
        // 调用重用的方法
        if (node && this.reuseFun) {
            this.reuseFun(node);
        }
        // 置空
        this.cacheMap[strKey] = null;
        return node;
    }


    /**将节点全部销毁*/
    public destroyAllCache(){
        for (const key in this.cacheMap) {
            if (this.cacheMap.hasOwnProperty(key)) {
                const element = this.cacheMap[key];
                if (element && element.isValid) {
                    ComUtil.destroy(element);
                }
            }
        }
    }



}