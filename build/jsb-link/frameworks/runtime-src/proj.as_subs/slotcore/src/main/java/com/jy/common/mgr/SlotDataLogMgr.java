package com.jy.common.mgr;

import java.util.HashMap;
import java.util.Map;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.jy.common.utils.AndroidUtil;
import com.jy.common.utils.HttpHelper;
import com.jy.common.utils.SLog;
import com.jy.common.utils.SignatureUtil;
import com.jy.common.utils.StringUtils;

import android.graphics.Point;

public class SlotDataLogMgr {
	private static String URL_DC_HOST ;
	private static String URL_DC_LOGIN_LOG;
	private static String URL_DC_LOGIN_LOG_UPDATE;
	private static String URL_DC_PAY_LOG;
	private static String URL_DC_STARTUP_LOG;
	
	/** 保存的登陆的ID,更新状态用*/
	private String loginId = "";
	private long loginStateLastTime=0;
	
	/**单例对象*/
	private static SlotDataLogMgr instance;
	public static SlotDataLogMgr getIns(){
		if (instance==null) {
			instance = new SlotDataLogMgr();
		}
		return instance;
	}
	
	public static void initUrl(String dcHost){
		URL_DC_HOST = dcHost;
		URL_DC_LOGIN_LOG 			= URL_DC_HOST+"log/loginLog";
		URL_DC_LOGIN_LOG_UPDATE 	= URL_DC_HOST+"log/loginState";
		URL_DC_PAY_LOG 				= URL_DC_HOST+"log/payLog";
		URL_DC_STARTUP_LOG			= URL_DC_HOST+"log/startupLog";
	}
	
	protected SlotDataLogMgr(){
		//开启线程  每隔一段时间更新在线状态
		new Thread(new Runnable() {
			@Override
			public void run() {
				while(true){
					if (StringUtils.isNotEmpty(loginId)) {
						if (System.currentTimeMillis() - loginStateLastTime > 20 * 1000) {
							loginStateLastTime = System.currentTimeMillis();
							try {
								sendUpdateLogin();
							} catch (Exception e) {
								SLog.i("dataCenter","sendUpdateLogin fail,"+e.getMessage());
								e.printStackTrace();
							}
						}
						try {
							Thread.sleep(2000);
						} catch (InterruptedException e) {
							e.printStackTrace();
						}
					}
				}
			}
		}).start();
	}
	
	
	
	/**发送用户登陆
	 * 
	 * @param userId 	用户唯一编号
	 * @param userMoney 用户货币剩余量
	 * @param userLv 	用户等级
	 * @param gameVer 	游戏版本
	 */
	public void sendLoginLog(final String userId,final int userMoney,final int userLv,final String gameVer){
		try {
    		//talkingData登录统计
//			TDGAAccount account = TDGAAccount.setAccount(userId);
//			account.setAccountType(TDGAAccount.AccountType.ANONYMOUS);
//			account.setLevel(userLv);
		} catch (Exception e) {
			e.printStackTrace();
			SLog.i("Talking Data sendLoginLog : "+e.getMessage());
		}
		
		new Thread(new Runnable() {
			@Override
			public void run() {
				try {
					sendLoginLogTrue(userId, userMoney, userLv, gameVer);
				} catch (Exception e) {
					e.printStackTrace();
					SLog.i("sendLoginLog : "+e.getMessage());
				}
			}
		}).start();
	}
	
	private void sendLoginLogTrue(String userId,int userMoney,int userLv,String gameVer){
		Point size = AndroidUtil.getScreenSize(SlotMgr.getInstance().getCtx());
		String mac = getSimMac(AndroidUtil.getLocalMacAddress(SlotMgr.getInstance().getCtx()));
		String netName = AndroidUtil.getNetType(SlotMgr.getInstance().getCtx());
		String kindId = SlotMgr.getInstance().getJtc().getDcGameKindId()+"";
		String channel = SlotMgr.getInstance().getJtc().getDcChannel();
		Map<String, String> params = new HashMap<String, String>();
		
		
//		params.put("logIp",kindId);//	记录IP
//		params.put("logTime",kindId);//	记录时间
		params.put("gameKind",kindId);//	游戏编号
		params.put("gameVer",gameVer);//	游戏版本
		params.put("gameCh",channel);//	游戏渠道
		params.put("deviceNum",mac);//	设备编号
		params.put("deviceSys","android");//	设备系统
		params.put("deviceNet",netName);//	设备网络
		params.put("deviceResolution",size.x+"x"+size.y);//	设备分辨率
		params.put("deviceName",AndroidUtil.getModel());//	设备名称 
		params.put("userId",userId);//	用户唯一编号
		params.put("userLv",userLv+"");//	用户等级
		params.put("userMoney",userMoney+"");//	用户游戏币
		
		params.put("sign",SignatureUtil.getSign(params, SlotMgr.getInstance().getJtc().getDcPriKey()));		//	string	64	是	请参阅签名规则 签名

		String resJson  = HttpHelper.URLPost(URL_DC_LOGIN_LOG, params);
		JSONObject json = JSON.parseObject(resJson);
		if (json.getString("ret").equals("S")) {
			loginId = json.getString("loginId");
			SLog.i("dataCenter", "sendLoginLog suc,loginId:"+loginId);
		}else{
			SLog.i("dataCenter", "sendLoginLog fail:"+json.getString("msg"));
		}
	}
	
	private void sendUpdateLogin(){
		String kindId = SlotMgr.getInstance().getJtc().getDcGameKindId()+"";
		
		Map<String, String> params = new HashMap<String, String>();
		params.put("gameKind",kindId);//	游戏ID
		params.put("loginId",loginId);//	登录编号
//		params.put("logLastActiveTime","");//	最后活动时间
		params.put("sign",SignatureUtil.getSign(params, SlotMgr.getInstance().getJtc().getDcPriKey()));							//	string	64	是	请参阅签名规则  签名

		String resJson  = HttpHelper.URLPost(URL_DC_LOGIN_LOG_UPDATE, params);
		JSONObject json = JSON.parseObject(resJson);
		if (!json.getString("ret").equals("S")) {
			SLog.i("dataCenter", "sendUpdateLogin suc");
		}else{
			SLog.i("dataCenter", "sendUpdateLogin fail:"+json.getString("msg"));
		}
	}
	
	/**
	 * 支付日志
	 * @param userId 	用户唯一编号
	 * @param userMoney 用户货币剩余量
	 * @param userLv 	用户等级
	 * @param gameVer 	游戏版本
	 * @param orderId	订单编号
	 * @param orderPayType	订单编号
	 * @param orderPrice 订单金额(分)
	 * @param orderGetType 订单获得的商品名称（比如“金币”、“元宝”、“飞天战衣”）
	 * @param orderGetCount 订单获得道具数量
	 */
	public void sendPayLog(
			final String userId,
			final int userMoney,
			final int userLv,
			final String gameVer,
			final String orderId,
			final String orderPayType,
			final int orderPrice,
			final String orderGetType,
			final int orderGetCount){
		try {
//			TDGAVirtualCurrency.onChargeSuccess(orderId);
		} catch (Exception e) {
			e.printStackTrace();
			SLog.i("Talking Data sendPayLog : "+e.getMessage());
		}
		new Thread(new Runnable() {
			@Override
			public void run() {
				try {
					sendPayLogTrue(userId, userMoney, userLv, gameVer, orderId, orderPayType ,orderPrice, orderGetType, orderGetCount);
				} catch (Exception e) {
					e.printStackTrace();
					SLog.i("sendPayLog : "+e.getMessage());
				}
			}
		}).start();
		
	}
	
	
	/**启动日志
	 * 
	 * @param gameVer 游戏版本
	 */
	public void sendStartupLog(final String gameVer){
		new Thread(new Runnable() {
			@Override
			public void run() {
				try {
					sendStartupLogTrue(gameVer);
				} catch (Exception e) {
					e.printStackTrace();
					SLog.i("sendStartupLog : "+e.getMessage());
				}
			}
		}).start();
		
	}
	
	private void sendStartupLogTrue(String gameVer){
		Point size = AndroidUtil.getScreenSize(SlotMgr.getInstance().getCtx());
		String mac = getSimMac(AndroidUtil.getLocalMacAddress(SlotMgr.getInstance().getCtx()));
		String netName = AndroidUtil.getNetType(SlotMgr.getInstance().getCtx());
		String kindId = SlotMgr.getInstance().getJtc().getDcGameKindId()+"";
		String channel = SlotMgr.getInstance().getJtc().getDcChannel();
		
		Map<String, String> params = new HashMap<String, String>();
		
//		params.put("logIp",  );	//记录IP
//		params.put("logTime",  );	//	记录时间
		
		
//		params.put("logIp",  );	//	记录IP
//		params.put("logTime",  );	//	记录时间
		params.put("gameKind", kindId );	//	游戏编号
		params.put("gameVer",  gameVer);	//	游戏版本
		params.put("gameCh", channel );	//	游戏渠道
		params.put("deviceNum",mac);//	设备编号
		params.put("deviceSys","android");//	设备系统
		params.put("deviceNet",netName);//	设备网络
		params.put("deviceResolution",size.x+"x"+size.y);//	设备分辨率
		params.put("deviceName",AndroidUtil.getModel());//	设备名称 

		params.put("sign",SignatureUtil.getSign(params, SlotMgr.getInstance().getJtc().getDcPriKey()));		//	string	64	是	请参阅签名规则 签名
		
		String resJson  = HttpHelper.URLPost(URL_DC_STARTUP_LOG, params);
		JSONObject json = JSON.parseObject(resJson);
		if (!json.getString("ret").equals("S")) {
			SLog.i("dataCenter", "sendStartupLog suc");
		}else{
			SLog.i("dataCenter", "sendStartupLog fail:"+json.getString("msg"));
		}
	}
	
	private void sendPayLogTrue(String userId,int userMoney,int userLv,String gameVer,
			String orderId,String orderPayType,int orderPrice,String orderGetType,int orderGetCount){
		Point size = AndroidUtil.getScreenSize(SlotMgr.getInstance().getCtx());
		String mac = getSimMac(AndroidUtil.getLocalMacAddress(SlotMgr.getInstance().getCtx()));
		String netName = AndroidUtil.getNetType(SlotMgr.getInstance().getCtx());
		String kindId = SlotMgr.getInstance().getJtc().getDcGameKindId()+"";
		String channel = SlotMgr.getInstance().getJtc().getDcChannel();
		
		Map<String, String> params = new HashMap<String, String>();
		
//		params.put("logIp",  );	//记录IP
//		params.put("logTime",  );	//	记录时间
		params.put("gameKind",kindId);	//	游戏编号
		params.put("gameVer",gameVer);	//	游戏版本
		params.put("gameCh",channel);	//	游戏渠道
		params.put("deviceNum",mac);//	设备编号
		params.put("deviceSys","android");//	设备系统
		params.put("deviceNet",netName);//	设备网络
		params.put("deviceResolution",size.x+"x"+size.y);//	设备分辨率
		params.put("deviceName",AndroidUtil.getModel());//	设备名称 
		params.put("userId",userId);	//	用户编号
		params.put("userLv",userLv+"");	//	用户等级
		params.put("userMoney",userMoney+"");	//	用户游戏币
		
		params.put("orderId",orderId);	//	订单编号
		params.put("orderPayType",orderPayType);	//	订单支付类型
		params.put("orderGetType",orderGetType);	//	订单获得类型
		params.put("orderGetCount",orderGetCount+"");	//	订单获得数量
		params.put("orderPrice",orderPrice+"");	//	订单金额
		
		params.put("sign",SignatureUtil.getSign(params, SlotMgr.getInstance().getJtc().getDcPriKey()));		//	string	64	是	请参阅签名规则 签名
		
		String resJson  = HttpHelper.URLPost(URL_DC_PAY_LOG, params);
		JSONObject json = JSON.parseObject(resJson);
		if (!json.getString("ret").equals("S")) {
			SLog.i("dataCenter", "sendPayLog suc");
		}else{
			SLog.i("dataCenter", "sendPayLog fail:"+json.getString("msg"));
		}
	}
	
	
	private String getSimMac(String orgMac){
		if (StringUtils.isEmpty(orgMac)) {
			return "";
		}else{
			return orgMac.replaceAll(":", "").replaceAll("-", "").toUpperCase();
		}
	}
	
}
