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

import com.alibaba.fastjson.JSONObject;
import com.jy.common.constant.SdkType;
import com.jy.common.mgr.SlotMgr;
import com.jy.core.GameActiveNormal;
import com.jy.core.LuaConst;

import android.os.Bundle;


public class AppActivity extends GameActiveNormal{
	public SdkType getDefLoginSdkType(){
		return SdkType.SDK_ALIGAME;
	}
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
	}
	
	/**
	 * 在LuaBridge处理前
	 * 返回非空则会停止LuaBridge再匹配
	 * */
	@Override
	public String jniPreHandle(int type, JSONObject obj, int funId) {
		if(type == LuaConst.LF_EXIT_BY_SDK){
			SlotMgr.getInstance().getSdkById(this.getDefLoginSdkType().getSdkId()).onExit();
			return "true";
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
	
	
}
