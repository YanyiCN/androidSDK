import glb from "./glb";
import BuglyUtil from "./BuglyUtil";

export default class mlog{
    static info(msg: string|any, ...subst: any[]): void{
        // if (glb.isTest) {
        console.log(msg,...subst);
        // }
        BuglyUtil.log(3,msg,...subst);
    }
    static warn(msg: string|any, ...subst: any[]): void{
        console.warn(msg,...subst);

        BuglyUtil.log(2,msg,...subst);
    }
    static error(msg: string|any, ...subst: any[]): void{
        console.error(msg,...subst);

        BuglyUtil.log(1,msg,...subst);
    }
    static debug(msg: string|any, ...subst: any[]): void{
        // if (glb.isTest) {
        console.log(msg,...subst);
        // }
        BuglyUtil.log(4,msg,...subst);
    }

    static errorStr(error){
        let str = "";
        if (error) {
            str += " [[ERROR-START]]";
            if (error.toString) {
                str+=error.toString()+"  ";
            }
            if (error.message) {
                str +=`message:[${error.message}] `
            }
            if (error.constructor) {
                str +=`constructor:[${error.constructor}] `
            }
            if (error.name) {
                str +=`name:[${error.name}] `
            }
            if (error.prototype) {
                str +=`prototype:[${error.prototype}] `
            }
            if (error.stack) {
                str +=`stack:[${error.stack}] `
            }
            str += " [[ERROR-END]]";
        }
        return str;
    }
    
}


