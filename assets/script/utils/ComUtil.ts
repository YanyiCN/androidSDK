import mlog from "./LogUtil";
import HeadBoxSprite from "../views/common/HeadBoxSprite";
import { AwardType } from "../define/Const";

export default class ComUtil {
    /** 字符串格式化 目前只支持替换%s*/
    static formatStr(str: string, ...args: any[]): string {
        // if (args==null) {
        //     return str;
        // }
        // for (let index = 0; index < args.length; index++) {
        //     str = str.replace("%s", args[index]);
        // }
        // return str;
        return cc.js.formatStr(str, ...args);
    }
    /**随机一个从start - end 之间的数字,含start,不含end */
    static random(start: number, end: number): number {
        let rdm = Math.random();
        let xx = rdm * (end - start)
        return start + Math.floor(xx)
    }


    /** 
    * 对日期进行格式化， 和C#大致一致 默认yyyy-MM-dd HH:mm:ss
    * 可不带参数 一个日期参数 或一个格式化参数
    * @param date 要格式化的日期 
    * @param format 进行格式化的模式字符串
    *     支持的模式字母有： 
    *     y:年, 
    *     M:年中的月份(1-12), 
    *     d:月份中的天(1-31), 
    *     H:小时(0-23), 
    *     h:小时(0-11), 
    *     m:分(0-59), 
    *     s:秒(0-59), 
    *     f:毫秒(0-999),
    *     q:季度(1-4)
    * @return String
    */
    public static formatDate(date?, format?: string): string {
        //无参数
        if (date == undefined && format == undefined) {
            date = new Date();
            format = "yyyy-MM-dd HH:mm:ss";
        }
        //无日期
        else if (typeof (date) == "string") {
            format = date;
            date = new Date();
        }
        //无格式化参数
        else if (format === undefined) {
            format = "yyyy-MM-dd HH:mm:ss";
        }
        else { }
        //没有分隔符的特殊处理

        var map = {
            "y": date.getFullYear() + "",//年份
            "M": date.getMonth() + 1 + "", //月份 
            "d": date.getDate() + "", //日 
            "H": date.getHours(), //小时 24
            "m": date.getMinutes() + "", //分 
            "s": date.getSeconds() + "", //秒 
            "q": Math.floor((date.getMonth() + 3) / 3) + "", //季度 
            "f": date.getMilliseconds() + "" //毫秒 
        };
        //小时 12
        if (map["H"] > 12) { map["h"] = map["H"] - 12 + ""; }
        else { map["h"] = map["H"] + ""; }
        map["H"] += "";

        var reg = "yMdHhmsqf";
        var all = "", str = "";
        for (var i = 0, n = 0; i < reg.length; i++) {
            n = format.indexOf(reg[i]);
            if (n < 0) { continue; }
            all = "";
            for (; n < format.length; n++) {
                if (format[n] != reg[i]) {
                    break;
                }
                all += reg[i];
            }
            if (all.length > 0) {
                if (all.length == map[reg[i]].length) {
                    str = map[reg[i]];
                }
                else if (all.length > map[reg[i]].length) {
                    if (reg[i] == "f") {
                        str = map[reg[i]] + this.charString("0", all.length - map[reg[i]].length);
                    }
                    else {
                        str = this.charString("0", all.length - map[reg[i]].length) + map[reg[i]];
                    }
                }
                else {
                    switch (reg[i]) {
                        case "y": str = map[reg[i]].substr(map[reg[i]].length - all.length); break;
                        case "f": str = map[reg[i]].substr(0, all.length); break;
                        default: str = map[reg[i]]; break;
                    }
                }
                format = format.replace(all, str);
            }
        }
        return format;
    }

    public static formatTime(timeSec: number, format: { hour: boolean, mns: boolean, sec: boolean }): string {
        let hour: string = ""
        let mns: string = ""
        let sec: string = ""
        if (format.hour) {
            hour = timeSec / 3600 < 10 ? "0" + Math.floor(timeSec / 3600) + ":" : Math.floor(timeSec / 3600) + ":"
        }
        if (format.mns) {
            mns = (timeSec % 3600) / 60 < 10 ? "0" + Math.floor((timeSec % 3600) / 60) + ":" : Math.floor((timeSec % 3600) / 60) + ":"
        }

        if (format.sec) {
            sec = (timeSec % 60) < 10 ? "0" + Math.floor(timeSec % 60) : "" + Math.floor(Math.floor(timeSec % 60))
        }

        return hour + mns + sec;
    }


    static getTimeTodayZero(addDay: number): Date {
        addDay = addDay || 0
        let now = new Date();
        now.setDate(now.getDate() + addDay);
        now.setHours(0, 0, 0, 0);
        return now;
    }

    static getTimeWeekZero(addWeek: number): Date {
        addWeek = addWeek || 0
        let weekday = new Date().getDay() || 7;
        let thisweekFirst = new Date(new Date().setDate(new Date().getDate() - weekday + 7 * addWeek + 1))
        thisweekFirst.setHours(0, 0, 0, 0);
        return thisweekFirst;
    }

    static getTimeMonthZero(addMonth: number): Date {
        addMonth = addMonth || 0
        var thismonthFirst = new Date(new Date().setDate(1));
        thismonthFirst.setHours(0, 0, 0, 0);
        thismonthFirst.setMonth(thismonthFirst.getMonth() + addMonth);
        return thismonthFirst;
    }

    /**
     * 返回字符串 为n个char构成
     * @param char 重复的字符
     * @param count 次数
     * @return String
     * @author adswads@gmail.com
     */
    private static charString(char: string, count: number): string {
        var str: string = "";
        while (count--) {
            str += char;
        }
        return str;
    }

    /**
     * 节点对屏幕大小的适配
     * @param bgNode 目标节点
     */
    static fullScreenByScale(bgNode: cc.Node) {
        let okRate = cc.view.getDesignResolutionSize().width / cc.view.getDesignResolutionSize().height
        let curRate = cc.sys.getSafeAreaRect().width / cc.sys.getSafeAreaRect().height
        if (curRate < okRate) {
            bgNode.setScale(okRate / curRate)
        } else {
            bgNode.setScale(curRate / okRate)
        }
    }

    static fullScreenByResize(bgNode: cc.Node) {
        bgNode.width = cc.sys.getSafeAreaRect().width;
        bgNode.height = cc.sys.getSafeAreaRect().height;
    }



    /**
     *  将列表对齐
     * @param list 
     * @param pMid 
     * @param space 
     * @param isY 
     */
    static sortListByMid(list: cc.Node[], pMid: cc.Vec2, space: number, isY: boolean = false) {
        if (!list || list.length <= 0) {
            return
        }
        let pStart = cc.v2(0, 0);
        if (isY) {
            pStart.x = pMid.x
            pStart.y = pMid.y - space * (list.length - 1) / 2
        } else {
            pStart.x = pMid.x - space * (list.length - 1) / 2
            pStart.y = pMid.y
        }

        this.sortListByStart(list, pStart, space, isY)
    }

    static sortMidByAutoWidth(list: cc.Node[], pMid: cc.Vec2, space) {
        if (!list || list.length <= 0) {
            return
        }
        // 算出总宽度
        let widthAll = 0
        for (const _txt of list) {
            widthAll = widthAll + _txt.width + space
        }
        widthAll = widthAll - space
        let startX = -widthAll / 2;
        for (const _txt of list) {
            _txt.setPosition(startX + pMid.x + (_txt.anchorX - 0) * _txt.width, pMid.y + (_txt.anchorY - 0.5) * _txt.height)
            startX = startX + _txt.width + space
        }
    }

    // 将列表对齐
    static sortListByStart(list: cc.Node[], pStart: cc.Vec2, space, isY: boolean = false) {
        if (!list || list.length <= 0) {
            return
        }
        for (let i = 0; i < list.length; i++) {
            const child = list[i];
            if (isY) {
                child.setPosition(pStart.x, pStart.y + (i - 1) * space)
            } else {
                child.setPosition(pStart.x + (i - 1) * space, pStart.y)
            }
        }
    }

    static sortStartByAutoWidth(list: cc.Node[], pStart: cc.Vec2, space, right2Left: boolean = false) {
        if (!list || list.length <= 0) {
            return
        }
        let startX = 0
        if (right2Left) {
            for (const _txt of list) {
                _txt.setAnchorPoint(1, 0.5)
                _txt.setPosition(startX + pStart.x + (_txt.anchorX - 1) * _txt.width, pStart.y + (_txt.anchorY - 0.5) * _txt.height)
                startX = startX - _txt.width - space
            }
        } else {
            for (const _txt of list) {
                _txt.setAnchorPoint(0, 0.5)
                _txt.setPosition(startX + pStart.x + (_txt.anchorX - 0) * _txt.width, pStart.y + (_txt.anchorY - 0.5) * _txt.height)
                startX = startX + _txt.width + space
            }
        }
    }

    static numToZheng(num = 0, len = 6) {
        if (num.toString().length >= len) {
            return Math.floor(num / 10000) + "万"
        }
        return num
    }

    static numToHan(num): string {
        if (num == 0) {
            return "零"
        } else if (num == 1) {
            return "一"
        } else if (num == 2) {
            return "二"
        } else if (num == 3) {
            return "三"
        } else if (num == 4) {
            return "四"
        } else if (num == 5) {
            return "五"
        } else if (num == 6) {
            return "六"
        } else if (num == 7) {
            return "七"
        } else if (num == 8) {
            return "八"
        } else if (num == 9) {
            return "九"
        } else if (num == 10) {
            return "十"
        }
    }

    /**
     * 字符串长度
     * @param str 目标字符串
     * @param type 汉字是否占2个字符  true 是
     */
    static strLength(str: string, type: boolean): number {
        if (type) {
            var res = /[\u4e00-\u9fa5]{1,}/g
            let arr = str.match(res)

            let _str = ""
            if (arr) {
                for (const iterator of arr) {
                    _str = _str + iterator
                }
            }

            return str.length + _str.length
        } else {
            return str.length
        }
    }
    /**
     * 显示字符 超出长度使用...表示
     * @param str 目标字符串
     * @param length 最大长度
     * @param type  汉字是否占2个字符  true 是
     */
    static strLimit(str: string, length: number, type: boolean): string {
        if (str == null || str == "") {
            return ""
        }
        if (length < 3) {
            length = 3
        }
        if (type) {
            var res = /[\u4e00-\u9fa5]{1,}/g
            let j = 0
            let tempStr = ""
            for (let i = 0; ; i++) {
                let _str = str.substr(i, 1)
                let arr1 = _str.match(res)
                if (arr1) {
                    j += 2
                } else {
                    j++
                }
                tempStr = tempStr + _str
                if (i >= str.length - 1) {
                    break;
                }
                if (j >= length - 3) {
                    tempStr += "..."
                    break;
                }
            }
            return tempStr
        } else {
            if (str.length <= length) {
                return str;
            }
            str = str.substr(0, length - 3) + "..."
            return str
        }
    }


    //     //str 需要截断的字符串
    // //maxChars 保留的汉字长度
    // //suffix 添加的后缀 （注意，如果后缀不为null或者'' ，则要占用一个汉字的位置,具体看下方的示例代码)

    // function strClamp(str, maxChars, suffix) {
    //     var toCodePoint = function(unicodeSurrogates) {
    //         var r = [], c = 0, p = 0, i = 0;
    //         while (i < unicodeSurrogates.length) {
    //             var pos = i;
    //             c = unicodeSurrogates.charCodeAt(i++);//返回位置的字符的 Unicode 编码 
    //             if (c == 0xfe0f) {
    //                 continue;
    //             }
    //             if (p) {
    //                 var value = (0x10000 + ((p - 0xD800) << 10) + (c - 0xDC00));
    //                 r.push({
    //                     v: value,
    //                     pos: pos,
    //                 }); //计算4字节的unicode
    //                 p = 0;
    //             } else if (0xD800 <= c && c <= 0xDBFF) {
    //                 p = c; //如果unicode编码在oxD800-0xDBff之间，则需要与后一个字符放在一起
    //             } else {
    //                 r.push({
    //                     v: c,
    //                     pos: pos
    //                 }); //如果是2字节，直接将码点转为对应的十六进制形式
    //             }
    //         }
    //         return r;
    //     }

    //     suffix = suffix==null? '...' : suffix;
    //     maxChars *= 2;

    //     var codeArr = toCodePoint(str);
    //     var numChar = 0;
    //     var index = 0;
    //     for (var i = 0; i < codeArr.length; ++i) {
    //         var code = codeArr[i].v;
    //         var add = 1;
    //         if (code >= 128) {
    //             add = 2;
    //         }

    //         //如果超过了限制，则按上一个为准
    //         if (numChar + add > maxChars){
    //             break;
    //         }

    //         index = i;

    //         //累加
    //         numChar += add;
    //     }

    //     if(codeArr.length - 1 == index){
    //         return str;
    //     }

    //     var more = suffix? 1:0;

    //     return str.substring(0, codeArr[index - more].pos + 1) + suffix;
    // }

    /** 将节点销毁*/
    static destroyOnly(node: cc.Node | cc.Component) {
        if (node == null || !node.isValid) {
            mlog.warn("node destroy but null or not isValid!");
            return;
        }
        node.destroy();
    }

    /** 将节点销毁,并立刻移除 */
    static destroy(node: cc.Node | cc.Component, cleanup = true) {
        if (node == null || !node.isValid) {
            mlog.warn("node destroy but null or not isValid!");
            return;
        }
        node.destroy();
        if (node instanceof cc.Node) {
            node.removeFromParent(cleanup);
        }
    }

    /** 将节点的子节点销毁,并立刻移除 */
    static destroyAllChildren(node: cc.Node, cleanup = true) {
        if (node == null || !node.isValid) {
            mlog.warn("node destroyAllChildren but null or not isValid!");
            return;
        }
        node.destroyAllChildren();
        node.removeAllChildren(cleanup);
    }

    /** 将节点立刻移除 */
    static remove(node: cc.Node, cleanup = true) {
        if (node == null || !node.isValid) {
            mlog.warn("node remove but null or not isValid!");
            return;
        }
        node.removeFromParent(cleanup);
    }

    /** 将节点的子节点立刻移除 */
    static removeAllChildren(node: cc.Node, cleanup = true) {
        if (node == null || !node.isValid) {
            mlog.warn("node removeAllChildren but null or not isValid!");
            return;
        }
        node.removeAllChildren(cleanup);
    }

    /**目标节点红点管理 */
    public static nodeRedFlush(node: cc.Node, needRed: boolean) {
        if (node.getChildByName("spRed") != null) {
            node.getChildByName("spRed").active = needRed;
        }
    }

    /**JSON 非空解析 */
    public static jsonParse(json: string = "") {
        if (!json || json.length <= 0) {
            return JSON.parse("{}");
        }
        return JSON.parse(json);
    }

    /**奖励类型 */
    public static awardName(awardType: number): string {
        switch (awardType) {
            case AwardType.Gold:
                return "金币";
            case AwardType.Gem:
                return "钻石";
            case AwardType.Coupon:
                return "红包卷";
            case AwardType.Prop:
                return "道具";
            case AwardType.Skin:
                return "装扮";
            default:
                break;
        }
    }

    /**逗号分隔数组 */
    public static stringSplitArr(str: string): number[] {
        let arr = [];
        if (str && str.length > 0) {
            if (str.length == 1) {
                arr.push(Number(str));
            } else {
                let virtualArr = str.split(",");
                for (const iterator of virtualArr) {
                    arr.push(Number(iterator))
                }
            }
        }
        return arr;
    }

    /**
     * 大数据处理
     * @param num 数值
     * @param point 浮点位
     */
    public static numToWanInteger(num: number, point: number = 1): string {
        if (Math.floor(num / 10000) < 1)
            return num.toString();
        let numInteger = Math.floor(num / 10000);
        return (numInteger + "万");
    }



}