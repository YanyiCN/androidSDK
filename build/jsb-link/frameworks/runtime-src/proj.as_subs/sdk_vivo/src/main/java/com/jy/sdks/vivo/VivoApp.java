package com.jy.sdks.vivo;

import com.jy.common.base.ApplicationBase;
import com.vivo.unionsdk.open.VivoUnionSDK;

import android.app.Application;
import android.content.Context;

public class VivoApp extends ApplicationBase<VivoParam> {
	@Override
	public void onCreate(Application app) {
		//SDK初始化, 请传入自己游戏的appid替换demo中的appid。
        VivoUnionSDK.initSdk(app, getParam().getAppId().getValue(), false);
	}
	
	
	@Override
	public void attachBaseContext(Application app,Context base) {
		
	}


	@Override
	public Class<VivoParam> getParamClass() {
		return VivoParam.class;
	}
}
