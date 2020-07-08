package com.jy.common.face;

import com.jy.common.entry.GameInfo;

import org.json.JSONException;

public interface ISlotLogin extends ISlotBase{
	public String getUserId();
//	public void login(final String URL,final ISlotCallback callback);
	public void login(final ISlotCallback callback) throws JSONException;
	public boolean supportLogout();
	public void logout();
	public boolean supportSubmitGameInfo();
	public void submitGameInfo(final GameInfo gameInfo);
}
