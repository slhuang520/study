package model;

public class Menu {

	private Integer id;
	private String text;
	private String state;
	private String iconCls;
	private String url;
	private Integer nid;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getIconCls() {
		return iconCls;
	}

	public void setIconCls(String iconCls) {
		this.iconCls = iconCls;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public Integer getNid() {
		return nid;
	}

	public void setNid(Integer nid) {
		this.nid = nid;
	}

	@Override
	public String toString() {
		return "Menu [id=" + id + ", text=" + text + ", state=" + state + ", iconCls=" + iconCls
				+ ", url=" + url + ", nid=" + nid + "]";
	}

}
