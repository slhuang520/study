package model.base;

import model.User;
import net.sf.json.JSON;
import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;
import utils.DateJsonValueProcessor;

import java.io.Serializable;
import java.sql.Timestamp;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class BaseModel implements Serializable {

    private String id;
    private String creatorId;
    private User creator;
    private Date createDate;
    private String updaterId;
    private User updater;
    private Date updateDate;
    private String remark;
    private int delFlg;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCreatorId() {
        return creatorId;
    }

    public void setCreatorId(String creatorId) {
        this.creatorId = creatorId;
        this.creator = new User(creatorId);
    }

    public User getCreator() {
        return creator;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public String getUpdaterId() {
        return updaterId;
    }

    public void setUpdaterId(String updaterId) {
        this.updaterId = updaterId;
        this.updater = new User(updaterId);
    }

    public User getUpdater() {
        return updater;
    }

    public Date getUpdateDate() {
        return updateDate;
    }

    public void setUpdateDate(Date updateDate) {
        this.updateDate = updateDate;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public int getDelFlg() {
        return delFlg;
    }

    public void setDelFlg(int delFlg) {
        this.delFlg = delFlg;
    }

    @Override
    public String toString() {
        JsonConfig jsonConfig = new JsonConfig();
        jsonConfig.registerJsonValueProcessor(Timestamp.class, new DateJsonValueProcessor());
        jsonConfig.registerJsonValueProcessor(Date.class, new DateJsonValueProcessor());
        Map<String, Object> map = new HashMap<>();
        map.put(getClass().getName(), this);

        return JSONObject.fromObject(map, jsonConfig).toString();
    }
}
