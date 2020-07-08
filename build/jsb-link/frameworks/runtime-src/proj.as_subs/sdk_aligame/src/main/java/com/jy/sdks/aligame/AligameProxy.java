package com.jy.sdks.aligame;

import com.alibaba.fastjson.JSONObject;
import com.jy.common.base.SlotSdkBase;
import com.jy.common.constant.SlotConst;
import com.jy.common.entry.GameInfo;
import com.jy.common.entry.ServerPayInfo;
import com.jy.common.face.ISlotCallback;
import com.jy.common.face.ISlotLogin;
import com.jy.common.face.ISlotPay;
import com.jy.common.mgr.SlotMgr;
import com.jy.common.utils.SLog;

import android.os.Bundle;
import cn.gundam.sdk.shell.even.SDKEventKey;
import cn.gundam.sdk.shell.even.SDKEventReceiver;
import cn.gundam.sdk.shell.even.Subscribe;
import cn.gundam.sdk.shell.exception.AliLackActivityException;
import cn.gundam.sdk.shell.exception.AliNotInitException;
import cn.gundam.sdk.shell.open.ParamInfo;
import cn.gundam.sdk.shell.open.UCOrientation;
import cn.gundam.sdk.shell.param.SDKParamKey;
import cn.gundam.sdk.shell.param.SDKParams;
import cn.uc.gamesdk.UCGameSdk;
import cn.uc.paysdk.face.commons.Response;
import cn.uc.paysdk.face.commons.SDKProtocolKeys;

public class AligameProxy extends SlotSdkBase<AligameParam> implements ISlotPay,ISlotLogin{
	//【温馨提示1】必须在UI线程中调⽤的接⼝列表如下：
	//初始化接⼝（initSDK）； 登录接⼝（login） 充值接⼝（pay）； 退出接⼝（exitSDK）
	
	private String cacheSid = null;
	private boolean cacheWantLogin = false;
	private boolean initSuc = false;
	
	private SDKEventReceiver eventReceiver = new SDKEventReceiver() {
		@Subscribe(event = SDKEventKey.ON_INIT_SUCC)
		private void onInitSucc() {
			SLog.i("初始化成功");
			initSuc = true;
			doLogin();
		}
		
		@Subscribe(event = SDKEventKey.ON_INIT_FAILED)
		private void onInitFailed(String desc) {
			SLog.i("初始化失败:" + desc);
		}
		
		
		@Subscribe(event = SDKEventKey.ON_LOGIN_SUCC)
		private void onLoginSucc(String sid) { //sid即token，需发送给游戏服务器做登录校验获取accountId用户唯一标识，客户端无法获取用户唯 一标识        
			SLog.i("登录成功,sid:" + sid);
			JSONObject obj =new JSONObject();
	        obj.put("sid", sid);
	        obj.put("configId", getParam().getConfigId());
	        cacheSid = sid;
			loginCallback.onCallback(SlotConst.LoginRetType.LOGIN_SUC, obj, "成功");
		}
		
		@Subscribe(event = SDKEventKey.ON_LOGIN_FAILED)
		private void onLoginFailed(String desc) {        
			SLog.i("登录失败,desc:" + desc);
        	loginCallback.onCallback(SlotConst.LoginRetType.LOGIN_FAIL,null,"登陆失败:"+desc);
		}
		
		
		@Subscribe(event = SDKEventKey.ON_CREATE_ORDER_SUCC)
        private void onCreateOrderSucc(Bundle data) {
			SLog.i("此处为支付成功回调:( callback data = " +
			data.getString("response"));
			
			payCallback.onCallback(SlotConst.PayRet.PAY_SUC,null,"支付成功");
			// 在此执行发货，执行成功后需要往data添加如下参数，否则会重复通知订单
			data.putString("result", Response.OPERATE_SUCCESS_MSG);
        }

        @Subscribe(event = SDKEventKey.ON_PAY_USER_EXIT)
        private void onPayUserExit(String msg) {
        	SLog.i("充值失败: " + msg);
            payCallback.onCallback(SlotConst.PayRet.PAY_FAIL,null,msg);
        }
        
        
		@Subscribe(event = SDKEventKey.ON_EXIT_SUCC)
		private void onExitSucc() {
			SLog.i("SDK退出");
			//执行退出的一些操作
        	SlotMgr.getInstance().getCtx().finish();
			System.exit( 0 );
		}

		@Subscribe(event = SDKEventKey.ON_EXIT_CANCELED)
		private void onExitCanceled() {
			SLog.i("放弃退出，继续游戏");
		}
	};

	
	@Override
	public void initBase() {
		UCGameSdk.defaultSdk().registerSDKEventReceiver(eventReceiver);
		
		
		
		SlotMgr.getInstance().getCtx().runOnUiThread(new Runnable() {
			@Override
			public void run() {
				ParamInfo gpi = new ParamInfo();// 请自行生成对象 gpi.setGameId(119474); //
				// 从九游开放平台“SDK接入”获取自己游戏的参数信息
				//gpi.setCpId(cpId);
				//gpi.setDebugHost(_debugHost);
				//gpi.setEnablePayHistory(enablePayHistory);
				//gpi.setEnableUserChange(enableUserChange);
				gpi.setGameId(Integer.valueOf(getParam().getGameId().getValue()));
				//gpi.setOrientation(_orientation);
				//gpi.setServerId(serverId);
				//gpi.setServerName(serverName);
				
				
				// 设置SDK屏幕方向 //LANDSCAPE：横屏，横屏游戏必须设置为横屏,PORTRAIT：竖屏
				gpi.setOrientation(UCOrientation.LANDSCAPE);
				SDKParams sdkParams = new SDKParams();
				
				sdkParams.put(SDKParamKey.GAME_PARAMS, gpi);
				try {
					UCGameSdk.defaultSdk().initSdk(SlotMgr.getInstance().getCtx(), sdkParams);
				} catch (AliLackActivityException e) {
					e.printStackTrace();
				}
			}
		});
		
		
		
		

	}
	@Override
	public void onDestroy() {
		UCGameSdk.defaultSdk().unregisterSDKEventReceiver(eventReceiver);
		super.onDestroy();
	}
	
	
	private ISlotCallback loginCallback;
	private ISlotCallback payCallback;

	@Override
	public void login(final ISlotCallback callback) {
		loginCallback = callback;
		cacheWantLogin = true;
		
		if (!initSuc) {
			return;
		}
		doLogin();
	}
	
	private void doLogin(){
		if (!cacheWantLogin) {
			return;
		}
		cacheWantLogin = false;
		SlotMgr.getInstance().getCtx().runOnUiThread(new Runnable() {
			@Override
			public void run() {
				try {
					SDKParams params = new SDKParams();
					params.put("offline_login",false);
					UCGameSdk.defaultSdk().login(SlotMgr.getInstance().getCtx(), params);
				} catch (AliLackActivityException e) {
					e.printStackTrace();
				} catch (AliNotInitException e) {
					e.printStackTrace();
				}
			}
		});
	}

	@Override
	public void logout() {
		
	}

	@Override
	public void pay(ServerPayInfo payInfo,final ISlotCallback callback) {
		this.payCallback = callback;
		final JSONObject json = JSONObject.parseObject(payInfo.getOtherParam());
		SlotMgr.getInstance().getCtx().runOnUiThread(new Runnable() {

			@Override
			public void run() {
				
				SDKParams payParam = new SDKParams();
				
				payParam.put(SDKProtocolKeys.APP_NAME, json.getString("app_name"));
				payParam.put(SDKProtocolKeys.PRODUCT_NAME, json.getString("product_name"));
				payParam.put(SDKProtocolKeys.AMOUNT, json.getString("order_amount"));
				payParam.put(SDKProtocolKeys.NOTIFY_URL, json.getString("notify_url"));
				payParam.put(SDKProtocolKeys.ATTACH_INFO, json.getString("attach_info"));
				payParam.put(SDKProtocolKeys.CP_ORDER_ID, json.getString("cp_order_id"));
				
				
				try {
					UCGameSdk.defaultSdk().pay(SlotMgr.getInstance().getCtx(), payParam);
				} catch (IllegalArgumentException e) {
					e.printStackTrace();
				} catch (AliLackActivityException e) {
					e.printStackTrace();
				} catch (AliNotInitException e) {
					e.printStackTrace();
				}
			}
			
		});
		
		
		
	}

	@Override
	public boolean checkCanPay() {
		return true;
	}

	@Override
	public Class<AligameParam> getParamClass() {
		return AligameParam.class;
	}

	@Override
	public boolean onExit() {
		SlotMgr.getInstance().getCtx().runOnUiThread(new Runnable() {

			@Override
			public void run() {
				try {
					UCGameSdk.defaultSdk().exit(SlotMgr.getInstance().getCtx(), null);
				} catch (AliLackActivityException e) {
					e.printStackTrace();
				} catch (AliNotInitException e) {
					e.printStackTrace();
				}
			}
			
		});
		
		return true;
	}

	@Override
	public boolean supportLogout() {
		return false;
	}

	@Override
	public boolean supportSubmitGameInfo() {
		return false;
	}

	@Override
	public void submitGameInfo(GameInfo gameInfo) {
		
	}

	@Override
	public String prePayOtherParam() {
		JSONObject json = new JSONObject();
		json.put("sid", cacheSid);
		return json.toJSONString();
	}

}
