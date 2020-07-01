import MyScene from "../base/MyScene";
import MyMgr from "../base/MyMgr";
import {PopLayer} from "../define/Const";
import PopMgr from "./PopMgr";
// import ClubMgr from "./ClubMgr";
// import ClubScene from "../views/ClubScene";
import mlog from "../utils/LogUtil";
// import GameMgr from "./GameMgr";


class SceneMgr extends MyMgr{
    public initByLoad() {
        mlog.info("初始化场景管理器");
    }
    public initMgr() {}
    public uninitMgr() {}
    
    /**前往登录场景 */
    goLoginScene(delay:number = 0,onLaunched?: Function){
        mlog.info("前往登录场景"); 
        this.goSceneOrDelay("LoginScene",delay,onLaunched)
    }
    preloadLoginScene(delay:number = 0,onLaunched?: Function){ 
        cc.director.preloadScene("LoginScene");
    }

    /**前往大厅场景 */
    goLobbyScene(delay:number = 0,onLaunched?: Function){
        this.goSceneOrDelay("LobbyScene",delay,onLaunched);
    }
    goLobbySceneAndRejoin(){
        this.goLobbyScene(0,(sceneScript)=>{
            PopMgr.showPop(PopLayer.POP_RE_ENTER)
        })


        // local lobbyScene = require("app.views.LobbyScene"):create()
        // cc.Director:getInstance():replaceScene(lobbyScene)

        // lobbyScene.isReEnterRoom = true

        // local loading = require("app.views.majiang.sub.ReEnterRoomLoading"):create()
        // loading:addTo(lobbyScene)
    }

    /**前往更新场景 */
    goUpdateScene(delay:number = 0,onLaunched?: Function){
        this.goSceneOrDelay("UpdateScene",delay,onLaunched);
    }
    

    // /**前往俱乐部场景 */
    // goClubScene(clubId:number,delay:number = 0,onLaunched?: Function){
    //     this.goSceneOrDelay("ClubScene",delay,(sceneScript)=>{
    //         // 执行初始化方法 传递clubId
    //         (sceneScript as ClubScene).initByClubId(clubId)
                
    //         // 执行通用回调
    //         if (onLaunched) {
    //             onLaunched(sceneScript);
    //         }
    //     });
    // }
    /**前往俱乐部或打开最后一次的俱乐部 */
    // goClubListOrLastClub(){
    //     if (ClubMgr.getLastClubId()!=null){
    //         this.goClubScene(ClubMgr.getLastClubId())
    //         return
    //     }
    //     PopMgr.showPop(PopLayer.POP_CLUB_LIST)
    // }

    /**前往logo场景 */
    goLogoScene(delay:number = 0,onLaunched?: Function){
        this.goSceneOrDelay("LogoScene",delay,onLaunched);
    }

    /**通用方法前往某场景,支持延迟并预加载 */
    private goSceneOrDelay(sceneName:string,delay:number = 0,onLaunched?: Function){
        // 场景切换前进行清除游戏状态
        // GameMgr.clearGameRoom()
        try {
            let innserOnLaunched = (err,scene:cc.Scene)=>{
                if (err) {
                    mlog.warn("launch scene error ",sceneName,err)
                    return;
                }
                if (onLaunched!=null) {
                    scene.getChildByName("Canvas").getComponent(MyScene).setOnSceneLaunched(onLaunched)
                }
            }
            if (delay>0) {
                cc.director.preloadScene(sceneName);
                setTimeout(()=>{
                    cc.director.loadScene(sceneName,innserOnLaunched)
                },delay)
            }else{
                cc.director.loadScene(sceneName,innserOnLaunched)
            }
        } catch (error) {
            mlog.error("goSceneOrDelay error sceneName:",sceneName,mlog.errorStr(error));
        }
        
    }

    /**当前所在场景 */
    getCurScene(){
        var curScene:MyScene = cc.director.getScene().getChildByName("Canvas").getComponent(MyScene);
        return curScene;
    }
    /**当前场景的类型 */
    getCurSceneType(){
        return this.getCurScene().getSceneType();
    }

    // onGameOverToOtherScene(){
    //     let lastGameClubId = ClubMgr.getLastGameClubId()
    //     if (lastGameClubId!=null){
    //         ClubMgr.setLastGameClubId(null)
    //         this.goClubScene(lastGameClubId)
    //         return;
    //     }
    //     this.goLobbyScene()
    // }

    goMjGameScene(delay:number = 0,onLaunched?: Function){
        this.goSceneOrDelay("MjGameScene",delay,onLaunched);
    }
    goDdzGameScene(delay:number = 0,onLaunched?: Function){
        this.goSceneOrDelay("DdzGameScene",delay,onLaunched);
    }
}

export default new SceneMgr();
