// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { TestUtil } from "./TestUtil";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MainSecene extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        TestUtil.ConsoleLog("MainSecene onLoad", 100);
    }

    start() {
        TestUtil.ConsoleLog("MainSecene start", 100);
    }

    onDestroy() {
        TestUtil.ConsoleLog("MainSecene onDestroy", 100);
    }

    // update (dt) {}
}
