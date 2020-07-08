package com.jy.common.param;

import java.util.Date;

public class LoginInfo {
	
	private String slotOpenid;
	private String slotToken;
	private String sdkOpenid;
	private String sdkParam;
	private Date loginTime;
	private int loginStatus;
	private int sdkId;
	private int childId;
	private String gameId;
	private String dataJson;
	public String getDataJson() {
		return dataJson;
	}
	public void setDataJson(String dataJson) {
		this.dataJson = dataJson;
	}
	public String getSlotOpenid() {
		return slotOpenid;
	}
	public void setSlotOpenid(String slotOpenid) {
		this.slotOpenid = slotOpenid;
	}
	public String getSlotToken() {
		return slotToken;
	}
	public void setSlotToken(String slotToken) {
		this.slotToken = slotToken;
	}
	public String getSdkOpenid() {
		return sdkOpenid;
	}
	public void setSdkOpenid(String sdkOpenid) {
		this.sdkOpenid = sdkOpenid;
	}
	public String getSdkParam() {
		return sdkParam;
	}
	public void setSdkParam(String sdkParam) {
		this.sdkParam = sdkParam;
	}
	public Date getLoginTime() {
		return loginTime;
	}
	public void setLoginTime(Date loginTime) {
		this.loginTime = loginTime;
	}
	public int getLoginStatus() {
		return loginStatus;
	}
	public void setLoginStatus(int loginStatus) {
		this.loginStatus = loginStatus;
	}
	public int getSdkId() {
		return sdkId;
	}
	public void setSdkId(int sdkId) {
		this.sdkId = sdkId;
	}
	public int getChildId() {
		return childId;
	}
	public void setChildId(int childId) {
		this.childId = childId;
	}
	public String getGameId() {
		return gameId;
	}
	public void setGameId(String gameId) {
		this.gameId = gameId;
	}
}
