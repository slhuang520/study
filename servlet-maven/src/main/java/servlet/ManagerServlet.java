package servlet;

import java.io.IOException;
import java.lang.reflect.Method;
import java.sql.Connection;
import java.sql.Date;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import Dao.ManagerDao;
import com.fasterxml.jackson.databind.ObjectMapper;
import model.Manager;
import utils.JDBCUtils;

public class ManagerServlet extends HttpServlet {

	/**
	 * 
	 */
	private static final long serialVersionUID = -7320274285596330579L;

	/**
	 * The doGet method of the servlet. <br>
	 * 
	 * This method is called when a form has its tag value method equals to get.
	 * 
	 * @param request
	 *            the request send by the client to the server
	 * @param response
	 *            the response send by the server to the client
	 * @throws ServletException
	 *             if an error occurred
	 * @throws IOException
	 *             if an error occurred
	 */
	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		this.doPost(request, response);
	}

	/**
	 * The doPost method of the servlet. <br>
	 * 
	 * This method is called when a form has its tag value method equals to
	 * post.
	 * 
	 * @param request
	 *            the request send by the client to the server
	 * @param response
	 *            the response send by the server to the client
	 * @throws ServletException
	 *             if an error occurred
	 * @throws IOException
	 *             if an error occurred
	 */
	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		String methodName = request.getParameter("method");
		Connection connection = null;

		try {
			connection = JDBCUtils.getConnection();
			Method method = getClass().getDeclaredMethod(methodName, Connection.class,
					HttpServletRequest.class, HttpServletResponse.class);
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
	 * 分页显示所有管理员信息
	 * 
	 * @param connection
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	public void list(Connection connection, HttpServletRequest request,
			HttpServletResponse response) throws Exception {

		ManagerDao userDao = new ManagerDao();

		String sql = "select id, name, password, email, sex, birth, is_sys_manager isSysManager,"
				+ " create_date createDate, update_date updateDate from t_manager where 1=1 ";
		String sqlCount = "select count(*) as count from t_manager where 1=1 ";

		List<Object> queryObjects = new ArrayList<Object>();

		// 查询条件拼接
		String user = request.getParameter("user");
		if (user != null && !"".equals(user)) {
			queryObjects.add("%" + user + "%");
			sql += " and name like ?";
			sqlCount += " and name like ?";
		}

		String dateFrom = request.getParameter("dateFrom");
		if (dateFrom != null && !"".equals(dateFrom)) {
			// DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
			// dateFormat.parse(dateFrom)
			queryObjects.add(Date.valueOf(dateFrom));
			sql += " and create_date >= ?";
			sqlCount += " and create_date >= ?";
		}

		String dateTo = request.getParameter("dateTo");
		if (dateTo != null && !"".equals(dateTo)) {
			queryObjects.add(Date.valueOf(dateTo));
			sql += " and create_date <= ?";
			sqlCount += " and create_date <= ?";
		}

		// 排序
		String sort = request.getParameter("sort");
		String order = request.getParameter("order");
		System.out.println("sort " + sort);
		System.out.println("order " + order);
		if (sort != null && !"".equals(sort)) {
			sql += " order by " + sort + " " + order;
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
		sql += " limit " + first + ", " + pageSize;
		System.out.println(sql);

		// 查询DB
		List<Manager> users = userDao.queryList(connection, sql, queryObjects.toArray());
		for (Manager user2 : users) {
			if (user2.getSex() == null)
				user2.setSex("");
		}
		Long count = userDao.queryForValue(connection, sqlCount, queryObjects.toArray());

		// 返回 JSON 数据
		ObjectMapper mapper = new ObjectMapper();
		System.out.println(users);
		System.out.println(mapper.writeValueAsString(users));
		String res = "{\"total\":" + count + ",\"rows\":" + mapper.writeValueAsString(users) + "}";
		response.setContentType("text/javascript;charset=UTF-8");
		System.out.println(res);
		response.getWriter().write(res);
	}

	/**
	 * 更新管理员信息
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
		sql.append("update t_manager set ");

		// 拼接更新语句
		String id = request.getParameter("row[id]");
		if (id == null || "".equals(id.trim()))
			throw new IllegalArgumentException("修改管理员的ID不能为空或 Null");
		String name = request.getParameter("row[name]");
		if (name != null && !"".equals(name.trim())) {
			params.add(name);
			sql.append("name = ? ");
		}

		String password = request.getParameter("row[password]");
		if (password != null && !"".equals(password.trim())) {
			params.add(password);
			sql.append(", password = ? ");
		}

		String email = request.getParameter("row[email]");
		if (email != null && !"".equals(email.trim())) {
			params.add(email);
			sql.append(", email = ? ");
		}

		String sexStr = request.getParameter("row[sex]");
		Boolean sex = null;
		if (sexStr != null && !"".equals(sexStr)) {
			if ("1".equals(sexStr))
				sex = true;
			else
				sex = false;
		}
		params.add(sex);
		sql.append(", sex = ? ");

		String birth = request.getParameter("row[birth]");
		if (birth != null && !"".equals(birth)) {
			params.add(Date.valueOf(birth));
			sql.append(", birth = ? ");
		}

		String isSysManager = request.getParameter("row[isSysManager]");
		if (isSysManager != null && !"".equals(isSysManager)) {
			params.add(Boolean.valueOf(isSysManager));
			sql.append(", is_sys_manager = ? ");
		}

		// 设置更新数据的 ID
		params.add(id);
		sql.append("where id = ?");
		System.out.println("name:" + name + " password:" + password + " email:" + email + " sex:"
				+ sexStr + " birth:" + birth + " isSysManager:" + isSysManager);

		// 更新到 DB
		ManagerDao userDao = new ManagerDao();
		userDao.update(connection, sql.toString(), params.toArray());

		// 返回 JSON 数据
		System.out.println("params:" + params);
		response.setCharacterEncoding("UTF-8");
		response.setContentType("text/javascript");
		response.getWriter().write(String.valueOf(true));
	}

	/**
	 * 删除管理员(可以批量删除)
	 * 
	 * @param connection
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	public void delete(Connection connection, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		System.out.println("deleteManager deleteManager ....");
		// 获取删除的 ID (可以批量删除)
		String ids = request.getParameter("ids");
		Object[] strs = ids.split(",");
		// SQL 语句
		StringBuilder sql = new StringBuilder("delete from t_manager where id in (");

		// 拼接 SQL 语句
		if (strs.length == 1) {
			sql.append("?");
		} else {
			sql.append("?");
			for (int i = 1; i < strs.length; i++) {
				sql.append(",?");
			}
		}
		sql.append(")");

		System.out.println(sql);
		// 更新 DB
		ManagerDao userDao = new ManagerDao();
		Integer num = userDao.update(connection, sql.toString(), strs);
		System.out.println(num);

		// 返回 JSON, （删除的条数）
		response.setCharacterEncoding("UTF-8");
		response.setContentType("text/javascript");
		response.getWriter().write("{\"total\":" + num + "}");
	}

	/**
	 * 添加管理员
	 * 
	 * @param connection
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	public void save(Connection connection, HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		// 从页面获取管理员信息
		String name = request.getParameter("user");
		String password = request.getParameter("password");
		String email = request.getParameter("email");
		String sexStr = request.getParameter("sex");
		Boolean sex = null;
		if (sexStr != null && !"".equals(sexStr)) {
			sex = Boolean.valueOf(sexStr);
		}
		String birth = request.getParameter("birth");
		String isSysManger = request.getParameter("isSysManger");
		Boolean is_sys_manager = null;
		if (isSysManger != null && !"".equals(isSysManger)) {
			is_sys_manager = Boolean.valueOf(isSysManger);
		}
		System.out.println("name:" + name + " password:" + password + " email:" + email + " sex:"
				+ sex + " birth:" + birth + " isSysManger" + isSysManger);

		// 拼接添加的 SQL 语句
		String sql = "insert into t_manager (name,password,email,sex,birth,is_sys_manager,create_date,update_date) values (?,?,?,?,?,?,?,?)";
		ManagerDao userDao = new ManagerDao();
		List<Object> params = new ArrayList<Object>();
		params.add(name);
		params.add(password);
		params.add(email);
		params.add(sex);
		params.add(Date.valueOf(birth));
		params.add(is_sys_manager);
		params.add(new java.util.Date());
		params.add(new java.util.Date());

		// 更新 DB
		userDao.insert(connection, sql, params.toArray());

		// 返回 JSON
		System.out.println("params:" + params);
		response.setCharacterEncoding("UTF-8");
		response.setContentType("text/javascript");
		response.getWriter().write(String.valueOf(true));
	}

	/**
	 * 判断管理员名称是否已经存在
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
		// 从页面获取管理员姓名
		String name = request.getParameter("userName");
		System.out.println("name: " + name);

		// 拼接 SQL
		String sql = "select id, name, password, email, sex, birth, is_sys_manager isSysManager, create_date createDate, update_date updateDate from t_manager where name = ?";
		
		// 查询 DB
		ManagerDao userDao = new ManagerDao();
		List<Manager> users = userDao.queryList(connection, sql, name);

		// 判断该管理员姓名是否已经存在
		boolean flg = false;
		if (users == null || users.size() <= 0) {
			flg = true;
		}
		
		// 返回 JSON
		System.out.println("flg: " + flg);
		response.setCharacterEncoding("UTF-8");
		response.setContentType("text/javascript");
		response.getWriter().write(String.valueOf(flg));
	}

}
