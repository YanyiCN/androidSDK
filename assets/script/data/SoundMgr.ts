import MyMgr from "../base/MyMgr";
import glb from "../utils/glb";
import ResUtil from "../utils/ResUtil";
// import DdzSound from "./ddz/DdzSound";
// import MjSound from "./mj/MjSound";
import mlog from "../utils/LogUtil";
import PopMgr from "./PopMgr";





export class SoundMgrCla extends MyMgr{
    effectVolume: number;
    musicVolume: number;
    lang: string;
    curBgm: any;

    // mj:MjSound;
    // ddz:DdzSound;
    isMuteTemp: boolean;
    tempMuteCacheEffectVolume: number;
    tempMuteCacheMusicVolume: number;
    public initByLoad() {
        mlog.info("初始化声音管理器");

        // this.mj = new MjSound(this);
        // this.ddz = new DdzSound(this);
    }
    public initMgr() {
        //
        let musicVolume:number = glb.getUserData("musicVolume","int", 100)
        let effectVolume:number = glb.getUserData("effectVolume","int", 100)
        let lang:string  = "normal"//glb.getUserData("lang","string", "normal")

        this.effectVolume = effectVolume
        this.musicVolume = musicVolume
        this.lang = lang

        this.setEffectVolume(effectVolume);
        this.setMusicVolume(musicVolume);

        mlog.info("声音初始化完成",effectVolume,musicVolume,lang)
    }
    public uninitMgr() {
        //
    }


    /**设置音效的音量(0-100) */
    public setEffectVolume(effectVolume:number){
        if (effectVolume==null || effectVolume<0 || effectVolume>100) {
            mlog.error("错误的音量",effectVolume)
            PopMgr.tip("音量设置错误:"+effectVolume)
            return;
        }
        this.effectVolume = effectVolume
        cc.audioEngine.setEffectsVolume(effectVolume/100);
        glb.setUserData("effectVolume",effectVolume,"int")
    }

    /**获取音效的音量(0-100) */
    public getEffectVolume():number{
        return this.effectVolume
    }

    /**设置音乐的音量(0-100) */
    public setMusicVolume(musicVolume:number){
        if (musicVolume==null || musicVolume<0 || musicVolume>100) {
            mlog.error("错误的音量",musicVolume)
            return;
        }
        this.musicVolume = musicVolume
        cc.audioEngine.setMusicVolume(musicVolume/100)
        glb.setUserData("musicVolume",musicVolume,"int")
    }

    /**获取音乐的音量(0-100) */
    public getMusicVolume():number{
        return this.musicVolume
    }

    /**播放音效 */
    public basePlayEffect(effectName:string){
        if(this.getEffectVolume()==0){
            return
        }
        ResUtil.loadResAuto("sound/"+effectName,cc.AudioClip,(err,res)=>{
            cc.audioEngine.playEffect(res,false);
        });
    }

    /**播放音乐 */
    public basePlayMusic(fileName:string, isLoop:boolean=false){
        if(fileName != this.curBgm){
            // 停下旧的
            cc.audioEngine.stopMusic();
            this.curBgm = fileName;
            cc.audioEngine.playMusic(ResUtil.getCacheAudio("sound/"+fileName),isLoop);
    	}
        
    }

    // 临时静音(可恢复)
    public setMuteTemp(isMute:boolean){
        if(isMute && !this.isMuteTemp){
            // 设置静音
            this.isMuteTemp = isMute;
            this.tempMuteCacheEffectVolume = this.getEffectVolume();
            this.tempMuteCacheMusicVolume = this.getMusicVolume();
            this.setEffectVolume(0);
            this.setMusicVolume(0);
        }else if(!isMute && this.isMuteTemp){
            // 恢复
            this.isMuteTemp = isMute;
            this.setEffectVolume(this.tempMuteCacheEffectVolume);
            this.setMusicVolume(this.tempMuteCacheMusicVolume);
            this.tempMuteCacheEffectVolume = 0;
            this.tempMuteCacheMusicVolume = 0;
        }
    }
    
    // 按钮点击
    public playButton(){
        this.playOther("button_click")
    }
    // 点击牌
    public playTileClick(){
    	this.playOther("card_click")
    }
    // gif
    public playGif(name:string){
    	this.basePlayEffect("gif/" + name)
    }
    // 其他
    public playOther(name:string){
    	this.basePlayEffect("other/" + name)
    }
    
    // 大厅背景音乐
    public playLobbyBgm(){
        let bgmName = "bgm/lobby"
        this.basePlayMusic(bgmName,true)
    }

    // 游戏中等待背景音乐
    public playGameWatingBgm(){
        let bgmName = "bgm/game_waiting"
        this.basePlayMusic(bgmName,true)
    }
}

export default new SoundMgrCla();