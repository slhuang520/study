package servlet;

import java.io.IOException;
import java.lang.reflect.Method;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import Dao.MenuDao;
import com.fasterxml.jackson.databind.ObjectMapper;
import model.Menu;
import utils.JDBCUtils;

public class MenuServlet extends HttpServlet {

	/**
	 * 
	 */
	private static final long serialVersionUID = -7764327529887701491L;

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

	public void list(Connection connection, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		System.out.println("listMenu");
		
		String id = request.getParameter("id");
		if (id == null || "".equals(id)) {
			id = "0";
		}

		MenuDao menuDao = new MenuDao();

		String sql = "select * from t_nav where nid = ?";
		//String sqlCount = "select count(*) from t_nav";

		// 排序
//		String sort = request.getParameter("sort");
//		String order = request.getParameter("order");
//		System.out.println("sort " + sort);
//		System.out.println("order " + order);
//		if (sort != null && !"".equals(sort)) {
//			sql += " order by " + sort + " " + order;
//		}
//
//		// 分页
//		String page = request.getParameter("page");
//		String pageSize = request.getParameter("rows");
//		if (page == null || "".equals(page) || "0".equals(page)) {
//			page = "1";
//		}
//		if (pageSize == null || "".equals(pageSize) || "0".equals(pageSize)) {
//			pageSize = "20";
//		}
//		Integer first = Integer.parseInt(pageSize) * (Integer.parseInt(page) - 1);
//		sql += " limit " + first + ", " + pageSize;
		System.out.println(sql);
		
		List<Menu> menus = menuDao.queryList(connection, sql, id);

		//Long count = menuDao.queryForValue(connection, sqlCount);

		ObjectMapper mapper = new ObjectMapper();

		System.out.println(mapper.writeValueAsString(menus));

		//String res = "{\"total\":" + count + ",\"rows\":" + mapper.writeValueAsString(menus) + "}";

		response.setContentType("text/javascript;charset=UTF-8");
		response.getWriter().write(mapper.writeValueAsString(menus));
	}
	
	public void save(Connection connection, HttpServletRequest request, HttpServletResponse response) throws Exception {
		
		String type = request.getParameter("type");
		String text = request.getParameter("text");
		String iconCls = request.getParameter("iconCls");
		String url = request.getParameter("url");
		System.out.println("type:" + type + " text:" + text + " iconCls:" + iconCls + " url:" + url);
		
		String state = "closed";
		int nid = 0;
		if (!"null".equals(type.trim()) && !"".equals(type.trim())) {
			state = "open";
			nid = Integer.parseInt(type);
		}
		
		String sql = "insert into t_nav(text, state, iconCls, url, nid) values(?,?,?,?,?)";
		
		List<Object> params = new ArrayList<Object>();
		params.add(text);
		params.add(state);
		params.add(iconCls);
		params.add(url);
		params.add(nid);
		
		MenuDao menuDao = new MenuDao();
		boolean flg = false;
		try {
			menuDao.update(connection, sql, params.toArray());
			flg = true;
		} catch (Exception e) {
			throw e;
		} finally {
			response.setContentType("text/javascript;charset=UTF-8");
			response.getWriter().write(String.valueOf(flg));
		}
	}
	
	public void checkName(Connection connection, HttpServletRequest request, HttpServletResponse response) throws Exception {
		
		String menuName = request.getParameter("menuName");
		String parentId = request.getParameter("parentId");
		System.err.println("menuName" + menuName);
		System.err.println("parentId" + parentId);
		
		String sql = "select count(*) from t_nav where text = ? and nid = ?";
		MenuDao menuDao = new MenuDao();
		long count = menuDao.queryForValue(connection, sql, menuName, parentId);
		boolean flg = true;
		if (count != 0) {
			flg = false;
		}
		
		response.setContentType("text/javascript;charset=UTF-8");
		response.getWriter().write(String.valueOf(flg));
	}
	
	public void update(Connection connection, HttpServletRequest request, HttpServletResponse response) throws Exception {
		MenuDao menuDao = new MenuDao();
		
		Boolean flg = false;
		String id = request.getParameter("row[id]");
		if (null == id || "".equals(id.trim()) || "null".equals(id.trim())) {
			throw new IllegalArgumentException("修改的菜单 ID 不能为空！");
		}
		
		String text = request.getParameter("row[text]");
		//String state = request.getParameter("row[state]");
		String iconCls = request.getParameter("row[iconCls]");
		String url = request.getParameter("row[url]");
		String nid = request.getParameter("row[nid]");
		//String _parentId = request.getParameter("row[_parentId]");
		if (text == null || "".equals(text.trim()) || "null".equals(text.trim())) {
			flg = false;
		} else {
			if (Integer.valueOf(nid) != 0 && (url == null || "".endsWith(url.trim()) || "null".equals(url.trim()))) {
				flg = false;
			} else {
				String sql = "update t_nav set text = ?, iconCls = ?, url = ?, nid = ? where id = ?";
				List<Object> params = new ArrayList<Object>();
				params.add(text);
				//params.add(state);
				params.add(iconCls);
				params.add(url);
				params.add(nid);
				params.add(id);
				menuDao.update(connection, sql, params.toArray());
				flg = true;
			}
		}
		
		response.setContentType("text/javascript;charset=UTF-8");
		response.getWriter().write(String.valueOf(flg));
	}
	
	public void delete(Connection connection, HttpServletRequest request, HttpServletResponse response) throws Exception {
		System.out.println("deleteMenu...");
		boolean flg = false;
		String id = request.getParameter("id");
		if (id == null || "null".equals(id.trim()) || "".equals(id.trim())) {
			throw new IllegalArgumentException("删除的菜单对象不存在!");
		}
		
		String sql = "delete from t_nav where id = ?";
		MenuDao menuDao = new MenuDao();
		try {
			menuDao.update(connection, sql, id);
			flg = true;
		} catch (Exception e) {
			throw e;
		} finally {
			response.setContentType("text/javascript;charset=UTF-8");
			response.getWriter().write(String.valueOf(flg));
		}
	}
}
