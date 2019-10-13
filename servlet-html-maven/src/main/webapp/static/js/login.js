$(function () {
    var toPath = document.location.search.substr(8);
    console.log(toPath);
    $("#loginBtn").click(function () {
        var user = $("#user").val(),
            psw = $("#password").val();

        var data = {
            method: "login",
            user: user,
            password: psw
        };
        $.post(getContextPath() + "/login.do", data, function (res) {
            console.log(res);
            if (res) {
                location.href = getContextPath() + (toPath ? toPath : "/pages/dept.html");
            }
        }, "json");
        /*$.getJSON(getContextPath() + "/login.do?method=login&user=" + user + "&password=" + psw, function (res) {
          console.log(res);
          if (res) {
            location.href = getContextPath() + "/index.html";
          }
        });*/
    });
});
