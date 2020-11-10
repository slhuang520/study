/*
总体思路是：
1.login 成功之后，先获取一个token，然后保存起来，可以是 cookie，也可以是项目中的某个变更
//client:
const jwt = require("./jwt/jtw");
$.post(url, data, function() {
    let us = $("#us");
    const token = jwt.getAccessToken({us: us});
});
2.后面每次请求，都需要将这个token传给server
//server:
3.server验证token是否对，或是过期。
jwt.tokenValidate(token)
*/

const jwt = require("jsonwebtoken");
const secret = "anything else";//私钥

function getAccessToken(payload) {
    payload.ctime = Date.now();
    payload.express = 1000 * 60 * 10; //10min
    return  jwt.sign(payload, secret);
}

function tokenValidate(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, (err, data) => {
            if (err) reject("token validate failed.");

            //express valid
            if (Date.now() - date.ctime > data.express) reject("token expired.");

            resolve(data);
        });
    });
}
module.exports = {
    getAccessToken,
    tokenValidate
};