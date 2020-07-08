package com.jy.common.param;

import com.jy.common.base.ApplicationBase;
import com.jy.common.base.SlotSdkBase;
import com.jy.common.constant.SdkType;

public class SdkParam {
	private int sdkId;
	private SdkType sdkType;
	private String showName;
	private Class<? extends SlotSdkBase<?>> sdkProxyClass;
	private Class<? extends ApplicationBase<?>> sdkAppliClass;
	private String version;
	private int configId;
	
	public SdkParam() {
		
	}
	public SdkParam(SdkType sdkType,String version) {
		super();
		this.sdkId = sdkType.getSdkId();
		this.showName = sdkType.getName();
		this.sdkType = sdkType;
		this.version = version;
	}
	public int getSdkId() {
		return sdkId;
	}
	public void setSdkId(int sdkId) {
		this.sdkId = sdkId;
	}
	public String getShowName() {
		return showName;
	}
	public void setShowName(String showName) {
		this.showName = showName;
	}
	public Class<? extends SlotSdkBase<?>> getSdkProxyClass() {
		return sdkProxyClass;
	}
	public void setSdkProxyClass(Class<? extends SlotSdkBase<?>> sdkProxyClass) {
		this.sdkProxyClass = sdkProxyClass;
	}
	public Class<? extends ApplicationBase<?>> getSdkAppliClass() {
		return sdkAppliClass;
	}
	public void setSdkAppliClass(Class<? extends ApplicationBase<?>> sdkAppliClass) {
		this.sdkAppliClass = sdkAppliClass;
	}
	public String getVersion() {
		return version;
	}
	public void setVersion(String version) {
		this.version = version;
	}
	public int getConfigId() {
		return configId;
	}
	public void setConfigId(int configId) {
		this.configId = configId;
	}

	public SdkType getSdkType() {
		return sdkType;
	}

	public void setSdkType(SdkType sdkType) {
		this.sdkType = sdkType;
	}
}