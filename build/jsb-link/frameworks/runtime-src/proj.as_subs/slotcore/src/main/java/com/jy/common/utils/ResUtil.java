package com.jy.common.utils;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;

import android.content.Context;
import android.content.res.AssetManager;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;

/**
 * 获取资源文件id工具
 * @author a
 *
 */
public class ResUtil {
	/**
	 * 获取layout资源id方法
	 * @param context 当前上下文
	 * @param idName 定义的id名
	 * @return
	 */
	public static int getLayoutId(Context context,String idName){
		return context.getResources().getIdentifier(idName, "layout", context.getPackageName());
	}
	/**
	 * 获取String资源id方法
	 * @param context
	 * @param idName
	 * @return
	 */
	public static int getStringId(Context context,String idName){
		return context.getResources().getIdentifier(idName, "string", context.getPackageName());
	}
	/**
	 * 获取drawable资源id方法
	 * @param context
	 * @param idName
	 * @return
	 */
	public static int getDrawableId(Context context,String idName){
		return context.getResources().getIdentifier(idName, "drawable", context.getPackageName());
	}
	/**
	 * 获取Style资源id方法
	 * @param context
	 * @param idName
	 * @return
	 */
	public static int getStyleId(Context context,String idName){
		return context.getResources().getIdentifier(idName, "style", context.getPackageName());
	}
	/**
	 * 获取view资源id方法
	 * @param context
	 * @param idName
	 * @return
	 */
	public static int getId(Context context,String idName){
		return context.getResources().getIdentifier(idName, "id", context.getPackageName());
	}
	/**
	 * 获取color资源id方法
	 * @param context
	 * @param idName
	 * @return
	 */
	public static int getColorId(Context context,String idName){
		return context.getResources().getIdentifier(idName, "color", context.getPackageName());
	}
	/**
	 * 获取Array资源id方法
	 * @param context
	 * @param idName
	 * @return
	 */
	public static int getArrayId(Context context,String idName){
		return context.getResources().getIdentifier(idName, "array", context.getPackageName());
	}
	/**
	 * 获取anim（动画）资源id方法
	 * @param context
	 * @param idName
	 * @return
	 */
	public static int getAnimId(Context context,String idName){
		return context.getResources().getIdentifier(idName, "anim", context.getPackageName());
	}
	
	
	/** 
	   * 从Assets中读取图片 
	   */  
	public static Bitmap getImageFromAssetsFile(Context context,String fileName)  
	  {  
	      Bitmap image = null;  
	      AssetManager am = context.getResources().getAssets();  
	      try  
	      {  
	          InputStream is = am.open(fileName);  
	          image = BitmapFactory.decodeStream(is);  
	          is.close();  
	      } catch (FileNotFoundException e){
	    	  System.out.println(e.getMessage());
	      } catch (IOException e){  
	          e.printStackTrace();  
	      }  
	  
	      return image;  
	  
	  }  
}
