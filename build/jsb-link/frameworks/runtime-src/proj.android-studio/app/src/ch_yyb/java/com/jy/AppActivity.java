/****************************************************************************
Copyright (c) 2008-2010 Ricardo Quesada
Copyright (c) 2010-2016 cocos2d-x.org
Copyright (c) 2013-2017 Chukong Technologies Inc.
 
http://www.cocos2d-x.org

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
****************************************************************************/
package com.jy;

import android.Manifest;
import android.os.Bundle;

import com.alibaba.fastjson.JSONObject;
import com.jy.common.constant.SdkType;
import com.jy.common.constant.SlotConst.ShareRetType;
import com.jy.common.entry.ShareInfo;
import com.jy.common.face.ISlotCallback;
import com.jy.common.mgr.SlotMgr;
import com.jy.core.GameActiveNormal;
import com.jy.core.LuaBridge;
import com.jy.core.LuaConst;


public class AppActivity extends GameActiveNormal{
	public SdkType getDefLoginSdkType(){
		return SdkType.SDK_YYB;
	}
	public static String startMsg  = null;
	
	@Override
	protected String[] gameOtherPers() {
		return new String[]{
//		    Manifest.permission.ACCESS_FINE_LOCATION,
//			Manifest.permission.GET_TASKS,
//			Manifest.permission.RESTART_PACKAGES,
		    Manifest.permission.SYSTEM_ALERT_WINDOW,

		    Manifest.permission.INTERNET,
		    Manifest.permission.ACCESS_NETWORK_STATE,
		    Manifest.permission.READ_EXTERNAL_STORAGE,
		    Manifest.permission.WRITE_EXTERNAL_STORAGE,
		    Manifest.permission.READ_PHONE_STATE,
		    Manifest.permission.ACCESS_WIFI_STATE,
		    Manifest.permission.CHANGE_WIFI_STATE,
//			    Manifest.permission.RESTART_PACKAGES,
//			    Manifest.permission.GET_TASKS,
//		    Manifest.permission.READ_SMS,
//		    Manifest.permission.SEND_SMS,
		    Manifest.permission.WRITE_SETTINGS,
		    Manifest.permission.MOUNT_UNMOUNT_FILESYSTEMS,
		    Manifest.permission.INTERNET,
		    Manifest.permission.READ_PHONE_STATE,
		    Manifest.permission.ACCESS_WIFI_STATE,
		    Manifest.permission.ACCESS_NETWORK_STATE,
		    Manifest.permission.WAKE_LOCK,
		    Manifest.permission.VIBRATE,
//			    Manifest.permission.RECEIVE_USER_PRESENT,
		    Manifest.permission.RECEIVE_BOOT_COMPLETED,
		    Manifest.permission.WRITE_EXTERNAL_STORAGE,
		    Manifest.permission.WRITE_SETTINGS
		};
	}

	/**
	 * 在LuaBridge处理前
	 * 返回非空则会停止LuaBridge再匹配
	 * */
	@Override
	public String jniPreHandle(int type, JSONObject obj, int funId) {
		if(type == LuaConst.LF_SHARE){
	    	
	    	ShareInfo shareInfo = new ShareInfo();
	    	shareInfo.setUrl(obj.getString("linkUrl"));
	    	shareInfo.setComment("");
	    	shareInfo.setImagePath(obj.getString("imgPath"));
	    	shareInfo.setImageUrl("");
	    	shareInfo.setText(obj.getString("desc"));
	    	shareInfo.setTitle(obj.getString("title"));
	    	shareInfo.setOtherParam(obj);

	    	SlotMgr.getInstance().share(getDefLoginSdkType().getSdkId(),shareInfo , new ISlotCallback() {
				@Override
				public void onCallback(int iRet, Object dataObj, String desc) {
					boolean cancel = false;
					boolean suc = false;
					if (iRet == ShareRetType.SHARE_CANCEL) {
						cancel = true;
					}else if (iRet == ShareRetType.SHARE_SUC) {
						suc = true;
					}else if (iRet == ShareRetType.SHARE_FAIL) {
						
					}
					JSONObject json = new JSONObject();
					json.put("cancel", cancel?"true":"false");
					json.put("suc", suc?"true":"false");
					json.put("msg", desc);
					json.put("shareObjId", String.valueOf(dataObj));
					
					LuaBridge.callLua(LuaConst.LF_SHARE, json.toJSONString());
				}
			});
	    	return "";
	    }
		return null;
	}
	
	/**
	 * 在LuaBridge执行后并且无拦截时
	 * 返回非空则会停止LuaBridge再匹配
	 * */
	@Override
	public String jniAfterHandle(int type, JSONObject obj, int funId) {
		return null;
	}
	 	
	
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
	}
	
	

	
}
