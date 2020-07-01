import MyMgr from "../base/MyMgr";
import mlog from "../utils/LogUtil";
import glb from "../utils/glb";
import { MsgType, Mid, EventType } from "../define/Const";
import { Lobby } from "../proto/proto";
import { GamePropConfig } from "./config/CfgGameTree";

class BagMgr extends MyMgr {
    private bagPropsAllData: Lobby.IPackageItemRes[] = [];

    private cfgGameProp: GamePropConfig[] = [];
    public initByLoad() {
        mlog.info("初始BagMgr");
        glb.regEventLis(Mid.MID_PACKAGE_RES, this.onPackageRes, this);
    }
    public initMgr() {
        console.log("Init Bag Data ......");
        this.sendPackageReq(PackageType.List);
    }
    public uninitMgr() { }

    /**
     * 背包响应事件-背包数据储存
     * @param msg Lobby.PackageRes
     */
    private onPackageRes(msg: Lobby.PackageRes) {
        switch (msg.handle_type) {
            case PackageType.List:
                this.bagPropsAllData = msg.package_list;
                glb.sendEvent(EventType.BAG_LIST);
                break;
            case PackageType.UseProp:
                // this.bagPropsAllData = msg.package_list;
                glb.sendEvent(EventType.BAG_USE_PROP);
                break;
            case PackageType.FindProp:
                glb.sendEvent(EventType.BAG_FIND_PROP);
                break;

            default:
                break;
        }
    }

    /**
     * 背包道具
     * @param handlType 1获取背包列表2使用道具3道具查询
     * @param handleValue 使用道具时的道具id
     */
    public sendPackageReq(handlType: number, handleValue: number = null) {
        glb.sendMsg(MsgType.PackageReq, {
            handle_type: handlType,
            handle_value: handleValue
        })
    }

    /**用户仓库道具 */
    public getBagPropsAllData() {
        return this.bagPropsAllData;
    }

    /**设置道具配置本地储存 */
    public setGamePropConfig(cfgGamePropList: GamePropConfig[]) {
        this.cfgGameProp = cfgGamePropList;
    }

    /**获取道具配置本地储存 */
    public getGamePropConfig() {
        return this.cfgGameProp;
    }

    /**
     * 获取此道具配置信息
     * @param cfgID 道具ID
     */
    public getThePropConfig(cfgID: number): GamePropConfig {
        let propsCfg = this.getGamePropConfig();
        for (const iterator of propsCfg) {
            if (iterator.id == cfgID) {
                return iterator;
            }
        }
    }

    /**
     * 获取此道具数据信息
     * @param cfgID 道具ID
     */
    public getThePropData(cfgID: number): Lobby.IPackageItemRes {
        let propsCfg = this.getBagPropsAllData();
        for (const iterator of propsCfg) {
            if (iterator.item_id == cfgID) {
                return iterator;
            }
        }
        return null;
    }

}
export default new BagMgr();

export const PackageType = {
    List: 1,
    UseProp: 2,
    FindProp: 3
}
