package model;

import java.sql.Timestamp;
import java.util.Date;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import utils.MyDateDeserializer;
import utils.MyDateSerializer;

public class Employee {

	private Integer id;
	private String name;
	private String sex;
	private Date birth;
	private String phone;
	private String email;
	private String picture;
	private Integer deptId;
	private String deptName;
	private Integer positionId;
	private String positionName;
	private Integer managerId;
	private String managerName;
	private String roleIds;
	private String roleNames;
	private String economyNo;
	private String roomNo;
	private String region;
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

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPicture() {
		return picture;
	}

	public void setPicture(String picture) {
		this.picture = picture;
	}

	public Integer getDeptId() {
		return deptId;
	}

	public void setDeptId(Integer deptId) {
		this.deptId = deptId;
	}

	public String getDeptName() {
		return deptName;
	}

	public void setDeptName(String deptName) {
		this.deptName = deptName;
	}

	public Integer getPositionId() {
		return positionId;
	}

	public void setPositionId(Integer positionId) {
		this.positionId = positionId;
	}

	public String getPositionName() {
		return positionName;
	}

	public void setPositionName(String positionName) {
		this.positionName = positionName;
	}

	public Integer getManagerId() {
		return managerId;
	}

	public void setManagerId(Integer managerId) {
		this.managerId = managerId;
	}

	public String getManagerName() {
		return managerName;
	}

	public void setManagerName(String managerName) {
		this.managerName = managerName;
	}

	public String getRoleIds() {
		return roleIds;
	}

	public void setRoleIds(String roleIds) {
		this.roleIds = roleIds;
	}

	public String getRoleNames() {
		return roleNames;
	}

	public void setRoleNames(String roleNames) {
		this.roleNames = roleNames;
	}

	public String getEconomyNo() {
		return economyNo;
	}

	public void setEconomyNo(String economyNo) {
		this.economyNo = economyNo;
	}

	public String getRoomNo() {
		return roomNo;
	}

	public void setRoomNo(String roomNo) {
		this.roomNo = roomNo;
	}

	public String getRegion() {
		return region;
	}

	public void setRegion(String region) {
		this.region = region;
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
		return "Employee [id=" + id + ", name=" + name + ", sex=" + sex + ", birth=" + birth
				+ ", phone=" + phone + ", email=" + email + ", picture=" + picture + ", deptId="
				+ deptId + ", deptName=" + deptName + ", positionId=" + positionId
				+ ", positionName=" + positionName + ", managerId=" + managerId + ", managerName="
				+ managerName + ", roleIds=" + roleIds + ", roleNames=" + roleNames
				+ ", economyNo=" + economyNo + ", roomNo=" + roomNo + ", region=" + region
				+ ", demo=" + demo + ", createTime=" + createTime + ", updateTime=" + updateTime
				+ "]";
	}

}
