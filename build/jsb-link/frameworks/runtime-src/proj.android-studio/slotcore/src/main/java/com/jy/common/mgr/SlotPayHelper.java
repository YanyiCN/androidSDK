package com.jy.common.mgr;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.Map;
import java.util.TreeMap;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.jy.common.constant.SlotInnerConst;
import com.jy.common.entry.ServerPayInfo;
import com.jy.common.entry.UserPayInfo;
import com.jy.common.param.SdkFixPayItem;
import com.jy.common.param.SdkParam;
import com.jy.common.utils.HttpHelper;
import com.jy.common.utils.SLog;
import com.jy.common.utils.SignatureUtil;
import com.jy.common.utils.StringUtils;

public class SlotPayHelper {
	public static ServerPayInfo getSlotOrder(UserPayInfo upi,int sdkId,String prePayOther,SdkParam sdkParam) throws UnsupportedEncodingException{
		String otherStr = "";
		if (prePayOther!=null) {
			otherStr = prePayOther;
		}
		
		int deviceType = 1;
		int price = upi.getPrice(); 
		int payType = sdkId;
		String groupId = SlotMgr.getInstance().getJtc().getGroupId();
		String merOrderId = upi.getOrderNum();
		String productName = StringUtils.isEmpty(upi.getProductName())?SlotInnerConst.PRODUCTNAME:upi.getProductName();
		String version = "1.1";
		String callbackUrl=upi.getCallbackUrl();
		String diyParam=upi.getExt();
		String other = otherStr;
		String gameId=SlotMgr.getInstance().getJtc().getGameId();
		String chId=SlotMgr.getInstance().getJtc().getChId();
		String sdkData = "";//SlotParamMgr.getInstance().getSdkEncDataMap().get(sdkId);
		if (sdkData==null) {
			sdkData="";
		}
		
		Map<String, String> map = new TreeMap<String, String>();
		map.put("deviceType", String.valueOf(deviceType));
		map.put("price", String.valueOf(price));
		map.put("payType", String.valueOf(payType));
		map.put("groupId", groupId);
		map.put("merOrderId", merOrderId);
		map.put("version", version);
		map.put("productName", productName);
		map.put("callbackUrl", callbackUrl);
		map.put("diyParam", diyParam);
		map.put("other", other);
		map.put("gameId", gameId);
		map.put("chId", chId);
		map.put("sdkData", sdkData);
		map.put("sign", SignatureUtil.getSign(map, SlotMgr.getInstance().getJtc().getGroupKey()));
		map.put("sdkData", URLEncoder.encode(sdkData,"utf-8"));
		String res = null;
		try {
			res = HttpHelper.URLPost(SlotInnerConst.URL_PRE_PAY, map);
		} catch (Exception e) {
			e.printStackTrace();
			throw new RuntimeException("您的网络不太好"); 
		}
		JSONObject jsonRes = JSONObject.parseObject(res);
		String otherParam = jsonRes.getString("otherParam");
		String ret = jsonRes.getString("ret");
		String msg = jsonRes.getString("msg");
		
		if (!ret.equals("0000")) {
			throw new RuntimeException(msg);
		}
		
//		String orderNum = jsonRes.getString("orderNum");
//		ServerPayInfo spi = new ServerPayInfo();
//		spi.setOtherParam(otherParam);
//		spi.setSlotOrderNum(orderNum);
//		spi.setUserPayReq(upi);
//		SdkFixPayItem sfpi = sdkParam.findFpi(upi.getPrice(), upi.getFixProductDiyId());
//		SLog.i("SdkFixPayItem : " +"自定义产品id:"+upi.getFixProductDiyId()+"金额为："+ sfpi);
//		spi.setFixPayItem(sfpi);
		return null;
	}
}
