package com.jy.sdks.ali;

import com.alipay.sdk.app.PayTask;
import com.jy.common.base.SlotSdkBase;
import com.jy.common.constant.SlotConst;
import com.jy.common.entry.ServerPayInfo;
import com.jy.common.face.ISlotCallback;
import com.jy.common.face.ISlotPay;
import com.jy.common.mgr.SlotMgr;

import android.text.TextUtils;

public class AlipayProxy extends SlotSdkBase<AlipayParam> implements ISlotPay{

	@Override
	public void initBase() {
		//无,在Application中初始化了
	}


	@Override
	public void pay(final ServerPayInfo spi,final ISlotCallback callback) {
		Runnable payRunnable = new Runnable() {
			@Override
			public void run() {
				// 构造PayTask 对象
				PayTask alipay = new PayTask(SlotMgr.getInstance().getCtx());
				// 调用支付接口，获取支付结果
				String result = alipay.pay(spi.getOtherParam(),true);

				PayResult payResult = new PayResult(result);
				// 支付宝返回此次支付结果及加签，建议对支付宝签名信息拿签约时支付宝提供的公钥做验签
				String resultStatus = payResult.getResultStatus();
				// 判断resultStatus 为“9000”则代表支付成功，具体状态码代表含义可参考接口文档
				if (TextUtils.equals(resultStatus, "9000")) {
					callback.onCallback(SlotConst.PayRet.PAY_SUC,null, "支付成功");
				} else {
					// 其他值就可以判断为支付失败，包括用户主动取消支付，或者系统返回的错误
					callback.onCallback(SlotConst.PayRet.PAY_FAIL,null, "支付失败");
				}
			}
		};

		// 必须异步调用
		Thread payThread = new Thread(payRunnable);
		payThread.start();
	}

	@Override
	public boolean checkCanPay() {
		return true;
	}

	@Override
	public Class<AlipayParam> getParamClass() {
		return AlipayParam.class;
	}


	@Override
	public String prePayOtherParam() {
		return null;
	}
}
