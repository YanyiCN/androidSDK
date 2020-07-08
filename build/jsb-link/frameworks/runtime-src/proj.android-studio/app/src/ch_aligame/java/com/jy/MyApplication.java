package com.jy;

import java.util.ArrayList;
import java.util.List;

import com.jy.common.mgr.SlotConfig;
import com.jy.common.param.SdkParam;
import com.jy.core.GameApplicationNormal;
import com.jy.sdks.aligame.AligameParam;
import com.jy.sdks.share.wx.WeixinShareParam;

import android.content.Context;

public class MyApplication extends GameApplicationNormal {

	static{
		List<SdkParam> sdkList = new ArrayList<SdkParam>();
//		WeixinParam weixin = new WeixinParam();
//		weixin.getAppId().setValue("wx2d8db29df6fa3140");
//		weixin.setConfigId(17);
		
		WeixinShareParam.setAppId("wxc85285e8b8b00274");
		WeixinShareParam weixinShare = new WeixinShareParam();
		
		AligameParam aligame = new AligameParam();
		aligame.getGameId().setValue("1150576");
		aligame.setConfigId(54);
		
		sdkList.add(aligame);
//		sdkList.add(weixin);
		sdkList.add(weixinShare);
		SlotConfig.setSdkList(sdkList);
	}
	
	@Override
	public void onCreate() {
		super.onCreate();
	}
	
	@Override
	protected void attachBaseContext(Context base) {
		super.attachBaseContext(base);
	}
}
