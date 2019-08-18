$(function(){
	
	//管理员帐号验证
	$("#user").validatebox({
		required: true,
		missingMessage : '请输入管理员帐号',
		invalidMessage : '管理员帐号不得为空',
	});
	$("#user").addClass("user_text_bg_img");
	
	//管理员密码验证
	$('#password').validatebox({
		required : true,
		validType : 'length[6,30]',
		missingMessage : '请输入管理员密码',
		invalidMessage : '管理员密码不正确',
	});
	$("#password").addClass("password_text_bg_img");
	
	//单击登录
	$("#loginBtn").click(login);
	
	$("#password").keyup(function(e) {
		if (e.keyCode == 13) {
			login();
		}
	});
	
	function login() {
		if (!$("#user").validatebox("isValid")) {
			$("#user").focus();
		} else if (!$("#password").validatebox("isValid")) {
			$("#password").focus();
		} else {
			var host = $("#loginBtn").attr('alt');
			$.ajax({
				url : host + "/loginServlet.do",
				type : "post",
				dataType : "json",
				data : {
					method : "login",
					user : $("#user").val(),
					password : $("#password").val(),
					time : new Date()
				},
				beforeSend : function(XMLHttpRequest) {
					$.messager.progress({
						text : "正在验证中...",
					});
				},
				success : function(data, textStatus, jqXHR) {
					$.messager.progress('close');
					if (data == null) {
						$.messager.alert('警告', "用户名或密码不对！", "warning", function() {
							$("#password").val("");
							$("#password").select();
						});
					} else if (data == false) {
						$.messager.alert('警告', "该用户没有登录权限！", "warning", function() {
							$("#password").val("");
							$("#password").select();
						});
					} else {
						if ($("#loginBtn").attr("name") != undefined) {
							$("#loginDiv").dialog("close");
						};
						location.href = host + '/pages/admin.jsp';
					}
				},
				error : function(XMLHttpRequest, textStatus, errorThrown) {
					$.messager.progress('close');
					$.messager.alert("错误", "登录失败！", "error", function() {
						$("#password").select();
					});
				}
			});
		}
	}
	
	//加载时判断验证
	if ($("#loginBtn").attr("name") == undefined) {
		if (!$("#user").validatebox("isValid")) {
			$("#user").focus();
		} else if (!$("#password").validatebox("isValid")) {
			$("#password").focus();
		}
	};
});