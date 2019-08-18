package model;

import java.sql.Timestamp;
import java.util.Date;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import utils.MyDateDeserializer;
import utils.MyDateSerializer;

/**
 * 用户信息实体类
 * 
 * @author <a href="mailto:1772849305@qq.com">Dreamcatcher</a>
 * 
 * @version 1.0
 * 
 */
public class Manager {

	private Integer id;
	private String name;
	private String password;
	private String email;
	private String sex;
	private Date birth;
	@JsonSerialize(using = MyDateSerializer.class)
	@JsonDeserialize(using = MyDateDeserializer.class)
	private Timestamp createDate;
	@JsonSerialize(using = MyDateSerializer.class)
	@JsonDeserialize(using = MyDateDeserializer.class)
	private Timestamp updateDate;
	private boolean isSysManager;

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

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getSex() {
		return sex;
	}

	public void setSex(String sex) {
		this.sex = sex;
	}

	public Date getBirth() {
		return birth;
	}

	public void setBirth(Date birth) {
		this.birth = birth;
	}

	public Timestamp getCreateDate() {
		return createDate;
	}

	public void setCreateDate(Timestamp createDate) {
		this.createDate = createDate;
	}

	public Timestamp getUpdateDate() {
		return updateDate;
	}

	public void setUpdateDate(Timestamp updateDate) {
		this.updateDate = updateDate;
	}

	public boolean getIsSysManager() {
		return isSysManager;
	}

	public void setIsSysManager(boolean isSysManager) {
		this.isSysManager = isSysManager;
	}

	@Override
	public String toString() {
		return "User [id=" + id + ", name=" + name + ", password=" + password + ", email=" + email
				+ ", sex=" + sex + ", birth=" + birth + ", createDate=" + createDate
				+ ", updateDate=" + updateDate + ", isSysManager=" + isSysManager + "]";
	}

}
