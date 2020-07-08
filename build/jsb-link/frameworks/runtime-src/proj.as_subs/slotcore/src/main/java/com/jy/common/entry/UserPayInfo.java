package com.jy.common.entry;

public class UserPayInfo {
	private int 	price=0;
	private int 	count=1;
	private String 	productName="";
	private String	fixProductDiyId="";
	private String  callbackUrl="";
	private String  orderNum="";
	private String  ext="";
	
	public int getPrice() {
		return price;
	}
	public void setPrice(int price) {
		this.price = price;
	}
	public int getCount() {
		return count;
	}
	public void setCount(int count) {
		this.count = count;
	}
	public String getProductName() {
		return productName;
	}
	public void setProductName(String productName) {
		this.productName = productName;
	}
	public String getFixProductDiyId() {
		return fixProductDiyId;
	}
	public void setFixProductDiyId(String fixProductDiyId) {
		this.fixProductDiyId = fixProductDiyId;
	}
	public String getOrderNum() {
		return orderNum;
	}
	public void setOrderNum(String orderNum) {
		this.orderNum = orderNum;
	}
	public String getExt() {
		return ext;
	}
	public void setExt(String ext) {
		this.ext = ext;
	}
	public String getCallbackUrl() {
		return callbackUrl;
	}
	public void setCallbackUrl(String callbackUrl) {
		this.callbackUrl = callbackUrl;
	}
	
	
}
