package com.jy;

import java.util.ArrayList;
import java.util.List;

import com.jy.common.mgr.SlotConfig;
import com.jy.common.param.SdkParam;
import com.jy.core.GameApplicationNormal;
import com.jy.yyb.YybParam;

import android.content.Context;

public class MyApplication extends GameApplicationNormal {

	static{
		List<SdkParam> sdkList = new ArrayList<SdkParam>();
		/*WeixinParam weixin = new WeixinParam();
		weixin.getAppId().setValue("wx2d8db29df6fa3140");
		weixin.setConfigId(17);*/
		
		
		/*AlipayParam alipay = new AlipayParam();
		alipay.setConfigId(6);*/
		
/*		WeixinShareParam weixinShare = new WeixinShareParam();
		weixinShare.getAppId().setValue("wx5a4ea6bb3b4b89d9");*/
		
		YybParam  yyb =new YybParam();
		yyb.getWxAppId().setValue("wx5a4ea6bb3b4b89d9");
		yyb.getMidasOfferId().setValue("1106579343");
		yyb.getLoginType().setValue("-1");//-1选择(有问题)  0qq 1wx
		yyb.getIsRelease().setValue("1");//0沙盒环境  1发布环境
		yyb.setConfigId(20);
		//sdkList.add(weixin);
		sdkList.add(yyb);
	//	sdkList.add(alipay);
	//	sdkList.add(weixinShare);
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
