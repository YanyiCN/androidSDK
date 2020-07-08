package com.jy.common.param;

public class SdkParamItem {
	private String showName;
	private String value;
	private String desc;
	private boolean isServer;
	private boolean noEdit;
	
	public SdkParamItem() {
		super();
	}
	

	public SdkParamItem(String showName, String value, String desc, boolean isServer) {
		super();
		this.showName = showName;
		this.value = value;
		this.desc = desc;
		this.isServer = isServer;
		this.noEdit = false;
	}
	public SdkParamItem(String showName, String value, String desc, boolean isServer,boolean noEdit) {
		super();
		this.showName = showName;
		this.value = value;
		this.desc = desc;
		this.isServer = isServer;
		this.noEdit = noEdit;
	}
	public String getShowName() {
		return showName;
	}
	public void setShowName(String showName) {
		this.showName = showName;
	}
	public String getValue() {
		return value;
	}
	public void setValue(String value) {
		this.value = value;
	}
	public String getDesc() {
		return desc;
	}
	public void setDesc(String desc) {
		this.desc = desc;
	}
	public boolean isServer() {
		return isServer;
	}
	public void setServer(boolean isServer) {
		this.isServer = isServer;
	}
	public boolean isNoEdit() {
		return noEdit;
	}
	public void setNoEdit(boolean noEdit) {
		this.noEdit = noEdit;
	}
}
