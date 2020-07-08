package com.jy.common.utils;

import java.util.ArrayList;
import java.util.List;

import android.app.Activity;
import android.content.ComponentName;
import android.content.Context;
import android.content.pm.ActivityInfo;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.content.pm.PackageManager.NameNotFoundException;
import android.graphics.Point;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.net.wifi.WifiInfo;
import android.net.wifi.WifiManager;
import android.os.Build;
import android.os.Bundle;
import android.telephony.TelephonyManager;
import android.util.Log;
import android.view.Display;
import android.view.WindowManager;

public class AndroidUtil {
	/** 
     * 根据key从Activity中返回的Bundle中获取value 
     *  
     * @param key 
     * @param defValue 
     * @return 
     */  
    public static String getMetaDataStringFromActivity(String key, String defValue,Activity act) {  
        Bundle bundle = getActivityMetaDataBundle(act.getPackageManager(), act.getComponentName());  
        if (bundle != null && bundle.containsKey(key)) {  
            return bundle.getString(key);  
        }  
        return defValue;  
    }  
      
    /** 
     * 获取Activity中的meta-data
     *  
     * @param packageManager 
     * @param component 
     * @return 
     */  
    private static Bundle getActivityMetaDataBundle(PackageManager packageManager, ComponentName component) {  
        Bundle bundle = null;  
        try {  
            ActivityInfo ai = packageManager.getActivityInfo(component, PackageManager.GET_META_DATA);  
            bundle = ai.metaData;  
        } catch (NameNotFoundException e) {  
            Log.e("getMetaDataBundle", e.getMessage(), e);  
        }  
  
        return bundle;  
    }
    
    
    /** 
     * 根据key从Application中返回的Bundle中获取value 
     *  
     * @param key 
     * @param defValue 
     * @return 
     */  
    public static String getMetaDataStringApplication(String key, String defValue,Context act) {  
        Bundle bundle = getAppMetaDataBundle(act.getPackageManager(), act.getPackageName());  
        if (bundle != null && bundle.containsKey(key)) {  
            return bundle.getString(key);  
        }else{
        	return defValue;  
        }
    }  
    
    public static int getMetaDataStringApplicationNum(String key, int defValue,Context act) {  
        Bundle bundle = getAppMetaDataBundle(act.getPackageManager(), act.getPackageName());  
        if (bundle != null && bundle.containsKey(key)) {  
            return bundle.getInt(key);  
        }else{
        	return defValue;  
        }
    }  
      
    /** 
     * 获取Application中的meta-data. 
     *  
     * @param packageManager 
     * @param packageName 
     * @return 
     */  
    private static Bundle getAppMetaDataBundle(PackageManager packageManager, String packageName) {  
        Bundle bundle = null;  
        try {  
            ApplicationInfo ai = packageManager.getApplicationInfo(packageName, PackageManager.GET_META_DATA);  
            bundle = ai.metaData;  
        } catch (NameNotFoundException e) {  
            Log.e("getMetaDataBundle", e.getMessage(), e);  
        }  
        return bundle;  
    }  
    
	/**
	 * 时间:2012-12-17下午2:55:31<BR>
	 * 功能:获取运营商信息<BR>
	 * 返回值:int<BR>
	 * 1是移动，2是联通，3是电信
	 */
	public static int getProviders(Context c) {
		int ProvidersName = 0;
		try {
			TelephonyManager telephonyManager = (TelephonyManager) c
					.getSystemService(Context.TELEPHONY_SERVICE);
			String operator = telephonyManager.getSimOperator();
			if (operator == null || operator.equals("")) {
				operator = telephonyManager.getSubscriberId();
			}
			if (operator == null || operator.equals("")) {
				return validateMobile(c);
			}
			if (operator != null) {
				if (operator.startsWith("46000") || operator.startsWith("46002") || operator.startsWith("46007") || operator.startsWith("898600")) {
					ProvidersName = 1;
				} else if (operator.startsWith("46001") || operator.startsWith("898601")) {
					ProvidersName = 2;
				} else if (operator.startsWith("46003") || operator.startsWith("898602")) {
					ProvidersName = 3;
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return ProvidersName;
	}
	
	
	public static int validateMobile(Context c) {
		String mobile = getNativePhoneNumber(c);
		if (mobile.trim().length() != 11) {
			return 0;
		}
		if (mobile.trim().substring(0, 3).equals("134")
				|| mobile.trim().substring(0, 3).equals("135")
				|| mobile.trim().substring(0, 3).equals("136")
				|| mobile.trim().substring(0, 3).equals("137")
				|| mobile.trim().substring(0, 3).equals("138")
				|| mobile.trim().substring(0, 3).equals("139")
				|| mobile.trim().substring(0, 3).equals("182")
				|| mobile.trim().substring(0, 3).equals("150")
				|| mobile.trim().substring(0, 3).equals("151")
				|| mobile.trim().substring(0, 3).equals("152")
				|| mobile.trim().substring(0, 3).equals("157")
				|| mobile.trim().substring(0, 3).equals("158")
				|| mobile.trim().substring(0, 3).equals("159")
				|| mobile.trim().substring(0, 3).equals("187")
				|| mobile.trim().substring(0, 3).equals("188")) {
			return 1;
		} else if (mobile.trim().substring(0, 3).equals("130")
				|| mobile.trim().substring(0, 3).equals("131")
				|| mobile.trim().substring(0, 3).equals("132")
				|| mobile.trim().substring(0, 3).equals("156")
				|| mobile.trim().substring(0, 3).equals("185")
				|| mobile.trim().substring(0, 3).equals("186")) {
			return 2;
		} else if (mobile.trim().substring(0, 3).equals("133")
				|| mobile.trim().substring(0, 3).equals("153")
				|| mobile.trim().substring(0, 3).equals("180")
				|| mobile.trim().substring(0, 3).equals("189")) {
			return 3;
		}
		return 0;
	}
	/**
	 * * Role:获取当前设置的电话号码 * <BR>
	 * Date:2012-3-12 * <BR>
	 * 
	 * @author CODYY)peijiangping
	 */
	public static String getNativePhoneNumber(Context c) {
		TelephonyManager tm = (TelephonyManager)c.getSystemService(Context.TELEPHONY_SERVICE);
		int simState = tm.getSimState();
        if( simState ==TelephonyManager.SIM_STATE_READY ){
    		return tm.getLine1Number();
        }
        return "";
	}
	
	public static String getLocalMacAddress(Context context) {  
        WifiManager wifi = (WifiManager) context.getSystemService(Context.WIFI_SERVICE);  
        WifiInfo info = wifi.getConnectionInfo();  
        return info.getMacAddress();  
    }
	
	public static Point getScreenSize(Activity c){
		WindowManager windowManager = c.getWindowManager();    
        Display display = windowManager.getDefaultDisplay();
        Point size = new Point();
        display.getSize(size);
        return size;
	}
	
	
	public static String getNetType(Activity c){
		ConnectivityManager connectMgr = (ConnectivityManager) c.getSystemService(Context.CONNECTIVITY_SERVICE);
		NetworkInfo info = connectMgr.getActiveNetworkInfo();
		if (info==null) {
			return "";
		}
		if (info.getType() == ConnectivityManager.TYPE_WIFI) {
			return info.getTypeName();
		}else {
			return info.getSubtypeName();
		}
	}
	
	/**设备型号*/
	public static String getModel(){
	    String model = Build.MODEL;
	    return model;
	}
	
	
	public static int getVerCode(Context context){
		PackageInfo pi = getPackageInfo(context);
		if (pi!=null) {
			return pi.versionCode;
		}else{
			return 0;
		}
	}
	
	public static String getVerName(Context context){
		PackageInfo pi = getPackageInfo(context);
		if (pi!=null) {
			return pi.versionName;
		}else{
			return "";
		}
	}
	
	public static PackageInfo getPackageInfo(Context context){
		try {  
	        PackageInfo pi=context.getPackageManager().getPackageInfo(context.getPackageName(), 0);  
	        return pi;  
	    } catch (NameNotFoundException e) {  
	        // TODO Auto-generated catch block  
	        e.printStackTrace();  
	        return null;  
	    } 
	}
    
	/**
	 * 判断是否安装该应用
	 * @param context
	 * @param packageName
	 * @return
	 */
	public static boolean isAvilibleApp(Context context, String packageName) {
		final PackageManager packageManager = context.getPackageManager();// 获取packagemanager
		List<PackageInfo> pinfo = packageManager.getInstalledPackages(0);// 获取所有已安装程序的包信息
		List<String> pName = new ArrayList<String>();// 用于存储所有已安装程序的包名
		// 从pinfo中将包名字逐一取出，压入pName list中
		if (pinfo != null) {
			for (int i = 0; i < pinfo.size(); i++) {
				String pn = pinfo.get(i).packageName;
				pName.add(pn);
			}
		}
		return pName.contains(packageName);// 判断pName中是否有目标程序的包名，有TRUE，没有FALSE
	} 
}
