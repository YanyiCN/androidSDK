package com.jy.common.face;

import com.jy.common.entry.ShareInfo;



public interface ISlotShare extends ISlotBase{
	public void share(final ISlotCallback callback,final ShareInfo si);
}
