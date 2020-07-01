import glb from "../../../utils/glb";

// import { EventType, GameType, MsgType } from "../../../define/Const";

import ComUtil from "../../../utils/ComUtil";
// import UserMgr from "../../../data/UserMgr";
import MyPop from "../../../base/MyPop";
import mlog from "../../../utils/LogUtil";
// import GameMgr from "../../../data/GameMgr";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ReEnterPop extends MyPop {
    

    @property(cc.Node)
    mask:cc.Node = null;

    @property(cc.Label)
    labelShow:cc.Label = null;

    private timeLast = 3;

    onExtLoad() {
        // UserMgr.cleanNeedReEnterGame()

        ComUtil.fullScreenByResize(this.mask);
        // this.node.x = this.mask.width/2;
        // this.node.y = this.mask.height/2;

        cc.tween(this.node)
        .repeat(this.timeLast,
            cc.tween(this.node).delay(1).call(()=>{
                this.timeLast --;
                this.labelShow.string = this.timeLast.toString();
            })
        ).call(()=>{
            this.enterToRoom();
        }).start()
    }

    private enterToRoom(){
        let gameScene = null
        // 发送进入房间请求
        // let gameId = UserMgr.userInfo.curGameId;
        // let roomId = UserMgr.userInfo.curRoomId;
        // if (gameId == GameType.MJ){
        //     mlog.info("切换麻将游戏场景")
        // }else if(gameId == GameType.DDZ){
        //     mlog.info("切换斗地主游戏场景")
        // }
        
        // GameMgr.doGameDepend({roomId:roomId,gameType:gameId},()=>{
        //     glb.sendMsg(MsgType.EnterRoomReq,{
        //         room_id : roomId,
        //         game_id : gameId,
        //         rejoin : true
        //     })
        // })
        mlog.info("发送重连房间请求")

        ComUtil.destroy(this.node)
    }
}
