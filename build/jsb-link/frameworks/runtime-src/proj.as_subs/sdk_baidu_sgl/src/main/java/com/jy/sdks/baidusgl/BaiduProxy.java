package com.jy.sdks.baidusgl;

import org.json.JSONException;
import org.json.JSONObject;

import com.duoku.platform.single.DKPlatform;
import com.duoku.platform.single.DKPlatformSettings;
import com.duoku.platform.single.DkErrorCode;
import com.duoku.platform.single.DkProtocolKeys;
import com.duoku.platform.single.callback.IDKSDKCallBack;
import com.duoku.platform.single.item.GamePropsInfo;
import com.jy.common.base.SlotSdkBase;
import com.jy.common.constant.SlotConst;
import com.jy.common.entry.GameInfo;
import com.jy.common.entry.ServerPayInfo;
import com.jy.common.face.ISlotCallback;
import com.jy.common.face.ISlotLogin;
import com.jy.common.face.ISlotPay;
import com.jy.common.mgr.SlotMgr;
import com.jy.common.utils.SLog;

import android.util.Log;

public class BaiduProxy extends SlotSdkBase<BaiduParam> implements ISlotPay,ISlotLogin{

	private IDKSDKCallBack loginlistener;
	
	@Override
	public void onResume() {
		super.onResume();
		DKPlatform.getInstance().resumeBaiduMobileStatistic(SlotMgr.getInstance().getCtx());
	}
	@Override
	public void onPause() {
		super.onPause();
		DKPlatform.getInstance().pauseBaiduMobileStatistic(SlotMgr.getInstance().getCtx());
	}
	
	@Override
	public void initBase() {
      //回调函数
  		IDKSDKCallBack initcompletelistener = new IDKSDKCallBack(){
  			@Override
  			public void onResponse(String paramString) {
  				Log.d("GameMainActivity", paramString);
  				try {
  					JSONObject jsonObject = new JSONObject(paramString);
  					// 返回的操作状态码
  					int mFunctionCode = jsonObject.getInt(DkProtocolKeys.FUNCTION_CODE);
  					
  					//初始化完成
  					if(mFunctionCode == DkErrorCode.BDG_CROSSRECOMMEND_INIT_FINSIH){
  						// 返回的百度uid，供cp绑定使用
//      						String bduid = jsonObject.getString(DkProtocolKeys.BD_UID);
//      						String bdtoken = jsonObject.getString(DkProtocolKeys.BD_TOKEN);
//      						String bdoauthid = jsonObject.getString(DkProtocolKeys.BD_OAUTHID);
//      						Toast.makeText(GameMainActivity.this, "初始化成功", Toast.LENGTH_SHORT).show();
  						initLogin();
  						initAds();
  					}
  				} catch (Exception e) {
  					e.printStackTrace();
  				}
  			}
  		};
  		
  		//初始化函数
  		DKPlatform.getInstance().init(SlotMgr.getInstance().getCtx(), true, DKPlatformSettings.SdkMode.SDK_PAY, initcompletelistener);
	}
	
	/**
	 * 品宣接口调用
	 */
	private void initAds(){
		DKPlatform.getInstance().bdgameInit(SlotMgr.getInstance().getCtx(), new IDKSDKCallBack() {
			@Override
			public void onResponse(String paramString) {
				Log.d("GameMainActivity","bggameInit success"+"paramString:"+paramString);
			}
		});
	}
	
	private ISlotCallback loginCallback = null;
	private com.alibaba.fastjson.JSONObject loginResult = null;
	
	private void initLogin(){
		//回调函数
		 loginlistener = new IDKSDKCallBack(){
			@Override
			public void onResponse(String paramString) {
				try {
					JSONObject jsonObject = new JSONObject(paramString);
					// 返回的操作状态码
					int mFunctionCode = jsonObject.getInt(DkProtocolKeys.FUNCTION_CODE);
					// 返回的百度uid，供cp绑定使用
					String bduid = jsonObject.optString(DkProtocolKeys.BD_UID);
					String bdtoken = jsonObject.optString(DkProtocolKeys.BD_TOKEN);
					String bdoauthid = jsonObject.optString(DkProtocolKeys.BD_OAUTHID);
					
					//登陆成功
					if(mFunctionCode == DkErrorCode.DK_ACCOUNT_LOGIN_SUCCESS
							|| mFunctionCode == DkErrorCode.DK_ACCOUNT_QUICK_REG_SUCCESS){
						com.alibaba.fastjson.JSONObject requestObj=new com.alibaba.fastjson.JSONObject();
			        	//参数
			        	requestObj.put("bduid", bduid);
			        	requestObj.put("bdtoken", bdtoken);
			        	requestObj.put("bdoauthid", bdoauthid);
			        	requestObj.put("configId", getParam().getConfigId());
			        	if (loginCallback!=null) {
			        		loginCallback.onCallback(SlotConst.LoginRetType.LOGIN_SUC, requestObj, "成功");
			        		loginResult = null;
						}else{
							loginResult = requestObj;
						}
			        	
					}else {
						// 登陆失败
//			        	callback.onCallback(SlotConst.LoginRetType.LOGIN_FAIL,null,"登陆失败");
			        	SLog.i("登陆失败,mFunctionCode:"+mFunctionCode);
					//快速注册成功
					}
				} catch (Exception e) {
					e.printStackTrace();
				}
			}

		};
		DKPlatform.getInstance().invokeBDInit(SlotMgr.getInstance().getCtx(), loginlistener);
	}
	

	@Override
	public void login(ISlotCallback callback) throws JSONException {
		loginCallback = callback;
		if (loginResult!=null) {
			JSONObject jsonObject = new JSONObject("");
    		loginCallback.onCallback(SlotConst.LoginRetType.LOGIN_SUC, loginResult, "成功");
    		loginResult = null;
    		return;
		}
		DKPlatform.getInstance().invokeBDLogin(SlotMgr.getInstance().getCtx(), loginlistener);
	}

	@Override
	public void logout() {
	}
	private ISlotCallback callback;
	/**
	 * 支付处理过程的结果回调函数
	 * */
	IDKSDKCallBack RechargeCallback = new IDKSDKCallBack(){
		@Override
		public void onResponse(String paramString) {
			Log.d("GamePropsActivity", paramString);
			try {
				JSONObject jsonObject = new JSONObject(paramString);
				// 支付状态码
				int mStatusCode = jsonObject.getInt(DkProtocolKeys.FUNCTION_STATUS_CODE);
				
				if(mStatusCode == DkErrorCode.BDG_RECHARGE_SUCCESS){
					callback.onCallback(SlotConst.PayRet.PAY_SUC,null,"支付成功");
				}else if(mStatusCode == DkErrorCode.BDG_RECHARGE_USRERDATA_ERROR){
					callback.onCallback(SlotConst.PayRet.PAY_FAIL,null,"用户透传数据不合法");
				}else if(mStatusCode == DkErrorCode.BDG_RECHARGE_ACTIVITY_CLOSED){
					callback.onCallback(SlotConst.PayRet.PAY_FAIL,null,"玩家关闭支付中心");
				}else if(mStatusCode == DkErrorCode.BDG_RECHARGE_FAIL){ 
					callback.onCallback(SlotConst.PayRet.PAY_FAIL,null,"购买失败");
				} else if(mStatusCode == DkErrorCode.BDG_RECHARGE_EXCEPTION){ 
					callback.onCallback(SlotConst.PayRet.PAY_FAIL,null,"购买失败异常");
				} else if(mStatusCode == DkErrorCode.BDG_RECHARGE_CANCEL){ 
					callback.onCallback(SlotConst.PayRet.PAY_CANCEL,null,"用户取消购买");
				} else {
					callback.onCallback(SlotConst.PayRet.PAY_FAIL,null,"购买失败,未知异常");
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	};

	@Override
	public void pay(ServerPayInfo payInfo,final ISlotCallback callback) {
		com.alibaba.fastjson.JSONObject json = com.alibaba.fastjson.JSONObject.parseObject(payInfo.getOtherParam());
		GamePropsInfo gamePropsInfo = new GamePropsInfo(
				json.getString("fixId"), 
				json.getString("price"), 
				json.getString("title"), 
				json.getString("diy"));
		gamePropsInfo.setThirdPay("qpfangshua");
		
		this.callback = callback;
		DKPlatform.getInstance().invokePayCenterActivity(SlotMgr.getInstance().getCtx(), gamePropsInfo, RechargeCallback, DKPlatformSettings.PAY_TENCENTMM);
	}

	@Override
	public boolean checkCanPay() {
		return true;
	}

	@Override
	public Class<BaiduParam> getParamClass() {
		return BaiduParam.class;
	}

	@Override
	public boolean onExit() {
		SlotMgr.getInstance().getCtx().runOnUiThread(new Runnable() {
			@Override
			public void run() {
				DKPlatform.getInstance().bdgameExit(SlotMgr.getInstance().getCtx(), new IDKSDKCallBack() {
					@Override
					public void onResponse(String paramString) {
						SlotMgr.getInstance().getCtx().finish();
						android.os.Process.killProcess(android.os.Process.myPid());
					}
				});
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
		return null;
	}

}
