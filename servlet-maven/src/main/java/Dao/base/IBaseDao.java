package Dao.base;

import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;

import javax.resource.NotSupportedException;

public interface IBaseDao<T> {

	/**
	 * 批量处理<br>
	 * 可以处理 INSERT UPDATE 或 DELETE 方法<br>
	 * 该操作对于 INSERT UPDATE 或 DELETE 方法都只会返回影响的条数<br>
	 * 需要在外层关闭自动提交
	 * 
	 * @param connection
	 *            数据库连接
	 * 
	 * @param sql
	 *            批量操作 SQL
	 * 
	 * @param args
	 *            SQL 语句参数
	 * 
	 * @return int[] 每条语句的影响条目
	 * 
	 * @throws SQLException
	 *             批量处理异常
	 * @throws NotSupportedException
	 * 
	 */
	int[] batch(Connection connection, String sql, Object[]... args) throws SQLException,
			NotSupportedException;

	/**
	 * 返回一个具体的值<br>
	 * 
	 * <pre>
	 * 总人数、总条数、平均值、单个属性值(员工的 email)
	 * </pre>
	 * 
	 * @param connection
	 *            数据库连接
	 * 
	 * @param sql
	 *            查询 SQL 语句
	 * 
	 * @param args
	 *            查询参数列表
	 * 
	 * @return E 查询的一个结果值
	 * 
	 * @throws SQLException
	 * 
	 */
	<E> E queryForValue(Connection connection, String sql, Object... args) throws SQLException;

	/**
	 * 多条记录查询(查询列表)<br>
	 * 
	 * 使用反射和 BeanUtils，获取查询结果的通用方法，通过 SQL 语句和需要获取的实体类型，获取查询结果集<br>
	 * 要求：列的别名需要与 Class 实体类对应的属性名相同 Reflect
	 * 
	 * @param connection
	 *            数据库连接
	 * 
	 * @param sql
	 *            查询 SQL 语句
	 * 
	 * @param args
	 *            查询参数列表
	 * 
	 * @return List<T> 返回的结果集
	 * @throws IOException
	 * @throws SQLException
	 * @throws IllegalAccessException
	 * @throws InstantiationException
	 * @throws InvocationTargetException
	 * 
	 */
	List<T> queryList(Connection connection, String sql, Object... args) throws SQLException,
			InstantiationException, IllegalAccessException, InvocationTargetException;

	/**
	 * 单个对象查询<br>
	 * 
	 * 使用反射和 BeanUtils，获取查询结果的通用方法，通过 SQL 语句和需要获取的实体类型，获取查询结果集<br>
	 * 要求：列的别名需要与 Class 实体类对应的属性名相同
	 * 
	 * @param connection
	 *            数据库连接
	 * 
	 * @param sql
	 *            查询 SQL 语句
	 * 
	 * @param args
	 *            查询参数列表
	 * 
	 * @return List<T> 返回的结果集
	 * 
	 * @throws InvocationTargetException
	 * @throws IllegalAccessException
	 * @throws InstantiationException
	 * @throws SQLException
	 * 
	 */
	T query(Connection connection, String sql, Object... args) throws InstantiationException,
			IllegalAccessException, InvocationTargetException, SQLException;

	/**
	 * 更新操作<br>
	 * 可处理 UPDATE、INSERT 或 DELETE<br>
	 * 1.对于 UPDATE 或 DELETE 操作，返回 SQL语句影响的行数<br>
	 * 2.对于 INSERT 操作，若 SQL 语句操作成功，返回自动生成的主键 KEY
	 * 
	 * @param connection
	 *            数据库连接
	 * 
	 * @param sql
	 *            执行给定 SQL 语句，该语句可能为 INSERT、UPDATE 或 DELETE 语句,或者不返回任何内容的 SQL
	 *            语句（如 SQL DDL 语句）。
	 * 
	 * @param args
	 *            SQL 语句参数列表
	 * 
	 * @return int<br>
	 *         (1) 对于 SQL 数据操作语言 (DML) 语句，返回行计数<br>
	 *         (2) 对于什么都不返回的 SQL 语句，返回 0
	 * 
	 * @throws SQLException
	 *             执行更新操作异常
	 */
	int update(Connection connection, String sql, Object... args) throws SQLException;

}
