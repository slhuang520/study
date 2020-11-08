//https://github.com/socketio/socket.io
//与express结合
const express = require("express"),
    app = express(),
    server = require("http").createServer(app),
    io = require("socket.io")(server),
    path = require("path");

io.on("connection", client => {
    client.emit("hehe", "你好！");
    client.on("haha", msg => {
        console.log("haha", msg);
    });
});

//静态资源访问的相对路径，用于html中的js加载
app.use(express.static("./"));//路径指向 相对的文件夹路径

app.use("/index", function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"))
});
let ws = server.listen(3000, function () {
    console.log('start at port:' + ws.address().port);
});
// app.set("port", 3000); //可以不用这个
// let ws = server.listen(app.settings.port, function () {
//     console.log('start at port:' + ws.address().port);
// });

//这样不行
// app.listen(3333, "127.0.0.1", function (err) {
//     if (err) {
//         console.log("监听失败");
//         throw err;
//     }
//
//     console.log("server 已经开启，默认IP: 127.0.0.1, Port：3333");
// });

