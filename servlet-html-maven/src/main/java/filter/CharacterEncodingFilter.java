package filter;

import org.apache.commons.lang.StringUtils;

import javax.servlet.*;
import java.io.IOException;

/**
 * Encoding filter
 *
 * @author HuangSL
 * @version 1.0
 * @since 201/08/22
 */
public class CharacterEncodingFilter implements Filter {

    private String encoding;

    public void setEncoding(String encoding) {
        this.encoding = encoding;
    }

    @Override
    public void init(FilterConfig filterConfig) {
        encoding = filterConfig.getInitParameter("encoding");
        if (StringUtils.isEmpty(encoding)) {
            encoding = "UTF-8";
        }
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        servletRequest.setCharacterEncoding(encoding);
        servletResponse.setCharacterEncoding(encoding);
        filterChain.doFilter(servletRequest, servletResponse);
    }

    @Override
    public void destroy() {
    }
}
