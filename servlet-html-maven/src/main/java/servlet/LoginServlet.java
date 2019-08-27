package servlet;

import model.User;
import model.base.BaseModel;
import service.base.BaseService;
import service.UserService;
import service.impl.UserServiceImpl;
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
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.nio.charset.Charset;
import java.sql.SQLException;

/**
 * Login Servlet
 *
 * @author HuangSL
 * @version 1.0
 * @since 201/08/22
 */
public class LoginServlet extends BaseServlet {

    private UserService userService;

    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) {
        try {
            System.out.println(System.getProperty("file.encoding"));
            System.out.println(Charset.defaultCharset().name());
            userService = new UserServiceImpl(req.getSession());
            String methodName = req.getParameter("method");
            System.out.println("login servlet ser....." + methodName);
            Method method = getClass().getDeclaredMethod(methodName, HttpServletRequest.class, HttpServletResponse.class);
            method.invoke(this, req, resp);
        } catch (NoSuchMethodException | InvocationTargetException | IllegalAccessException e) {
            e.printStackTrace();
        }
    }

    private void login(HttpServletRequest request, HttpServletResponse response) throws IOException, SQLException {
        String userName = request.getParameter("user");
        String password = request.getParameter("password");
        System.out.println(userName + ":" + password);

        User user = new User();
        user.setName(userName);
        user.setPassword(password);
        user = userService.find(user);
        System.out.println(user);

        JSONObject jsonObject = new JSONObject();
        if (user != null && StringUtils.isNotEmpty(user.getId())) {
            jsonObject.put("res", true);
            request.getSession().setAttribute(BaseService.LOGIN_USER, user);
        } else {
            jsonObject.put("res", false);
        }
        responseJSON(jsonObject, response);
    }
}
