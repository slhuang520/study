package servlet;

import Dao.ManagerDao;
import model.Manager;
import utils.JDBCUtils;

import java.io.IOException;
import java.lang.reflect.Method;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class LoginServlet extends HttpServlet {

	/**
	 * 
	 */
	private static final long serialVersionUID = -2893268788731976147L;

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
			Method method = getClass().getDeclaredMethod(methodName, Connection.class, HttpServletRequest.class, HttpServletResponse.class);
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
	
	public void login(Connection connection, HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		System.out.println("login start....");

		String name = request.getParameter("user");
		String password = request.getParameter("password");
		System.out.println("name: " + name + " password: " + password);
		
		Boolean flg = null;
		ManagerDao userDao = new ManagerDao();
		String sql = "select id, name, password, email, sex, birth, is_sys_manager isSysManager, create_date createDate, update_date updateDate from t_manager";
		
		List<Manager> users = userDao.queryList(connection, sql);
		for (Manager user : users) {
			System.out.println(user);
			if (user.getName().equals(name) && user.getPassword().equals(password)) {
				flg = false;
				if (user.getIsSysManager()) {
					request.getSession().setAttribute("login_user", user);
					flg = true;
				}
				break;
			}
		}
		
		System.out.println("flg: " + flg);
		response.setContentType("text/javascript;charset=UTF-8");
		response.getWriter().write(String.valueOf(flg));
	}
	
	public void logout(Connection connection, HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		System.out.println("logout start....");
		boolean flg = false;
		try {
			request.getSession().removeAttribute("login_user");
			flg = true;
		} catch (Exception e) {
		}
		System.out.println("flg: " + flg);
		response.getWriter().write(String.valueOf(flg));
	}
	
}
