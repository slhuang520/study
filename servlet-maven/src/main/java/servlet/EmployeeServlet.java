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

import Dao.DeptDao;
import Dao.EmployeeDao;
import Dao.PositionDao;
import Dao.RoleDao;
import com.fasterxml.jackson.databind.ObjectMapper;
import model.Dept;
import model.Employee;
import model.Position;
import model.Role;
import utils.JDBCUtils;

public class EmployeeServlet extends HttpServlet {

	/**
	 * 
	 */
	private static final long serialVersionUID = 5180974100866554775L;

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
	 * 分页显示所有员工信息
	 * 
	 * @param connection
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	public void list(Connection connection, HttpServletRequest request,
			HttpServletResponse response) throws Exception {

		StringBuilder sql = new StringBuilder("select e.id, e.name, e.phone, e.sex, e.birth, e.email, e.dept_id deptId, " +
				"d.name deptName, e.position_id positionId, p.name positionName, " +
				"e.manager_id managerId, em.name managerName, e.role_ids roleIds, e.economy_no economyNo, " +
				"e.room_no roomNo, e.region, e.demo, e.create_time createTime, e.update_time updateTime " +
				"from t_employee e left join t_dept d on d.id = e.dept_id " +
				"left join t_position p on p.id = e.position_id " +
				"left join t_employee em on em.id = e.manager_id " +
				"where 1=1 ");
		String sqlCount = "select count(*) as count from t_employee e " +
				"left join t_dept d on d.id = e.dept_id " +
				"left join t_position p on p.id = e.position_id " +
				"left join t_employee em on em.id = e.manager_id " +
				"where 1=1 ";
		List<Object> queryObjects = new ArrayList<Object>();

		// 查询条件拼接
		String user = request.getParameter("user");
		System.out.println(user);
		if (user != null && !"".equals(user)) {
			queryObjects.add("%" + user + "%");
			sql.append(" and e.name like ?");
			sqlCount += " and e.name like ?";
		}
		
		String dept = request.getParameter("dept");
		System.out.println(dept);
		if (dept != null && !"".equals(dept)) {
			queryObjects.add(dept);
			sql.append(" and d.id = ?");
			sqlCount += " and d.id = ?";
		}
		
		String position = request.getParameter("position");
		System.out.println(position);
		if (position != null && !"".equals(position)) {
			queryObjects.add(position);
			sql.append(" and p.id = ?");
			sqlCount += " and p.id = ?";
		}
		
		String manager = request.getParameter("manager");
		System.out.println(manager);
		if (manager != null && !"".equals(manager)) {
			queryObjects.add(manager);
			sql.append(" and em.id = ?");
			sqlCount += " and em.id = ?";
		}

		String dateFrom = request.getParameter("dateFrom");
		if (dateFrom != null && !"".equals(dateFrom)) {
			// DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
			// dateFormat.parse(dateFrom)
			queryObjects.add(java.sql.Date.valueOf(dateFrom));
			sql.append(" and e.create_time >= ?");
			sqlCount += " and e.create_time >= ?";
		}

		String dateTo = request.getParameter("dateTo");
		if (dateTo != null && !"".equals(dateTo)) {
			queryObjects.add(java.sql.Date.valueOf(dateTo));
			sql.append(" and e.create_time <= ?");
			sqlCount += " and e.create_time <= ?";
		}

		// 排序
		String sort = request.getParameter("sort");
		String order = request.getParameter("order");
		System.out.println("sort " + sort);
		System.out.println("order " + order);
		if (sort != null && !"".equals(sort)) {
			if ("name".equals(sort)) {
				sql.append(" order by " + "e." + sort + " " + order);
			} else {
				sql.append(" order by " + sort + " " + order);
			}
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
		EmployeeDao employeeDao = new EmployeeDao();
		List<Employee> employees = employeeDao.queryList(connection, sql.toString(), queryObjects.toArray());
		//获取扮演角色名称
		for (Employee emp : employees) {
			if (emp.getRoleIds() != null) {
				StringBuilder builder = new StringBuilder();
				List<Object> param = new ArrayList<Object>();
				
				builder.append("select id, name from t_role where id in (");
				String[] ids = emp.getRoleIds().split(",");
				for (int i = 0; i < ids.length; i ++) {
					param.add(ids[i]);
					if (i == 0) {
						builder.append("?");
					} else {
						builder.append(",?");
					}
				}
				builder.append(")");
				//System.out.println(builder);
//				System.out.println(emp.getRoleIds());
				RoleDao roleDao = new RoleDao();
				List<Role> roles = roleDao.queryList(connection, builder.toString(), param.toArray());
//				System.out.println("roles:" + roles);
				StringBuilder roleNames = new StringBuilder();
				for (int i = 0; i < roles.size(); i ++) {
					if (i == 0) {
						roleNames.append(roles.get(i).getName());
					} else {
						roleNames.append("," + roles.get(i).getName());
					}
				}
				emp.setRoleNames(roleNames.toString());
			}
			if (emp.getSex() == null)
				emp.setSex("");
		}
		Long count = employeeDao.queryForValue(connection, sqlCount, queryObjects.toArray());

		// 返回 JSON 数据
		ObjectMapper mapper = new ObjectMapper();
//		System.out.println(employees);
//		System.out.println(mapper.writeValueAsString(employees));
		String res = "{\"total\":" + count + ",\"rows\":" + mapper.writeValueAsString(employees) + "}";
		response.setContentType("text/javascript;charset=UTF-8");
//		System.out.println(res);
		response.getWriter().write(res);
	}
	
	public void getDepts(Connection connection, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		
		String sql = "select id, name from t_dept";
		
		DeptDao deptDao = new DeptDao();
		List<Dept> depts = deptDao.queryList(connection, sql);
		
		// 返回 JSON 数据
		ObjectMapper mapper = new ObjectMapper();
		System.out.println(depts);
		System.out.println(mapper.writeValueAsString(depts));
		response.setContentType("text/javascript;charset=UTF-8");
		response.getWriter().write(mapper.writeValueAsString(depts));
	}
	
	public void getPositions(Connection connection, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		
		String manager = request.getParameter("manager");
		List<Object> params = new ArrayList<Object>();
		System.out.println("managerId:" + manager);
		
		String sql = "select p.id, p.name from t_position p ";
		
		if (manager != null && !"".equals(manager)) {
			sql += ", t_employee e, t_position p1 where e.id = ? and p1.id = e.position_id and p.level > p1.level ";
			params.add(manager);
		}
		
		PositionDao positionDao = new PositionDao();
		List<Position> positions = positionDao.queryList(connection, sql, params.toArray());
		
		// 返回 JSON 数据
		ObjectMapper mapper = new ObjectMapper();
		System.out.println(positions);
		System.out.println(mapper.writeValueAsString(positions));
		response.setContentType("text/javascript;charset=UTF-8");
		response.getWriter().write(mapper.writeValueAsString(positions));
	}
	
	public void getRoles(Connection connection, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		
		String sql = "select id, name from t_role";
		
		RoleDao roleDao = new RoleDao();
		List<Role> roles = roleDao.queryList(connection, sql);
		
		// 返回 JSON 数据
		ObjectMapper mapper = new ObjectMapper();
		System.out.println(roles);
		System.out.println(mapper.writeValueAsString(roles));
		response.setContentType("text/javascript;charset=UTF-8");
		response.getWriter().write(mapper.writeValueAsString(roles));
	}
	
	public void getManagers(Connection connection, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		
		String name = request.getParameter("q");
		String dept = request.getParameter("dept");
		
		List<Object> params = new ArrayList<Object>();
			
		String sql = "select e.id, e.name, p.name positionName, d.name deptName from t_employee e " +
				"inner join t_position p on p.id = e.position_id " +
				"left join t_dept d on d.id = e.dept_id " +
				"where p.level < 8";
		
		// 这个动态加载对 中文 支持效果不好
//		if (name != null && !"".equals(name)) {
//			sql += " and e.name like ?";
//			params.add("%" + name + "%");
//		}
		
		if (dept != null && !"".equals(dept)) {
			sql += " and d.id = ?";
			params.add(dept);
		}
		
		EmployeeDao employeeDao = new EmployeeDao();
		List<Employee> employees = employeeDao.queryList(connection, sql, params.toArray());
		System.out.println(name);
		System.out.println(sql);
		
		// 返回 JSON 数据
		ObjectMapper mapper = new ObjectMapper();
		System.out.println(employees);
		System.out.println(mapper.writeValueAsString(employees));
		response.setContentType("text/javascript;charset=UTF-8");
		response.getWriter().write(mapper.writeValueAsString(employees));
	}

	/**
	 * 更新员工信息
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
		EmployeeDao employeeDao = new EmployeeDao();
		// 更新 SQL 语句
		StringBuilder sql = new StringBuilder();
		sql.append("update t_employee set ");

		// 拼接更新语句
		String id = request.getParameter("row[id]");
		if (id == null || "".equals(id.trim()))
			throw new IllegalArgumentException("修改员工的ID不能为空或 Null");
		
		String name = request.getParameter("row[name]");
		if (name != null && !"".equals(name.trim())) {
			params.add(name);
			sql.append("name = ? ");
		}
		
		String phone = request.getParameter("row[phone]");
		params.add(phone);
		sql.append(", phone = ? ");
		
		String sexStr = request.getParameter("row[sex]");
		System.out.println("null.equals(sexStr)"+"null".equals(sexStr));
		System.out.println("Boolean.valueOf(sexStr)"+Boolean.valueOf(sexStr));
		Boolean sex = null;
		if (sexStr != null && !"".equals(sexStr)) {
			if ("1".equals(sexStr))
				sex = true;
			else
				sex = false;
		}
		params.add(sex);
		sql.append(", sex = ? ");
		
		String email = request.getParameter("row[email]");
		params.add(email);
		sql.append(", email = ? ");
		
		String birth = request.getParameter("row[birth]");
		params.add(birth);
		sql.append(", birth = ? ");
		
		String positionId = request.getParameter("row[positionId]");
		params.add(positionId);
		sql.append(", position_id = ? ");
		
		String managerId = request.getParameter("row[managerId]");
		params.add(managerId);
		sql.append(", manager_id = ? ");
		
		System.out.println("managerId:"+managerId);
		String deptId = "";
		String sqlManager = "select dept_id deptId from t_employee where id = ?";
		Employee manager = employeeDao.query(connection, sqlManager, managerId);
		System.out.println(manager);
		if (manager != null) {
			deptId = manager.getDeptId().toString();
		} else {
			deptId = request.getParameter("row[deptId]");
		}
		params.add(deptId);
		sql.append(", dept_id = ? ");
		
		String roleIds = request.getParameter("row[roleIds]");
		params.add(roleIds);
		sql.append(", role_ids = ? ");
		
		String economyNo = request.getParameter("row[economyNo]");
		params.add(economyNo);
		sql.append(", economy_no = ? ");
		
		String roomNo = request.getParameter("row[roomNo]");
		params.add(roomNo);
		sql.append(", room_no = ? ");
		
		String region = request.getParameter("row[region]");
		params.add(region);
		sql.append(", region = ? ");
		
		String demo = request.getParameter("row[demo]");
		params.add(demo);
		sql.append(", demo = ? ");

		// 设置更新数据的 ID
		params.add(id);
		sql.append("where id = ?");
		
		System.out.println("name:" + name + " phone:" + phone + " sex:" + sex + " email:" + email + " birth:" + birth
				+ " deptId:" + deptId + " positionId:" + positionId + " managerId:" + managerId + " roleId:" + roleIds
				+ " economyNo:" + economyNo + " roomNo:" + roomNo + " region:" + region + " demo:" + demo);
		System.out.println("params:" + params);

		// 更新到 DB
		boolean flg = false;
		try {
			employeeDao.update(connection, sql.toString(), params.toArray());
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
	 * 删除员工(不可以批量删除)
	 * 
	 * @param connection
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	public void delete(Connection connection, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		System.out.println("delete employee ....");
		String ids = request.getParameter("ids");
		Object[] strs = ids.split(",");
		// SQL 语句
		StringBuilder sql = new StringBuilder("delete from t_employee where id in (");

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
		EmployeeDao employeeDao = new EmployeeDao();
		Integer num = 0;
		try {
			num = employeeDao.update(connection, sql.toString(), strs);
			System.out.println(num);
		} catch (Exception e) {
			throw e;
		} finally {
			// 返回 JSON
			response.setContentType("text/javascript;charset=UTF-8");
			response.getWriter().write("{\"total\":" + num + "}");
		}
	}

	/**
	 * 添加员工
	 * 
	 * @param connection
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	public void save(Connection connection, HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		// 从页面获取员工信息
		List<Object> params = new ArrayList<Object>();
		String user = request.getParameter("user");
		params.add(user);
		String phone = request.getParameter("phone");
		params.add(phone);
		String sexStr = request.getParameter("sex");
		Boolean sex = null;
		if (sexStr != null && !"".equals(sexStr.trim())) {
			if ("1".equals(sexStr))
				sex = true;
			else 
				sex = false;
		}
		params.add(sex);
		String email = request.getParameter("email");
		params.add(email);
		String birth = request.getParameter("birth");
		params.add(birth);
		String dept = request.getParameter("dept");
		params.add(dept);
		String position = request.getParameter("position");
		params.add(position);
		String role = request.getParameter("role");
		params.add(role);
		String manager = request.getParameter("manager");
		params.add(manager);
		String economyNo = request.getParameter("economy_no");
		params.add(economyNo);
		String roomNo = request.getParameter("room_no");
		params.add(roomNo);
		String region = request.getParameter("region");
		params.add(region);
		//picture
		params.add(null);
		String demo = request.getParameter("demo");
		params.add(demo);
		System.out.println("user:" + user + " phone:" + phone + " sex:" + sex + " email:" + email
				+ " birth:" + birth + " dept:" + dept + " position:" + position + " role:" + role
				+ " manager:" + manager + " economyNo:" + economyNo + " roomNo:" + roomNo
				+ "region:" + region + " demo:" + demo);

		// 拼接添加的 SQL 语句
		String sql = "insert into t_employee (name,phone,sex,email,birth,dept_id,position_id,role_ids,manager_id," +
				"economy_no,room_no,region,picture,demo,create_time,update_time) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
		EmployeeDao employeeDao = new EmployeeDao();

		//create_time
		params.add(new Date());
		//update_time
		params.add(new Date());
		// 更新 DB
		boolean flg = false;
		try {
			employeeDao.insert(connection, sql, params.toArray());
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
	 * 判断员工名称是否已经存在
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
		// 从页面获取员工名称
		String name = request.getParameter("employeeName");
		System.out.println("name: " + name);

		// 拼接 SQL
		String sql = "select count(*) as count from t_employee where name = ?";
		
		// 查询 DB
		EmployeeDao employeeDao = new EmployeeDao();
		Long count = employeeDao.queryForValue(connection, sql, name);

		// 判断该员工名称是否已经存在
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
