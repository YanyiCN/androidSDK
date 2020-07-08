package com.jy.sdks.vivo;

import com.jy.common.constant.SdkType;
import com.jy.common.param.SdkParam;
import com.jy.common.param.SdkParamItem;

public class VivoParam extends SdkParam{
	public VivoParam() {
		super( SdkType.SDK_VIVO, "online_4.5.0.1_2019.12.02");
		setSdkProxyClass(VivoProxy.class);
		setSdkAppliClass(VivoApp.class);
	}
	private SdkParamItem appId=new SdkParamItem("AppId", "", "应用编号,vivo后台或商务获取", false);
	private SdkParamItem cpId=new SdkParamItem("CPID", "", "应用支付编号,vivo后台或商务获取", false);
	private SdkParamItem cpKey=new SdkParamItem("CpKey", "", "应用支付秘钥,服务端使用,可通过vivo后台或商务获取", true);
	
	public SdkParamItem getAppId() {
		return appId;
	}
	public void setAppId(SdkParamItem appId) {
		this.appId = appId;
	}
	public SdkParamItem getCpId() {
		return cpId;
	}
	public void setCpId(SdkParamItem cpId) {
		this.cpId = cpId;
	}
	public SdkParamItem getCpKey() {
		return cpKey;
	}
	public void setCpKey(SdkParamItem cpKey) {
		this.cpKey = cpKey;
	}
	
	
	
}
