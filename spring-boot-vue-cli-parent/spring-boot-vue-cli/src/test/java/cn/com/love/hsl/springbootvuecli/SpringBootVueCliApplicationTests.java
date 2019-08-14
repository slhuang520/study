package cn.com.love.hsl.springbootvuecli;

import cn.com.love.hsl.utils.LogUtils;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class SpringBootVueCliApplicationTests {

    @Test
    public void contextLoads() {
    }

    @Test
    public void testLog() {
        Logger el = LogUtils.getExceptionLogger();
        Logger bl = LogUtils.getBusinessLogger();
        Logger dl = LogUtils.getDBLogger();
        Logger pl = LogUtils.getPlatformLogger();

        el.error("getExceptionLogger===日志测试");
        bl.error("getBusinessLogger===日志测试");
        dl.error("getDBLogger===日志测试");
        pl.error("getPlatformLogger===日志测试");
    }
}
