package cn.com.love.hsl.service;

import cn.com.love.hsl.model.BaseModel;
import cn.com.love.hsl.model.User;

import java.util.Date;
import java.util.UUID;

public class BaseService {

    protected void preInsert(BaseModel entity) {
        entity.setId(UUID.randomUUID().toString().replaceAll("-", ""));
        entity.setCreator(new User());
        entity.setCreateDate(new Date());
        entity.setUpdater(new User());
        entity.setUpdateDate(new Date());
    }

    protected void preUpdate(BaseModel entity) {
        entity.setUpdater(new User());
        entity.setUpdateDate(new Date());
    }
}
