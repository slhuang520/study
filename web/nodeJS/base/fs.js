var fs = require("fs");

console.log(11111111);
//同步写文件
var res = fs.writeFileSync("./txt/t1.txt", "这是一行文字");
console.log(res); //如果是 null 或是 undefined说明操作成功了，若失败将会返回错误信息
console.log(22222222);
//异步写文件
fs.writeFile("./txt/t1.txt", "这是修改后的一行文字", "utf8", function (res) { // utf8 是可选的
    console.log(res);
    console.log("writeFile finished.");
});
console.log(33333333);
/*
11111111
undefined
22222222
33333333
null
write file finished.
* */

//同步添加文件内容
console.log(44444444);
res = fs.appendFileSync("./txt/t1.txt", "\n添加的一行", "utf8");
console.log(res);
/*
11111111
undefined
22222222
33333333
44444444
undefined
null
write file finished.
 */
//异步添加文件内容
console.log(5555555);
fs.appendFile("./txt/t1.txt", "\n添加的另一行", "utf8", function (res) {
    console.log(res);
    console.log("appendFile finished.");
});
console.log(6666666);
/*
11111111
undefined
22222222
33333333
44444444
undefined
5555555
6666666
null
writeFile finished.
null
appendFile finished.
 */
//同步读文件
res = fs.readFileSync("./txt/t1.txt", "utf8");
console.log(res);
//异步读文件
fs.readFile("./txt/t1.txt", "utf8", function (res, data) {
    console.log(res, data);
    console.log("readFile finished");
});
console.log(777777);
/*
11111111
undefined
22222222
33333333
44444444
undefined
5555555
6666666

添加的一行
777777
null
writeFile finished.
null
appendFile finished.
null '这是修改后的一行文字\n添加的另一行'
readFile finished
 */
//当监视的目录或文件中发生更改时触发
//使用 fs.watch() 比 fs.watchFile 和 fs.unwatchFile 更高效。 应尽可能使用 fs.watch 代替 fs.watchFile 和 fs.unwatchFile。
fs.watch("./txt/t1.txt", "utf8", function (eventType, filename) {//第二个参数是可选的。 如果 options 传入字符串，则它指定 encoding。 否则， options 应传入对象。
    console.log(eventType, filename);
});
console.log(88888);
//监视 filename 的更改。 每当访问文件时都会调用 listener 回调。
fs.watchFile("./txt/t1.txt", function (cur, pre) {
    console.log(cur, pre); //<fs.Stats> cur | pre 都是文件的状态
});
console.log(999999);