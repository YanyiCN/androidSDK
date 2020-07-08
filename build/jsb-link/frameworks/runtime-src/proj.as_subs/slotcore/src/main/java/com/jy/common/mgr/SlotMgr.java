package com.jy.common.mgr;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.jy.common.activity.PaySelPop;
import com.jy.common.base.SlotSdkBase;
import com.jy.common.constant.SlotConst;
import com.jy.common.constant.SlotSdkId;
import com.jy.common.entry.GameInfo;
import com.jy.common.entry.ServerPayInfo;
import com.jy.common.entry.ShareInfo;
import com.jy.common.entry.UserPayInfo;
import com.jy.common.exp.SlotShowException;
import com.jy.common.face.ISlotCallback;
import com.jy.common.face.ISlotLogin;
import com.jy.common.face.ISlotPay;
import com.jy.common.face.ISlotShare;
import com.jy.common.floatwin.SlotFloatWindow;
import com.jy.common.param.GameConfig;
import com.jy.common.param.SdkParam;
import com.jy.common.utils.ActivityUtil;
import com.jy.common.utils.ResUtil;
import com.jy.common.utils.SLog;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.app.Dialog;
import android.content.Intent;
import android.os.AsyncTask;
import android.os.Handler;
import android.os.Message;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.Toast;

public class SlotMgr {
	/**单例对象*/
	private static SlotMgr instance;
	/**主窗口*/
	private Activity ctx;
	private boolean inited=false;
	
	private List<SlotSdkBase<?>>	sdkAll=new ArrayList<>();
	
	private List<ISlotPay>			payList=new ArrayList<>();
	private List<ISlotLogin>		loginList=new ArrayList<>();
	private List<ISlotShare>		shareList=new ArrayList<>();
	
	private List<SlotSdkId> 		supportLoginTypes=new ArrayList<>();
	private List<SlotSdkId> 		supportPayTypes=new ArrayList<>();
	private List<SlotSdkId> 		supportShareTypes=new ArrayList<>();
	
	private Map<Integer,SlotSdkBase<?>>	sdkAllMap=new HashMap<>();
	private Map<Integer,ISlotLogin>		loginMap=new HashMap<>();
	private Map<Integer,ISlotPay>		payMap=new HashMap<>();
	private Map<Integer,ISlotShare>		shareMap=new HashMap<>();
	
	private GameConfig jtc = null;
	private Dialog popLoading = null;
	//参数日志
	private String preLog;
	
	private CallbackProxy payBack;
	private CallbackProxy loginBack;
	private CallbackProxy logoutBack;
	private CallbackProxy shareBack;
	private CallbackProxy globalBack;
	
	
	private GameInfo userGameInfo;
	
	//定义msg的what
	public static final int MSG_LOGIN = 1;
	public static final int MSG_LOGIN_BACK = 2;
	
	public static final int MSG_LOGOUT = 9;
	public static final int MSG_LOGOUT_BACK = 10;
	
	public static final int MSG_PAY = 3;
	public static final int MSG_PAY_FAST = 14;
	public static final int MSG_PRE_PAY_FINISH = 4;
	public static final int MSG_PAY_BACK = 5;
	
	public static final int MSG_SHARE = 6;
	public static final int MSG_SHARE_BACK = 7;
	
	public static final int MSG_WRITE_LOGIN_LOG = 11;
	public static final int MSG_WRITE_PAY_LOG = 12;
	public static final int MSG_WRITE_STARTUP_LOG = 13;
	
	public static final int MSG_TIP = 8;
	
	public static final int MSG_GLOBAL_BACK = 15;
	
	
	
	public static SlotMgr getInstance(){
		if (instance==null) {
			instance = new SlotMgr();
		}
		return instance;
	}
	
	/**
	 * 初始化
	 * @param mainActivity 主Activity
	 * @param gameVer 游戏版本
	 * @param debug 是否是DEBUG模式
	 */
	public void initSlot(Activity mainActivity,String gameVer,boolean debug){
		try {
			init(mainActivity ,debug);
		} catch (Exception e) {
			SLog.i(e.getMessage());
			e.printStackTrace();
		}
		
		try {
			sendStartupLog(gameVer);
		} catch (Exception e) {
			SLog.i(e.getMessage());
			e.printStackTrace();
		}
		SlotFloatWindow.getInstance().openFloatWindow();
		SlotFloatWindow.getInstance().addTextToParamFloatWin(getPreLog());
	}
	
	/**初始化SDK*/
	private void init(Activity mainActivity,boolean debug){
		if (inited) {
			return;
		}
		inited=true;
		this.ctx = mainActivity;
		if (debug) {
			SLog.setLogLevel(SLog.ALL);
		}else{
			SLog.setLogLevel(SLog.INFO);
		}
		globalBack = new CallbackProxy(mHandler, MSG_GLOBAL_BACK);
		payBack = new CallbackProxy(mHandler, MSG_PAY_BACK);
		loginBack = new CallbackProxy(mHandler, MSG_LOGIN_BACK);
		logoutBack = new CallbackProxy(mHandler, MSG_LOGOUT_BACK);
		shareBack = new CallbackProxy(mHandler, MSG_SHARE_BACK);
		
		sdkAll = new ArrayList<SlotSdkBase<?>>();
		payList = new ArrayList<ISlotPay>();
		loginList = new ArrayList<ISlotLogin>();
		shareList = new ArrayList<ISlotShare>();
		
		
		supportLoginTypes = new ArrayList<SlotSdkId>();
		supportPayTypes = new ArrayList<SlotSdkId>();
		supportShareTypes = new ArrayList<SlotSdkId>();
		
		sdkAllMap = new HashMap<Integer, SlotSdkBase<?>>();
		payMap = new HashMap<Integer, ISlotPay>();
		loginMap = new HashMap<Integer, ISlotLogin>();
		shareMap = new HashMap<Integer, ISlotShare>();
		
		List<SdkParam> sdkList = SlotConfig.getSdkList();
		for (SdkParam item : sdkList) {
			if (item.getSdkProxyClass()==null) {
				continue;
			}
			try {
				SlotSdkBase<?> baseInst = item.getSdkProxyClass().newInstance();
				baseInst.setParam(item);
				sdkAll.add(baseInst);
				sdkAllMap.put(item.getSdkId(), baseInst);
				SLog.d("Sdk id:"+item.getSdkId()+" succ");
				if (baseInst instanceof ISlotPay) {
					baseInst.setSupportPay(true);
					payList.add((ISlotPay)baseInst);
					supportPayTypes.add(baseInst.getSdkId());
					payMap.put(item.getSdkId(), (ISlotPay)baseInst);
					SLog.d("Sdk id:"+item.getSdkId()+" is paySdk succ");
				}
				if (baseInst instanceof ISlotLogin) {
					baseInst.setSupportLogin(true);
					loginList.add((ISlotLogin)baseInst);
					supportLoginTypes.add(baseInst.getSdkId());
					loginMap.put(item.getSdkId(), (ISlotLogin)baseInst);
//					iSdkid=item.getSdkId();
//					iChindid=item.getSdkChildId();
					SLog.d("Sdk id:"+item.getSdkId()+" is loginSdk succ");
				}
				if (baseInst instanceof ISlotShare) {
					shareList.add((ISlotShare)baseInst);
					supportShareTypes.add(baseInst.getSdkId());
					shareMap.put(item.getSdkId(), (ISlotShare)baseInst);
					SLog.d("Sdk id:"+item.getSdkId()+" is shareSdk succ");
				}
				baseInst.initBase();
			} catch (Exception e) {
				e.printStackTrace();
				SLog.d(item.getSdkAppliClass()+" error");
			}
		}
//		SlotInnerConst.init(getJtc().getServerHost() + SlotInnerConst.PRE_PAY_URL);
	}
	
	/** 处理器,所有的逻辑都通过这个处理*/
	@SuppressLint("HandlerLeak")
	private final Handler mHandler = new Handler() {
		@Override
		public void handleMessage(final Message msg) {
			Object[] paramArray = null;
			if (msg.obj instanceof Object[]) {
				paramArray=(Object[])msg.obj;
			}
			switch (msg.what) {
	            case MSG_PAY:{//支付
	            	final int iSdkId = (Integer)paramArray[0];
	            	final UserPayInfo payInfo = (UserPayInfo)paramArray[1];
	            	final ISlotCallback callback = (ISlotCallback)paramArray[2];
	            	try {
						payBack.setBackAndReset(callback);
			        	if (iSdkId==0) {//弹框支付
			        		showPaySelect(payInfo, callback);
			        		return;
						}
			        	if (!payMap.containsKey(iSdkId)) throw new SlotShowException("抱歉不支持此种充值方式["+iSdkId+"]");
			    		final ISlotPay payInst = payMap.get(iSdkId);
			    		final SlotSdkBase<?> baseInst = (SlotSdkBase<?>)payInst;
			    		if (popLoading!=null) {
			    			popLoading.dismiss();
			    			popLoading = null;
						}
			    		popLoading = ActivityUtil.createLoadingDialog(getCtx(), "请求中...");
			    		AsyncTask.execute(new Runnable() {
							@Override
							public void run() {
								ServerPayInfo serverPayInfo = null;
								boolean suc=false;
								String msgStr = "";
								try {
									serverPayInfo = SlotPayHelper.getSlotOrder(payInfo,iSdkId,payInst.prePayOtherParam(),baseInst.getParam());
									suc = true;
								} catch (Exception e) {
									e.printStackTrace();
									msgStr = e.getMessage();
								}
								//下单完成,所以去调用sdk进行支付
								Message msgNew = new Message();
								msgNew.what = MSG_PRE_PAY_FINISH;
								msgNew.obj = new Object[]{suc,msgStr,payInst,serverPayInfo};
								mHandler.sendMessage(msgNew);
							}
						});
					} catch (SlotShowException e) {
						SLog.i("支付失败:"+e.getMessage());
						payBack.onCallback(SlotConst.PayRet.PAY_FAIL,null, e.getMessage());
					} catch (Exception e) {
						SLog.i("支付失败:"+e.getMessage());
						e.printStackTrace();
						payBack.onCallback(SlotConst.PayRet.PAY_FAIL,null, e.getMessage());
					}
	                break;
	            }
	            case MSG_PAY_FAST:{//快速支付,不用去下单
	            	final int iSdkId = (Integer)paramArray[0];
	            	final ServerPayInfo payInfo = (ServerPayInfo)paramArray[1];
	            	final ISlotCallback callback = (ISlotCallback)paramArray[2];
	            	try {
						payBack.setBackAndReset(callback);
			        	if (!payMap.containsKey(iSdkId)) throw new SlotShowException("抱歉不支持此种充值方式["+iSdkId+"]");
			    		final ISlotPay payInst = payMap.get(iSdkId);
			    		//下单完成,所以去调用sdk进行支付
						Message msgNew = new Message();
						msgNew.what = MSG_PRE_PAY_FINISH;
						msgNew.obj = new Object[]{true,"",payInst,payInfo};
						mHandler.sendMessage(msgNew);
					} catch (SlotShowException e) {
						SLog.i("支付失败:"+e.getMessage());
						payBack.onCallback(SlotConst.PayRet.PAY_FAIL,null, e.getMessage());
					} catch (Exception e) {
						SLog.i("支付失败:"+e.getMessage());
						e.printStackTrace();
						payBack.onCallback(SlotConst.PayRet.PAY_FAIL,null, e.getMessage());
					}
	                break;
	            }
	            case MSG_LOGIN://登陆
	            {	
	            	int iSdkId = (Integer)paramArray[0];
	            	ISlotCallback callback = (ISlotCallback)paramArray[1];
	            	loginBack.setBackAndReset(callback);
	        		try {
//	        			if (iSdkId == 0) {
//		            		showLoginSelect(loginBack);
//		            		return;
//						}
		        		if (!loginMap.containsKey(iSdkId)) {
		        			throw new SlotShowException("抱歉不支持此种登陆方式["+iSdkId+"]");
			    		}
//	        			//登陆方法
        				loginMap.get(iSdkId).login(loginBack);
//	        			loginList.get(0).login(URL,loginBack);
//	        			loginList.get(0).login(loginBack);
	        		} catch (SlotShowException e) {
	        			SLog.i("登陆操作失败:"+e.getMessage());
	        			loginBack.onCallback(SlotConst.PayRet.PAY_FAIL,null, e.getMessage());
	        		} catch (Exception e) {
	        			SLog.i("登陆操作失败:"+e.getMessage());
	        			e.printStackTrace();
	        		}
	        		break;
	            }
	            case MSG_LOGOUT://登出
	            {
	        		try {
	        			if(loginList.size()<=0)					throw new SlotShowException("无用户SDK");
	        			if(!loginList.get(0).supportLogout())	throw new SlotShowException("暂不支持登出操作");
	        			loginList.get(0).logout();
	        		} catch (SlotShowException e) {
	        			SLog.i("登出操作失败:"+e.getMessage());
	        			loginBack.onCallback(SlotConst.LogoutRetType.LOGOUT_FAIL,null, e.getMessage());
	        		} catch (Exception e) {
	        			SLog.i("登出操作失败:"+e.getMessage());
	        			e.printStackTrace();
	        		}
	        		break;
	            }
	            case MSG_SHARE:{//分享
	            	final int iSdkId = (Integer)paramArray[0];
	            	final ShareInfo si = (ShareInfo)paramArray[1];
	            	final ISlotCallback callback = (ISlotCallback)paramArray[2];
	            	try {
						shareBack.setBackAndReset(callback);
			        	if (!shareMap.containsKey(iSdkId))	throw new SlotShowException("抱歉不支持此种分享方式["+iSdkId+"]");
			    		ISlotShare iss = shareMap.get(iSdkId);
			    		iss.share(callback,si);
					} catch (SlotShowException e) {
						SLog.i("分享失败:"+e.getMessage());
						shareBack.onCallback(SlotConst.ShareRetType.SHARE_FAIL,null, e.getMessage());
					} catch (Exception e) {
						SLog.i("分享失败:"+e.getMessage());
						e.printStackTrace();
						shareBack.onCallback(SlotConst.ShareRetType.SHARE_FAIL,null, e.getMessage());
					}
	                break;
	            }
	            case MSG_PAY_BACK:{//支付SDK操作结束
	            	payBack.reSendCallback();
	            	break;
	            }
	            case MSG_LOGIN_BACK:{//登陆SDK操作结束
	            	loginBack.reSendCallback();
	            	break;
	            }
	            case MSG_LOGOUT_BACK:{//登出SDK操作结束
	            	logoutBack.reSendCallback();
	            	break;
	            }
	            case MSG_SHARE_BACK:{//分享SDK操作结束
	            	shareBack.reSendCallback();
	            	break;
	            }case MSG_GLOBAL_BACK:{//
	            	globalBack.reSendCallback();
	            	break;
	            }
	            case MSG_PRE_PAY_FINISH:{//下单等其他操作结束,这里开始调用SDK进行支付
	            	try{
	            		
	            		boolean ret = (Boolean)paramArray[0];
	            		String msgStr = (String)paramArray[1];
	            		if(!ret)	throw new RuntimeException(msgStr);
	            		ISlotPay payInst = (ISlotPay)paramArray[2];
	            		ServerPayInfo serverPayInfo = (ServerPayInfo)paramArray[3];
	            		//talkingData支付前统计
//	            		TDGAVirtualCurrency.onChargeRequest(serverPayInfo.getUserPayReq().getOrderNum(), serverPayInfo.getUserPayReq().getProductName(), serverPayInfo.getUserPayReq().getPrice()/100, "RMB", serverPayInfo.getUserPayReq().getPrice()/100, paramArray[0].toString());
	            		payInst.pay(serverPayInfo,payBack);
					} catch (SlotShowException e) {
						SLog.i("支付失败:"+e.getMessage());
						payBack.onCallback(SlotConst.PayRet.PAY_FAIL,null, e.getMessage());
					} catch (Exception e) {
						SLog.i("支付失败:"+e.getMessage());
						e.printStackTrace();
						payBack.onCallback(SlotConst.PayRet.PAY_FAIL,null, e.getMessage());
					}
					if(popLoading!=null){//消除等待loading
						popLoading.dismiss();
						popLoading = null;
					}
	            	break;
	            }
            	case MSG_TIP:{//tips显示
            		Toast.makeText(getCtx(), (String)msg.obj, Toast.LENGTH_SHORT).show();
            		break;
            	}
            	case MSG_WRITE_STARTUP_LOG:{//发送登陆日志
//            		String gameVer =(String)paramArray[0];
//            		SlotDataLogMgr.getIns().sendStartupLog(gameVer);
            		break;
            	}
            	case MSG_WRITE_LOGIN_LOG:{//发送登陆日志
//            		String userId =(String)paramArray[0];
//            		int userMoney=(Integer)paramArray[1];
//            		int userLv=(Integer)paramArray[2];
//            		String gameVer=(String)paramArray[3];
//            		SlotDataLogMgr.getIns().sendLoginLog(userId, userMoney, userLv, gameVer);
            		break;
            	}
            	case MSG_WRITE_PAY_LOG:{//发送支付日志
//            		String userId =(String)paramArray[0];
//            		int userMoney=(Integer)paramArray[1];
//            		int userLv=(Integer)paramArray[2];
//            		String gameVer=(String)paramArray[3];
//            		String orderId=(String)paramArray[4];
//            		String orderPayType=(String)paramArray[5];
//            		int orderPrice=(Integer)paramArray[6];
//            		String orderType=(String)paramArray[7];
//            		int orderGetCount=(Integer)paramArray[8];
//            		SlotDataLogMgr.getIns().sendPayLog(userId, userMoney, userLv, gameVer, orderId,orderPayType, orderPrice, orderType, orderGetCount);
            		break;
            	}
            }
		}
	};
	
	public void lisGlobalBack(ISlotCallback callback){
		globalBack.setBackAndReset(callback);
	}
	
	/**弹出支付选择框*/
	private void showPaySelect(final UserPayInfo payInfo,final ISlotCallback callback){
		LayoutInflater inflater = LayoutInflater.from(getCtx());
		View pop=inflater.inflate(ResUtil.getLayoutId(getCtx(), "slot_pay_pop"), null);
		new PaySelPop(getCtx(),payList,new ISlotCallback() {
			
			@Override
			public void onCallback(int iRet,Object dataObj, String desc) {
		        ISlotPay selPay =  payMap.get(iRet);
		        pay(selPay.getSdkId().getId(),payInfo, callback);
			}
		},pop);
	}
	
	/**根据sdk调用支付*/
	public void pay(int iSdkId,ServerPayInfo payInfo,ISlotCallback callback){
		SLog.i("User want pay");
		Message msg = new Message();
		msg.what=MSG_PAY_FAST;
		msg.obj = new Object[]{iSdkId,payInfo,callback};
		mHandler.sendMessage(msg);
	}
	
	/**根据sdk调用支付*/
	public void pay(UserPayInfo payInfo,ISlotCallback callback){
		SLog.i("User want pay");
		Message msg = new Message();
		msg.what=MSG_PAY;
		msg.obj = new Object[]{0,payInfo,callback};
		mHandler.sendMessage(msg);
	}
	
	/**根据sdk调用支付*/
	public void pay(int iSdkId,UserPayInfo payInfo,ISlotCallback callback){
		SLog.i("User want pay iSdkId:"+iSdkId);
		Message msg = new Message();
		msg.what=MSG_PAY;
		msg.obj = new Object[]{iSdkId,payInfo,callback};
		mHandler.sendMessage(msg);
	}
	
	
	public String getPrePayInfo(int iSdkId){
		return this.payMap.get(iSdkId).prePayOtherParam();
	}
	
	/**根据sdk调用支付*/
	public void share(int iSdkId,ShareInfo shareInfo,ISlotCallback callback){
		SLog.i("User want share iSdkId:"+iSdkId);
		Message msg = new Message();
		msg.what=MSG_SHARE;
		msg.obj = new Object[]{iSdkId,shareInfo,callback};
		mHandler.sendMessage(msg);
	}
	
	
	/**根据sdk调用登录*/
	public void login(ISlotCallback callback){
		SLog.i("User want login");
		Message msg = new Message();
		msg.what=MSG_LOGIN;
		msg.obj = new Object[]{0,callback};
		mHandler.sendMessage(msg);
	}
	
	/**根据sdk调用登录*/
	public void login(int iSdkId,ISlotCallback callback){
		SLog.i("User want login :"+iSdkId);
		Message msg = new Message();
		msg.what=MSG_LOGIN;
		msg.obj = new Object[]{iSdkId,callback};
		mHandler.sendMessage(msg);
	}
//	/**根据sdk调用登录*/
//	public void login(String url,ISlotCallback callback){
//		SLog.i("User want login,back address:"+url);
//		Message msg = new Message();
//		msg.what=MSG_LOGIN;
//		msg.obj = new Object[]{url,callback};
//		mHandler.sendMessage(msg);
//	}
	/**设置登出回调**/
	public void setLogoutCallback(ISlotCallback callback){
		logoutBack.setBackAndReset(callback);
		for (ISlotLogin login : loginList) {
			((SlotSdkBase<?>)login).setLogoutCallback(logoutBack);
		}
	}
	/**登出**/
	public void logout()
	{
		SLog.i("User want logout ");
		Message msg = new Message();
		msg.what=MSG_LOGOUT;
		mHandler.sendMessage(msg);
	}
	/**SDK是否支持登出**/
	public boolean getSupportLogout(){
		if(loginList.size()<=0){
			return false;
		}
		return loginList.get(0).supportLogout();
	}
	
	/**获取用户SDK*/
	public String getUserId(){
		return loginList.get(0).getUserId();
	}
	/**弹出Tips*/
	public void showTip(String strMsg){
		Message msg = new Message();
		msg.what = MSG_TIP;
		msg.obj = strMsg;
		mHandler.sendMessage(msg);
	}

	/**支持登陆列表*/
	public List<SlotSdkId> getSupportLoginTypes() {
		return supportLoginTypes;
	}
	/**支持支付列表*/
	public List<SlotSdkId> getSupportPayTypes() {
		return supportPayTypes;
	}
	/**支持分享列表*/
	public List<SlotSdkId> getSupportShareTypes() {
		return supportShareTypes;
	}
	
	/**
	 * 退出游戏
	 * @return	true:由SDK负责退出,请不要退出  <br>
	 * 			false:可以直接退出游戏
	 */
	public boolean onExit(){
		for (SlotSdkBase<?> base : sdkAll) {
			try {
				if (base.onExit()) {
					return true;
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return false;
	}
	
	
	/**发送启动日志
	 * @param gameVer 	游戏版本
	 */
	private void sendStartupLog(String gameVer){
		Message msg = new Message();
		msg.what = MSG_WRITE_STARTUP_LOG;
		msg.obj = new Object[]{gameVer};
		mHandler.sendMessage(msg);
	}
	
	
	/**发送用户登陆
	 * 
	 * @param userId 	用户唯一编号
	 * @param userMoney 用户货币剩余量
	 * @param userLv 	用户等级
	 * @param gameVer 	游戏版本
	 */
	public void sendLoginLog(String userId,int userMoney,int userLv,String gameVer){
//		SlotDataLogMgr.getIns().sendLoginLog(userId, userMoney, userLv, gameVer);
		Message msg = new Message();
		msg.what = MSG_WRITE_LOGIN_LOG;
		msg.obj = new Object[]{userId, userMoney, userLv, gameVer};
		mHandler.sendMessage(msg);
	}
	
	
	/**
	 * 支付日志
	 * @param userId 	用户唯一编号
	 * @param userMoney 用户货币剩余量
	 * @param userLv 	用户等级
	 * @param gameVer 	游戏版本
	 * @param orderId	订单编号
	 * @param orderPayType	订单支付方式
	 * @param orderPrice 订单金额(分)
	 * @param orderType 订单获得的商品名称（比如“金币”、“元宝”、“飞天战衣”）
	 * @param orderGetCount 订单获得道具数量
	 */
	public void sendPayLog(String userId,int userMoney,int userLv,String gameVer,
			String orderId,String orderPayType,int orderPrice,String orderType,int orderGetCount){
//		SlotDataLogMgr.getIns().sendPayLog(userId, userMoney, userLv, gameVer, orderId, orderPrice, orderType, orderGetCount);
		Message msg = new Message();
		msg.what = MSG_WRITE_PAY_LOG;
		msg.obj = new Object[]{userId, userMoney, userLv, gameVer, orderId, orderPayType ,orderPrice, orderType, orderGetCount};
		mHandler.sendMessage(msg);
	}
	
//	/**
//	 * 登录验证
//	 * @param URL
//	 * @param requestObj
//	 * @return
//	 */
//	public String checkLogin(String URL,String requestObj,String sdkParam){
//		return checkLoginTrue(URL, getUserId(), requestObj, iSdkid, iChindid,getJtc().getGameId(),sdkParam);
//	}
//	
//	
//	/**
//	 * 登录验证
//	 * @param URL
//	 * @param uid
//	 * @param requestObj
//	 * @param iSdkId
//	 * @param iChildId
//	 * @return
//	 */
//	private String checkLoginTrue(String URL,String uid,String requestObj,int iSdkId,int iChildId,String gameId,String sdkParam){
////		Map<String, Object> requestMap=new HashMap<String, Object>();
////		requestMap.put("Uid", uid);
////		requestMap.put("RequestBody", requestObj);
////		requestMap.put("Sdkid", iSdkId);
////		requestMap.put("Childid",iChildId);
//		String content="Uid="+uid+"&RequestBody="+requestObj+"&Sdkid="+iSdkId+"&Childid="+iChildId+"&Gameid="+gameId+"&Sdkparam="+sdkParam;
//		SLog.i("请求内容为："+content);
//		String checkresult;
//		try {
//			checkresult=HttpHelper.URLPost(URL,content);
//		} catch (Exception e) {
//			e.printStackTrace();
//			checkresult="";
//		}
//		return checkresult;
//	}
	
	public Object other(int sdkId,Object param){
		try {
			SlotSdkBase<?> base= sdkAllMap.get(sdkId);
			if (base==null) {
				return null;
			}
			return base.other1(param);
		} catch (Exception e) {
			showTip(e.getMessage());
		}
		return null;
	}
	
	public SlotSdkBase getSdkById(int sdkId){
		SlotSdkBase<?> base= sdkAllMap.get(sdkId);
		if (base==null) {
			return null;
		}
		return base;
	}
	
	///////////////////////////////////////////主Activity的消息转发  begin//////////////////////////////////////////
	public void onActivityResult(int requestCode, int resultCode, Intent data){
    	for (SlotSdkBase<?> base : sdkAll) {
    		try {
    			base.onActivityResult(requestCode, resultCode, data);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
    }
	public void onResume() {
    	for (SlotSdkBase<?> base : sdkAll) {
    		try {
    			base.onResume();
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
    }
	public void onPause(){
    	for (SlotSdkBase<?> base : sdkAll) {
    		try {
    			base.onPause();
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
    }
	public void onNewIntent(Intent intent) { 
    	for (SlotSdkBase<?> base : sdkAll) {
    		try {
    			base.onNewIntent(intent);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
    }
	public void onDestroy() {
    	for (SlotSdkBase<?> base : sdkAll) {
    		try {
    			base.onDestroy();
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
    }
	public void onRestart() {
    	for (SlotSdkBase<?> base : sdkAll) {
    		try {
    			base.onRestart();
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
    	SlotFloatWindow.getInstance().openFloatWindow();
    }
	public void onStart() {
    	for (SlotSdkBase<?> base : sdkAll) {
    		try {
    			base.onStart();
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
    	SlotFloatWindow.getInstance().closeFloatWindow();
    }
	public void onStop() {
    	for (SlotSdkBase<?> base : sdkAll) {
    		try {
    			base.onStop();
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
    	SlotFloatWindow.getInstance().closeFloatWindow();
    }
///////////////////////////////////////////主Activity的消息转发  end//////////////////////////////////////////
	
	public Activity getCtx() {
		return ctx;
	}
	public void setJtc(GameConfig jtc) {
		this.jtc = jtc;
	}
	public GameConfig getJtc() {
		return jtc;
	}

	public String getPreLog() {
		return preLog;
	}
	public CallbackProxy getGlobalBack() {
		return globalBack;
	}
	public void setPreLog(String preLog) {
		this.preLog = preLog;
	}
	public void setUserGameInfo(GameInfo userGameInfo) {
		this.userGameInfo = userGameInfo;
	}
	public GameInfo getUserGameInfo() {
		return userGameInfo;
	}
	public List<ISlotLogin> getLoginList() {
		return loginList;
	}
	public List<ISlotPay> getPayList() {
		return payList;
	}
}
