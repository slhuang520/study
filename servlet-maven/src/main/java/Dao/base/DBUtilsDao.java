package Dao.base;

import java.lang.reflect.InvocationTargetException;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.handlers.BeanHandler;
import org.apache.commons.dbutils.handlers.BeanListHandler;
import org.apache.commons.dbutils.handlers.KeyedHandler;
import org.apache.commons.dbutils.handlers.ScalarHandler;
import utils.ReflectUtils;

/**
 * 
 * 使用 DBUtils 实现对数据的 CRUD 基本操作
 * 
 * @author <a href="mailto:1772849305@qq.com">Dreamcatcher</a>
 * 
 * @version 1.0
 * 
 * @param T
 *            具体操作的实体类型
 * 
 */
public class DBUtilsDao<T> implements IDBUtilsDao<T> {

	/**
	 * DBUtils 的查询器，是线程安全的
	 */
	private QueryRunner runner = null;

	/**
	 * 泛型的类型
	 */
	private Class<T> clazz = null;

	@SuppressWarnings("unchecked")
	public DBUtilsDao() {
		runner = new QueryRunner();
		clazz = (Class<T>) ReflectUtils.getSupperClassGenricType(getClass());
	}

	public int[] batch(Connection connection, String sql, Object[]... args) throws SQLException {
		return runner.batch(connection, sql, args);
	}

	public <E> E queryForValue(Connection connection, String sql, Object... args)
			throws SQLException {
		return runner.query(connection, sql, new ScalarHandler<E>(), args);
	}

	public List<T> queryList(Connection connection, String sql, Object... args)
			throws SQLException, InstantiationException, IllegalAccessException,
			InvocationTargetException {
		return runner.query(connection, sql, new BeanListHandler<T>(clazz), args);
	}

	public T query(Connection connection, String sql, Object... args)
			throws InstantiationException, IllegalAccessException, InvocationTargetException,
			SQLException {
		return runner.query(connection, sql, new BeanHandler<T>(clazz), args);
	}

	public int update(Connection connection, String sql, Object... args) throws SQLException {
		return runner.update(connection, sql, args);
	}

	public int insert(Connection connection, String sql, Object... args) throws SQLException {
		Map<Long, Map<String, Object>> map = runner.insert(connection, sql,
				new KeyedHandler<Long>(), args);
		// 取得自动生成的 ID
		int[] autoIds = new int[map.size()];
		int i = 0;
		for (Entry<Long, Map<String, Object>> entry : map.entrySet()) {
			autoIds[i++] = Integer.parseInt(entry.getKey().toString());
		}
		return autoIds[0];
		// return inserBatch(connection, sql, args)[0];
	}

	public int[] inserBatch(Connection connection, String sql, Object[]... args)
			throws SQLException {
		// 可以将 【Statement.RETURN_GENERATED_KEYS】 传入 KeyedHandler 构造方法中,
		// 但不能传入其他 column 字段，因为里面只包含这一个字段
		// Map<Long, Map<String, Object>> map = runner.insert(connection, sql,
		// new KeyedHandler<Long>(Statement.RETURN_GENERATED_KEYS), args);

		// 也可以将 index 下标 【1】 传入
		Map<Long, Map<String, Object>> map = runner.insertBatch(connection, sql,
				new KeyedHandler<Long>(1), args);

		// 当然也可以为空，默认就是获取自动生成的 ID
		// Map<Long, Map<String, Object>> map = runner.insert(connection, sql,
		// new KeyedHandler<Long>(), args);

		// 取得自动生成的 ID
		int[] autoIds = new int[map.size()];
		int i = 0;
		for (Entry<Long, Map<String, Object>> entry : map.entrySet()) {
			autoIds[i++] = Integer.parseInt(entry.getKey().toString());
		}
		return autoIds;
	}
}
