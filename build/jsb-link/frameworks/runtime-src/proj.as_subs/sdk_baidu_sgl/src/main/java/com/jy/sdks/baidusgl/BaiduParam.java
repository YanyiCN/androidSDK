package com.jy.sdks.baidusgl;

import com.jy.common.constant.SdkType;
import com.jy.common.param.SdkParam;

public class BaiduParam extends SdkParam{
	public BaiduParam() {
		super(SdkType.SDK_BAIDU_SGL,"3.1.5_20190912");
		setSdkProxyClass(BaiduProxy.class);
		setSdkAppliClass(BaiduApp.class);
	}
}
