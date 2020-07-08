package com.jy.common.constant;

/**
 * 回掉参数类
 * @author hulinyun
 *
 */
public class SlotConst {
	public static class GlobalType{
		public static int WX_START_MSG = 1;
		public static int LOG_OUT = 2;
	}
	//登陆回调
	public static class LoginRetType{
		public static int LOGIN_SUC=1;
		public static int LOGIN_FAIL=2;
	}
	//登出回调
	public static class LogoutRetType{
		public static int LOGOUT_SUC=1;
		public static int LOGOUT_FAIL=2;
	}
	//支付回调
	public static class PayRet{
		public static int PAY_FAIL=0;
		public static int PAY_SUC=1;
		public static int PAY_CANCEL=2;
		public static int PAY_ING=3;
	}
	//分享回调
	public static class ShareRetType{
		public static int SHARE_SUC=1;
		public static int SHARE_FAIL=2;
		public static int SHARE_CANCEL=3;
	}
}
