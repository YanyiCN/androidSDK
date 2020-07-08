

package com.jy.common.constant;

import java.lang.reflect.Field;
import java.util.HashMap;
import java.util.Map;

public enum SdkType {
	// 这里ID最好和充值类型对应,好方便获取支付的参数
	//			  sdkId	 	名称		支付类型	账号类型	分享类型
//	SDK_IOS			(1,		"默往",			1,			8,		null),
	SDK_ALIPAY		(2,		"支付宝",		2,			null,	null),
	SDK_WX			(3,		"微信",			3,			null,	null),

	SDK_YYB			(5,		"应用宝",		5,			11,		null),
	SDK_XIAOMI		(6,		"小米",			6,			12,		null),
	SDK_OPPO		(7,		"oppo",			7,			13,		null),
	SDK_VIVO		(8,		"vivo",			8,			14,		null),
//	SDK_VIVO_SINGLE	(11,	"vivo单机",		11,			1,		null),
//	SDK_LENOVO_SGL	(12,	"lenovo单机",	12,			1,		null),
	SDK_HUAWEI		(13,	"华为",			13,			18,		null),
	SDK_BAIDU_SGL	(15,	"百度单机",		15,			15,		null),
	SDK_MEIZU		(16,	"魅族",			16,			17,		null),
	SDK_XIAN_LIAO	(17,	"闲聊",			null,		4,		null),
//	SDK_QH360		(18,	"qh360",		18,			1,		null),
//	SDK_MEIZU_SGL	(19,	"魅族单机",		19,			1,		null),
	SDK_DUO_LIAO	(22,	"多聊",			null,		6,		null),
	SDK_ALIGAME		(26,	"阿里游戏",		26,			23,		null),
	SDK_MOWANG		(27,	"默往",			null,		7,		1001),

	SDK_WX_SHARE	(1000,	"微信分享",		null,		2,		1000);

	private String name;
	private int sdkId;
	private Integer loginType;
	private Integer payType;
	private Integer shareType;

	private SdkType(int id, String name, Integer payType, Integer loginType, Integer shareType){
		this.sdkId = id;
		this.name = name;
		this.loginType = loginType;
		this.payType = payType;
		this.shareType = shareType;
	}
	
	
	private static Map<Integer, SdkType> idKeyMaps = null;
	private static Map<Integer, SdkType> payTypeKeyMaps = null;
	private static Map<Integer, SdkType> loginTypeKeyMaps = null;
	private static Map<Integer, SdkType> shareTypeKeyMaps = null;
	
	
	public static void init(){
		if (idKeyMaps!=null) {
			return;
		}
		Class<?> pidClass = SdkType.class;
		Field[] fields = pidClass.getFields();
		Map<Integer, SdkType> idTempMap = new HashMap<>();
		Map<Integer, SdkType> payTypeTempMap = new HashMap<>();
		Map<Integer, SdkType> loginTypeTempMap = new HashMap<>();
		Map<Integer, SdkType> shareTypeTempMap = new HashMap<>();
		for (int i = 0; i < fields.length; i++) {
			if (i>=SdkType.values().length){
				continue;
			}
			SdkType tempType= SdkType.values()[i];
			Integer idKey = tempType.getSdkId();
			Integer payTypeKey = tempType.getPayType();
			Integer loginTypeKey = tempType.getLoginType();
			Integer shareTypeKey = tempType.getShareType();
			if (payTypeKey!=null){
				payTypeTempMap.put(payTypeKey, tempType);
			}
			if (loginTypeKey!=null){
				loginTypeTempMap.put(loginTypeKey, tempType);
			}
			if (shareTypeKey!=null){
				shareTypeTempMap.put(shareTypeKey, tempType);
			}
			idTempMap.put(idKey, tempType);
		}
		idKeyMaps = idTempMap;
		payTypeKeyMaps = payTypeTempMap;
		loginTypeKeyMaps = loginTypeTempMap;
		shareTypeKeyMaps = shareTypeTempMap;
	}
	static {
		init();
	}
	public static SdkType findBySdkId(Integer id){
		return idKeyMaps.get(id);
	}
	public static SdkType findByPayType(Integer id){
		return payTypeKeyMaps.get(id);
	}
	public static SdkType findByLoginType(Integer id){
		return loginTypeKeyMaps.get(id);
	}
	public static SdkType findByShareType(Integer id){
		return shareTypeKeyMaps.get(id);
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getLoginType() {
		return loginType;
	}

	public void setLoginType(Integer loginType) {
		this.loginType = loginType;
	}

	public Integer getPayType() {
		return payType;
	}

	public void setPayType(Integer payType) {
		this.payType = payType;
	}

	public Integer getShareType() {
		return shareType;
	}

	public void setShareType(Integer shareType) {
		this.shareType = shareType;
	}

	public int getSdkId() {
		return sdkId;
	}

	public void setSdkId(int sdkId) {
		this.sdkId = sdkId;
	}
}
