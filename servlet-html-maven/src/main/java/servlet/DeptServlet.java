package servlet;

import model.Dept;
import model.base.Pager;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import service.DeptService;
import service.impl.DeptServiceImpl;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

/**
 * Dept Servlet
 *
 * @author HuangSL
 * @version 1.0
 * @since 201/08/22
 */
public class DeptServlet extends BaseServlet {

    private DeptService deptService;
    private static final Logger logger = LoggerFactory.getLogger(DeptServlet.class);

    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) {
        try {
            deptService = new DeptServiceImpl(req.getSession());
            String methodName = req.getParameter("method");
            if (StringUtils.isEmpty(methodName)) {
                logger.error("Service() name is empty.");
                responseFailed(resp);
                return;
            }

            Method method = getClass().getDeclaredMethod(methodName, HttpServletRequest.class, HttpServletResponse.class);
            method.invoke(this, req, resp);
        } catch (NoSuchMethodException | InvocationTargetException | IllegalAccessException | IOException e) {
            e.printStackTrace();
        }
    }

    private void get(HttpServletRequest request, HttpServletResponse response) {
        try {
            String id = request.getParameter("id");
            if (StringUtils.isEmpty(id)) {
                logger.error("get() id is empty.");
                responseFailed(response);
                return;
            }
            Dept dept = deptService.get(id);
            System.out.println("----------");

            Map<String, Object> res = new HashMap<>();
            res.put("dept", dept);
            responseJSON(response, res);
        } catch (IOException | SQLException e) {
            e.printStackTrace();
        }
    }

    private void list(HttpServletRequest request, HttpServletResponse response) {
        try {

            Dept dept = new Dept();
            Pager pager = new Pager();
            if (request.getParameter("pageNo") != null) {
                int pageNo = Integer.parseInt(request.getParameter("pageNo"));
                pager.setPageNo(pageNo);
            }
            if (request.getParameter("pageSize") != null) {
                int pageSize = Integer.parseInt(request.getParameter("pageSize"));
                pager.setPageSize(pageSize);
            }
            dept.setPager(pager);
            System.out.println(dept);
            Map<String, Object> res = deptService.findAll(dept);
            System.out.println("----------");
            responseJSON(response, res);
        } catch (IOException | SQLException e) {
            e.printStackTrace();
        }
    }

    private void save(HttpServletRequest request, HttpServletResponse response) {
        try {
            String id = request.getParameter("id");

            String name = request.getParameter("name");
            System.out.println("文字化けする前のユーザー名：" + name);
            if (StringUtils.isEmpty(name)) {
                logger.error("save() name is empty");
                responseFailed(response);
                return;
            }

            Dept dept = new Dept();
            dept.setName(name);
            System.out.println("************>");
            System.out.println(dept);
            int result = -1;
            if (StringUtils.isNotEmpty(id)) {
                dept.setId(id);
                result = deptService.update(dept);
            } else {
                result = deptService.insert(dept);
            }
            System.out.println("----->");
            System.out.println(result);
            responseJSON(result, response);
        } catch (SQLException | IOException e) {
            e.printStackTrace();
        }
    }

    private void delete(HttpServletRequest request, HttpServletResponse response) {
        try {
            String id = request.getParameter("id");
            if (StringUtils.isEmpty(id)) {
                logger.error("delete() id is empty");
                responseFailed(response);
                return;
            }

            responseJSON(deptService.delete(id), response);
        } catch (IOException | SQLException e) {
            e.printStackTrace();
        }
    }

    private void deleteByLogic(HttpServletRequest request, HttpServletResponse response) {
        try {
            String id = request.getParameter("id");
            if (StringUtils.isEmpty(id)) {
                logger.error("deleteByLogic() id is empty");
                responseFailed(response);
                return;
            }

            responseJSON(deptService.deleteByLogic(id), response);
        } catch (IOException | SQLException e) {
            e.printStackTrace();
        }
    }
}
