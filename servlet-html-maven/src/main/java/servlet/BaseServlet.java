package servlet;

import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;
import utils.DateJsonValueProcessor;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.Writer;
import java.util.Map;

/**
 * User Servlet
 *
 * @author HuangSL
 * @version 1.0
 * @since 201/08/22
 */
public abstract class BaseServlet extends HttpServlet {

    protected String getJSONString(Map<String, Object> map) {
        JsonConfig jsonConfig = new JsonConfig();
        jsonConfig.registerJsonValueProcessor(java.util.Date.class, new DateJsonValueProcessor());
        jsonConfig.registerJsonValueProcessor(java.sql.Timestamp.class, new DateJsonValueProcessor());

        System.out.println(JSONObject.fromObject(map, jsonConfig).toString());
        return JSONObject.fromObject(map, jsonConfig).toString();
    }

    protected void responseJSON(HttpServletResponse response, Map<String, Object> map) throws IOException {
        responseJSON(response, getJSONString(map));
    }

    protected void responseJSON(HttpServletResponse response, String result) throws IOException {
        response.setContentType("application/json; charset=utf-8");
        Writer out = response.getWriter();
        out.write(result);
        out.flush();
        out.close();
    }

    protected void responseJSON(JSONObject jsonObject, HttpServletResponse response) throws IOException {
        responseJSON(response, jsonObject.toString());
    }

    protected void responseJSON(Object res, HttpServletResponse response) throws IOException {
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("res", res);
        responseJSON(jsonObject, response);
    }

    protected void responseFailed(HttpServletResponse response) throws IOException {
        responseJSON(false, response);
    }
}
