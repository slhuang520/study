package utils;

import com.alibaba.druid.pool.DruidDataSourceFactory;

import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Properties;

import javax.sql.DataSource;

/**
 * JDBC管理工具
 * 
 * @author <a href="mailto:1772849305@qq.com">Dreamcatcher</a>
 * 
 * @version 1.0
 */
public class JDBCUtils {

	// 只初始化一次数据库连接池
	private static DataSource dataSource = null;
	static {
		//dataSource = new ComboPooledDataSource("c3p0Config");
        try {
            Properties ps = new Properties();
            InputStream is = JDBCUtils.class.getClassLoader().getResourceAsStream("druid.properties");
            ps.load(is);
            System.out.println("jdbcUtils starting --------");
            System.out.println(ps);

            dataSource = DruidDataSourceFactory.createDataSource(ps);
            System.out.println("66666666--ok");
        } catch (Exception e) {
            e.printStackTrace();
        }

    }

	/**
	 * 通过 c3p0 获取数据库池中的连接
	 * 
	 * @return 数据库连接
	 * 
	 * @throws SQLException
	 *             c3p0 配置异常
	 */
	public static Connection getConnection() throws SQLException {
//		int count = 5;
//		boolean transactionCompleted = false; 
//		Connection connection = null;
//		Statement statement = null;
//		do {
//			try {
//				System.out.println("count:"+count);
//				connection = dataSource.getConnection();
//				System.out.println("connection.isClosed("+count+"):"+connection);
//				System.out.println("connection.isClosed("+count+"):"+connection.isClosed());
//				statement = connection.createStatement();
//				statement.close();
//				transactionCompleted = true;
//			} catch (SQLException  e) {
//				System.out.println("e:"+e);
//				String sqlState = e.getSQLState();
//				System.out.println("sqlState"+sqlState);
//				// 这个08S01就是这个异常的sql状态。单独处理手动重新链接就可以了。
//				if ("08S01".equals(sqlState) || "40001".equals(sqlState)){
//					count--;
//				} else {
//					count = 0;
//				}
//			}
//		} while (!transactionCompleted && (count > 0));
//		System.out.println(count);
//		System.out.println(transactionCompleted);
//		return connection;
		return dataSource.getConnection();
	}
	
	/**
	 * 释放 Statement 对象
	 * 
	 * @param statement
	 *            SQL语句对象
	 * @throws SQLException
	 */
	public static void release(Statement statement) throws SQLException {
		if (statement != null)
			statement.close();
	}

	/**
	 * 释放连接资源
	 * 
	 * @param connection
	 *            数据库连接
	 * @throws SQLException
	 */
	public static void release(Connection connection) throws SQLException {
		if (connection != null)
			connection.close();
	}

	/**
	 * 释放数据库查询结果集
	 * 
	 * @param connection
	 *            数据库查询结果集
	 * 
	 * @throws SQLException
	 */
	public static void release(ResultSet resultSet) throws SQLException {
		if (resultSet != null)
			resultSet.close();
	}

}
