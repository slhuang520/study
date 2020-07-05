const qqAuthCode = "fuekmrtlxthybhii",
    nodeMailer = require("nodemailer"),
    http = require("http");

let transporter = nodeMailer.createTransport({
    host: "smtp.qq.com",
    port: 465,
    secure: true,
    auth: {
        user: "349733050",
        pass: qqAuthCode
    }
});

let mailContent = {
    // from: '349733050@qq.com', // sender address
    from: '"Fred Foo 👻" <349733050@qq.com>', // sender address
    to: "349733050@qq.com", // list of receivers
    subject: "Hello ✔", // Subject line
    // text: "Hello world?", // plain text body
    html: `
        <a href="http://192.168.0.7:3000/html/activate.html">点击激活</a>
        <img src="http://192.168.0.7:3000/img/23.jpg">
        <!--<div id="active">
            <div onclick="active1()">点击激活</div>
            &lt;!&ndash;<img src="http://192.168.0.7:3000/img/23.jpg">&ndash;&gt;
        </div>
        <div id="activeed" style="display: none;">
            <h2>恭喜您，激活成功！</h2>
        </div>
        
        <script>
            function active1() {
                alert(123);
              // http://192.168.0.7:3000/html/activate.html
              let url = "http://192.168.0.7:3000/user/addEmail?token=222";
              http.get(url).then((res) => {
                  console.log("active:", res)
              });
            }
        </script>-->
    `, // html body
};

transporter.sendMail(mailContent, (error, data) => {
    console.log(error, data.messageId); //<4066ed37-6fc6-2bec-ba06-06a3345d0853@qq.com>
});

// module.exports = function () {
//     transporter.sendMail(mailContent, (error, data) => {
//         console.log(error, data.messageId); //<4066ed37-6fc6-2bec-ba06-06a3345d0853@qq.com>
//     });
// };