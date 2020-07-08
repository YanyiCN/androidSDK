package com.jy.common.entry;

import java.io.Serializable;


public class GameInfo implements Serializable{
	private static final long serialVersionUID = 1L;
	private String userId;	 	//用户唯一id
	private String nickName; 	//用户昵称
	private String gold;	 	//用户金币
	private String dimen;	 	//用户钻石
	private String sex;			//用户性别
	
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getNickName() {
		return nickName;
	}
	public void setNickName(String nickName) {
		this.nickName = nickName;
	}
	public String getGold() {
		return gold;
	}
	public void setGold(String gold) {
		this.gold = gold;
	}
	public String getDimen() {
		return dimen;
	}
	public void setDimen(String dimen) {
		this.dimen = dimen;
	}
	public String getSex() {
		return sex;
	}
	public void setSex(String sex) {
		this.sex = sex;
	}
}
