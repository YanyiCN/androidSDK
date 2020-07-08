package com.jy.common.param;


public class SdkFixPayItem {
	private String diyId;
	private int price;
	private String productCode;
	public String getDiyId() {
		return diyId;
	}
	public void setDiyId(String diyId) {
		this.diyId = diyId;
	}
	public int getPrice() {
		return price;
	}
	public void setPrice(int price) {
		this.price = price;
	}
	public String getProductCode() {
		return productCode;
	}
	public void setProductCode(String productCode) {
		this.productCode = productCode;
	}
	
	@Override
	public String toString() {
		return "diyId["+diyId+"],price["+price+"],productCode["+productCode+"]";
	}
	
}
