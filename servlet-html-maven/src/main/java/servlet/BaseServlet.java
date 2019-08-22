package servlet;

import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;
import utils.DateJsonValueProcessor;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.Writer;
import java.sql.Timestamp;
import java.util.Date;
import java.util.Map;

public class BaseServlet extends HttpServlet {

    protected void responseJson(HttpServletResponse response, Map<String, Object> map) throws IOException {

        JsonConfig jsonConfig = new JsonConfig();
        jsonConfig.registerJsonValueProcessor(Date.class, new DateJsonValueProcessor());
        jsonConfig.registerJsonValueProcessor(Timestamp.class, new DateJsonValueProcessor());

        response.setContentType("application/json;charset=UTF-8");
        response.getWriter().write(JSONObject.fromObject(map, jsonConfig).toString());
    }

    protected void responseJson(JSONObject jsonObject, HttpServletResponse response) throws IOException {
        response.setContentType("application/json;charset=UTF-8");
        Writer writer = response.getWriter();
        writer.write(jsonObject.toString());
        writer.flush();
        writer.close();
    }
}
