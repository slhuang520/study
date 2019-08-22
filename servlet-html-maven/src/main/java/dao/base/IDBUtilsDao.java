package dao.base;

import java.sql.Connection;
import java.sql.SQLException;

public interface IDBUtilsDao<T> extends IBaseDao<T> {

	/**
	 * 多条记录插入操作<br>
	 * 只能处理 INSERT<br>
	 * 对于 INSERT 操作，若 SQL 语句操作成功，返回自动生成的主键 KEY
	 * 
	 * @param connection
	 *            数据库连接
	 * 
	 * @param sql
	 *            执行给定 SQL 语句，该语句可能为 INSERT 语句,或者不返回任何内容的 SQL 语句（如 SQL DDL 语句）。
	 * 
	 * @param args
	 *            SQL 语句参数列表(多条记录的一个二维数组列表)
	 * 
	 * @return int[]<br>
	 *         返回自动生成的主键 KEY 列表 <br>
	 * 
	 * @throws SQLException
	 *             执行更新操作异常
	 */
	int[] insertBatch(Connection connection, String sql, Object[]... args) throws SQLException;

	/**
	 * 单条记录插入操作<br>
	 * 只能处理 INSERT<br>
	 * 对于 INSERT 操作，若 SQL 语句操作成功，返回自动生成的主键 KEY
	 * 
	 * @param connection
	 *            数据库连接
	 * 
	 * @param sql
	 *            执行给定 SQL 语句，该语句可能为 INSERT 语句,或者不返回任何内容的 SQL 语句（如 SQL DDL 语句）。
	 * 
	 * @param args
	 *            SQL 语句参数列表
	 * 
	 * @return int<br>
	 *         返回自动生成的主键 KEY <br>
	 * 
	 * @throws SQLException
	 *             执行更新操作异常
	 */
	int insert(Connection connection, String sql, Object... args) throws SQLException;

}
