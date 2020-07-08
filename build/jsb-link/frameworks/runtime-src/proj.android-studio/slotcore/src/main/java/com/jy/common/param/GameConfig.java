package com.jy.common.param;

import java.util.List;


public class GameConfig {
	private String groupId;
	private String groupKey;
	private String dcChannel;
	private int dcGameKindId;
	private String dcPriKey;
	private String dcHostUrl;
	private String talkingDataAppId;
	
	private String gameId;
	private String chId;
	private String diyChId;
	private String chDetailJson;
	private String serverHost;
	//增加logo的json字符串
	private List<SdkSplashItem> splashList;
	
	public String getTalkingDataAppId() {
		return talkingDataAppId;
	}
	public void setTalkingDataAppId(String talkingDataAppId) {
		this.talkingDataAppId = talkingDataAppId;
	}
	public String getDcHostUrl() {
		return dcHostUrl;
	}
	public void setDcHostUrl(String dcHostUrl) {
		this.dcHostUrl = dcHostUrl;
	}
	public List<SdkSplashItem> getSplashList() {
		return splashList;
	}
	public void setSplashList(List<SdkSplashItem> splashList) {
		this.splashList = splashList;
	}
	public void setServerHost(String serverHost) {
		this.serverHost = serverHost;
	}
	public String getServerHost() {
		return serverHost;
	}
	public String getGroupId() {
		return groupId;
	}
	public void setGroupId(String groupId) {
		this.groupId = groupId;
	}
	public String getGameId() {
		return gameId;
	}
	public void setGameId(String gameId) {
		this.gameId = gameId;
	}
	public String getChId() {
		return chId;
	}
	public void setChId(String chId) {
		this.chId = chId;
	}
	public String getChDetailJson() {
		return chDetailJson;
	}
	public void setChDetailJson(String chDetailJson) {
		this.chDetailJson = chDetailJson;
	}
	public String getDiyChId() {
		return diyChId;
	}
	public void setDiyChId(String diyChId) {
		this.diyChId = diyChId;
	}
	public String getGroupKey() {
		return groupKey;
	}
	public void setGroupKey(String groupKey) {
		this.groupKey = groupKey;
	}
	public String getDcChannel() {
		return dcChannel;
	}
	public void setDcChannel(String dcChannel) {
		this.dcChannel = dcChannel;
	}
	public int getDcGameKindId() {
		return dcGameKindId;
	}
	public void setDcGameKindId(int dcGameKindId) {
		this.dcGameKindId = dcGameKindId;
	}
	public String getDcPriKey() {
		return dcPriKey;
	}
	public void setDcPriKey(String dcPriKey) {
		this.dcPriKey = dcPriKey;
	}
}
