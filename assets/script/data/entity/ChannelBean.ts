export default class ChannelBaseBean{ 
    channel: string; 
    code: number; 
    channelSub:string; 
    plfm:string;
}

export class ChannelBean extends ChannelBaseBean{
    chObj:{
        sdkLogin :boolean;
        sdkAutoLogin : boolean;
        sdkLogout:false;
        editInfo:boolean;
    }
}