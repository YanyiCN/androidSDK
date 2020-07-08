package com.jy.common.mgr;

import java.util.List;

import com.jy.common.param.SdkParam;

public class SlotConfig {
	private static List<SdkParam> sdkList;

	public static List<SdkParam> getSdkList() {
		return sdkList;
	}

	public static void setSdkList(List<SdkParam> sdkList) {
		SlotConfig.sdkList = sdkList;
	}
	
	
}
