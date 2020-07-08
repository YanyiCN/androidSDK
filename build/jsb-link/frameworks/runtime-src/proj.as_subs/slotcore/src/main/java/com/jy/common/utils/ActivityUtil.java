package com.jy.common.utils;

import java.util.List;

import com.jy.common.param.SDKLogoItem;
import com.jy.common.param.SdkSplashItem;

import android.app.Activity;
import android.app.Dialog;
import android.content.Context;
import android.content.res.AssetManager;
import android.graphics.Bitmap;
import android.graphics.drawable.AnimationDrawable;
import android.graphics.drawable.Drawable;
import android.os.Handler;
import android.os.Message;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.view.animation.Animation;
import android.view.animation.AnimationUtils;
import android.widget.FrameLayout;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.RelativeLayout;
import android.widget.TextView;

public class ActivityUtil {
	
	private static AnimationDrawable anim;
	
	/**
	 * 创建对话框
	 * @param context
	 * @param msg
	 * @return
	 */
	public static Dialog createLoadingDialog(Context context, String msg) {  
		  
        LayoutInflater inflater = LayoutInflater.from(context);  
        View v = inflater.inflate(ResUtil.getLayoutId(context, "slot_loading_dialog"), null);// 得到加载view
        v.getBackground().setAlpha(75);//设置背景透明度
        LinearLayout layout = (LinearLayout) v.findViewById(ResUtil.getId(context, "slot_loading_linear"));// 加载布局  
        // main.xml中的ImageView  
        ImageView spaceshipImage = (ImageView) v.findViewById(ResUtil.getId(context, "slot_bar"));  
        TextView tipTextView = (TextView) v.findViewById(ResUtil.getId(context, "slot_txt"));// 提示文字  
        // 加载动画  
        Animation hyperspaceJumpAnimation = AnimationUtils.loadAnimation(  
                context, ResUtil.getAnimId(context, "slot_loading_animation"));  
        // 使用ImageView显示动画  
        spaceshipImage.startAnimation(hyperspaceJumpAnimation);  
        tipTextView.setText(msg);// 设置加载信息  
  
        Dialog loadingDialog = new Dialog(context,ResUtil.getStyleId(context, "slot_loading_dialog"));// 创建自定义样式dialog  
  
        loadingDialog.setCancelable(false);// 不可以用“返回键”取消  
        loadingDialog.setContentView(layout, new LinearLayout.LayoutParams(  
                LinearLayout.LayoutParams.MATCH_PARENT,  
                LinearLayout.LayoutParams.MATCH_PARENT));// 设置布局  
        loadingDialog.show();
        return loadingDialog;  
    }  
	
	/**
	 * 设置闪屏logo
	 * @param context
	 * @param bitmap
	 * @param isFullScreen
	 */
	public static AnimationDrawable setLogo(Activity context,List<SdkSplashItem> splishList){
		if(splishList.size()==0){
			SLog.i("图片不存在");	 
		}
		//相对布局
		RelativeLayout layout=(RelativeLayout)context.findViewById(ResUtil.getId(context, "slot_logorootLayout"));
		FrameLayout.LayoutParams params=new FrameLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT,ViewGroup.LayoutParams.MATCH_PARENT);
		layout.setLayoutParams(params);
		//满屏
		ImageView imgFull=new ImageView(context);
		imgFull.setLayoutParams(params);
		//小屏幕
		RelativeLayout.LayoutParams imgParams=new RelativeLayout.LayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT,ViewGroup.LayoutParams.WRAP_CONTENT);
		imgParams.addRule(RelativeLayout.CENTER_IN_PARENT);
		//设置图片资源
		//imgMin.setLayoutParams(imgParams);
		
//		try {
//			if(isFullScreen){
//				imgFull.setLayoutParams(params);
//			}
//			else{
//				imgFull.setLayoutParams(imgParams);
//			}
//		} catch (Exception e) {
//			SLog.i("未设置闪屏显示方式（全屏or包裹）");
//		}
		
		
		//AnimationDrawable anim=new AnimationDrawable();
		SLog.i(splishList.size()+"");
		AssetManager am=context.getAssets();
		Drawable drawable=null;
		for(SdkSplashItem ssi:splishList){
			if(anim!=null&&anim.isRunning()){
				anim.stop();
			}
			drawable=FileUtil.getDrawableFromAssets(am, ssi.getFilePath());
			SLog.i("图片已经获取"+drawable);
			anim=new AnimationDrawable();
			anim.addFrame(drawable, ssi.getDelayTIme());
			SLog.i("增加了一张图片");
			
			if("center".equals(ssi.getLoc())){
				imgFull.setLayoutParams(imgParams);
				imgFull.setBackground(anim);
				anim.start();
			}
			else if("stretch".equals(ssi.getLoc())){
				imgFull.setLayoutParams(params);
				imgFull.setBackground(anim);
				anim.start();
			}
			else{
				SLog.i("未设置闪屏显示方式（全屏or包裹）");
			}
			
		}
		layout.addView(imgFull);
		
		anim.setOneShot(true);
		//anim.start();
		SLog.i("闪屏完成");
		return anim;
	}
	
	
	
	public static void setLogo(Activity context,Handler handler,List<SdkSplashItem> splishList){
		if(splishList.size()==0){
			SLog.i("图片不存在");	 
		}
		//相对布局
		RelativeLayout layout=(RelativeLayout)context.findViewById(ResUtil.getId(context, "slot_logorootLayout"));
		FrameLayout.LayoutParams params=new FrameLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT,ViewGroup.LayoutParams.MATCH_PARENT);
		layout.setLayoutParams(params);
		//满屏
		ImageView imgFull=new ImageView(context);
		RelativeLayout.LayoutParams imgParamsFull=new RelativeLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT,ViewGroup.LayoutParams.MATCH_PARENT);
		//小屏幕
		RelativeLayout.LayoutParams imgParamsSmall=new RelativeLayout.LayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT,ViewGroup.LayoutParams.WRAP_CONTENT);
		imgParamsSmall.addRule(RelativeLayout.CENTER_IN_PARENT);
		
		AssetManager am=context.getAssets();
		//Drawable drawable=null;
		Bitmap bitmap=null;
		imgFull.setLayoutParams(params);
		int delayTime=0;
		for(SdkSplashItem ssi:splishList){
			//drawable=FileUtil.getDrawableFromAssets(am, ssi.getFilePath());
			bitmap=FileUtil.getPicFromAssets(am, ssi.getFilePath());
			SLog.i("图片已经获取"+bitmap);
			if("center".equals(ssi.getLoc())){
				Message msg=new Message();
				msg.what=1;
				msg.obj=new SDKLogoItem(bitmap,imgFull,imgParamsSmall);
				handler.sendMessageDelayed(msg, delayTime);
				delayTime+=ssi.getDelayTIme();
			}
			else if("stretch".equals(ssi.getLoc())){
				Message msg=new Message();
				msg.what=1;
				msg.obj=new SDKLogoItem(bitmap,imgFull,imgParamsFull);
				handler.sendMessageDelayed(msg, delayTime);
				delayTime+=ssi.getDelayTIme();
			}
			else{
				SLog.i("未设置闪屏显示方式（全屏or包裹）");
			}
			
		}
		layout.addView(imgFull);
	}
	
}
