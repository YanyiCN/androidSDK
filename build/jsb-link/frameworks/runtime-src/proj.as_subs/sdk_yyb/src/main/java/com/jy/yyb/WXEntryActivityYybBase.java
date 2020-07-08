package com.jy.yyb;

import android.content.Intent;

import com.alibaba.fastjson.JSON;
import com.jy.common.constant.SlotConst;
import com.jy.common.mgr.SlotMgr;
import com.jy.common.utils.SLog;
import com.tencent.mm.opensdk.constants.ConstantsAPI;
import com.tencent.mm.opensdk.modelbase.BaseReq;
import com.tencent.mm.opensdk.modelbase.BaseResp;
import com.tencent.mm.opensdk.modelmsg.ShowMessageFromWX;
import com.tencent.mm.opensdk.openapi.IWXAPIEventHandler;
import com.tencent.ysdk.module.user.impl.wx.YSDKWXEntryActivity;

public class WXEntryActivityYybBase extends YSDKWXEntryActivity implements IWXAPIEventHandler{

//


	@Override
	protected void onNewIntent(Intent intent) {
		super.onNewIntent(intent);
	}

	//
		@Override
		public void onReq(BaseReq req) {
//			switch (req.getType()) {
//			case ConstantsAPI.COMMAND_GETMESSAGE_FROM_WX:
//				//goToGetMsg();
//				break;
//			case ConstantsAPI.COMMAND_SHOWMESSAGE_FROM_WX:
//				ShowMessageFromWX.Req r = (ShowMessageFromWX.Req) req;
//				SlotMgr.getInstance().getGlobalBack().onCallback(SlotConst.GlobalType.WX_START_MSG, r.message.messageExt, "微信消息");
//				break;
//			default:
//				break;
//			}
			super.onReq(req);
		}
//
		@Override
		public void onResp(BaseResp resp) {
			SLog.i("回调onResp "+JSON.toJSONString(resp));
			 if (resp.getType() == ConstantsAPI.COMMAND_SENDMESSAGE_TO_WX) {//分享
				YybProxy.instance.onResp(resp);
			}
			super.onResp(resp);
		}
}
