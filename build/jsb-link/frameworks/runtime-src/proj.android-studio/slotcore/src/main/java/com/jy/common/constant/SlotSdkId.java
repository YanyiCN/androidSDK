package com.jy.common.constant;

import java.util.HashMap;
import java.util.Map;

public class SlotSdkId {
	private int id;
	private String name;
	public SlotSdkId(int t,String n){
		this.id = t;
		this.name = n;
		typeMap.put(id, this);
	}
	public int getId() {
		return id;
	}
	public String getName() {
		return name;
	}
	public static Map<Integer, SlotSdkId> typeMap = new HashMap<Integer, SlotSdkId>();
	public static SlotSdkId findById(int type){
		return typeMap.get(type);
	}
}
