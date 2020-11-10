const express = require("express"),
    router = express.Router();

router.post("/login", (req, res, next) => {
    let {us, ps} = req.body;
    console.log("1111,", us, ps);
    if (!us || !ps) {
        return res.send({code: -997, msg: "用户名或密码错误"});
    }
    req.session.login = true;
    req.session.us = us;
    return res.send({code: 0, msg: "登录成功"})
});

/**
 * @api {get} /user/find 查询用户列表
 * @apiName FindUser
 * @apiGroup User
 *
 * @apiParam {String} name User Name - Not Required.
 * @apiParam {Number} age User Age - Not Required.
 *
 * @apiSuccess {Array} The list of the Users.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *      {
 *          name: "John",
 *          age: 15
 *      },
 *      {
 *          name: "Tom"
 *          age: 10
 *      }
 *     ]
 *
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "Data un-exist"
 *     }
 */
router.get("/find", (req, res, next) => {
    //局部中间件
    let {token1} = req.query;
    if (token1) {
        next();
    } else {
        res.json({result: -21, msg: "缺少token1验证"});
    }
}, (req, res) => {
    let {name, age} = req.query;

    let queryObj = {};
    if (name) {
        queryObj.name = name;
    }

    if (age || age === 0) {
        queryObj.age = age;
    }

    User.find(queryObj).then(data => {
        console.log(data);
        res.json({result: 0, data});
    }).catch(err => {
        console.error(err);
        res.json({result: -1, msg: "查询失败"});
    });
});

router.get("/addEmail", (req, res) => {
    let query = {
        name: "a2"
    };
    let updateContent = {
        email: "123456@qq.com"
    };
    User.update(query, updateContent).then(data => {
        console.log("update:", data);
        res.json({result: 0, data});
    }).catch(err => {
        console.error(err);
        res.json({result: -1, msg: "添加邮箱失败"});
    });
});

module.exports = router;