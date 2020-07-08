package com.jy.yyb;

import android.app.Activity;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.support.v4.content.LocalBroadcastManager;
import android.util.DisplayMetrics;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.ImageButton;
import android.widget.PopupWindow;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.jy.common.base.SlotSdkBase;
import com.jy.common.constant.SlotConst;
import com.jy.common.entry.GameInfo;
import com.jy.common.entry.ServerPayInfo;
import com.jy.common.entry.ShareInfo;
import com.jy.common.face.ISlotCallback;
import com.jy.common.face.ISlotLogin;
import com.jy.common.face.ISlotPay;
import com.jy.common.face.ISlotShare;
import com.jy.common.mgr.SlotMgr;
import com.jy.common.utils.SLog;
import com.jy.common.utils.StringUtils;
import com.jy.sdks.yyb.R;
import com.tencent.mm.opensdk.constants.ConstantsAPI;
import com.tencent.mm.opensdk.modelbase.BaseResp;
import com.tencent.mm.opensdk.modelmsg.SendAuth;
import com.tencent.mm.opensdk.modelmsg.SendMessageToWX;
import com.tencent.mm.opensdk.modelmsg.WXAppExtendObject;
import com.tencent.mm.opensdk.modelmsg.WXImageObject;
import com.tencent.mm.opensdk.modelmsg.WXMediaMessage;
import com.tencent.mm.opensdk.modelmsg.WXWebpageObject;
import com.tencent.mm.opensdk.openapi.IWXAPI;
import com.tencent.mm.opensdk.openapi.WXAPIFactory;
import com.tencent.ysdk.api.YSDKApi;
import com.tencent.ysdk.framework.common.eFlag;
import com.tencent.ysdk.framework.common.ePlatform;
import com.tencent.ysdk.module.bugly.BuglyListener;
import com.tencent.ysdk.module.pay.PayListener;
import com.tencent.ysdk.module.pay.PayRet;
import com.tencent.ysdk.module.share.ShareApi;
import com.tencent.ysdk.module.share.ShareCallBack;
import com.tencent.ysdk.module.share.impl.ShareRet;
import com.tencent.ysdk.module.user.PersonInfo;
import com.tencent.ysdk.module.user.UserListener;
import com.tencent.ysdk.module.user.UserLoginRet;
import com.tencent.ysdk.module.user.UserRelationListener;
import com.tencent.ysdk.module.user.UserRelationRet;
import com.tencent.ysdk.module.user.WakeupRet;

import java.io.BufferedInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.net.Inet4Address;
import java.net.InetAddress;
import java.net.NetworkInterface;
import java.net.SocketException;
import java.util.Enumeration;

public class YybProxy extends SlotSdkBase<YybParam> implements ISlotPay,ISlotLogin,ISlotShare{
	
	private Activity CONTEXT=null;
	private PopupWindow popwindow = null;
	private static boolean inited=false;
	private static final int THUMB_SIZE = 150;
	public LocalBroadcastManager lbm;
    public BroadcastReceiver mReceiver;
    private  static String wxAppId;
    public static YybProxy instance;
    private IWXAPI api;
    
    private String cacheOpenId ="";
    private String cacheOpenKey = "";
    private String cachePf = "";
    private String cachePfKey = "";
    private int cachePlatform;
    private boolean isFirstLogin = true;
    
    private UserLoginRet userLoginSucRet;
    
	//登录回调
	private static ISlotCallback loginCallBack;
	//支付回调
	private ISlotCallback shareCallback;
	
	public YybProxy() {
		instance = this;
	}
	
	
	@Override
	public String prePayOtherParam() {
		JSONObject obj = new JSONObject();
    	if(cachePlatform == ePlatform.PLATFORM_ID_QQ){
    		obj.put("session_id", "openid");
    		obj.put("session_type", "kp_actoken");
    		obj.put("flag", 1);
    	}else if(cachePlatform == ePlatform.PLATFORM_ID_WX){
    		obj.put("session_id", "hy_gameid");
    		obj.put("session_type", "wc_actoken");
    		obj.put("flag", 0);
    	}
    	obj.put("openid", cacheOpenId);
    	obj.put("openkey", cacheOpenKey);
    	obj.put("pf", cachePf);
    	obj.put("pfkey", cachePfKey);
    	obj.put("zoneid", 1);
    	obj.put("orderType", "server");
    	obj.put("isRelease", getParam().getIsRelease().getValue());
		return obj.toJSONString();
	}
	
	@Override
	public void initBase() {
		CONTEXT=SlotMgr.getInstance().getCtx();
		if (inited) {
			return ;
		}
		//应用宝SDK
        // GAME YSDK初始化
        YSDKApi.onCreate(CONTEXT);
        wxAppId = getParam().getWxAppId().getValue();
        api = WXAPIFactory.createWXAPI(SlotMgr.getInstance().getCtx(), wxAppId,false);
		api.registerApp(wxAppId);

//         GAME 处理游戏被拉起的情况
        YSDKApi.handleIntent(CONTEXT.getIntent());
		
		inited=true;

		//注册分享监听器接受分享状态信息
//		ShareApi.getInstance().regShareCallBack(new ShareCallBack() {
//			@Override
//			public void onSuccess(ShareRet ret) {
//				SLog.i("Share","分享成功！  分享路径："+ret.shareType.name()+" 透传信息："+ret.extInfo);
//
//				String shareId = ret.extInfo;
//				shareCallback.onCallback(SlotConst.ShareRetType.SHARE_SUC,shareId, "分享成功");
//			}
//
//			@Override
//			public void onError(ShareRet ret) {
//				SLog.i("Share","分享失败  分享路径："+ret.shareType.name()+" 错误码："+ret.retCode+" 错误信息："+ret.retMsg+" 透传信息："+ret.extInfo);
//				String shareId = ret.extInfo;
//				shareCallback.onCallback(SlotConst.ShareRetType.SHARE_FAIL,shareId, ret.retMsg);
//			}
//
//			@Override
//			public void onCancel(ShareRet ret) {
//				SLog.i("Share","分享用户取消！  分享路径："+ret.shareType.name()+" 透传信息："+ret.extInfo);
//
//				String shareId = ret.extInfo;
//				shareCallback.onCallback(SlotConst.ShareRetType.SHARE_CANCEL,shareId, "取消分享");
//			}
//		});


		YSDKApi.setUserListener(new UserListener() {
			
			@Override
			public void OnWakeupNotify(WakeupRet ret) {
				SLog.i("应用宝OnWakeupNotify:"+JSON.toJSONString(ret));
	            if (ret.flag == eFlag.Wakeup_YSDKLogining) {
	                // 用拉起的账号登录，登录结果在OnLoginNotify()中回调
	            } else if (ret.flag == eFlag.Wakeup_NeedUserSelectAccount) {
	                // 异账号时，游戏需要弹出提示框让用户选择需要登录的账号
	            } else if (ret.flag == eFlag.Wakeup_NeedUserLogin) {
	                // 没有有效的票据，登出游戏让用户重新登录
	            } else {
	                
	            }
			}
			
			@Override
			public void OnRelationNotify(UserRelationRet userRelationRet) {
				onYybRelationNotify(userRelationRet);
			}
			
			@Override
			public void OnLoginNotify(UserLoginRet ret) {
				if(loginCallBack == null){
					return;
				}
				SLog.i("应用宝登录flag"+ret.flag);
				
				switch (ret.flag) {
	            case eFlag.Succ:
	            	YybProxy.this.userLoginSucRet = ret;
	            	SLog.i("YYBLogin", "用户登录成功");
	            	// 获取用户信息
	            	YybProxy.this.goGetUserInfo();
	                break;
	            // 游戏逻辑，对登录失败情况分别进行处理
	            case eFlag.QQ_UserCancel:
	                loginCallBack.onCallback(SlotConst.LoginRetType.LOGIN_FAIL,null, "您取消了授权");
		        	SLog.i("YYBLogin", "用户取消授权");
	                break;
	            case eFlag.QQ_LoginFail:
	                loginCallBack.onCallback(SlotConst.LoginRetType.LOGIN_FAIL,null, "QQ登录失败");
		        	SLog.i("YYBLogin", "QQ登录失败");
	                break;
	            case eFlag.QQ_NetworkErr:
	                loginCallBack.onCallback(SlotConst.LoginRetType.LOGIN_FAIL,null, "QQ登录网络异常");
		        	SLog.i("YYBLogin", "QQ登录异常");
	                break;
	            case eFlag.QQ_NotInstall:
	                loginCallBack.onCallback(SlotConst.LoginRetType.LOGIN_FAIL,null, "手机未安装手Q");
		        	SLog.i("YYBLogin", "手机未安装手Q");
	                break;
	            case eFlag.QQ_NotSupportApi:
	                loginCallBack.onCallback(SlotConst.LoginRetType.LOGIN_FAIL,null, "手机手Q版本太低");
		        	SLog.i("YYBLogin", "手机手Q版本太低");
	                break;
	            case eFlag.WX_NotInstall:
	                loginCallBack.onCallback(SlotConst.LoginRetType.LOGIN_FAIL,null, "手机未安装微信");
		        	SLog.i("YYBLogin", "手机未安装微信");
	                break;
	            case eFlag.WX_NotSupportApi:
	                loginCallBack.onCallback(SlotConst.LoginRetType.LOGIN_FAIL,null, "手机微信版本太低");
		        	SLog.i("YYBLogin", "手机微信版本太低");
	                break;
	            case eFlag.WX_UserCancel:
	                loginCallBack.onCallback(SlotConst.LoginRetType.LOGIN_FAIL,null, "您取消授权");
		        	SLog.i("YYBLogin", "用户取消授权");
	                break;
	            case eFlag.WX_UserDeny:
	                loginCallBack.onCallback(SlotConst.LoginRetType.LOGIN_FAIL,null, "您拒绝了授权");
		        	SLog.i("YYBLogin", "用户拒绝了授权");
	                break;
	            case eFlag.WX_LoginFail:
		        	loginCallBack.onCallback(SlotConst.LoginRetType.LOGIN_FAIL,null, "微信登录失败");
		        	SLog.i("YYBLogin", "微信登录失败");
	                break;
	            case eFlag.Login_TokenInvalid:
	                loginCallBack.onCallback(SlotConst.LoginRetType.LOGIN_FAIL,null, "您尚未登录或者之前的登录已过期");
		        	SLog.i("YYBLogin", "您尚未登录或者之前的登录已过期");
	                break;
	            case eFlag.Login_NotRegisterRealName:
	                // 显示登录界面
	                loginCallBack.onCallback(SlotConst.LoginRetType.LOGIN_FAIL,null, "您的账号没有进行实名认证");
		        	SLog.i("YYBLogin", "您的账号没有进行实名认证");
	                break;
	            default:
	            	break;
				
			}
		}
	});
	YSDKApi.setBuglyListener(new BuglyListener() {
		@Override
		public String OnCrashExtMessageNotify() {
			SLog.i("应用宝崩溃1");
			return null;
		}
		
		@Override
		public byte[] OnCrashExtDataNotify() {
			SLog.i("应用宝崩溃2");
				return null;
			}
		});
	}

	public void onYybRelationNotify(UserRelationRet userRelationRet) {
		SLog.i("应用宝用户信息:"+JSON.toJSONString(userRelationRet));

		if (YybProxy.this.userLoginSucRet==null) {
			return;
		}
		if (userRelationRet==null
				|| userRelationRet.flag != eFlag.Succ
				|| userRelationRet.persons==null
				|| userRelationRet.persons.size()<=0) {
			loginCallBack.onCallback(SlotConst.LoginRetType.LOGIN_FAIL,null, "获取用户信息失败");
			SLog.i("YYBLogin", "获取用户信息失败");
			return;
		}

		PersonInfo person = (PersonInfo)userRelationRet.persons.firstElement();

		UserLoginRet ret = YybProxy.this.userLoginSucRet;
		YybProxy.this.userLoginSucRet = null;
		JSONObject requestJson = new JSONObject();
		try {
			setUserId(ret.open_id);
			if(ret.platform == ePlatform.PLATFORM_ID_QQ){
				cacheOpenKey = ret.getPayToken();
				requestJson.put("flag", 1);
			}else if(ret.platform == ePlatform.PLATFORM_ID_WX){
				cacheOpenKey = ret.getAccessToken();
				requestJson.put("flag", 0);
			}

			cachePlatform = ret.platform;
			SLog.i("应用宝的openid为：" + ret.open_id);
			requestJson.put("openid", ret.open_id);
			requestJson.put("openkey", ret.getAccessToken());
			requestJson.put("userip", getLocalHostIp());
			requestJson.put("timestamp", System.currentTimeMillis()/1000);
			requestJson.put("configId", getParam().getConfigId());
			requestJson.put("isRelease", getParam().getIsRelease().getValue());
			requestJson.put("userInfo", person);

			cacheOpenId = ret.open_id;
			cachePf = ret.pf;
			cachePfKey = ret.pf_key;
		} catch (Exception e) {
			e.printStackTrace();
		}
		SLog.i("loginCallBack 对象为：" + loginCallBack);
		if (loginCallBack != null) {
			loginCallBack.onCallback(SlotConst.LoginRetType.LOGIN_SUC, requestJson, "登录成功");
		}
		SLog.i("YYBLogin", "用户登录成功");
	}
	private void goGetUserInfo(){
		if (this.userLoginSucRet==null) {
			return;
		}
		ePlatform platType = null;
    	if(this.userLoginSucRet.platform == ePlatform.PLATFORM_ID_QQ){
			platType = ePlatform.QQ;
		}else if(this.userLoginSucRet.platform == ePlatform.PLATFORM_ID_WX){
			platType = ePlatform.WX;
		}
    	SLog.i("YYBLogin", "用户登录成功,先开始获取用户信息");
		YSDKApi.queryUserInfo(platType, new UserRelationListener() {
			@Override
			public void OnRelationNotify(UserRelationRet userRelationRet) {
				onYybRelationNotify(userRelationRet);
			}
		});
	}

	@Override
	public void login(final ISlotCallback callback) {
		loginCallBack=callback;
		
		SlotMgr.getInstance().getCtx().runOnUiThread(new Runnable() {
			@Override
			public void run() {
				// 只有第一次是采用自动登录
				if (isFirstLogin) {
					isFirstLogin = false;
					UserLoginRet userLoginRet = new UserLoginRet();
					YSDKApi.getLoginRecord(userLoginRet);
					if (userLoginRet.flag == eFlag.Succ) {
						YybProxy.this.userLoginSucRet = userLoginRet;
						
						// 获取用户信息
		            	YybProxy.this.goGetUserInfo();
						return;
					}
				}
				
				
				// 重新授权登录
				ePlatform plat = getPlatform();
				if (plat == ePlatform.None) {
					showPopupWindow();
				}else{
					YSDKApi.login(plat);
				}
			}
		});
	}	
	
	public static void loginRes(BaseResp resp){
		SLog.i("微信登录返回码:"+resp.errCode);
		switch (resp.errCode) {
		case BaseResp.ErrCode.ERR_OK:
			//成功
			String code=((SendAuth.Resp)resp).code;
			loginCallBack.onCallback(SlotConst.LoginRetType.LOGIN_SUC, code, "登录成功");
			break;
		case BaseResp.ErrCode.ERR_USER_CANCEL:
			//取消
			loginCallBack.onCallback(SlotConst.LoginRetType.LOGIN_FAIL,null,"用户取消登录");
			break;
		case BaseResp.ErrCode.ERR_AUTH_DENIED:
			//认证失败
			loginCallBack.onCallback(SlotConst.LoginRetType.LOGIN_FAIL,null,"用户认证失败");
			break;
		default:
			//未知操作
			break;
		}
	}

	@Override
	public void logout() {
		
	}
	
	 // 获取当前登录平台
    public ePlatform getPlatform() {
    	String loginType = getParam().getLoginType().getValue();
    	if (StringUtils.isNotEmpty(loginType)) {
			if ("1".equals(loginType)) {
				return ePlatform.WX;
			}else if ("0".equals(loginType)) {
				return ePlatform.QQ;
			}else{
				return ePlatform.None;
			}
		}
    	
        UserLoginRet ret = new UserLoginRet();
        YSDKApi.getLoginRecord(ret);
        if (ret.flag == eFlag.Succ) {
            return ePlatform.getEnum(ret.platform);
        }
        return ePlatform.None;
    }
	
    
    @Override
	public void pay(final ServerPayInfo spi,final ISlotCallback callback) {
		Bitmap bmp = BitmapFactory.decodeResource(CONTEXT.getResources(), R.drawable.sp_dimen_icon_2);
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        bmp.compress(Bitmap.CompressFormat.PNG, 100, baos);
        byte[] appResData = baos.toByteArray();
        JSONObject obj = JSON.parseObject(spi.getOtherParam());
        String ysdkExt = "";
        String zoneId = "1";
        
        YSDKApi.buyGoods(zoneId, obj.getString("yyb_url_params"), appResData, ysdkExt, new PayListener() {
			@Override
			public void OnPayNotify(PayRet ret) {
		        if(PayRet.RET_SUCC == ret.ret){
		            //支付流程成功
		            switch (ret.payState){
		                //支付成功
		                case PayRet.PAYSTATE_PAYSUCC:
		                	callback.onCallback(SlotConst.PayRet.PAY_SUC,null, "支付成功");
		                    break;
		                //取消支付
		                case PayRet.PAYSTATE_PAYCANCEL:
		                	callback.onCallback(SlotConst.PayRet.PAY_FAIL,null, "支付失败");
		                    break;
		                //支付结果未知
		                case PayRet.PAYSTATE_PAYUNKOWN:
		                	callback.onCallback(SlotConst.PayRet.PAY_SUC,null, "支付结果确认中");
		                    break;
		                //支付失败
		                case PayRet.PAYSTATE_PAYERROR:
		                	callback.onCallback(SlotConst.PayRet.PAY_FAIL,null, "支付失败");
		                    break;
		            }
		        }else{
		            switch (ret.flag){
		                case eFlag.Login_TokenInvalid:
		                	callback.onCallback(SlotConst.PayRet.PAY_FAIL,null, "应用宝账号登录已失效,请关闭游戏重新打开再支付");
		                    break;
		                case eFlag.Pay_User_Cancle:
		                    //用户取消支付
		                	callback.onCallback(SlotConst.PayRet.PAY_FAIL,null, "取消支付");
		                    break;
		                case eFlag.Pay_Param_Error:
		                	callback.onCallback(SlotConst.PayRet.PAY_FAIL,null, "支付失败:参数异常");
		                    break;
		                case eFlag.Error:
		                default:
		                	callback.onCallback(SlotConst.PayRet.PAY_FAIL,null, "支付失败:未知错误"+ret.flag);
		                    break;
		            }
		        }
			}
		});
	}
	
	
	

	@Override
	public boolean checkCanPay() {
		return true;
	}

	@Override
	public Class<YybParam> getParamClass() {
		return YybParam.class;
	}

	@Override
	public void onResume() {
		super.onResume();
		YSDKApi.onResume(CONTEXT);
	}
	@Override
	public void onStop() {
		super.onStop();
		YSDKApi.onStop(CONTEXT);
	}
	@Override
	public void onRestart() {
		super.onRestart();
		YSDKApi.onRestart(CONTEXT);
	}
	
	@Override
	public void onPause() {
		super.onPause();
		YSDKApi.onPause(CONTEXT);
	}
	
	@Override
	public void onDestroy() {
		if(popwindow!=null){
			popwindow.dismiss();
		}
		super.onDestroy();
		YSDKApi.onDestroy(CONTEXT);
	}
	@Override
	public void onNewIntent(Intent intent) {
		super.onNewIntent(intent);
		YSDKApi.handleIntent(intent);
	}
	
	private void showPopupWindow() {
		LayoutInflater inflater = (LayoutInflater) CONTEXT.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
	    View view = inflater.inflate(CONTEXT.getResources().getIdentifier("yyb_login_select", "layout", CONTEXT.getPackageName()), null);

	   int width = dip2px(CONTEXT, 262);
	   int height = dip2px(CONTEXT, 141);
	    
	   PopupWindow window = new PopupWindow(view,width,height);
	   popwindow=window;
	    
	   ImageButton btnQQ = (ImageButton) view.findViewById(CONTEXT.getResources().getIdentifier("btnQQ", "id", CONTEXT.getPackageName()));
	    btnQQ.setOnClickListener(new OnClickListener() {
			@Override
			public void onClick(View v) {
				YSDKApi.login(ePlatform.QQ);
				popwindow.dismiss();
				popwindow=null;
			}
		});
	    
	    ImageButton btnWx = (ImageButton) view.findViewById(CONTEXT.getResources().getIdentifier("btnWx", "id", CONTEXT.getPackageName()));
	    btnWx.setOnClickListener(new OnClickListener() {
			@Override
			public void onClick(View v) {
				YSDKApi.login(ePlatform.WX);
				popwindow.dismiss();
				popwindow=null;
			}
		});

	    // 设置popWindow弹出窗体可点击，这句话必须添加，并且是true
	    window.setFocusable(false);
	    //
	    window.setOutsideTouchable(false);
	    // 设置popWindow的显示和消失动画
	 //   window.setAnimationStyle(R.style.mypopwindow_anim_style);
	    // 在底部显示
	    DisplayMetrics dm = new DisplayMetrics();
	    SlotMgr.getInstance().getCtx().getWindowManager().getDefaultDisplay().getMetrics(dm);
	    window.showAtLocation(SlotMgr.getInstance().getCtx().getWindow().getDecorView(),Gravity.BOTTOM, 0, dm.heightPixels/2-height/2);
    }
	
	/** 
     * 根据手机的分辨率从 dp 的单位 转成为 px(像素) 
     */  
    public static int dip2px(Context context, float dpValue) {  
        final float scale = context.getResources().getDisplayMetrics().density;  
        return (int) (dpValue * scale + 0.5f);  
    }

	@Override
	public boolean supportLogout() {
		return false;
	}  
	
	public String getLocalHostIp() {
		String ipaddress = "";
		try {
			Enumeration<NetworkInterface> en = NetworkInterface.getNetworkInterfaces();
			// 遍历所用的网络接口
			while (en.hasMoreElements()) {
				NetworkInterface nif = en.nextElement();// 得到每一个网络接口绑定的所有ip
				Enumeration<InetAddress> inet = nif.getInetAddresses();
				// 遍历每一个接口绑定的所有ip
				while (inet.hasMoreElements()) {
					InetAddress ip = inet.nextElement();
					if (!ip.isLoopbackAddress()&& ip instanceof Inet4Address) {
						return ipaddress = ip.getHostAddress();
					}
				}

			}
		} catch (SocketException e) {
			SLog.i("获取本地ip地址失败");
			e.printStackTrace();
		}
		return ipaddress;

	}
	
	@Override
	public void onActivityResult(int requestCode, int resultCode, Intent data) {
	    super.onActivityResult(requestCode, resultCode, data);
	    YSDKApi.onActivityResult(requestCode, resultCode, data);
	}

	@Override
	public void submitGameInfo(GameInfo arg0) {
	}

	@Override
	public boolean supportSubmitGameInfo() {
		return false;
	}
	
	public static String getWxAppId(){
		return wxAppId;
	}

	@Override
	public void share(ISlotCallback callback, ShareInfo si) {
		shareCallback = callback;
//		if(!api.isWXAppInstalled())
//		{
//			SlotMgr.getInstance().showTip("您还没有安装微信,无法分享");
//			return;
//		}
		shareOne(si);
		
	}

	public void onResp(BaseResp resp) {
		if (resp.getType() == ConstantsAPI.COMMAND_SENDMESSAGE_TO_WX ) {
			String shareId = resp.transaction;
			if (resp.errCode == BaseResp.ErrCode.ERR_OK) {
				SLog.i("分享成功");
				shareCallback.onCallback(SlotConst.ShareRetType.SHARE_SUC,shareId, "分享成功");
			}else if (resp.errCode == BaseResp.ErrCode.ERR_USER_CANCEL) {
				SLog.i("取消分享");
				shareCallback.onCallback(SlotConst.ShareRetType.SHARE_CANCEL,shareId, "取消分享");
			}else {
				if (resp.errCode == BaseResp.ErrCode.ERR_COMM) {
					//SlotMgr.getInstance().showTip("此游戏包无法进行微信分享");
					SLog.i("此游戏包无法进行微信分享");
					shareCallback.onCallback(SlotConst.ShareRetType.SHARE_FAIL,shareId, "此游戏包无法进行微信分享");
				}else if (resp.errCode == BaseResp.ErrCode.ERR_SENT_FAILED) {
					//SlotMgr.getInstance().showTip("发送失败");
					SLog.i("发送失败");
					shareCallback.onCallback(SlotConst.ShareRetType.SHARE_FAIL,shareId, "发送失败");
				}else if (resp.errCode == BaseResp.ErrCode.ERR_UNSUPPORT) {
					//SlotMgr.getInstance().showTip("暂不支持");
					SLog.i("暂不支持");
					shareCallback.onCallback(SlotConst.ShareRetType.SHARE_FAIL,shareId, "暂不支持");
				}else if (resp.errCode == BaseResp.ErrCode.ERR_AUTH_DENIED) {
					//SlotMgr.getInstance().showTip("此游戏包无法进行微信分享");
					SLog.i("此游戏包无法进行微信分享");
					shareCallback.onCallback(SlotConst.ShareRetType.SHARE_FAIL,shareId, "此游戏包无法进行微信分享");
				}else{
					SLog.i("操作结束");
				}
			}
		}else{
			SLog.i("未知微信消息type:"+resp.getType()+",code:"+resp.errCode);
		}
	}
	
	int ST_IMG = 1;
	int ST_LINK = 2;
	int ST_LINK_APP = 3;
	
	public void shareOne(ShareInfo si){
		JSONObject obj = (JSONObject)si.getOtherParam();
		int shareType = obj.getIntValue("shareType");//[[params valueForKey:@"shareType"] intValue];
	    int shareWxType = obj.getIntValue("shareWxType");//[[params valueForKey:@"shareWxType"] intValue];
	    int shareObjId = obj.getIntValue("shareObjId");//[[params valueForKey:@"shareObjId"] intValue];
	    int scene = shareWxType==0?SendMessageToWX.Req.WXSceneSession:SendMessageToWX.Req.WXSceneTimeline;
	    String messageExt = obj.getString("messageExt");
	    String title = obj.getString("title");
	    String desc = obj.getString("desc");
	    String linkUrl =obj.getString("linkUrl");
	    String imgPath =obj.getString("imgPath");
	    String iconPath =obj.getString("icon");
	    if (shareType == ST_IMG) {
	        this.sendImg(imgPath, shareObjId+"", scene,messageExt);
	    }else if (shareType == ST_LINK){
	        this.sendLink(linkUrl, title, desc, shareObjId+"", scene,messageExt,iconPath);
	    }else if (shareType == ST_LINK_APP){
	    	this.sendAppLink( shareObjId+"", scene, linkUrl, title, desc, messageExt);
	    }
	}
	private void sendAppLink(String trans,int scene,String url,String title,String desc,String messageExt){
		// send appdata with no attachment
		WXAppExtendObject appdata = new WXAppExtendObject();
		appdata.extInfo = "this is ext info";
		WXMediaMessage msg = new WXMediaMessage();
		msg.title = title;
		msg.description = desc;
		msg.mediaObject = appdata;
		msg.messageExt = messageExt;

		SendMessageToWX.Req req = new SendMessageToWX.Req();
		req.transaction = trans;
		req.message = msg;
		req.scene = scene;
		api.sendReq(req);
	}
	
	private void sendImg(String path,String trans,int scene,String messageExt){
		Bitmap bmp = BitmapFactory.decodeFile(path);
		WXImageObject imgObj = new WXImageObject(bmp);
		
		
		WXMediaMessage msg = new WXMediaMessage();
		msg.mediaObject = imgObj;
		msg.messageExt = messageExt;
		Bitmap thumbBmp = Bitmap.createScaledBitmap(bmp, 80, 80, true);
		bmp.recycle();
		msg.thumbData = WxUtil.bmpToByteArrayOld(thumbBmp, true); 
		
		SendMessageToWX.Req req = new SendMessageToWX.Req();
		req.transaction = trans;
		req.message = msg;
		req.scene = scene;

//		ShareApi.getInstance().shareToWXFriend(shareToWXFriend);


		api.sendReq(req);
	}
	
	
	private void sendLink(String url,String title,String desc,String trans,int scene,String messageExt,String iconPath){
		WXWebpageObject webpage = new WXWebpageObject();
		webpage.webpageUrl = url;
		WXMediaMessage msg = new WXMediaMessage(webpage);
		msg.title = title;
		msg.description = desc;
		msg.messageExt = messageExt;
		Bitmap bmp = getDiskBitmap(iconPath);
		Bitmap thumbBmp = Bitmap.createScaledBitmap(bmp, THUMB_SIZE, THUMB_SIZE, true);
		msg.thumbData = WxUtil.bmpToByteArrayOld(thumbBmp, true);
		SendMessageToWX.Req req = new SendMessageToWX.Req();
		req.transaction = trans;
		req.message = msg;
		req.scene = scene;
		api.sendReq(req);
	}
	
	private Bitmap getDiskBitmap(String pathString)  
	{  
	    Bitmap bitmap = null;  
	    try{  
	    	if (pathString.startsWith("assets/")) {
	    		pathString = pathString.substring("assets/".length());
			}
	    	BufferedInputStream bis = new BufferedInputStream(SlotMgr.getInstance().getCtx().getAssets().open(pathString));
	    	bitmap = BitmapFactory.decodeStream(bis);
	    } catch (Exception e){
	    	FileInputStream fs;
			try {
				fs = new FileInputStream(pathString);
				BufferedInputStream bs = new BufferedInputStream(fs);
				bitmap = BitmapFactory.decodeStream(bs);
				return bitmap;
			} catch (FileNotFoundException e1) {
				e1.printStackTrace();
			} 
	        e.printStackTrace();
	    }  
	    return bitmap;
	}
	
	public void compressBmpToFile(Bitmap bmp,File file){
		ByteArrayOutputStream baos = new ByteArrayOutputStream();
		int options = 80;//个人喜欢从80开始,
		bmp.compress(Bitmap.CompressFormat.JPEG, options, baos);
		while (baos.toByteArray().length / 1024 > 100) { 
			baos.reset();
			options -= 10;
			bmp.compress(Bitmap.CompressFormat.JPEG, options, baos);
		}
		try {
			file.delete();
			file.createNewFile();
			FileOutputStream fos = new FileOutputStream(file);
			fos.write(baos.toByteArray());
			fos.flush();
			fos.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
