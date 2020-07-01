export default class UserInfo {
    constructor() { }
    private static _instance: UserInfo;
    public static getInstance(): UserInfo {
        if (this._instance == null) {
            this._instance = new UserInfo();
        }
        return this._instance;
    }
    userId: number = 0;
    loginToken: string = "";
    nickName: string = "";
    headImgUrl: string = "";
    sex: number = 0;
    coinA: number = 0;
    coinB: number = 0;
    coinC: number = 0;
    level: number = 0;
    exp: number = 0;
    vipLevel: number = 0;
    vipExp: number = 0;
    titleId: number = 0;
    skinHead: number = 0;
    skinClock: number = 0;
    skinBubble: number = 0;
    address: string = "";
    curGameServerId:string="";
    curRoomUniqueId:String="";
    UserOtherInfo: {
        mobile: string;
        mobileBindTime: number;
        idCard: string;
        modifyNickName: number;
        firstTixian: number;
        titles: number[];
    }
    UserUsePropInfo: {
        headSkinJson: SkinInfo;
        clockSkinJson: SkinInfo;
        bubbleSkinJson: SkinInfo;
        propJson: SkinInfo;
    }
}

export class SkinInfo {
    cId: number;
    dId: number;
    expTime: number;
}