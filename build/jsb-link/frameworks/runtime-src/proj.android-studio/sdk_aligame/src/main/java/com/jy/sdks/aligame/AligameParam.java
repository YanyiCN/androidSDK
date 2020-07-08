package com.jy.sdks.aligame;

import com.jy.common.constant.SdkType;
import com.jy.common.param.SdkParam;
import com.jy.common.param.SdkParamItem;

public class AligameParam extends SdkParam{
	public AligameParam() {
		super(SdkType.SDK_ALIGAME,	"9.0.0.1_7.5.0.0");
		setSdkProxyClass(AligameProxy.class);
	}
	
	private SdkParamItem gameId=new SdkParamItem("GameId", "", "应用唯一编号,后台或商务获取", false);

	public SdkParamItem getGameId() {
		return gameId;
	}

	public void setGameId(SdkParamItem gameId) {
		this.gameId = gameId;
	} 
}
