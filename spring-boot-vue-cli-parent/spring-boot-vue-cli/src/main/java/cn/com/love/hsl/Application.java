package cn.com.love.hsl;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.UUID;

@Controller
@SpringBootApplication
public class Application extends SpringBootServletInitializer {

    /**
     * war package required
     * @param builder
     * @return
     */
    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
        return builder.sources(Application.class);
    }

    public static void main(String[] args) {
        System.out.println(UUID.randomUUID().toString().replaceAll("-", ""));
        SpringApplication.run(Application.class, args);
    }

    @GetMapping({"/index/", "/"})
    public String index() {
        return "index";
    }

//    /**
//     * Open http and https two port
//     */
//    @Bean
//    public ServletWebServerFactory servletContainer() {
//        TomcatServletWebServerFactory tomcat = new TomcatServletWebServerFactory();
//        tomcat.addAdditionalTomcatConnectors(createHTTPConnector());
//        return tomcat;
//    }
//
//    private Connector createHTTPConnector() {
//        Connector connector = new Connector("org.apache.coyote.http11.Http11NioProtocol");
//        //open http（8080）、https（8443）two ports
//        connector.setScheme("http");
//        connector.setSecure(false);
//        connector.setPort(8080);
//        connector.setRedirectPort(8443);
//        return connector;
//    }

//    /**
//     * http redirect to https
//     */
//    @Bean
//    public TomcatServletWebServerFactory servletContainer() {
//        TomcatServletWebServerFactory tomcat = new TomcatServletWebServerFactory() {
//            @Override
//            protected void postProcessContext(Context context) {
//                SecurityConstraint constraint = new SecurityConstraint();
//                constraint.setUserConstraint("CONFIDENTIAL");
//                SecurityCollection collection = new SecurityCollection();
//                collection.addPattern("/*");
//                constraint.addCollection(collection);
//                context.addConstraint(constraint);
//            }
//        };
//        tomcat.addAdditionalTomcatConnectors(httpConnector());
//        return tomcat;
//    }
//    @Bean
//    public Connector httpConnector() {
//        Connector connector = new Connector("org.apache.coyote.http11.Http11NioProtocol");
//        connector.setScheme("http");
//        //Connector listening http port
//        connector.setPort(8080);
//        connector.setSecure(false);
//        //and the redirect to https port
//        connector.setRedirectPort(8443);
//        return connector;
//    }
}
