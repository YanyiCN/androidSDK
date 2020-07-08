package com.jy.common.constant;
/**
 * 内部参数类
 * @author hulinyun
 *
 */
public class SlotInnerConst {
	//asset下json文件的文件名
	public static String PARAM_CONFIG_FILE="slot/slot.json";
	public static String PARAM_ECN_FILE="slot/slot_enc.json";
	//暂时没用到
	public static String PRE_PAY_URL="/order/submit";
	//主界面跳转meta_data
	public static String MAIN_ACTIVITY_META = "slot_main_act";
	//获取订单的url
	public static String URL_PRE_PAY ="";
	
	//商品名称
	public static String PRODUCTNAME="游戏道具";
	//商品描述
	public static String PRODUCTDES="这是一个游戏道具";
	
	/**
	 * 该渠道SDK支持的方式1：登陆 2：支付 3：分享
	 * @author a
	 *
	 */
	public static class SdkType{
		public static final int SDK_LOGIN=1;
		public static final int SDK_PAY=2;
		public static final int SDK_SHARE=3;
	}
	
	
	public static void init(String urlPrePay){
		URL_PRE_PAY = urlPrePay;
	}
	
	
	
}
