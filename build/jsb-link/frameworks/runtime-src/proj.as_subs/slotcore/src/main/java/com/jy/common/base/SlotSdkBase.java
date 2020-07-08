package com.jy.common.base;

import com.jy.common.constant.SlotSdkId;
import com.jy.common.face.ISlotBase;
import com.jy.common.mgr.CallbackProxy;
import com.jy.common.param.SdkParam;

import android.content.Intent;
/**
 * sdkproxy基类
 * @author a
 *
 * @param <T>
 */
public abstract class SlotSdkBase<T extends SdkParam> implements ISlotBase {
	private boolean supportPay=false;
	private boolean supportLogin=false;
	private CallbackProxy logoutCallback;
	private SdkParam param;
	public T getParam(){
		return (T)param;
	}
	public  SdkParam getParamCom(){
		return param;
	}
	private String userId;
	public abstract Class<T> getParamClass();
	public void setParam(SdkParam param) {
		this.param = param;
	}
	@Override
	public SlotSdkId getSdkId() {
		return new SlotSdkId(getParam().getSdkId(), getParam().getShowName());
	}
	protected void setUserId(String userId) {
		this.userId = userId;
	}
	public String getUserId() {
		return userId;
	}
	
	/** 是否支持支付*/
	public boolean isSupportPay() {
		return supportPay;
	}
	public void setSupportPay(boolean supportPay) {
		this.supportPay = supportPay;
	}
	/** 是否支持登录*/
	public boolean isSupportLogin() {
		return supportLogin;
	}
	public void setSupportLogin(boolean supportLogin) {
		this.supportLogin = supportLogin;
	}
	public void setLogoutCallback(CallbackProxy logoutCallback) {
		this.logoutCallback = logoutCallback;
	}
	public CallbackProxy getLogoutCallback() {
		return logoutCallback;
	}
	
	
	public Object other1(Object param){return null;}
	public Object other2(Object param){return null;}
	public Object other3(Object param){return null;}
	
	/**
	 * 退出游戏
	 * @return	true:由SDK负责退出,请不要退出  <br>
	 * 			false:可以直接退出游戏
	 */
	public boolean onExit(){return false;}
	//主Activity的一些消息转发
	public void onActivityResult(int requestCode, int resultCode, Intent data){}
	public void onResume() {}
	public void onPause(){}
	public void onNewIntent(Intent intent) { }
	public void onDestroy() {}
	public void onRestart() {}
	public void onStart() {}
	public void onStop() {}
}
