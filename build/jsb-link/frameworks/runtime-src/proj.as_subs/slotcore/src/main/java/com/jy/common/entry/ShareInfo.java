package com.jy.common.entry;

import java.io.Serializable;

public class ShareInfo implements Serializable {
	private static final long serialVersionUID = 1L;
	
	
	private String title;
	private String imagePath;
	private String url;
	private String imageUrl;
	private String text;
	private String comment;
	private Object otherParam;
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getImagePath() {
		return imagePath;
	}
	public void setImagePath(String imagePath) {
		this.imagePath = imagePath;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public String getImageUrl() {
		return imageUrl;
	}
	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}
	public String getText() {
		return text;
	}
	public void setText(String text) {
		this.text = text;
	}
	public String getComment() {
		return comment;
	}
	public void setComment(String comment) {
		this.comment = comment;
	}
	public Object getOtherParam() {
		return otherParam;
	}
	public void setOtherParam(Object otherParam) {
		this.otherParam = otherParam;
	}
	
}
