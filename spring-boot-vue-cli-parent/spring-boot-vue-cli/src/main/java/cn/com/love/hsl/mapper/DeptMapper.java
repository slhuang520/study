package cn.com.love.hsl.mapper;

import cn.com.love.hsl.model.Dept;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Component;

import java.util.List;

@Mapper
@Component
public interface DeptMapper {
    List<Dept> findAll();
    int insert(Dept dept);
    int update(Dept dept);
    void delete(String id);
    Dept get(String id);
}
