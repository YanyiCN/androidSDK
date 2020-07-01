import MyMgr from "../base/MyMgr";
import mlog from "../utils/LogUtil";
import glb from "../utils/glb";
import { EventType, MsgType, ChatType } from "../define/Const";
import SoundMgr from "./SoundMgr";
import ComUtil from "../utils/ComUtil";
import FileUtil from "../utils/FileUtil";


let ErrorCode = 
{
    GCLOUD_VOICE_SUCC           : 0,
    //common base err
    GCLOUD_VOICE_PARAM_NULL : 0x1001,	//4097, some param is null
    GCLOUD_VOICE_NEED_SETAPPINFO : 0x1002,	//4098, you should call SetAppInfo first before call other api
    GCLOUD_VOICE_INIT_ERR : 0x1003,	//4099, Init Erro
    GCLOUD_VOICE_RECORDING_ERR : 0x1004,		//4100, now is recording, can't do other operator
    GCLOUD_VOICE_POLL_BUFF_ERR : 0x1005,	//4101, poll buffer is !enough || null 
    GCLOUD_VOICE_MODE_STATE_ERR : 0x1006,	//4102, call some api, but the mode is !correct, maybe you shoud call SetMode first && correct
    GCLOUD_VOICE_PARAM_INVALID : 0x1007,	//4103, some param is null || value is invalid for our request, used right param && make sure is value range is correct by our comment 
    GCLOUD_VOICE_OPENFILE_ERR : 0x1008, //4104, open a file err
    GCLOUD_VOICE_NEED_INIT : 0x1009, //4105, you should call Init before do this operator
    GCLOUD_VOICE_ENGINE_ERR : 0x100A, //4106, you have !get engine instance, this common in use c# api, but !get gcloudvoice instance first
    GCLOUD_VOICE_POLL_MSG_PARSE_ERR : 0x100B, //4107, this common in c# api, parse poll msg err
    GCLOUD_VOICE_POLL_MSG_NO : 0x100C, //4108, poll, no msg to update
    //realtime err
    GCLOUD_VOICE_REALTIME_STATE_ERR : 0x2001, //8193, call some realtime api, but state err, such as OpenMic but you have !Join Room first
    GCLOUD_VOICE_JOIN_ERR : 0x2002, //8194, join room failed
    GCLOUD_VOICE_QUIT_ROOMNAME_ERR : 0x2003,	//8195, quit room err, the quit roomname !equal join roomname
    GCLOUD_VOICE_OPENMIC_NOTANCHOR_ERR : 0x2004,//8196, open mic in bigroom,but !anchor role
    //message err
    GCLOUD_VOICE_AUTHKEY_ERR : 0x3001, //12289, apply authkey api error
    GCLOUD_VOICE_PATH_ACCESS_ERR : 0x3002, //12290, the path can !access ,may be path file !exists || deny to access
    GCLOUD_VOICE_PERMISSION_MIC_ERR : 0x3003,	//12291, you have !right to access micphone in android
    GCLOUD_VOICE_NEED_AUTHKEY : 0x3004,		//12292,you have !get authkey, call ApplyMessageKey first
    GCLOUD_VOICE_UPLOAD_ERR : 0x3005,	//12293, upload file err
    GCLOUD_VOICE_HTTP_BUSY : 0x3006,	//12294, http is busy,maybe the last upload/download !finish.
    GCLOUD_VOICE_DOWNLOAD_ERR : 0x3007,	//12295, download file err
    GCLOUD_VOICE_SPEAKER_ERR : 0x3008, //12296, open || close speaker tve error
    GCLOUD_VOICE_TVE_PLAYSOUND_ERR : 0x3009, //12297, tve play file error
    GCLOUD_VOICE_AUTHING : 0x300a, // 12298, Already in applying auth key processing

    GCLOUD_VOICE_INTERNAL_TVE_ERR : 0x5001,		//20481, internal TVE err, our used
    GCLOUD_VOICE_INTERNAL_VISIT_ERR : 0x5002,	//20482, internal !TVE err, out used
    GCLOUD_VOICE_INTERNAL_USED : 0x5003, //20483, internal used, you should !get this err num
        
    GCLOUD_VOICE_BADSERVER : 0x06001, // 24577, bad server address,should be "udp://capi.xxx.xxx.com"
        
    GCLOUD_VOICE_STTING :  0x07001, // 28673, Already in speach to text processing

}
    
let ComCode = 
{
    GV_ON_JOINROOM_SUCC : 1,	//join room succ
    GV_ON_JOINROOM_TIMEOUT :2,  //join room timeout
    GV_ON_JOINROOM_SVR_ERR :3 ,  //communication with svr occur some err, such as err data recv from svr
    GV_ON_JOINROOM_UNKNOWN :4 , //reserved, our internal unknow err

    GV_ON_NET_ERR :5 ,  //net err,may be can't connect to network

    GV_ON_QUITROOM_SUCC :6 , //quitroom succ, if(you have join room succ first, quit room will alway return succ

    GV_ON_MESSAGE_KEY_APPLIED_SUCC :7 ,  //apply message authkey succ
    GV_ON_MESSAGE_KEY_APPLIED_TIMEOUT :8,		//apply message authkey timeout
    GV_ON_MESSAGE_KEY_APPLIED_SVR_ERR :9,  //communication with svr occur some err, such as err data recv from svr
    GV_ON_MESSAGE_KEY_APPLIED_UNKNOWN :10,  //reserved,  our internal unknow err

    GV_ON_UPLOAD_RECORD_DONE : 11,  //upload record file succ
    GV_ON_UPLOAD_RECORD_ERROR : 12,  //upload record file occur error
    GV_ON_DOWNLOAD_RECORD_DONE : 13,	//download record file succ
    GV_ON_DOWNLOAD_RECORD_ERROR : 14,	//download record file occur error

    GV_ON_STT_SUCC : 15, // speech to text successful
    GV_ON_STT_TIMEOUT : 16, // speech to text with timeout
    GV_ON_STT_APIERR : 17, // server's error
        
    GV_ON_RSTT_SUCC : 18, // speech to text successful
    GV_ON_RSTT_TIMEOUT : 19, // speech to text with timeout
    GV_ON_RSTT_APIERR : 20, // server's error
        
    GV_ON_PLAYFILE_DONE : 21,  //the record file played }
        
    GV_ON_ROOM_OFFLINE : 22, // Dropped from the room
    GV_ON_UNKNOWN : 23
}

let GCloudLanguage ={
    China       : 0,
    Korean      : 1,
    English     : 2,
    Japanese    : 3
}
let GCloudVoiceMode=
{
    RealTime : 0, // realtime mode for TeamRoom || NationalRoom
    Messages : 1,     // voice message mode
    Translation :2,  // speach to text mode
    //RSTT, // real-time speach to text mode
    HIGHQUALITY :4 //high quality realtime voice, will cost more network traffic
}

class TalkMgr extends MyMgr{
    fileIndex: any;
    public initByLoad() {
        mlog.info("初始TalkMgr");
    }
    private talkMicOpen:boolean;
    private talkSpeakVolume:number;
    private isTalking:boolean = false;
    private talkStartTime:number;
    private talkMsgQueue:{userId:string,fileId:string,path:string}[] = [];
    private talkSdk:meehu.Gcloud;
    private playingItem:any;
    private isScheduled:boolean;

    public uninitMgr() {}
    public initMgr() {
        let talkMicOpen = false//glb.getUserData("talkMicOpen","int", 0)==1
        let talkSpeakVolume = glb.getUserData("talkSpeakVolume","int", 100)
        this.talkMicOpen = talkMicOpen
        this.talkSpeakVolume = talkSpeakVolume
    
        glb.regEventLis(EventType.CROSS_GAME_HIDESHOW,this.onHideShow,this)
    
        let path = ComUtil.formatStr("%stalk/",FileUtil.getWritablePath())
        FileUtil.createDirIfNotExist(path);
        this.talkMsgQueue = []
    }
    
    
    private onHideShow(show:boolean){
        if (show) {
            mlog.info("TalkMgr.onForeGround: cc.Director.getInstance():resume()")
            // 静音
            SoundMgr.setMuteTemp(false)
            // 
            this.isTalking = false
            //
            this.onTalkPlayOver()
        }else{
            mlog.info("TalkMgr.onBackGround")
        }
    }
    
    
    public setTalkMicOpen(open){
        mlog.info("开启麦克风",open)
        this.talkMicOpen = open
    }
    
    public getTalkMicOpen(){
        return this.talkMicOpen
    }
    
    public setTalkSpeakVolume(vol){
        //mlog.info("设置喇叭音量",vol)
        this.talkSpeakVolume = vol
        glb.setUserData("talkSpeakVolume",this.talkSpeakVolume,"int")
        if(this.talkSdk){
            this.talkSdk.setSpeakerVolume(this.talkSpeakVolume*2)
        }
    }
    
    public getTalkSpeakVolume(){
        return this.talkSpeakVolume
    }
    
    private update(){
        if(!this.talkSdk){
            return 
        }
    
        if(!this.playingItem && !this.isTalking){
            if(this.talkMsgQueue.length >0){
                // 取出第一个开始播放,并且发送消息
                let item = this.talkMsgQueue.shift();
                this.playingItem = item
                mlog.info("开始下载并播放文件:item.userId",item.userId)
                glb.sendEvent(EventType.GAME_CHAT_FILE_START_END,item.userId,item.fileId,true)
                // 开始下载
                this.talkSdk.downloadRecordedFile(item.fileId,item.path,6000)
                //this.talkSdk:PlayRecordedFile(item.path)
            }
        }
    
        this.talkSdk.poll()
    }

    public supportTalk():boolean{
        if(window["meehu"]&&window["meehu"].Gcloud){
            return true;
        }
        return false;
    }
    
    public initTalk(userId,roomId){
        if(this.talkSdk){
            return 
        }
        if(!this.supportTalk()){
            return
        }
        this.talkSdk = new meehu.Gcloud();
    
        if (!this.isScheduled) {
            cc.director.getScheduler().schedule(this.update.bind(this),this,0,false);
            this.isScheduled = true;
        }

        this.talkSdk.init("1321182342","e8b937c6f9af3584edab9215c43dcdf4",userId)
        this.talkSdk.setNotify(
        // 上传结果
        (code,filePath,fileId)=>{
            mlog.info("上传结果:code,filePath,fileId",code,filePath)
            // glb.sendMsg(MsgType.ChatReq,{msg_type:ChatType.AUDIO,msg_ctn:fileId})----
            FileUtil.removeFile(filePath)
            this.isTalking = false
            //this.talkSdk:SpeechToText(fileId,60000,0)
        },
        // 下载结果
        (code,filePath,fileId)=>{
            mlog.info("下载结果:code,filePath",code,filePath)
            // 静音
            SoundMgr.setMuteTemp(true)
            // 下载好了播放
            this.talkSdk.playRecordedFile(filePath)
        },
        // 播放结果
        (code,filePath)=>{
            mlog.info("播放结果:code,filePath",code,filePath)
            // 取消静音
            SoundMgr.setMuteTemp(false)
            //
            this.onTalkPlayOver()
        },
        // 获取key
        (code)=>{
            if(code == ComCode.GV_ON_MESSAGE_KEY_APPLIED_SUCC){
                mlog.info("获取key成功")
            }else{
                mlog.info("获取key失败:code",code)
            }
        },
        // 加入房间
        (code,roomName,memberId)=>{
            mlog.info("加入房间:code,roomName,memberId",code,roomName,memberId)
        },
        // 离开房间
        (code,roomName)=>{
            mlog.info("离开房间:code,roomName",code,roomName)
        },
        // 成员说话
        (members,count)=>{
            mlog.info("成员说话:members,count",members,count)
        },
        // 翻译文本
        (code,fileId,result)=>{
            mlog.info("翻译文本:code,result",code,result)
        })
    
        let res = this.talkSdk.setMode(GCloudVoiceMode.Messages)
        mlog.info("设置模式结果 SetMode:",res)
        res = this.talkSdk.applyMessageKey(6000)
        mlog.info("申请KEY结果 ApplyMessageKey:",res)
    
        if(this.talkSdk){
            // 获取mic level
            let micLevel = this.talkSdk.getMicLevel(false)
            mlog.info("micLevel",micLevel)
            // 获取外放level
            let speakerLevel = this.talkSdk.getSpeakerLevel()
            mlog.info("speakerLevel",speakerLevel)
            // 设置mic音量
            let setMicVolumeRet =  this.talkSdk.setMicVolume(100)
            mlog.info("100 setMicVolumeRet",setMicVolumeRet)
            // 设置外放音量
            //Android & IOS, value range is 0-800, 100 means original voice volume, 50 means only 1/2 original voice volume, 200 means double original voice volume
            // Windows value range is 0x0-0xFFFF, suggested value bigger than 0xff00,){ you can hear you speaker sound
            let setSpeakerVolumeRet = this.talkSdk.setSpeakerVolume(this.talkSpeakVolume*2)
            mlog.info("setSpeakerVolumeRet  ",setSpeakerVolumeRet)
    
    
            // 获取mic level
            micLevel = this.talkSdk.getMicLevel(false)
            mlog.info("micLevel after",micLevel)
            // 获取外放level
            speakerLevel = this.talkSdk.getSpeakerLevel()
            mlog.info("speakerLevel after",speakerLevel)
        }
    }
    
    private onTalkPlayOver(){
        if(!this.playingItem){
            return
        }
        // 发送消息
        mlog.info("发送停止消息",this.playingItem.userId,false)
        glb.sendEvent(EventType.GAME_CHAT_FILE_START_END,this.playingItem.userId,this.playingItem.fileId,false)
        // 删除文件
        FileUtil.removeFile(this.playingItem.path)
        // 清空状态
        this.playingItem = null
    }
    
    
    public startTalk(){
        if(!this.talkSdk){
            return
        }
        let path = ComUtil.formatStr("%stalk/%s",FileUtil.getWritablePath(),this.getFileIndex())
        
    
        // 静音
        SoundMgr.setMuteTemp(true)
    
        this.isTalking = true
        this.talkStartTime = Date.now();
        //
        this.talkSdk.stopPlayFile()
        this.onTalkPlayOver()
    
        let res = this.talkSdk.startRecording(path)
        mlog.info("startTalk() path , res",path,res)
    }
    
    private getFileIndex(){
        this.fileIndex = Date.now() + ComUtil.random(1, 9999)
        return this.fileIndex
    }
    
    private getRandomIndex(){
        return Date.now() + ComUtil.random(1, 9999)
    }
    
    /**
     * 
     * @param send 
     * @return 返回时间是否足够
     */
    public stopTalk(send:boolean):boolean{
        if(!this.talkSdk){
            return false;
        }
        this.onTalkPlayOver()
        // 取消静音
        SoundMgr.setMuteTemp(false)

        let timeLenOk = (this.talkStartTime) && (Date.now()-this.talkStartTime)>1*1000
    
        let stopRes = this.talkSdk.stopRecording()
        let path = ComUtil.formatStr("%stalk/%s",FileUtil.getWritablePath(),this.fileIndex)
        if(send && timeLenOk){
            if(stopRes == 0){
                let uploadRes = this.talkSdk.uploadRecordedFile(path,6000)
                mlog.info("stopTalk() path,stopRes ,uploadRes",path ,stopRes ,uploadRes)
            }else{
                this.isTalking = false
            }
            return true;
        }else{
            FileUtil.removeFile(path);
        }

        return false;
    }
    
    
    public downloadTalk(fileId,userId){
        if(!this.talkSdk){
            return
        }
        mlog.info("收到播放请求:",userId)
        let path = ComUtil.formatStr("%stalk/%s",FileUtil.getWritablePath(),this.getRandomIndex())
        // 下载好先缓存
        this.talkMsgQueue.push({userId : userId,fileId:fileId,path : path})
    }
    

}

export default new TalkMgr();