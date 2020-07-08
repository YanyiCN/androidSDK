package com.jy.common.activity;

import com.jy.common.utils.AndroidUtil;
import com.jy.common.utils.CacheUtils;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.util.DisplayMetrics;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.ImageButton;
import android.widget.PopupWindow;

public class PerCheckActivity extends Activity {
	private boolean inited = false;
	private PopupWindow window;
	
	@Override
	public void onWindowFocusChanged(boolean hasFocus){
		if(hasFocus){
			if (inited) {
				return;
			}
			inited = true;
			
			String cacheStr = CacheUtils.getString(this, "jy_per_check");
			if (cacheStr!=null && cacheStr.length()>0) {
				this.goNextActive();
			}else{
				this.showPerWin();
			}
		}
	}
	
	private void goNextActive(){
		if(window!=null&&window.isShowing()){
			window.dismiss();
			window = null;
		}

		String jumpUrl = AndroidUtil.getMetaDataStringFromActivity("jy_main_class_name", null, this);
		
		CacheUtils.saveString(this, "jy_per_check", "pered");
		Intent intent = new Intent();   
		intent.setClassName(PerCheckActivity.this, jumpUrl);
//		intent.setClass(PerCheckActivity.this, MainActivity.class);


		finish();

		startActivity(intent);

	}
	

	private void showPerWin(){
		Activity CONTEXT = this;
		LayoutInflater inflater = (LayoutInflater) CONTEXT.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
	    View view = inflater.inflate(CONTEXT.getResources().getIdentifier("jy_per_check_pop", "layout", CONTEXT.getPackageName()), null);

	   int width = dip2px(CONTEXT, 397);
	   int height = dip2px(CONTEXT, 279);
	   
	   final String agreementUserUrl = AndroidUtil.getMetaDataStringFromActivity("jy_per_user_url", null, this);
	   final String agreementPriUrl = AndroidUtil.getMetaDataStringFromActivity("jy_per_pri_url", null, this);
	   
	   window = new PopupWindow(view, width, height, false);
	   
	    
	    ImageButton btnUser = (ImageButton) view.findViewById(CONTEXT.getResources().getIdentifier("btnUser", "id", CONTEXT.getPackageName()));
	    btnUser.setOnClickListener(new OnClickListener() {
			@Override
			public void onClick(View v) {
				Uri uri = Uri.parse(agreementUserUrl);
				Intent intent = new Intent(Intent.ACTION_VIEW, uri);
				startActivity(intent);
			}
		});
	    
	    ImageButton btnPri = (ImageButton) view.findViewById(CONTEXT.getResources().getIdentifier("btnPri", "id", CONTEXT.getPackageName()));
	    btnPri.setOnClickListener(new OnClickListener() {
			@Override
			public void onClick(View v) {
				Uri uri = Uri.parse(agreementPriUrl);
				Intent intent = new Intent(Intent.ACTION_VIEW, uri);
				startActivity(intent);
			}
		});
	    
	    ImageButton btnOk = (ImageButton) view.findViewById(CONTEXT.getResources().getIdentifier("btnOk", "id", CONTEXT.getPackageName()));
	    btnOk.setOnClickListener(new OnClickListener() {
			@Override
			public void onClick(View v) {
				goNextActive();
			}
		});

	    // 设置popWindow弹出窗体可点击，这句话必须添加，并且是true
	    window.setFocusable(false);
	    //
	    window.setOutsideTouchable(false);
	    // 在底部显示
	    DisplayMetrics dm = new DisplayMetrics();
	    CONTEXT.getWindowManager().getDefaultDisplay().getMetrics(dm);
	    window.showAtLocation(CONTEXT.getWindow().getDecorView(),Gravity.CENTER,0,0);
	   
	}
	
	/** 
     * 根据手机的分辨率从 dp 的单位 转成为 px(像素) 
     */  
    public static int dip2px(Context context, float dpValue) {  
        final float scale = context.getResources().getDisplayMetrics().density;  
        return (int) (dpValue * scale + 0.5f);  
    }
}
