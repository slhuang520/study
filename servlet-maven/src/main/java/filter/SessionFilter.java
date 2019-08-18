package filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

public class SessionFilter implements Filter {

	public void destroy() {
		System.out.println(this.getClass().getSimpleName() + "'s destroy...");
	}

	public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain)
			throws IOException, ServletException {
		HttpServletRequest request = (HttpServletRequest) req;
		HttpServletResponse response = (HttpServletResponse) res;
		HttpSession session = request.getSession();

		String uri = request.getRequestURI();// 获取登录的action
System.out.println("uri: " + uri);
		if (uri.indexOf("login") >= 0) {
			chain.doFilter(request, response);// 跳转页面
		} else {
			// 获取登录用户的Session --基础权限检查，用户没有登陆，被拦截或者session超时请重新登录
//			if (session == null || session.getAttribute("login_user") == null) {
//				// 如果是ajax请求响应头会有，x-requested-with；
//				if (request.getHeader("x-requested-with") != null
//						&& request.getHeader("x-requested-with").equalsIgnoreCase("XMLHttpRequest")) {
//					response.setHeader("sessionstatus", "timeout");// 在响应头设置session状态
//					response.getWriter().print("登录超时！"); // 打印一个返回值，没这一行，在tabs页中无法跳出（导航栏能跳出），具体原因不明
//				}
//				return;
//			} else {
				chain.doFilter(request, response);// 跳转页面
//			}
		}
	}

	public void init(FilterConfig filterConfig) throws ServletException {
		System.out.println("中文" + this.getClass().getSimpleName() + "'s init...");
	}

}
