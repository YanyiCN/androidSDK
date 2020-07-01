import FileUtil from "./FileUtil";
import mlog from "./LogUtil";

export default class HttpUtil{
    public static createParamStr(obj:any){
        let str = "";
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                const v = obj[key];
                str += (key+"="+v+"&");
            }
        }
        if (str.length>0) {
            str = str.substr(0,str.length-1)
        }
        return str;
    }

    public static get(getParam:{
        url:string,
        callback?:(resStr:string,errMsg:string)=>void
    }){

        let param = {
            timeout : 5000,
            method : "GET",
            body : null,
            url : getParam.url,
            async : true,
            postType:null,
            callback : getParam.callback,
        }

        this.sendHttp(param);
    }

    public static post(postParam:{
        url:string,
        body?:any,
        type?:string,
        callback?:(resStr:string,errMsg:string)=>void
    }){

        let param = {
            timeout : 5000,
            method : "POST",
            body : postParam.body,
            url : postParam.url,
            async : true,
            postType:postParam.type,
            callback : postParam.callback
        }

        this.sendHttp(param);
    }

    private static sendHttp(param:{
            timeout?:number,
            method:string,
            body?:any,
            url:string,
            async?:boolean,
            postType:string,
            callback?:(resStr:string,errMsg:string)=>void
        }){
        if (!param || !param.url) {
            return;
        }
        if (param.async == null) {
            param.async = true;
        }
        let cbc = param.callback;
        var xhr = cc.loader.getXMLHttpRequest();
        xhr.onreadystatechange = (ev:Event)=> {//android原生不支持 XMLHttpRequest
            mlog.info(`网络异常 xhr.readyState = ${xhr.readyState} && xhr.status = ${xhr.status}`);
            if (xhr.readyState == 4) {//XMLHttpRequest.DONE
                if (xhr.status >= 200 && xhr.status < 400) {
                    var response = xhr.responseText;
                    if (cbc) {
                        cbc(response,null);
                        cbc = null;
                    }
                }else{
                    if (cbc) {
                        cbc(null,`网络异常 xhr.readyState = ${xhr.readyState} && xhr.status = ${xhr.status}`);
                        cbc = null;
                    }
                }
            }
        };
        xhr.onerror = (ev)=>{
            if (cbc) {
                cbc(null,"网络异常");
                cbc = null;
            }
        }
        xhr.timeout = param.timeout || 5000;
        xhr.open(param.method, param.url, param.async);

        
        param.postType = param.postType || "www"
        if (param.method == "POST" && param.postType != null) {
            if(param.postType === "formdata") {
                // data = new FormData();
                // data.append("key", "value");
            }else if(param.postType === "json") {
                xhr.setRequestHeader("Content-Type", "application/json");
                // data = JSON.stringify({"key": "value"});
            }else if(param.postType === "text") {
                // data = "key=value";
            }else if(param.postType === "www") {
                // 这个header 其实是 传统post 表单的格式
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                // data = "key=value";
            }
        }
        xhr.send(param.body);
    }

    private static saveFile(data,dir,imgName){
        if( typeof data !== 'undefined' ){
            FileUtil.createDirIfNotExist(dir);
            FileUtil.writeDataToFile(new Uint8Array(data),dir+"/"+imgName)
        }else{
            mlog.error('图片存储错误:',dir+"/"+imgName);
        }
    };

    public static downSaveImg(url,dir,imgName):void{
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = ()=>{
            if (xhr.readyState === XMLHttpRequest.DONE ) {
                if(xhr.status === 200){
                    this.saveFile(xhr.response,dir,imgName);
                }
            }
        }
        xhr.responseType = 'arraybuffer';
        xhr.open("GET", url, true);
        xhr.send();
    }
}