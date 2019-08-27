package model;

import model.base.BaseModel;

/**
 * Dept entity
 *
 * @author HuangSL
 * @version 1.0
 * @since 201/08/22
 *
 */
public class Dept extends BaseModel {
    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
