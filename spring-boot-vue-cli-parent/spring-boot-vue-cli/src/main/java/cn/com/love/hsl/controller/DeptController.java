package cn.com.love.hsl.controller;

import cn.com.love.hsl.model.Dept;
import cn.com.love.hsl.service.DeptService;
import cn.com.love.hsl.utils.ContextProp;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/dept")
public class DeptController {

    @Autowired
    private DeptService deptService;

    @Autowired
    private ContextProp prop;

    private final static Logger logger = LoggerFactory.getLogger(DeptController.class);

    @RequestMapping("/get")
    public ResponseEntity get(String id) {
        logger.info(this.getClass().getName() + "{} {}", ".get(" + id + ")", "started..");
        System.out.println(1222222222);
        logger.debug(prop.getName());
        return ResponseEntity.ok(deptService.get(id));
    }

    @RequestMapping("/save")
    public ResponseEntity save(Dept dept) {
        if (StringUtils.isEmpty(dept.getId()))
            return ResponseEntity.ok(deptService.insert(dept));
        else
            return ResponseEntity.ok(deptService.update(dept));
    }

    @RequestMapping("/delete")
//    public ResponseEntity delete(Integer id) {
//        deptService.delete(id);
//        return ResponseEntity.ok("Delete success!");
//    }
    public @ResponseBody String delete(String id) {
        deptService.delete(id);
        return "Delete success!";
    }

    @RequestMapping("/list")
    public ResponseEntity find() {
        return ResponseEntity.ok(deptService.findAll());
    }
}
