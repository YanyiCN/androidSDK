package com.jy.common.utils;

import android.content.Context;
import android.content.SharedPreferences;

/**
 * 缓工具类：
 * 得到资源后   资源，进行本地缓存：
 */
public class CacheUtils {
    //得到String类型数据：
    public static String getString(Context context, String key) {
        SharedPreferences sp=context.getSharedPreferences("jy_cache",Context.MODE_PRIVATE);
        return sp.getString(key,"");
    }
 
    //保存String类型数据：
    public static void saveString(Context context, String key,String value) {
        //得到String类型数据：
        SharedPreferences sp=context.getSharedPreferences("jy_cache",Context.MODE_PRIVATE);
        sp.edit().putString(key,value).commit();
    }
}