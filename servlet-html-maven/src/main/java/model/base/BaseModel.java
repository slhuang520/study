package model.base;

import model.User;
import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;
import utils.DateJsonValueProcessor;

import java.io.Serializable;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * Base entity
 *
 * @author HuangSL
 * @version 1.0
 * @since 201/08/22
 *
 */
public class BaseModel implements Serializable {
    private String id;
    private String createId;
    private String createName;
    private User creator;
    private Date createDate;
    private String updateId;
    private String updateName;
    private User updater;
    private Date updateDate;
    private Pager pager;

    public String getId() {
        //String.format("Hello, %s!", name);
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCreateId() {
        return createId;
    }

    public void setCreateId(String createId) {
        this.createId = createId;
        this.creator = new User(createId);
    }

    public String getCreateName() {
        return createName;
    }

    public void setCreateName(String createName) {
        this.createName = createName;
        if (creator == null) {
            creator = new User();
        }
        creator.setName(createName);
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

    public String getUpdateId() {
        return updateId;
    }

    public void setUpdateId(String updateId) {
        this.updateId = updateId;
        this.updater = new User(updateId);
    }

    public String getUpdateName() {
        return updateName;
    }

    public void setUpdateName(String updateName) {
        this.updateName = updateName;
        if (updater == null) {
            updater = new User();
        }
        updater.setName(updateName);
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

    public Pager getPager() {
        return pager;
    }

    public void setPager(Pager pager) {
        this.pager = pager;
    }

    @Override
    public String toString() {
        Map<String, Object> res = new HashMap<>();
        res.put(this.getClass().getSimpleName(), this);

        JsonConfig jsonConfig = new JsonConfig();
        jsonConfig.registerJsonValueProcessor(java.util.Date.class, new DateJsonValueProcessor());
        return JSONObject.fromObject(res, jsonConfig).toString();
    }
}
