package com.jy.common.utils;

import java.util.Map;
import java.util.TreeMap;

/**
 * 充值中心签名加密及验签工具类
 * 
 * @author Jarry
 * @createTime 2015年10月15日 下午2:14:03
 */
public class SignatureUtil {
	
	/**
	 * 验证签名
	 * @param params 接收到的参数
	 * @param key 签名密钥
	 * @return 验签成功时返回true 否则返回false
	 * @author Jarry
	 * @createTime 2015年10月15日 下午2:21:21
	 */
	public static boolean checkSign(Map<String, String> params, String key){
		try {
			String sign = getSign(params, key);
			System.out.println("本地签名："+sign);
			if(sign == null)return false;
			return sign.equals(params.get("sign"));
		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}
	
	/**
	 * 生成 签名
	 * @param params 发送参数
	 * @param key 签名密钥
	 * @return 加密后签名串
	 * @author Jarry
	 * @createTime 2015年10月15日 下午2:31:22
	 */
	public static String getSign(Map<String, String> params, String key){
		try {
			if(params == null || key == null || "".equals(key.trim())) return null;
			Map<String, String> treeMap = new TreeMap<String, String>();
			treeMap.putAll(params);
			StringBuffer sb = new StringBuffer();
			for (Map.Entry<String, String> entry : treeMap.entrySet()) {
				if(!"sign".equalsIgnoreCase(entry.getKey())){
					sb.append(entry.getValue());
				}
			}
			//System.out.println("签名明文："+sb.toString()+" ;key: "+key);
			return Md5Util.getmd5(Md5Util.getMD5(sb.toString())+key.toUpperCase());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
}

