import { Lobby } from "../../proto/proto";
import ActiveMgr from "./ActiveMgr";

export default abstract class ActiveMgrBase<T> {

    // 活动类型(避免到处写类型)
    public abstract getActiveType(): number;

    //具体活动消息传递
    public abstract onActiveMsg(msg: Lobby.ActiveRes);

    // 获取活动所有数据
    public getAllData(): T {
        return ActiveMgr.getActiveData(this.getActiveType());
    }
}