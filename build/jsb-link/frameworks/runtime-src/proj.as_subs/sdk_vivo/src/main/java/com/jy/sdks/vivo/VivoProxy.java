package com.jy.sdks.vivo;


import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.jy.common.base.SlotSdkBase;
import com.jy.common.constant.SlotConst;
import com.jy.common.entry.GameInfo;
import com.jy.common.entry.ServerPayInfo;
import com.jy.common.face.ISlotCallback;
import com.jy.common.face.ISlotLogin;
import com.jy.common.face.ISlotPay;
import com.jy.common.mgr.SlotMgr;
import com.vivo.unionsdk.open.OrderResultInfo;
import com.vivo.unionsdk.open.VivoAccountCallback;
import com.vivo.unionsdk.open.VivoConstants;
import com.vivo.unionsdk.open.VivoExitCallback;
import com.vivo.unionsdk.open.VivoPayCallback;
import com.vivo.unionsdk.open.VivoPayInfo;
import com.vivo.unionsdk.open.VivoUnionSDK;

public class VivoProxy extends SlotSdkBase<VivoParam> implements ISlotPay,ISlotLogin{
	
	private String openId = "";
	private ISlotCallback loginCallback;
//	
//	private ISlotCallback loginOutCallback;
//	
//	public void setLoginOutCallback(ISlotCallback callback){
//		loginOutCallback = callback;
//	}
	
	@Override
	public void initBase() {
		//注册登录回调
        VivoUnionSDK.registerAccountCallback(SlotMgr.getInstance().getCtx(),new VivoAccountCallback() {
			
			@Override
			public void onVivoAccountLogout(int arg0) {
				// 调用某回调
//				if(loginOutCallback!=null){
//					loginOutCallback.onCallback(0, null, null);
//				}
			}
			
			@Override
			public void onVivoAccountLoginCancel() {
				loginCallback.onCallback(SlotConst.LoginRetType.LOGIN_FAIL,null,"登陆失败");
			}
			
			@Override
			public void onVivoAccountLogin(String username, String openid, String authToken) {
				//收到登录成功回调后，调用服务端接口校验登录有效性。arg2返回值为authtoken。服务端接口详见文档。校验登录代码略。
		        openId = openid;
		        //登录成功后上报角色信息
		        JSONObject obj =new JSONObject();
		        obj.put("username", username);
		        obj.put("openid", openid);
		        obj.put("authToken", authToken);
		        obj.put("version", "v2");
		        obj.put("configId", getParam().getConfigId());
		        loginCallback.onCallback(SlotConst.LoginRetType.LOGIN_SUC, obj, "成功");
		      //  VivoUnionSDK.reportRoleInfo(new VivoRoleInfo("角色ID", "角色等级", "角色名称", "区服ID", "区服名称"));
				
			}
		});
	}

	

	@Override
	public void pay(ServerPayInfo spi,final ISlotCallback callback) {
		JSONObject json = JSON.parseObject(spi.getOtherParam());
		VivoPayInfo.Builder builder = new VivoPayInfo.Builder();
//		builder.setProductPrice(spi.getUserPayReq().getPrice()+"");
//		builder.setUid(openId);
//		builder.setTransNo(json.getString("orderNumber"));
		
		builder.setAppId(json.getString("appId"));
		builder.setCpOrderNo(json.getString("cpOrderNumber"));
		builder.setProductName(json.getString("productName"));
		builder.setProductDesc(json.getString("productDesc"));
		builder.setOrderAmount(json.getString("orderAmount"));
		builder.setVivoSignature(json.getString("vivoSignature"));
		builder.setNotifyUrl(json.getString("notifyUrl"));
		builder.setExtInfo(json.getString("extInfo"));
		
		
		builder.setExtUid(openId);
		
		
		VivoPayCallback mVivoPayCallback = new VivoPayCallback() {
		        //客户端返回的支付结果不可靠，请以服务器端最终的支付结果为准；
//		        public void onVivoPayResult(String arg0, boolean arg1, String arg2) {
//		            if (arg1) {
//		            	callback.onCallback(SlotConst.PayRet.PAY_SUC,new JSONObject(),"");
//		            } else {
//		            	callback.onCallback(SlotConst.PayRet.PAY_FAIL,new JSONObject(),"");
//		            }
//		        }

				@Override
				public void onVivoPayResult(int i, OrderResultInfo orderResultInfo) {
					if (i == VivoConstants.PAYMENT_RESULT_CODE_SUCCESS) {
						callback.onCallback(SlotConst.PayRet.PAY_SUC,new JSONObject(),"");
		                //!!!! 一定要加，否则无法通过上架审核 !!!
		                //商品发放成功以后，通知vivo侧
		                VivoUnionSDK.sendCompleteOrderNotification(orderResultInfo);
		            } else if (i == VivoConstants.PAYMENT_RESULT_CODE_CANCEL) {
		                callback.onCallback(SlotConst.PayRet.PAY_FAIL,new JSONObject(),"");
		            } else if (i == VivoConstants.PAYMENT_RESULT_CODE_UNKNOWN) {
		            	callback.onCallback(SlotConst.PayRet.PAY_FAIL,new JSONObject(),"订单状态未知");
		            } else {
		            	callback.onCallback(SlotConst.PayRet.PAY_FAIL,new JSONObject(),"");
		            }
				};
		    };
        VivoUnionSDK.payV2(SlotMgr.getInstance().getCtx(), builder.build(), mVivoPayCallback);
	}
	
	
	@Override
	public boolean checkCanPay() {
		return true;
	}

	@Override
	public Class<VivoParam> getParamClass() {
		return VivoParam.class;
	}

	@Override
	public String prePayOtherParam() {
		JSONObject json = new JSONObject();
		json.put("version", "v2");
		return json.toJSONString();
	}
	@Override
	public boolean onExit() {
		SlotMgr.getInstance().getCtx().runOnUiThread(new Runnable() {
			 @Override
			 public void run() {
				 VivoUnionSDK.exit(SlotMgr.getInstance().getCtx(), new VivoExitCallback() {

					 @Override
					 public void onExitConfirm() {
						 //执行退出的一些操作
						 SlotMgr.getInstance().getCtx().finish();
						 System.exit( 0 );

					 }

					 @Override
					 public void onExitCancel() {

					 }
				 });
			 }
		});

		return true;
	}



	@Override
	public void login(ISlotCallback callback) {
		loginCallback = callback;
		VivoUnionSDK.login(SlotMgr.getInstance().getCtx());
	}



	@Override
	public boolean supportLogout() {
		return false;
	}



	@Override
	public void logout() {
		
	}



	@Override
	public boolean supportSubmitGameInfo() {
		return false;
	}



	@Override
	public void submitGameInfo(GameInfo gameInfo) {
		
	}
}
