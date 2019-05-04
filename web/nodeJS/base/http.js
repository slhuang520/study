var http = require("http");
var fs = require("fs");
var path = require("path");

http.createServer(function (req, res) {
    //console.log(req);
    //console.log(res);
    // res.write("dddddddddd"); //直接写字符串内容到页面
    // res.end();//必须调用结束处理

    /*直接将页面读取到，然后写到页面上去
    // var index = fs.readFileSync("./views/index.html", "utf8");
    // __dirname:当前项目的路径：G:\web\nodeJS\base
    // __filename:当前js文件所在的路径：G:\web\nodeJS\base\http.js
    console.log(__dirname);
    console.log(__filename);
    var index = fs.readFileSync(path.join(__dirname, "views", "index.html"), "utf8");
    res.write(index);
    res.end();
    */

    //通过路由匹配不同的页面
    var myUrl = req.url;
    console.log(myUrl);
    if (myUrl === "/favicon.ico") {
        return;
    }
    var page = myUrl === "/" ? "index.html" : myUrl;
    var p = page;
    if (!fs.existsSync(path.join(__dirname, "views", p))) { //判断页面是否存在
        p = path.join("err", "404.html");
    }
    var html = fs.readFileSync(path.join(__dirname, "views", p), "utf8");
    res.write(html);
    res.end();

}).listen("3000", /*"192.168.56.1",*/ function (err) {
    if (err) {
        console.log(err);
        console.log("开启server失败");
        return;
    }
    console.log("开启server成功，IP: 127.0.0.1,Post:3000");
});