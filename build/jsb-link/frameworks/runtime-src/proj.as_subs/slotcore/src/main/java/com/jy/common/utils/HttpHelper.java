package com.jy.common.utils;

import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStreamWriter;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class HttpHelper {

	private final static int READ_BODY_SIZE = 5120;

	public static String URLPost(String strUrl,Map<String,String> paramMap){
		StringBuffer sb = new StringBuffer();
		for (String strKey : paramMap.keySet()) {
			sb.append("&");
			sb.append(strKey);
			sb.append("=");
			sb.append(paramMap.get(strKey));
		}
		if (sb.length()>0) {
			return URLPost(strUrl, sb.substring(1));
		}
		return URLPost(strUrl, sb.toString());
	}
	
	public static String URLPost(String strUrl, String content) {
		return URLPost(strUrl, content, 30);
	}

	public static String URLPost(String strUrl, String content,
			int timeoutSecond) {
		try {
			URL url = new URL(strUrl);
			HttpURLConnection con = (HttpURLConnection) url.openConnection();
			if (timeoutSecond > 0) {
				System.setProperty("sun.net.client.defaultConnectTimeout",
						String.valueOf(timeoutSecond * 1000));
				System.setProperty("sun.net.client.defaultReadTimeout",
						String.valueOf(timeoutSecond * 1000));
				con.setConnectTimeout(timeoutSecond * 1000);
				con.setReadTimeout(timeoutSecond * 1000);
			}
			con.setDoInput(true);
			con.setDoOutput(true);
			con.setAllowUserInteraction(false);
			con.setUseCaches(false);
			con.setRequestMethod("POST");
			con.setRequestProperty("Content-Type",
					"application/x-www-form-urlencoded;charset=UTF-8");
			BufferedWriter bout = new BufferedWriter(new OutputStreamWriter(
					con.getOutputStream()));
			bout.write(content);
			bout.flush();
			bout.close();
			return streamReadHtml(con.getInputStream());
		} catch (MalformedURLException e) {
			e.printStackTrace();
			throw new RuntimeException("网络异常");
		} catch (IOException e) {
			e.printStackTrace();
			throw new RuntimeException("网络异常");
		} catch (Exception e) {
			e.printStackTrace();
			throw new RuntimeException("网络异常");
		}
	}

	private static String streamReadHtml(InputStream istream)
			throws UnsupportedEncodingException {
		String html = "";
		byte[] responseBody = new byte[READ_BODY_SIZE];
		int npos = 0;
		int nread = 0;
		try {
			while ((nread = istream.read(responseBody, npos,
					responseBody.length - npos)) >= 0) {
				npos += nread;
				byte[] tmpBuf = new byte[npos + READ_BODY_SIZE];
				System.arraycopy(responseBody, 0, tmpBuf, 0, npos);
				responseBody = tmpBuf;
			}
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			try {
				if (istream != null) {
					istream.close();
				}
				istream = null;
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		html = new String(responseBody, 0, npos, "UTF-8");
		return html;
	}

	public static String getStringByRegex(String html, String regex) {
		String sensitive = "";
		Pattern pattern = Pattern.compile(regex);
		Matcher matcher = pattern.matcher(html);
		while (matcher.find()) {
			sensitive += matcher.group(1);
		}
		return sensitive;
	}

}
