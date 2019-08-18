package servlet;

import java.io.IOException;
import java.lang.reflect.Method;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import Dao.PlatformDao;
import com.fasterxml.jackson.databind.ObjectMapper;
import model.Platform;
import utils.JDBCUtils;

public class PlatformServlet extends HttpServlet {


	/**
	 * 
	 */
	private static final long serialVersionUID = -657514548602733878L;

	/**
	 * The doGet method of the servlet. <br>
	 *
	 * This method is called when a form has its tag value method equals to get.
	 * 
	 * @param request the request send by the client to the server
	 * @param response the response send by the server to the client
	 * @throws ServletException if an error occurred
	 * @throws IOException if an error occurred
	 */
	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		this.doPost(request, response);
	}

	/**
	 * The doPost method of the servlet. <br>
	 *
	 * This method is called when a form has its tag value method equals to post.
	 * 
	 * @param request the request send by the client to the server
	 * @param response the response send by the server to the client
	 * @throws ServletException if an error occurred
	 * @throws IOException if an error occurred
	 */
	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		String methodName = request.getParameter("method");
		Connection connection = null;
		
		try {
			connection = JDBCUtils.getConnection();
			Method method = getClass().getDeclaredMethod(methodName, Connection.class ,HttpServletRequest.class, HttpServletResponse.class);
			method.invoke(this, connection, request, response);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				JDBCUtils.release(connection);
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
	}
	
	/**
	 * 分页显示所有平台信息
	 * 
	 * @param connection
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	public void list(Connection connection, HttpServletRequest request,
			HttpServletResponse response) throws Exception {

		PlatformDao platformDao = new PlatformDao();

		StringBuilder sql = new StringBuilder("select id, name, region, demo, create_time createTime, update_time updateTime from t_platform");
		String sqlCount = "select count(*) as count from t_platform";

		List<Object> queryObjects = new ArrayList<Object>();

		// 查询条件拼接
//		String user = request.getParameter("user");
//		if (user != null && !"".equals(user)) {
//			queryObjects.add("%" + user + "%");
//			sql += " and name like ?";
//			sqlCount += " and name like ?";
//		}
//
//		String dateFrom = request.getParameter("dateFrom");
//		if (dateFrom != null && !"".equals(dateFrom)) {
//			// DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
//			// dateFormat.parse(dateFrom)
//			queryObjects.add(Date.valueOf(dateFrom));
//			sql += " and create_date >= ?";
//			sqlCount += " and create_date >= ?";
//		}
//
//		String dateTo = request.getParameter("dateTo");
//		if (dateTo != null && !"".equals(dateTo)) {
//			queryObjects.add(Date.valueOf(dateTo));
//			sql += " and create_date <= ?";
//			sqlCount += " and create_date <= ?";
//		}

		// 排序
		String sort = request.getParameter("sort");
		String order = request.getParameter("order");
		System.out.println("sort " + sort);
		System.out.println("order " + order);
		if (sort != null && !"".equals(sort)) {
			sql.append(" order by " + sort + " " + order);
		}

		// 分页
		String page = request.getParameter("page");
		String pageSize = request.getParameter("rows");
		if (page == null || "".equals(page) || "0".equals(page)) {
			page = "1";
		}
		if (pageSize == null || "".equals(pageSize) || "0".equals(pageSize)) {
			pageSize = "10";
		}
		Integer first = Integer.parseInt(pageSize) * (Integer.parseInt(page) - 1);
		sql.append(" limit " + first + ", " + pageSize);
		System.out.println(sql);

		// 查询DB
		List<Platform> platforms = platformDao.queryList(connection, sql.toString(), queryObjects.toArray());
		Long count = platformDao.queryForValue(connection, sqlCount, queryObjects.toArray());

		// 返回 JSON 数据
		ObjectMapper mapper = new ObjectMapper();
		System.out.println(platforms);
		System.out.println(mapper.writeValueAsString(platforms));
		String res = "{\"total\":" + count + ",\"rows\":" + mapper.writeValueAsString(platforms) + "}";
		response.setContentType("text/javascript;charset=UTF-8");
		System.out.println(res);
		response.getWriter().write(res);
	}

	/**
	 * 更新平台信息
	 * 
	 * @param connection
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	public void update(Connection connection, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		// 更新参数
		List<Object> params = new ArrayList<Object>();
		// 更新 SQL 语句
		StringBuilder sql = new StringBuilder();
		sql.append("update t_platform set ");

		// 拼接更新语句
		String id = request.getParameter("row[id]");
		if (id == null || "".equals(id.trim()))
			throw new IllegalArgumentException("修改平台的ID不能为空或 Null");
		
		String name = request.getParameter("row[name]");
		if (name != null && !"".equals(name.trim())) {
			params.add(name);
			sql.append("name = ? ");
		}
		
		String region = request.getParameter("row[region]");
		params.add(region);
		sql.append(", region = ? ");
		
		String demo = request.getParameter("row[demo]");
		params.add(demo);
		sql.append(", demo = ? ");

		// 设置更新数据的 ID
		params.add(id);
		sql.append("where id = ?");
		
		System.out.println("name:" + name + " region:" + region + " demo:" + demo);
		System.out.println("params:" + params);

		// 更新到 DB
		PlatformDao platformDao = new PlatformDao();
		boolean flg = false;
		try {
			platformDao.update(connection, sql.toString(), params.toArray());
			flg = true;
		} catch (Exception e) {
			throw e;
		} finally {
			// 返回 JSON 数据
			response.setContentType("text/javascript;charset=UTF-8");
			response.getWriter().write(String.valueOf(flg));
		}
	}

	/**
	 * 删除平台(不可以批量删除)
	 * 
	 * @param connection
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	public void delete(Connection connection, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		System.out.println("delete platform ....");
		// 获取删除的 ID (不允许批量删除)
		String id = request.getParameter("id");
		// SQL 语句
		String sql = "delete from t_platform where id = ?";

		System.out.println(sql);
		// 更新 DB
		PlatformDao platformDao = new PlatformDao();
		boolean flg = false;
		
		try {
			Integer num = platformDao.update(connection, sql, id);
			System.out.println(num);
			flg = true;
		} catch (Exception e) {
			throw e;
		} finally {
			// 返回 JSON
			response.setContentType("text/javascript;charset=UTF-8");
			response.getWriter().write(String.valueOf(flg));
		}
	}

	/**
	 * 添加平台
	 * 
	 * @param connection
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	public void save(Connection connection, HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		// 从页面获取平台信息
		String name = request.getParameter("name");
		String region = request.getParameter("region");
		String demo = request.getParameter("demo");
		System.out.println("name:" + name + "region:" + region + " demo:" + demo);

		// 拼接添加的 SQL 语句
		String sql = "insert into t_platform (name,region,demo,create_time,update_time) values (?,?,?,?,?)";
		PlatformDao platformDao = new PlatformDao();

		// 更新 DB
		boolean flg = false;
		try {
			platformDao.insert(connection, sql, name, region, demo, new Date(), new Date());
			flg = true;
		} catch (Exception e) {
			throw e;
		} finally {
			// 返回 JSON
			response.setContentType("text/javascript;charset=UTF-8");
			response.getWriter().write(String.valueOf(flg));
		}
	}

	/**
	 * 判断平台名称是否已经存在
	 * 
	 * @param connection
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	public void checkName(Connection connection, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		System.out.println("checkName start....");
		// 从页面获取平台名称
		String name = request.getParameter("platformName");
		System.out.println("name: " + name);

		// 拼接 SQL
		String sql = "select count(*) as count from t_platform where name = ?";
		
		// 查询 DB
		PlatformDao platformDao = new PlatformDao();
		Long count = platformDao.queryForValue(connection, sql, name);

		// 判断该平台名称是否已经存在
		boolean flg = false;
		if (count <= 0) {
			flg = true;
		}
		
		// 返回 JSON
		System.out.println("flg: " + flg);
		response.setContentType("text/javascript;charset=UTF-8");
		response.getWriter().write(String.valueOf(flg));
	}

}
