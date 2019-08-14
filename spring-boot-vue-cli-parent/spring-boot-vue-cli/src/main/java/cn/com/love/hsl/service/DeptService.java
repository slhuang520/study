package cn.com.love.hsl.service;

import java.util.List;

public interface DeptService<T> {
    List<T> findAll();

    int insert(T dept);

    int update(T dept);

    void delete(String id);

    T get(String id);
}
