package com.jy.sdks.ali;

import com.jy.common.constant.SdkType;
import com.jy.common.param.SdkParam;
import com.jy.common.param.SdkParamItem;

public class AlipayParam extends SdkParam{
	public AlipayParam() {
		super(SdkType.SDK_ALIPAY,"v15.6.8");
		setSdkProxyClass(AlipayProxy.class);
	}
	private SdkParamItem merMail=new SdkParamItem("商户邮箱", "", "商户号注册邮箱", true);
	private SdkParamItem merId=new SdkParamItem("商户编号", "", "", true);
	private SdkParamItem pubKey=new SdkParamItem("公钥", "", "公钥字符串", true);
	private SdkParamItem priKey=new SdkParamItem("私钥", "", "私钥字符串", true);
	private SdkParamItem callback=new SdkParamItem("回调地址", "/order/aliCallback", "", true,true);
	public SdkParamItem getMerMail() {
		return merMail;
	}
	public void setMerMail(SdkParamItem merMail) {
		this.merMail = merMail;
	}
	public SdkParamItem getMerId() {
		return merId;
	}
	public void setMerId(SdkParamItem merId) {
		this.merId = merId;
	}
	public SdkParamItem getPubKey() {
		return pubKey;
	}
	public void setPubKey(SdkParamItem pubKey) {
		this.pubKey = pubKey;
	}
	public SdkParamItem getPriKey() {
		return priKey;
	}
	public void setPriKey(SdkParamItem priKey) {
		this.priKey = priKey;
	}
	public SdkParamItem getCallback() {
		return callback;
	}
	public void setCallback(SdkParamItem callback) {
		this.callback = callback;
	}
	
}
