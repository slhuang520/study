package cn.com.love.hsl.service.impl;

import cn.com.love.hsl.controller.DeptController;
import cn.com.love.hsl.mapper.DeptMapper;
import cn.com.love.hsl.model.Dept;
import cn.com.love.hsl.service.BaseService;
import cn.com.love.hsl.service.DeptService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class DeptServiceImpl extends BaseService implements DeptService<Dept> {
    @Autowired
    private DeptMapper deptMapper;

    private final static Logger logger = LoggerFactory.getLogger(DeptController.class);
    @Override
    public List<Dept> findAll() {
        return deptMapper.findAll();
    }

    @Override
    @Transactional
    public int insert(Dept dept) {
        this.preInsert(dept);
        return deptMapper.insert(dept);
    }

    @Override
    @Transactional
    public int update(Dept dept) {
        this.preUpdate(dept);
        return deptMapper.update(dept);
    }

    @Override
    @Transactional
    public void delete(String id) {
        deptMapper.delete(id);
    }

    @Override
    public Dept get(String id) {
        logger.info(this.getClass().getName() + "{} {}", ".get(" + id + ")", "started..");
        return deptMapper.get(id);
    }
}
