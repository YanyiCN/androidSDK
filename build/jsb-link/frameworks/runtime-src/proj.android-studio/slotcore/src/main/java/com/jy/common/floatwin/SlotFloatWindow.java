package com.jy.common.floatwin;

import java.lang.reflect.Field;
import java.lang.reflect.Method;

import com.jy.common.utils.ResUtil;
import com.jy.slotcore.R;

import android.content.Context;
import android.graphics.PixelFormat;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.MotionEvent;
import android.view.View;
import android.view.View.OnClickListener;
import android.view.View.OnTouchListener;
import android.view.ViewGroup;
import android.view.WindowManager;
import android.view.WindowManager.LayoutParams;
import android.widget.ImageButton;
import android.widget.LinearLayout;
import android.widget.RelativeLayout;
import android.widget.TextView;


public class SlotFloatWindow {
	private WindowManager mWindowManager;
	private ViewGroup mFloatLayout;
	private RelativeLayout mRuningContentLayout;
	private RelativeLayout mParamContentLayout;
	private LinearLayout mButtonLayout;
	private ImageButton runLogBtn;
	private ImageButton paramBtn;
	private ImageButton mFloatHandle;
	private TextView mTvRunLog;
	private TextView mTVParamLog;
	private WindowManager.LayoutParams wmParams;
	
	private float downX=0;
	private float downY=0;
	private float moveX=0;
	private float moveY=0;
	/**单例对象*/
	private static SlotFloatWindow instance;
	public static SlotFloatWindow getInstance(){
		if (instance==null) {
			instance = new SlotFloatWindow();
		}
		return instance;
	}
	
	public void initFloatWindow(final Context context) {
		mWindowManager = (WindowManager) context.getSystemService(Context.WINDOW_SERVICE);
		wmParams = new WindowManager.LayoutParams();
		wmParams.type = LayoutParams.TYPE_PHONE;
		wmParams.format = PixelFormat.RGBA_8888;
		wmParams.flags = LayoutParams.FLAG_NOT_FOCUSABLE;
		wmParams.gravity = Gravity.LEFT | Gravity.TOP;
		wmParams.x = 0;
		wmParams.y = 152;
		wmParams.width = WindowManager.LayoutParams.WRAP_CONTENT;
		wmParams.height = WindowManager.LayoutParams.WRAP_CONTENT;

		LayoutInflater inflater = LayoutInflater.from(context);
		mFloatLayout=(ViewGroup) inflater.inflate(ResUtil.getLayoutId(context, "slot_float_window"), null);
		//悬浮框
		mFloatHandle =(ImageButton) mFloatLayout.findViewById(ResUtil.getId(context, "float_handle"));
		mFloatHandle.setOnTouchListener(new OnTouchListener() {
			boolean isClick;

			@Override
			public boolean onTouch(View v, MotionEvent event) {
				
				switch (event.getAction()) {
				case MotionEvent.ACTION_DOWN:
					downX=event.getX();
					downY=event.getY();
					mFloatHandle.setBackgroundResource(ResUtil.getDrawableId(context, "float_bg_a"));
					isClick = false;
					break;
				case MotionEvent.ACTION_MOVE:
					
					//降低敏感度
					moveX=event.getX();
					moveY=event.getY();
					if (Math.abs(moveX - downX)> 50 || Math.abs(moveY - downY) > 50){
						wmParams.x = (int) event.getRawX()- mFloatHandle.getMeasuredWidth() / 2;
						wmParams.y = (int) event.getRawY()- mFloatHandle.getMeasuredHeight() / 2 - 75;
						mWindowManager.updateViewLayout(mFloatLayout, wmParams);
						isClick = true;
					}else{
						isClick=false;
					}
					return true;
				case MotionEvent.ACTION_UP:
					mFloatHandle.setBackgroundResource(R.drawable.float_bg_b);
					return isClick;
				default:
					break;
				}
				return false;
			}
		});
		
		/*********************运行时日志**********************/
		mRuningContentLayout=(RelativeLayout) mFloatLayout.findViewById(ResUtil.getId(context, "runingLog_content"));
		//运行日志按钮
		runLogBtn=(ImageButton) mFloatLayout.findViewById(ResUtil.getId(context, "btn_runing_log"));
		//设置点击事件
		runLogBtn.setOnClickListener(new OnClickListener() {
			@Override
			public void onClick(View v) {
				if (View.GONE==mRuningContentLayout.getVisibility()) {
					mRuningContentLayout.setVisibility(View.VISIBLE);
				}else {
					mRuningContentLayout.setVisibility(View.GONE);
				}
			}
		});
		mTvRunLog=(TextView) mFloatLayout.findViewById(ResUtil.getId(context,"tv_runinglog"));
		
		/*********************参数日志**********************/
		mParamContentLayout=(RelativeLayout) mFloatLayout.findViewById(ResUtil.getId(context, "paramLog_content"));
		//运行日志按钮
		paramBtn=(ImageButton) mFloatLayout.findViewById(ResUtil.getId(context, "btn_param_log"));
		//设置点击事件
		paramBtn.setOnClickListener(new OnClickListener() {
			@Override
			public void onClick(View v) {
				if (View.GONE==mParamContentLayout.getVisibility()) {
					mParamContentLayout.setVisibility(View.VISIBLE);
				}else {
					mParamContentLayout.setVisibility(View.GONE);
				}
				
			}
		});
		mTVParamLog=(TextView) mFloatLayout.findViewById(ResUtil.getId(context, "tv_paramlog"));
		//监听事件需要改到ImageButton		
		mFloatHandle.setOnClickListener(new OnClickListener() {
			@Override
			public void onClick(View v) {
				if (View.GONE==mParamContentLayout.getVisibility()) {  
					mParamContentLayout.setVisibility(View.VISIBLE);
				}else {
					mParamContentLayout.setVisibility(View.GONE);
				}
				
			}
		});
		
		/********************悬浮框**************************/
		mButtonLayout=(LinearLayout) mFloatLayout.findViewById(ResUtil.getId(context, "float_layout"));
		mFloatHandle.setOnClickListener(new OnClickListener() {
			@Override
			public void onClick(View v) {
				if (View.GONE==mButtonLayout.getVisibility()) {
					mButtonLayout.setVisibility(View.VISIBLE);
				}else {
					mButtonLayout.setVisibility(View.GONE);
					mRuningContentLayout.setVisibility(View.GONE);
					mParamContentLayout.setVisibility(View.GONE);
				}
			}
		});
	}
	
	public void openFloatWindow(){
		if (mWindowManager==null||mFloatLayout==null||wmParams==null) {
			return;
		}
		mWindowManager.addView(mFloatLayout, wmParams);
	}
	
	public void closeFloatWindow() {
		if (mWindowManager == null || mFloatLayout == null) {
			return;
		}
		mWindowManager.removeView(mFloatLayout);
	}
	/**
	 * 添加日志至运行时界面
	 * @param msg
	 */
	public void addTextToRunFloatWin(String msg){
		if (mTvRunLog!=null) {
			String txt=mTvRunLog.getText()+"\n"+msg;
			mTvRunLog.setText(txt);
		}
	}
	/**
	 * 添加日志至参数日志
	 * @param msg
	 */
	public void addTextToParamFloatWin(String msg){
		if (mTVParamLog!=null) {
			String txt=mTVParamLog.getText()+"\n"+msg;
			mTVParamLog.setText(txt);
		}
	}
	
	/**
	 * 获取类日志
	 * @param objclass
	 * @return
	 */
	public <T> String genGlobalTxt(Class<T> objclass,Object object){
		//加包名，VersionName;
		StringBuffer buffer=new StringBuffer();
		//反射当前类
		try {
			Class<?> obj=Class.forName(objclass.getName());
			@SuppressWarnings("unchecked")
			T t=(T)object;
			buffer.append("**********当前"+objclass.getName().substring(objclass.getName().lastIndexOf(".")+1)+"的参数为：\n");
			//获取所有自身定义的属性
			Field[] fields=obj.getDeclaredFields();
			for(Field f:fields){
				Method[] methods=obj.getDeclaredMethods();
				for(Method m:methods){
					if ("chDetailJson".equals(f.getName())) {
						continue;
					}
					if(m.getName().equalsIgnoreCase("get"+f.getName())){
						buffer.append("属性:"+f.getName()+"\t 值:"+m.invoke(t)+"\n");
					}
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return buffer.toString();
	}
	
	
	/**
	 * 获取类日志
	 * @param objclass
	 * @return
	 */
	public <T> String genSdkTxt(Class<T> objclass,Object object){
		//加包名，VersionName;
		StringBuffer buffer=new StringBuffer();
		//反射当前类
		try {
			Class<?> obj=Class.forName(objclass.getName());
			@SuppressWarnings("unchecked")
			T t=(T)object;
			buffer.append("**********当前"+objclass.getName().substring(objclass.getName().lastIndexOf(".")+1)+"的参数为：\n");
			//获取所有自身定义的属性
			Field[] fields=obj.getDeclaredFields();
			for(Field f:fields){
				Method[] methods=obj.getDeclaredMethods();
				for(Method m:methods){
					if(m.getName().equalsIgnoreCase("get"+f.getName())){
						buffer.append("属性:"+f.getName()+"\t 值:"+m.invoke(t)+"\n");
					}
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return buffer.toString();
	}
}
