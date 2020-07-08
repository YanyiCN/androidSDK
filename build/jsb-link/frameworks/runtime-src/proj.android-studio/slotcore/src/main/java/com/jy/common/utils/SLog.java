package com.jy.common.utils;

import com.jy.common.floatwin.SlotFloatWindow;


/**
 * 日志打印
 * @author hulinyun
 *
 */
public class SLog {
	
	public static final int NONE=0;
	public static final int INFO=1;
	public static final int DEBUG=2;
	public static final int ALL=3;
	private static int level=ALL;
	
	
	private static void log(int lv,String msg){
		if (level<=NONE) {
			return;
		}
		if (lv==INFO && level<INFO) {
			return;
		}
		if (lv==DEBUG && level<DEBUG) {
			return;
		}
		System.out.println("[slot] "+msg);
		SlotFloatWindow.getInstance().addTextToRunFloatWin("[slot] "+msg);
	}
	
	public static void i(String tag,String msg){
		log(INFO,"[info]["+tag+"]:  "+msg);
	}
	public static void i(String msg){
		log(INFO,"[info][]:  "+msg);
	}
	
	
	
	public static void d(String tag,String msg){
		log(DEBUG,"[debug]["+tag+"]:  "+msg);
	}
	public static void d(String msg){
		log(DEBUG,"[debug][]:  "+msg);
	}
	
	
	
	/**
	 * 设置日志格式
	 * @param level
	 */
	public static void setLogLevel(int level){
		SLog.level=level;
	}
}
