package com.jy.common.face;

import java.util.Map;

import com.jy.common.entry.ServerPayInfo;


public interface ISlotPay extends ISlotBase{
	public void pay(final ServerPayInfo payInfo,final ISlotCallback callback);
	public boolean checkCanPay();
	public String prePayOtherParam();
}
