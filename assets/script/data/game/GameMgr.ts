import MyMgr from "../../base/MyMgr";
import mlog from "../../utils/LogUtil";
import glb from "../../utils/glb";
import { MsgType, Mid } from "../../define/Const";
import { Lobby } from "../../proto/proto";
import { GameWanFaConfig } from "../config/CfgGameWanFa";

const { ccclass } = cc._decorator;

@ccclass
class GameMgr extends MyMgr {
    private cfgGameWanfa: GameWanFaConfig[] = null;
    public initByLoad() {
        mlog.info("GameMgr");
        // glb.regEventLis(Mid.MID_MAIL_RES, this.onMailRes, this);
    }
    public initMgr() {

    }
    public uninitMgr() { }

    private onMailRes() {

    }

    public sendMailReq(handleType: number, handleValue: number = null) {
        glb.sendMsg(MsgType.MailReq, {
            handle_type: handleType,
            handle_value: handleValue
        });
    }

    /**更新玩法配置 */
    public setGameWanfaCfg(cfgGameWanfaList: GameWanFaConfig[]) {
        this.cfgGameWanfa = cfgGameWanfaList;
    }

    /**获取玩法配置 */
    public getGameWanfaCfg() {
        return this.cfgGameWanfa;
    }

    /**
     * 玩法房间类型通过类型分类
     * @param wanfaId 游戏玩法标识
     */
    public getGameWanCfgArrByType(wanfaId: string): GameWanFaConfig[] {
        let cfgArr: GameWanFaConfig[] = [];
        let allCfg = this.cfgGameWanfa;
        for (const item of allCfg) {
            if (item.wanfaId == wanfaId) {
                cfgArr.push(item);
            }
        }
        return cfgArr;
    }

    /**当前房间配置底分排序 */
    public getSortCurRoomTypeCfg(cfgArr: GameWanFaConfig[]) {
        let orderArr = cfgArr.sort((orderA: GameWanFaConfig, orderB: GameWanFaConfig) => {
            return orderA.goldBase - orderB.goldBase;
        });
        return orderArr;
    }


    /** 校验是否可以进入此游戏 */
    public goGoldGameCheck(gwcId:number):boolean{
        // TODO 陈赛实现: 校验是否可以进入游戏
        // 如果不能进入,执行对应的弹框或者逻辑,然后返回false
        return true;
    }

}
export default new GameMgr();
