package filter;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * Session Filter
 *
 * @author HuangSL
 * @version 1.0
 * @since 201/08/22
 */
public class SessionFilter implements Filter {

    public void destroy() {
        System.out.println(this.getClass().getSimpleName() + "'s destroy...");
    }

    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain)
            throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) req;
        HttpServletResponse response = (HttpServletResponse) res;
        HttpSession session = request.getSession();

        String uri = request.getRequestURI();
        System.out.println("uri: " + uri);
        String path = request.getServletPath();
        System.out.println("path=" + path);
        List<String> s_html = new ArrayList<>();
        s_html.add("/login.html");
        s_html.add("/footer.html");
        if (s_html.contains(path) || path.startsWith("/login.do") || path.startsWith("/static/") || path.startsWith("/druid")) {
            chain.doFilter(request, response);
        } else {
            if (session == null || session.getAttribute("login_user") == null) {
                if (request.getHeader("x-requested-with") != null
                        && request.getHeader("x-requested-with").equalsIgnoreCase("XMLHttpRequest")) {
                    response.setHeader("sessionstatus", "timeout");
                    response.getWriter().print("Login timeout!");
                }
                String contextPath = request.getContextPath();
                System.out.println("ContextPath=" + contextPath);
                if (uri.equals("/psm/")) {
                    response.sendRedirect(contextPath + "/login.html");
                    return;
                }
                response.sendRedirect(contextPath + "/login.html?toPath=" + path);
            } else {
                chain.doFilter(request, response);
            }
        }
    }

    public void init(FilterConfig filterConfig) {
        System.out.println("中文 test 開發部7_市場部3 開發部7_市场部3" + this.getClass().getSimpleName() + "'s init...");
    }

}
