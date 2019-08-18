package Service;

import Dao.DeptDao;
import model.Dept;
import utils.JDBCUtils;

import java.lang.reflect.InvocationTargetException;
import java.sql.Connection;
import java.sql.SQLException;

public class DeptService {

    private DeptDao deptDao = new DeptDao();

    public void get() {
        System.out.println("deptservice ......get...");
        StringBuilder sql = new StringBuilder("select id, name, room_no roomNo, demo, create_time createTime, update_time updateTime from t_dept");
        try {
            Connection connection = JDBCUtils.getConnection();
            Dept dept = deptDao.query(connection, sql.toString());
            System.out.println(dept);
        } catch (InstantiationException e) {
            e.printStackTrace();
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        } catch (InvocationTargetException e) {
            e.printStackTrace();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
