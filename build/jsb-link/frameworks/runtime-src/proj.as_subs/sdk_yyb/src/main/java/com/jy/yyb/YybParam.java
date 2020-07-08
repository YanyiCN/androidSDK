package com.jy.yyb;

import com.jy.common.constant.SdkType;
import com.jy.common.param.SdkParam;
import com.jy.common.param.SdkParamItem;

public class YybParam extends SdkParam{
	public YybParam() {
		super( SdkType.SDK_YYB,"1.5.9_6566cdf__2020_0227");
		setSdkProxyClass(YybProxy.class);
	}
	private SdkParamItem qqAppId=new SdkParamItem("QQAppId", "", "应用手Q编号,应用宝后台或商务获取", false);
	private SdkParamItem wxAppId=new SdkParamItem("WXAppId", "", "应用微信编号,应用宝后台或商务获取", false);
	private SdkParamItem loginType=new SdkParamItem("loginType", "1", "支持登录方式", false);
	private SdkParamItem midasOfferId=new SdkParamItem("米大师offerid", "", "", false);
	private SdkParamItem isRelease=new SdkParamItem("isRelease", "1", "沙盒环境0沙盒1发布 ", false);
	
	public SdkParamItem getQqAppId() {
		return qqAppId;
	}
	public void setQqAppId(SdkParamItem qqAppId) {
		this.qqAppId = qqAppId;
	}
	public SdkParamItem getWxAppId() {
		return wxAppId;
	}
	public void setWxAppId(SdkParamItem wxAppId) {
		this.wxAppId = wxAppId;
	}
	public SdkParamItem getMidasOfferId() {
		return midasOfferId;
	}
	public void setMidasOfferId(SdkParamItem midasOfferId) {
		this.midasOfferId = midasOfferId;
	}
	public SdkParamItem getLoginType() {
		return loginType;
	}
	public void setLoginType(SdkParamItem loginType) {
		this.loginType = loginType;
	}
	public SdkParamItem getIsRelease() {
		return isRelease;
	}
	public void setIsRelease(SdkParamItem isRelease) {
		this.isRelease = isRelease;
	}
}
