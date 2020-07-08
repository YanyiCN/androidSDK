package com.jy.common.face;

import com.jy.common.constant.SlotSdkId;
import com.jy.common.param.SdkParam;


public interface ISlotBase {
	public void initBase();
	public SlotSdkId getSdkId();
	public SdkParam getParamCom();
}
