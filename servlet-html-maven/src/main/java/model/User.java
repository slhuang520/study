package model;

import model.base.BaseModel;

public class User extends BaseModel {
    private String name;
    private String password;
    private String deptId;
    private String deptName;
    private Dept dept;

    public User() {

    }

    public User(String id) {
        this.setId(id);
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

    public String getDeptId() {
        return deptId;
    }

    public void setDeptId(String deptId) {
        this.deptId = deptId;
        if (dept == null) {
            dept = new Dept();
            dept.setId(deptId);
        }
    }

    public String getDeptName() {
        return deptName;
    }

    public void setDeptName(String deptName) {
        this.deptName = deptName;
        if (dept == null){
            dept = new Dept();
        }
        dept.setName(deptName);
    }

    public Dept getDept() {
        return dept;
    }

    public void setDept(Dept dept) {
        this.dept = dept;
    }
}
