package cn.com.love.hsl.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/static/**").addResourceLocations("classpath:/static/");
//        registry.addResourceHandler("/css/**").addResourceLocations("classpath:/css");
//        registry.addResourceHandler("/js/**").addResourceLocations("classpath:/js");
    }

//    @Override
//    public void addInterceptors(InterceptorRegistry registry) {
////        registry.addInterceptor(new MyInterceptor()).addPathPatterns("/**").excludePathPatterns("/toLogin","/login","/js/**");
////        registry.
//    }
}
