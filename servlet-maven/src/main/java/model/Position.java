package model;

import java.sql.Timestamp;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import utils.MyDateDeserializer;
import utils.MyDateSerializer;

public class Position {

	private Integer id;
	private String name;
	private String demo;
	@JsonSerialize(using = MyDateSerializer.class)
	@JsonDeserialize(using = MyDateDeserializer.class)
	private Timestamp createTime;
	@JsonSerialize(using = MyDateSerializer.class)
	@JsonDeserialize(using = MyDateDeserializer.class)
	private Timestamp updateTime;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDemo() {
		return demo;
	}

	public void setDemo(String demo) {
		this.demo = demo;
	}

	public Timestamp getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Timestamp createTime) {
		this.createTime = createTime;
	}

	public Timestamp getUpdateTime() {
		return updateTime;
	}

	public void setUpdateTime(Timestamp updateTime) {
		this.updateTime = updateTime;
	}

	@Override
	public String toString() {
		return "Position [id=" + id + ", name=" + name + ", demo=" + demo + ", createTime="
				+ createTime + ", updateTime=" + updateTime + "]";
	}

}
