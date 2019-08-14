package cn.com.love.hsl.model;

import cn.com.love.hsl.controller.DeptController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component
public class Dept extends BaseModel {
    private String name;

    private final static Logger logger = LoggerFactory.getLogger(DeptController.class);

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
