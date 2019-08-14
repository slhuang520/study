package cn.com.love.hsl.model;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.Serializable;
import java.util.Date;

public class BaseModel implements Serializable {
    private String id;
    private User creator;
    private Date createDate;
    private User Updater;
    private Date updateDate;

    private final static Logger logger = LoggerFactory.getLogger(BaseModel.class);

    public String getId() {
        //String.format("Hello, %s!", name);
        logger.info(this.getClass().getName() + "{} {}", ".get(" + id + ")", "started..");
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public User getCreator() {
        return creator;
    }

    public void setCreator(User creator) {
        this.creator = creator;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public User getUpdater() {
        return Updater;
    }

    public void setUpdater(User updater) {
        Updater = updater;
    }

    public Date getUpdateDate() {
        return updateDate;
    }

    public void setUpdateDate(Date updateDate) {
        this.updateDate = updateDate;
    }
}
