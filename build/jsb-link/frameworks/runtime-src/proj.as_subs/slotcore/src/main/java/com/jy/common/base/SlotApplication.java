package com.jy.common.base;


import com.jy.common.mgr.SlotAppMgr;

import android.app.Application;
import android.content.Context;
import android.content.res.Configuration;


public class SlotApplication extends Application {
	@Override
	public void onCreate() {
		super.onCreate();
		SlotAppMgr.getInstance().onCreate(this);
	}
	
	@Override
	protected void attachBaseContext(Context base) {
		super.attachBaseContext(base);
		SlotAppMgr.getInstance().attachBaseContext(this,base);
	}
	
	@Override
	public void onTerminate() {
		SlotAppMgr.getInstance().onTerminate(this);
		super.onTerminate();
	}
	
	@Override
	public void onConfigurationChanged(Configuration newConfig) {
		super.onConfigurationChanged(newConfig);
		SlotAppMgr.getInstance().onConfigurationChanged(this, newConfig);
	}
	@Override
	public void onLowMemory() {
		super.onLowMemory();
		SlotAppMgr.getInstance().onLowMemory(this);
	}
}
