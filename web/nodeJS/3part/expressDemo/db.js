const mongoose = require("mongoose");

/*
mongoose.connect("mongodb://localhost/user", { useNewUrlParser: true, useUnifiedTopology: true  })
    // .then((err, msg) => {
    //     console.log("连接MongoDB成功");
    // })
    // .catch(err => {
    //     console.log("连接MongoDB失败");
    // });

//获取一个连接
let db = mongoose.connection;

db.on("error", console.error.bind(console, "连接MongoDB失败"));
db.once("open", console.log.bind(console, "连接MongoDB成功"));
*/

( async ()=> {
    await mongoose.connect("mongodb://localhost/user", {useNewUrlParser: true, useUnifiedTopology: true})
        .then((err, msg) => {
            console.log("连接MongoDB成功");
        })
        .catch(err => {
            console.log("连接MongoDB失败");
        });

    //获取一个连接
    let db = mongoose.connection;
module.exports = db;


    /*let userSchema = new mongoose.Schema({
        name: { type: String, required: true },
        age: {type:Number, required: true}
    });

    let User = mongoose.model("users", userSchema); //model名称会默认变成复数形式，比如：child -> children
    
    await User.insertMany({name: "a", age: 1}).then((data) => {
        console.log("插入数据成功：", data);
    }).catch(err => {
        console.error(err);
    });

    User.update({age: 1}, {name: "a2", age: 2}).then((data) => {
        console.log("更新数据成功：", data);
    }).catch(err => {
        console.error(err);
    });

    await User.find().then(data => {
        console.log("查询成功", data);
    }).catch(err => {
        console.error(err);
    });

    // await User.remove().then(data => {
    //     console.log("删除成功：", data);
    // }).catch(err => {
    //     console.error(err);
    // });

    User.find().then(data => {
        console.log("查询成功", data);
    }).catch(err => {
        console.error(err);
    });*/
})();
