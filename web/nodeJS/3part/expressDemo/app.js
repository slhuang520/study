const express = require("express"),
    path = require("path"),
    bodyParser = require("body-parser"),
    db = require("./db"),
    userRouter = require("./routers/UserRouter");

//创建server网站
let app = express();

// 获取Post body 传参
app.use(bodyParser.json());
// 如果有url加密的，需要解密
app.use(bodyParser.urlencoded({extended: false}));

//指定静态资源的默认的访问页面
//可以直接通过 server 的IP访问
app.use(express.static(path.join(__dirname, 'static')));

// require("./mail/mail"); //发送邮件

//全局中间件
// app.use((req, res, next) => { //2种写法都可以
app.use("/", (req, res, next) => {
    console.log("中间件", req.originalUrl);
    let {token} = req.query;
    let {originalUrl} = req;
    // if (originalUrl.startsWith("/img") || originalUrl.startsWith("/favicon")) {
    if (originalUrl === "/user/addEmail") {
        next(); //允许静态资料访问，是否往下执行
    } else if (token) {
        next(); //是否往下执行
    } else {
        console.log("缺少token验证");
        res.json({result: -2, msg: "缺少token验证"});
    }
});

app.use("/user", userRouter);

//[*]表示所有，如果以上的路径都没有匹配时，则表明没有找到相应的页面
app.use("*", function (req, res) {// 这里的[*]是可以省略的
    res.sendFile(path.join(__dirname, "view", "err", "404.html"));
});

app.listen("3000", function (err) {
    if (err) {
        console.log("监听失败");
        throw err;
    }

    console.log("server 已经开启，默认IP: 127.0.0.1, Port：3000");
});