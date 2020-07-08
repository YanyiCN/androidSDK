package com.jy.common.utils;

import java.io.InputStream;


import android.content.res.AssetManager;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.drawable.Drawable;

public class FileUtil {
	/**
	 * 从assets中读取字符串
	 * @param assetManager
	 * @param fileName
	 * @return
	 */
	public static String getFromAssets(AssetManager assetManager,String fileName){
		String result = "";
		try {
			InputStream in = assetManager.open(fileName);
			// 获取文件的字节数
			int lenght = in.available();
			// 创建byte数组
			byte[] buffer = new byte[lenght];
			// 将文件中的数据读到byte数组中
			in.read(buffer);
			result = new String(buffer, "utf-8");
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}
	/**
	 * 从asset中获取bitmap图片
	 * @param assetManager
	 * @param fileName
	 * @return bitMap
	 */
	public static Bitmap getPicFromAssets(AssetManager assetManager,String fileName){
		Bitmap bitmap=null;
		try {
			InputStream in = assetManager.open(fileName);
			if(in==null){
				SLog.i("找不到图片资源");
			}
			bitmap = BitmapFactory.decodeStream(in);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return bitmap;
	}
	/**
	 * 从asset中获取drawable图片
	 * @param assetManager
	 * @param fileName
	 * @return
	 */
	public static Drawable getDrawableFromAssets(AssetManager assetManager,String fileName){
		Drawable drawable=null;
		try {
			InputStream in = assetManager.open(fileName);
			if(in==null){
				SLog.i("找不到图片资源");
			}
			drawable = Drawable.createFromStream(in, fileName);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return drawable;
	}
}
