package servlet;

import model.User;
import model.base.BaseModel;
import net.sf.json.JSONObject;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import service.UserService;
import service.base.BaseService;
import service.impl.UserServiceImpl;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.Writer;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.sql.SQLException;

public class LoginServlet extends BaseServlet {

    private UserService userService;
    private static final Logger logger = LoggerFactory.getLogger(LoginServlet.class);

    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        try {
            userService = new UserServiceImpl(req.getSession());
            String methodName = req.getParameter("method");
            Method method = getClass().getDeclaredMethod(methodName, HttpServletRequest.class, HttpServletResponse.class);
            method.invoke(this, req, resp);
        } catch (NoSuchMethodException | IllegalAccessException | InvocationTargetException e) {
            e.printStackTrace();
        }
    }

    private void login(HttpServletRequest request, HttpServletResponse response) {
        try {
            String name = request.getParameter("user");
            String pwd = request.getParameter("password");

            Boolean res = true;
            if (StringUtils.isEmpty(name)) {
                logger.error(this.getClass().getName() + ".login({})", "name is empty");
                res = false;
            }

            if (StringUtils.isEmpty(pwd)) {
                logger.error(this.getClass().getName() + ".login({})", "password is empty");
                res = false;
            }

            if (!res) {
                JSONObject jsonObject = new JSONObject();
                jsonObject.put("res", false);
                responseJson(jsonObject, response);
                return;
            }

            User user = new User();
            user.setName(name);
            user.setPassword(pwd);
            user = userService.find(user);
            if (user == null) {
                res = false;
            } else {
                request.getSession().setAttribute(BaseService.LOGIN_USER, user);
            }

            JSONObject jsonObject = new JSONObject();
            jsonObject.put("res", res);
            responseJson(jsonObject, response);
        } catch (IOException | SQLException e) {
            e.printStackTrace();
        }
    }
}
