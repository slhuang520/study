package service.impl;

import dao.UserDao;
import model.User;
import model.base.Pager;
import service.UserService;
import service.base.BaseService;
import utils.JDBCUtils;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.http.HttpSession;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.Map;

public class UserServiceImpl extends BaseService<User> implements UserService {

    private UserDao userDao;
    private static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);
    private static final String USER_DEPT_COLUMNS =
            "a.id, " +
            "a.name, " +
            "a.password, " +
            "a.group_id as groupId, " +
            "b.name as groupName, " +
            "b.dept_id as deptId, " +
            "c.name as deptName,  " +
            "a.create_by as createId, " +
            "a.create_date as createDate, " +
            "a.update_by as updaterId, " +
            "a.update_date as updateDate ";
    private static final String JOIN_TABLES = "left join t_group b on b.id = a.group_id " +
            "inner join t_dept c on c.id = b.dept_id ";

    public UserServiceImpl(HttpSession session) {
        super(session);
        this.userDao = new UserDao();
    }

    @Override
    public Map<String, Object> findAll() throws SQLException {
        return findAll(new User());
    }

    @Override
    public Map<String, Object> findAll(User user) throws SQLException {
        logger.info("findAll({}) started..", user);
        Connection connection = JDBCUtils.getConnection();
        StringBuffer sql = searchSQL();
        StringBuffer countSql = new StringBuffer();
        List<Object> params = new ArrayList<>();
        countSql.append("select count(*) from t_user a where 1=1");

        if (StringUtils.isNotEmpty(user.getName())) {
            params.add(user.getName());
            sql.append(NAME_SEARCH_SQL);
            countSql.append(NAME_SEARCH_SQL);
        }

        addOperatorSearch(user, params, sql);
        addOperatorSearch(user, params, countSql);
        System.out.println("sql:" + sql);
        System.out.println("params:" + Collections.singletonList(params).toString());

        Pager pager = user.getPager();
        addPageSearch(pager, sql);

        Map<String, Object> result = new HashMap<>();
        result.put("userList", userDao.queryList(connection, sql.toString(), params.toArray()));
        System.out.println("-------------->");
        System.out.println(user);
        Long count = userDao.queryForValue(connection, countSql.toString(), params.toArray());
        System.out.println(count);
        pager.setRecords(Integer.parseInt(String.valueOf(count)));
        pager.setTotal((int)Math.ceil(count / pager.getPageSize()));
        result.put("pager", pager);
        return result;
    }

    private StringBuffer searchSQL() {
        StringBuffer sql = new StringBuffer("select ");
        sql.append(USER_DEPT_COLUMNS);
        sql.append("from t_user a ");
        sql.append(JOIN_TABLES);
        sql.append("where 1=1 ");
        return sql;
    }

    @Override
    public int insert(User user) throws SQLException {
        return 0;
    }

    @Override
    public int update(User user) throws SQLException {
        return 0;
    }

    @Override
    public int delete(String id) throws SQLException {
        return 0;
    }

    @Override
    public int delete(User user) throws SQLException {
        return 0;
    }

    @Override
    public int deleteByLogic(String id) throws SQLException {
        return 0;
    }

    @Override
    public int deleteByLogic(User user) throws SQLException {
        return 0;
    }

    @Override
    public User get(String id) throws SQLException {
        return null;
    }

    @Override
    public User find(User user) throws SQLException {
        logger.info("find({}) started..", user);
        Connection connection = JDBCUtils.getConnection();
        StringBuffer sql = searchSQL();
        List<Object> params = new ArrayList<>();

        if (StringUtils.isNotEmpty(user.getName())) {
            params.add(user.getName());
            sql.append("and a.name = ? ");
        }

        if (StringUtils.isNotEmpty(user.getPassword())) {
            params.add(user.getPassword());
            sql.append("and a.password = ? ");
        }

        System.out.println("sql:" + sql);
        System.out.println("params:" + params.toString());
        return userDao.query(connection, sql.toString(), params.toArray());
    }
}
