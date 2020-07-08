package com.jy.common.mgr;

import java.util.ArrayList;
import java.util.List;

import com.jy.common.base.ApplicationBase;
import com.jy.common.floatwin.SlotFloatWindow;
import com.jy.common.param.SdkParam;
import com.jy.common.utils.AndroidUtil;
import com.jy.common.utils.SLog;

import android.app.Application;
import android.content.Context;
import android.content.res.Configuration;

/**
 * Slot工具Application管理类
 * @author hulinyun
 *
 */
public class SlotAppMgr {
	/**单例对象*/
	private static SlotAppMgr instance;
	public static SlotAppMgr getInstance(){
		if (instance==null) {
			instance = new SlotAppMgr();
		}
		return instance;
	}
	
	
	private List<ApplicationBase<?>> appList=null;
	private boolean inited=false;
	
	
	public void initApp(Application app){
		if (inited) {
			return;
		}
		//获取包内所有接入SDK列表
		List<ApplicationBase<?>> baseList = new ArrayList<ApplicationBase<?>>();
		List<SdkParam> sdkList = SlotConfig.getSdkList();
		for (SdkParam item : sdkList) {
			if (item.getSdkAppliClass()==null) {
				continue;
			}
			try {
				ApplicationBase<?> baseInst = item.getSdkAppliClass().newInstance();
				baseInst.setParam(item);
				baseList.add(baseInst);
				SLog.d(item.getSdkAppliClass()+" succ");
			} catch (Exception e) {
				e.printStackTrace();
				SLog.d(item.getSdkAppliClass()+" error");
			}
		}
		appList = baseList;
		inited = true;
	}
	
	
	public void onCreate(Application app){
		//日志系统必须第一个初始化
//		if (AndroidUtil.isAvilibleApp(app, "com.jy.debug")) {
//			SlotFloatWindow.getInstance().initFloatWindow(app);
//			SLog.i("包名:"+app.getPackageName());
//		}
		initApp(app);
		//TalkingData初始化
//		TalkingDataGA.init(app,SlotMgr.getInstance().getJtc().getTalkingDataAppId(),SlotMgr.getInstance().getJtc().getDcChannel());
		for (ApplicationBase<?> item : appList) {
			item.onCreate(app);
		}
	};
	public void attachBaseContext(Application app,Context base){
		initApp(app);
		for (ApplicationBase<?> item : appList) {
			item.attachBaseContext(app,base);
		}
	};
	
	
	public void onTerminate(Application app){
		initApp(app);
		for (ApplicationBase<?> item : appList) {
			item.onTerminate(app);
		}
	};
	
	public void onConfigurationChanged(Application app,Configuration newConfig){
		initApp(app);
		for (ApplicationBase<?> item : appList) {
			item.onConfigurationChanged(app, newConfig);
		}
	}
	public void onLowMemory(Application app) {
		initApp(app);
		for (ApplicationBase<?> item : appList) {
			item.onLowMemory(app);
		}
	}
	
}
