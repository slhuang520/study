/**
 * 使用 npm 管理 server 端（服务端）的包
 * 使用 bower 管理 web 端（客户端）的包
 * @type {*|createApplication}
 */

var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");

//创建server网站
var app = express();
// 获取Post body 传参
app.use(bodyParser.json());
// 如果有url加密的，需要解密
app.use(bodyParser.urlencoded({extended: false}));

//指定默认的访问页面（index.html）
app.use(express.static('view'));//路径指向 相对的文件夹路径

// Get 返回字符串
app.get("/a", function (req, res) {
    res.send("server response");
});
// Get 返回 Json
app.get("/b", function (req, res) {
    res.json({name: "Jim", age: 12});
})
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
