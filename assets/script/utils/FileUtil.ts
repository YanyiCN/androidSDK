import glb from "./glb";

export default class FileUtil{
    /**获取可读写路径 */
    static getWritablePath(){
        if (!this.nativeCheck()) {
            return "";
        }
        return jsb.fileUtils.getWritablePath();
    }

    /** 判断路径是否存在 */
    static isDirectoryExist(path:string):boolean{
        if (!this.nativeCheck()) {
            return true;
        }
        return jsb.fileUtils.isDirectoryExist(path);
    }

    static createDirIfNotExist(path:string){
        if (!this.isDirectoryExist(path)) {
            this.createDirectory(path);
        }
    }

    /** 创建一个路径 */
    static createDirectory(path:string){
        if (!this.nativeCheck()) {
            return;
        }
        jsb.fileUtils.createDirectory(path)
    }
    /** 删除掉一个文件 */
    static removeFile(path:string){
        if (!this.nativeCheck()) {
            let key = this.pathToKey(path);
            glb.removeUserData(key);
            return;
        }
        jsb.fileUtils.removeFile(path);
    }


    static writeTxtFile(filePath:string,txt:string){
        if (!this.nativeCheck()) {
            let key = this.pathToKey(filePath);
            glb.setUserData(key,txt,"string");
            return;
        }
        jsb.fileUtils.writeStringToFile(txt,filePath)
    }

    static checkTxtFile(filePath:string):boolean{
        let val = this.readTxtFile(filePath);
        if (val!=null && val!="") {
            return true;
        }
        return false;
    }

    static readTxtFile(filePath:string):string{
        if (!this.nativeCheck()) {
            let key = this.pathToKey(filePath);
            return glb.getUserData(key,"string",null);
        }
        return jsb.fileUtils.getStringFromFile(filePath);
    }

    private static pathToKey(path:string){
        path = path.replace(/\\/g,"_")
        path = path.replace(/\//g,"_")
        return "file__"+path;
    }

    public static isFileExist(url):boolean{
        if (!this.nativeCheck()) {
            return false;
        }
        return jsb.fileUtils.isFileExist(url);
    }

    public static writeDataToFile(data ,filePath):boolean{
        if (!this.nativeCheck()) {
            return false;
        }
        // return jsb.fileUtils.writeToFile .writeDataToFile(data,filePath);  // TODO  这里现在直接屏蔽了  暂时用不到  用到的时候再测试
        return false;
    }

    private static nativeCheck():boolean{
        if (!cc.sys.isNative) {
            return false;
        }
        if (cc.sys.platform == cc.sys.IPHONE || cc.sys.platform == cc.sys.IPAD
            || cc.sys.platform == cc.sys.ANDROID
            || cc.sys.platform == cc.sys.WIN32
            || cc.sys.platform == cc.sys.MACOS) {
            return true;
        }else{
            return false;
        }
    }
}