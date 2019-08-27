package service.impl;

import dao.DeptDao;
import model.Dept;
import model.base.Pager;
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
import java.util.*;

/**
 * Dept Service Implement
 *
 * @author HuangSL
 * @version 1.0
 * @since 201/08/22
 */
public class DeptServiceImpl extends BaseService<Dept> implements DeptService {

    private DeptDao deptDao = new DeptDao();
    private static final Logger logger = LoggerFactory.getLogger(DeptServiceImpl.class);
    private static final String DEPT_COLUMNS_SEARCH = " a.id, a.name, a.create_by as createId, a.create_date as createDate, a.update_by as updateId, a.update_date as updateDate, b.name as createName, c.name updateName ";
    private static final String LEFT_JOIN_USER = " left join user b on b.id=a.create_by left join user c on c.id=a.update_by ";
    private static final String FIND_SORT_SQL = " order by a.create_date desc ";
    private static final String DEPT_INSERT_SQL = "insert into dept (id, name, create_by, create_date, update_by, update_date) values (?, ?, ?, ?, ?, ?)";

    public DeptServiceImpl(HttpSession session) {
        super(session);
    }

    @Override
    public Map<String, Object> findAll() throws SQLException {
        return findAll(new Dept());
    }

    @Override
    public Map<String, Object> findAll(Dept dept) throws SQLException {
        logger.info("findAll({}) started..", dept);
        StringBuffer sql = new StringBuffer();
        StringBuffer countSql = new StringBuffer();
        List<Object> params = new ArrayList<>();
        sql.append("select");
        sql.append(DEPT_COLUMNS_SEARCH);
        sql.append("from dept a");
        sql.append(LEFT_JOIN_USER);
        sql.append("where 1=1");
        countSql.append("select count(*) from dept a where 1=1");

        if (StringUtils.isNotEmpty(dept.getName())) {
            params.add(dept.getName());
            sql.append(NAME_SEARCH_SQL);
            countSql.append(NAME_SEARCH_SQL);
        }

        addOperatorSearch(dept, params, sql);
        addOperatorSearch(dept, params, countSql);
        sql.append(FIND_SORT_SQL);

        Pager pager = dept.getPager();
        addPageSearch(pager, sql);

        Map<String, Object> result = new HashMap<>();
        Connection connection = JDBCUtils.getConnection();
        result.put("deptList", deptDao.queryList(connection, sql.toString(), params.toArray()));
        System.out.println("-------------->");
        System.out.println(dept);
        Long count = deptDao.queryForValue(connection, countSql.toString(), params.toArray());
        System.out.println(count);
        pager.setRecords(Integer.parseInt(String.valueOf(count)));
        pager.setTotal((int)Math.ceil((double)count / pager.getPageSize()));
        if (pager.getPageNo() > 2) {
            pager.setStart(pager.getPageNo() - 2);
        }

        if (pager.getTotal() - pager.getPageNo() > 2) {
            pager.setEnd(pager.getPageNo() + 2);
        }

        result.put("pager", pager);
        return result;
    }

    @Override
    @Transactional
    public int insert(Dept dept) throws SQLException {
        this.preInsert(dept);
        logger.info("insert({}) started..", dept);

        if (StringUtils.isEmpty(dept.getId())) {
            logger.error("insert id is empty.");
            return -1;
        }

        if (StringUtils.isEmpty(dept.getName())) {
            logger.error("insert name is empty.");
            return -1;
        }

        List<Object> params = new ArrayList<Object>();
        params.add(dept.getId());
        params.add(dept.getName());
        insertOperatorParams(dept, params);

        Connection connection = JDBCUtils.getConnection();
//        deptDao.insert(connection, DEPT_INSERT_SQL, params.toArray());
        return deptDao.update(connection, DEPT_INSERT_SQL, params.toArray());
    }

    @Override
    @Transactional
    public int update(Dept dept) throws SQLException {
        logger.info("update({}) started..", dept);
        this.preUpdate(dept);

        List<Object> params = new ArrayList<>();
        StringBuffer sql = new StringBuffer();

        if (StringUtils.isEmpty(dept.getId())) {
            logger.error("update id is empty.");
            return -1;
        }

        sql.append("update dept set ");
        if (StringUtils.isNotEmpty(dept.getName())) {
            params.add(dept.getName());
            sql.append("name = ? ");
        } else {
            logger.error("update name is empty.");
            return -1;
        }

        updateOperator(dept, params, sql);
        sql.append("where id = ?");
        params.add(dept.getId());

        Connection connection = JDBCUtils.getConnection();
        return deptDao.update(connection, sql.toString(), params.toArray());
    }

    @Override
    @Transactional
    public int delete(String id) throws SQLException {
        Dept dept = new Dept();
        dept.setId(id);
        return delete(dept);
    }

    @Override
    @Transactional
    public int delete(Dept dept) throws SQLException {
        logger.info("delete({}) started..", dept);
        List<Object> params = new ArrayList<>();
        StringBuffer sql = new StringBuffer("delete a from dept a where 1=1");

        addIdNameSearch(dept, params, sql);
        addOperatorSearch(dept, params, sql);
        Connection connection = JDBCUtils.getConnection();
        return deptDao.update(connection, sql.toString(), params.toArray());
    }

    private void addIdNameSearch(Dept dept, List<Object> params, StringBuffer sql) {
        if (StringUtils.isNotEmpty(dept.getId())) {
            params.add(dept.getId());
            sql.append(" and a.id = ?");
        }

        if (StringUtils.isNotEmpty(dept.getName())) {
            params.add(dept.getName());
            sql.append(" and a.name = ?");
        }
    }

    @Override
    @Transactional
    public int deleteByLogic(String id) throws SQLException {
        Dept dept = new Dept();
        dept.setId(id);
        return deleteByLogic(dept);
    }

    @Override
    @Transactional
    public int deleteByLogic(Dept dept) throws SQLException {
        logger.info("deleteByLogic({}) started..", dept);
        this.preUpdate(dept);

        List<Object> params = new ArrayList<>();
        StringBuffer sql = new StringBuffer();

        if (StringUtils.isEmpty(dept.getId())) {
            logger.error("update id is empty.");
            return -1;
        }

        sql.append("update dept a set a.del_flg = 1");
        updateOperator(dept, params, sql);
        sql.append(" where 1=1");

        addIdNameSearch(dept, params, sql);
//        addOperatorSearch(dept, params, sql);

        Connection connection = JDBCUtils.getConnection();
        return deptDao.update(connection, sql.toString(), params.toArray());
    }

    @Override
    public Dept get(String id) throws SQLException {
        logger.info("get({}) started..", id);
        StringBuffer sql = new StringBuffer("select");
        sql.append(DEPT_COLUMNS_SEARCH);
        sql.append("from dept a where a.id = ?");
        Connection connection = JDBCUtils.getConnection();
        return deptDao.query(connection, sql.toString(), id);
    }
}
