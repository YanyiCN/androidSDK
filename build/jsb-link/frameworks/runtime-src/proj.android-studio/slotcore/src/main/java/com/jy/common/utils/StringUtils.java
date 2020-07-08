package com.jy.common.utils;

public class StringUtils {
	public static boolean isEmpty(String str){
		if (str==null || str.length()<=0) {
			return true;
		}
		return false;
	}
	
	public static boolean isNotEmpty(String str){
		return !isEmpty(str);
	}
}
