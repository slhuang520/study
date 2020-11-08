// nodejs的ws
//https://github.com/websockets/ws#broadcast-example
const WebSocket = require("ws");
let wss = new WebSocket.Server({port: 8888}, function(){
    console.log("socket server start.");
});
wss.on("connection", ws => {
    ws.on("message", msg => {
        console.log(msg, " <= 接收client数据");
        const data = msg + " Tom";
        if (msg.indexOf("all") !== -1) {
            console.log("Server广播数据=> ", data);
            // 广播
            wss.clients.forEach(client => {
                client.send(data);
            });
            return;
        }
        console.log("Server发送数据=> ", data);
        ws.send(data);
    });
    ws.on("close", () => {
        console.log("client主动断开连接.");
    });
});


