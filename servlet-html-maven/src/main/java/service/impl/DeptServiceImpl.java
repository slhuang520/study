package service.impl;

import dao.DeptDao;
import model.Dept;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import service.base.BaseService;
import service.DeptService;
import utils.JDBCUtils;

import javax.servlet.http.HttpSession;
import javax.transaction.Transactional;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class DeptServiceImpl extends BaseService<Dept> implements DeptService {

    private DeptDao deptDao;
    private static final Logger logger = LoggerFactory.getLogger(DeptServiceImpl.class);

    public DeptServiceImpl(HttpSession session) {
        super(session);
        this.deptDao = new DeptDao();
    }

    @Override
    public Dept get(String id) throws SQLException {
        Connection connection = JDBCUtils.getConnection();
        String sql = "select id, name, create_by as creatorId, create_date as createDate, update_by as updaterId, update_date as updateDate from dept where id = ?";
        return deptDao.query(connection, sql, id);
    }

    @Override
    public Dept find(Dept dept) throws SQLException {
        Connection connection = JDBCUtils.getConnection();
        StringBuffer sql = new StringBuffer();
        List<Object> params = new ArrayList<>();
        sql.append("select * from dept where 1=1");

        if (StringUtils.isNotEmpty(dept.getId())) {
            params.add(dept.getId());
            sql.append(" and id = ?");
        }

        if (StringUtils.isNotEmpty(dept.getName())) {
            params.add(dept.getName());
            sql.append(" and name = ?");
        }

        return deptDao.query(connection, sql.toString(), params.toArray());
    }

    @Override
    public List<Dept> findAll() throws SQLException {
        return findAll(new Dept());
    }

    @Override
    public List<Dept> findAll(Dept dept) throws SQLException {
        Connection connection = JDBCUtils.getConnection();
        StringBuffer sql = new StringBuffer();
        List<Object> params = new ArrayList<>();
        sql.append("select * from dept where 1=1");

        if (StringUtils.isNotEmpty(dept.getId())) {
            params.add(dept.getId());
            sql.append(" and id = ?");
        }

        if (StringUtils.isNotEmpty(dept.getName())) {
            params.add(dept.getName());
            sql.append(" and name like concat('%', ?, '%')");
        }

        addOperatorSearch(dept, params, sql);
        return deptDao.queryList(connection, sql.toString(), params.toArray());
    }

    @Override
    @Transactional
    public int insert(Dept dept) throws SQLException {
        preInsert(dept);

        if (StringUtils.isEmpty(dept.getId())){
            logger.error(getClass().getName() + "insert id is empty");
            return -1;
        }

        if (StringUtils.isEmpty(dept.getName())) {
            logger.error(getClass().getName() + "insert name is empty");
            return -1;
        }

        Connection connection = JDBCUtils.getConnection();
        StringBuffer sql = new StringBuffer();
        List<Object> params = new ArrayList<>();
        sql.append("insert into dept (id, name, create_by, create_date, update_by, update_date) values (?, ?, ?, ?, ?, ?)");

        params.add(dept.getId());
        params.add(dept.getName());
        params.add(dept.getCreator().getId());
        params.add(dept.getCreateDate());
        params.add(dept.getUpdater().getId());
        params.add(dept.getUpdateDate());

        return deptDao.insert(connection, sql.toString(), params.toArray());
    }

    @Override
    @Transactional
    public int update(Dept dept) throws SQLException {
        if (StringUtils.isEmpty(dept.getId())) {
            logger.error(getClass().getName() + "update id is empty");
            return -1;
        }

        preUpdate(dept);
        Connection connection = JDBCUtils.getConnection();
        StringBuffer sql = new StringBuffer();
        List<Object> params = new ArrayList<>();
        sql.append("update dept set id = ?");
        params.add(dept.getId());

        if (StringUtils.isNotEmpty(dept.getName())) {
            params.add(dept.getName());
            sql.append(" , name = ?");
        }

        if (Objects.isNull(dept.getUpdater())) {
            params.add(dept.getUpdater().getId());
            sql.append(" , update_by = ?");
        }

        if (dept.getUpdateDate() != null) {
            params.add(dept.getUpdateDate());
            sql.append(" , update_date = ?");
        }

        sql.append(" where id = ?");
        params.add(dept.getId());

        return deptDao.update(connection, sql.toString(), params.toArray());
    }

    @Override
    @Transactional
    public int delete(Dept dept) throws SQLException {
        preUpdate(dept);

        Connection connection = JDBCUtils.getConnection();
        StringBuffer sql = new StringBuffer();
        sql.append("update dept set del_flg = 1");
        List<Object> params = new ArrayList<>();

        if (Objects.isNull(dept.getUpdater())) {
            params.add(dept.getUpdater().getId());
            sql.append(" , update_by = ?");
        }

        if (dept.getUpdateDate() != null) {
            params.add(dept.getUpdateDate());
            sql.append(" , update_date = ?");
        }

        params.add(dept.getId());
        sql.append(" where id = ?");
        return deptDao.update(connection, sql.toString(), params.toArray());
    }

    @Override
    @Transactional
    public int delete(String id) throws SQLException {
        Dept dept = new Dept();
        dept.setId(id);
        return delete(dept);
    }
}
