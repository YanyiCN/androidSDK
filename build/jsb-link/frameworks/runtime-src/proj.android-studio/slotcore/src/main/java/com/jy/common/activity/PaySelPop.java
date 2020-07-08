package com.jy.common.activity;

import java.util.List;

import com.jy.common.constant.SlotSdkId;
import com.jy.common.face.ISlotCallback;
import com.jy.common.face.ISlotPay;
import com.jy.common.utils.PixUtil;
import com.jy.common.utils.ResUtil;

import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.drawable.BitmapDrawable;
import android.graphics.drawable.Drawable;
import android.view.Gravity;
import android.view.View;
import android.view.View.OnClickListener;
import android.view.ViewGroup.LayoutParams;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.PopupWindow;
import android.widget.TextView;

/**
 * 支付选择框
 */
public class PaySelPop extends PopupWindow{
	private Context context;
	private ISlotCallback callback;
	private int iconCount=0;
	private LinearLayout lastLayout;
	private static int COL_MAX = 5;
	private View pop;
	@SuppressWarnings("deprecation")
	public PaySelPop(Context context,List<ISlotPay> listPay,ISlotCallback callback,View pop) {
		super(pop,LayoutParams.WRAP_CONTENT, LayoutParams.WRAP_CONTENT, true);
		this.context = context;
		this.callback = callback;
		this.pop = pop;
		this.setOutsideTouchable(true);
		this.setBackgroundDrawable(new BitmapDrawable());
		this.setTouchable(true);   
		this.setFocusable(true); 
		
		iconCount = 0;
		lastLayout = null;
		for (ISlotPay pay : listPay) {
			addIcon(pay.getSdkId());
		}
		if (iconCount<3) {
			int lastCount = 3-iconCount;
			for (int i = 0; i < lastCount; i++) {
				addIcon(null);
			}
		}
		this.showAtLocation(pop, Gravity.CENTER, 0, 0);
	}
	
	
	private void addIcon(SlotSdkId payId){
		if (iconCount%COL_MAX==0) {
			//新的一行
			lastLayout =addLine();
		}
		
		//图片的布局参数
		LinearLayout.LayoutParams imgParams=new LinearLayout.LayoutParams(PixUtil.dip2px(context, 70), PixUtil.dip2px(context, 70), 1);
		imgParams.leftMargin=PixUtil.dip2px(context, 7);
		imgParams.rightMargin=PixUtil.dip2px(context, 7);
		imgParams.topMargin=PixUtil.dip2px(context, 7);
		imgParams.bottomMargin=PixUtil.dip2px(context, 7);
		View btn = null;
		
		if (payId!=null) {
			Bitmap bmp = ResUtil.getImageFromAssetsFile(context, "slot_icons/slot_"+payId.getId()+".png");
			if (bmp!=null) {
				@SuppressWarnings("deprecation")
				Drawable drawable=new BitmapDrawable(bmp);
				
				btn=new ImageButton(context);
				btn.setLayoutParams(imgParams);
				btn.setBackground(drawable);
			}else{
				Drawable drawable=context.getResources().getDrawable(ResUtil.getDrawableId(context, "slot_unknown"));
				
				LinearLayout btnFrame =new LinearLayout(context);
				btnFrame.setLayoutParams(imgParams);
				btnFrame.setBackground(drawable);
				btnFrame.setGravity(Gravity.CENTER_HORIZONTAL);
				
				TextView txtName = new TextView(context);
				txtName.setPadding(0, PixUtil.dip2px(context, 52), 0, 0);
				txtName.setText(payId.getName());
				txtName.setTextColor(ResUtil.getColorId(context, "solt_ColorDarkGray"));
				txtName.setTextSize(10);
				btnFrame.addView(txtName);
				btn = btnFrame;
			}
			lastLayout.addView(btn);
			//添加触发器
			btn.setTag(payId.getId());
			btn.setOnClickListener(new OnClickListener() {
				@Override
				public void onClick(View v) {
					PaySelPop.this.dismiss();
					callback.onCallback((Integer)v.getTag(),null, "点击");
				}
			});
		}else{
			btn=new ImageView(context);
			btn.setLayoutParams(imgParams);
			lastLayout.addView(btn);
		}
		
		
		iconCount++;
	}
	/**
	 * 加入一行
	 * @param context
	 * @return
	 */
	private LinearLayout addLine(){
		//属性
		LinearLayout.LayoutParams lineParam=new LinearLayout.LayoutParams(LinearLayout.LayoutParams.WRAP_CONTENT,LinearLayout.LayoutParams.WRAP_CONTENT);
		//主体
		LinearLayout parentLayout= new LinearLayout(context);
		parentLayout.setLayoutParams(lineParam);
		parentLayout.setOrientation(LinearLayout.HORIZONTAL);
		
		LinearLayout allLines = (LinearLayout) pop.findViewById(ResUtil.getId(context, "slot_all"));// 加载布局  
		allLines.addView(parentLayout);
		return parentLayout;
	}
}
