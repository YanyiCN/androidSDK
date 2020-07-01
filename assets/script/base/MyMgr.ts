export default abstract class MyMgr {
    private static mgrList:MyMgr[] = new Array();
    constructor(){
        MyMgr.mgrList.push(this);
    }
    /**加载的时候初始化的内容,只会被执行一次 */
    public abstract initByLoad();
    /**业务内容或数据的初始化 */
    public abstract initMgr();
    /**业务内容或数据的销毁 */
    public abstract uninitMgr();

    public static getMgrList():MyMgr[]{
        return MyMgr.mgrList;
    }
}
