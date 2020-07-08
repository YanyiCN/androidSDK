package com.jy.sdks.baidusgl;

import com.duoku.platform.single.DKPlatform;
import com.jy.common.base.ApplicationBase;

import android.app.Application;
import android.content.Context;

public class BaiduApp extends ApplicationBase<BaiduParam> {

	@Override
	public Class<BaiduParam> getParamClass() {
		return BaiduParam.class;
	}
	
	@Override
	public void attachBaseContext(Application app, Context base) {
		// TODO Auto-generated method stub
		super.attachBaseContext(app, base);
	}
	@Override
	public void onCreate(Application app) {
		// TODO Auto-generated method stub
		super.onCreate(app);
		 //百度账号
		DKPlatform.getInstance().invokeBDInitApplication(app);
	}
}
