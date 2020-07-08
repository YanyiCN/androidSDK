package com.jy.common.base;

import com.jy.common.param.SdkParam;

import android.app.Application;
import android.content.Context;
import android.content.res.Configuration;
/**
 * application基类
 * @author hulinyun
 *
 * @param <T>
 */
public abstract class ApplicationBase<T extends SdkParam> {
	private SdkParam param;
	public T getParam(){
		return (T)param;
	}
	public abstract Class<T> getParamClass();
	public void setParam(SdkParam param){
		this.param = param;
	}
	public void onCreate(Application app){};
	public void attachBaseContext(Application app,Context base){};
	public void onTerminate(Application app){};
	public void onConfigurationChanged(Application app,Configuration newConfig){};
	public void onLowMemory(Application app){};
}
