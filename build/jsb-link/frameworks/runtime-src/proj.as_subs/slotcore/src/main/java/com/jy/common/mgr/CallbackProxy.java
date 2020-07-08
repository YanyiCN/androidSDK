package com.jy.common.mgr;

import com.jy.common.face.ISlotCallback;
import com.jy.common.utils.SLog;

import android.os.Handler;

public class CallbackProxy implements ISlotCallback {
	public CallbackProxy(Handler handler,int what) {
		this.what = what;
		this.handler= handler;
	}
	private Handler handler;
	private int what;
	
	private ISlotCallback back;
	private int ret;
	private String desc;
	private Object dataObj;
	@Override
	public void onCallback(int iPayRet,Object dataObj, String desc) {
		this.ret = iPayRet;
		this.desc = desc;
		this.dataObj=dataObj;
		handler.sendEmptyMessage(what);
	}
	
	public void reSendCallback(){
		SLog.i("CallbackProxy callback what:"+what +" iPayRet:"+ret+" desc:"+desc);
		back.onCallback(ret, dataObj, desc);
	}
	
	public void setBackAndReset(ISlotCallback back) {
		desc = "";
		ret = 0;
		dataObj=null;
		this.back = back;
	}
	public ISlotCallback getBack() {
		return back;
	}

	public int getRet() {
		return ret;
	}

	public String getDesc() {
		return desc;
	}
	
	public Object getDataObj() {
		return dataObj;
	}
}
