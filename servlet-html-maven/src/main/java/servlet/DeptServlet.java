package servlet;

import model.Dept;
import net.sf.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import service.DeptService;
import service.impl.DeptServiceImpl;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

public class DeptServlet extends BaseServlet {

    private DeptService deptService;
    private static final Logger logger = LoggerFactory.getLogger(DeptServlet.class);

    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        try {
            deptService = new DeptServiceImpl(req.getSession());
            String methodName = req.getParameter("method");
            Method method = getClass().getDeclaredMethod(methodName, HttpServletRequest.class, HttpServletResponse.class);
            method.invoke(this, req, resp);
        } catch (NoSuchMethodException | IllegalAccessException | InvocationTargetException e) {
            e.printStackTrace();
        }
    }

    private void get(HttpServletRequest request, HttpServletResponse response) {

        try {
            String id = request.getParameter("id");
            logger.debug(getClass().getName() + ".get({})", id);
            Dept dept = deptService.get(id);
            Map<String, Object> map = new HashMap<>();
            map.put("dept", dept);

            responseJson(response, map);
        } catch (SQLException | IOException e) {
            e.printStackTrace();
        }
    }

    private void list(HttpServletRequest request, HttpServletResponse response) {

    }
}
