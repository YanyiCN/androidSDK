package com.jy.common.entry;

import com.jy.common.param.SdkFixPayItem;

public class ServerPayInfo {
	private UserPayInfo userPayReq;
	private String otherParam;
	private String slotOrderNum;
	private SdkFixPayItem fixPayItem;
	private GameInfo gameInfo;
	
	public GameInfo getGameInfo() {
		return gameInfo;
	}
	public void setGameInfo(GameInfo gameInfo) {
		this.gameInfo = gameInfo;
	}
	public UserPayInfo getUserPayReq() {
		return userPayReq;
	}
	public void setUserPayReq(UserPayInfo userPayReq) {
		this.userPayReq = userPayReq;
	}
	public String getOtherParam() {
		return otherParam;
	}
	public void setOtherParam(String otherParam) {
		this.otherParam = otherParam;
	}
	public String getSlotOrderNum() {
		return slotOrderNum;
	}
	public void setSlotOrderNum(String slotOrderNum) {
		this.slotOrderNum = slotOrderNum;
	}
	public SdkFixPayItem getFixPayItem() {
		return fixPayItem;
	}
	public void setFixPayItem(SdkFixPayItem fixPayItem) {
		this.fixPayItem = fixPayItem;
	}
	
}
