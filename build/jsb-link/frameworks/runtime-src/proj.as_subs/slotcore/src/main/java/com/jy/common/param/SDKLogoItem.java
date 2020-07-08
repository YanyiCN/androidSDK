package com.jy.common.param;

import android.graphics.Bitmap;
import android.widget.ImageView;
import android.widget.RelativeLayout;

public class SDKLogoItem {
	private Bitmap bitmap;
	private ImageView imageView;
	private RelativeLayout.LayoutParams layoutParams;
	public SDKLogoItem(Bitmap bitmap,ImageView imageView,RelativeLayout.LayoutParams layoutParams){
		this.bitmap=bitmap;
		this.imageView=imageView;
		this.layoutParams=layoutParams;
	}
	
	public RelativeLayout.LayoutParams getLayoutParams() {
		return layoutParams;
	}

	public void setLayoutParams(RelativeLayout.LayoutParams layoutParams) {
		this.layoutParams = layoutParams;
	}

	
	public Bitmap getBitmap() {
		return bitmap;
	}

	public void setBitmap(Bitmap bitmap) {
		this.bitmap = bitmap;
	}

	public ImageView getImageView() {
		return imageView;
	}
	public void setImageView(ImageView imageView) {
		this.imageView = imageView;
	}
	
	
}
