/**
 * 使用 npm 管理 server 端（服务端）的包
 * 使用 bower 管理 web 端（客户端）的包
 * @type {*|createApplication}
 */

var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var userRouter = require("./routers/UserRouter");

//创建server网站
var app = express();
// 获取Post body 传参
app.use(bodyParser.json());
// 如果有url加密的，需要解密
app.use(bodyParser.urlencoded({extended: false}));

app.use(session({
    secret: "anything else",
    cookie: {maxAge: 1000 * 60}, //3min
    resave: true, //即使 session 没有被修改，也保存 session值，默认为 true
    saveUninitialized: false //无论有没有session cookie，每次请求都设置一个session cookie，默认给个标识为 connect.sid
}));

//指定默认的访问页面（index.html）
// app.use(express.static('view'));//路径指向 相对的文件夹路径
app.use(express.static(path.join(__dirname, 'H-ui'), {index: "login.html"}));

app.use(function (req, res, next) {
    let {originalUrl} = req;
    const validPage = ["/a", "/b", "/c", "/d", "/list", "/info", "/login", "/user/login"];
    if (validPage.includes(originalUrl)) {
        next();
        return;
    }
    if (req.session.login) {
        next();
        return;
    }
    res.send({code: -998, msg: "请先登录"});
});

// Get 返回字符串
app.get("/a", function (req, res) {
    res.send("server response");
});
// Get 返回 Json
app.get("/b", function (req, res) {
    res.json({name: "Jim", age: 12});
});
// Post 返回 Json
app.post("/b", function (req, res) {
    res.json({name: "Jim", age: 12});
});
// All 返回 Json，all 可以接收 get 或是 Post
app.all("/c", function (req, res) {
    res.json({name: "Jim", age: 12});
});
// Get 通过路由传参
app.get("/d/:id", function (req, res) {
    var id = req.params.id;
    console.log(id);
    res.json({name: id, age: 12});
});
// Post body 传参
app.post("/d", function (req, res){
    var name = req.body.name;
    console.log(name);
    res.json({name: name, age: 12});
});

//通过路由显示相应的页面
app.use("/list", function (req, res) {
    res.status(200).sendFile(path.join(__dirname, "view", "list.html"));//返回200表示正常
});

app.use("/info", function (req, res) {
    res.sendFile(path.join(__dirname, "view", "info.html"))
});


//h-ui login.html
app.use("/login", function (req, res) {
    res.sendFile(path.join(__dirname, "H-ui", "login.html"))
});

//h-ui index.html
app.use("/index", function (req, res) {
    res.sendFile(path.join(__dirname, "H-ui", "index.html"))
});

//h-ui article-list.html
app.use("/article-list", function (req, res) {
    res.sendFile(path.join(__dirname, "H-ui", "article-list.html"));
});

app.use("/user", userRouter);


//[*]表示所有，如果以上的路径都没有匹配时，则表明没有找到相应的页面
app.use("*", function (req, res) {// 这里的[*]是可以省略的
    res.sendFile(path.join(__dirname, "view", "err", "404.html"));
});

app.listen(3000, /*"192.168.56.1",*/ function (err) {
    if (err) {
        console.log("监听失败");
        throw err;
    }

    console.log("server 已经开启，默认IP: 127.0.0.1, Port：3000");
});
