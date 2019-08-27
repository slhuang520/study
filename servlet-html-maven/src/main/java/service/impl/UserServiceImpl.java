package service.impl;

import dao.UserDao;
import model.User;
import service.UserService;
import service.base.BaseService;
import utils.JDBCUtils;

import javax.servlet.http.HttpSession;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.Map;

public class UserServiceImpl extends BaseService<User> implements UserService {

    private UserDao userDao;

    public UserServiceImpl(HttpSession session) {
        super(session);
        this.userDao = new UserDao();
    }

    @Override
    public User get(String id) throws SQLException {
        return null;
    }

    @Override
    public User find(User user) throws SQLException {
        Connection connection = JDBCUtils.getConnection();
        String sql = "select a.id, a.name, a.dept as deptId, b.name as deptName, a.create_by as creatorId," +
                " a.create_date as createDate, a.update_by as updateId, a.update_date as updateDate from user a" +
                " left join dept b on b.id = a.dept where a.name = ? and a.password = ?";

        return userDao.query(connection, sql, user.getName(), user.getPassword());
    }

    @Override
    public Map<String, Object> findAll() throws SQLException {
        return null;
    }

    @Override
    public Map<String, Object> findAll(User user) throws SQLException {
        return null;
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
    public int delete(String id) throws SQLException {
        return 0;
    }
}
