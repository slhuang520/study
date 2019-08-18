<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
<head>

  <title>管理员登录</title>

  <meta charset="UTF-8">
  <meta http-equiv="keywords" content="easyui,jQuery,background,system,manager">
  <meta http-equiv="description" content="login page">

  <link rel="stylesheet" type="text/css" href="easyui/themes/default/easyui.css">
  <link rel="stylesheet" type="text/css" href="easyui/themes/color.css">
  <link rel="stylesheet" type="text/css" href="easyui/themes/icon.css">
  <link rel="stylesheet" type="text/css" href="easyui/themes/icon.css">
  <link rel="stylesheet" type="text/css" href="css/basic.css">
  <link rel="stylesheet" type="text/css" href="css/login.css">

  <script type="text/javascript" src="js/jquery.js"></script>
  <script type="text/javascript" src="easyui/jquery.easyui.min.js"></script>
  <script type="text/javascript" src="js/login.js"></script>
  <script type="text/javascript" src="js/banner.js"></script>

  <!-- 引入小图标 -->
  <link rel="shortcut icon" type="image/x-ico" href="img/basic/project.ico">
  <script type="text/javascript">

  </script>
</head>

<body>

<header id="header">
  <div id="logDiv">
    <h1>财务报表</h1>
    <h2>信息管理系统</h2>
    <ul>
      <li>●</li>
      <li>●</li>
      <li>●</li>
      <li>●</li>
      <li>●</li>
      <li>●</li>
    </ul>
  </div>
</header>
<span id="bannerCurBg">&nbsp;</span>

<section id="section">
  <div id="loginDiv">
    <p><label for="user">管理员帐号：</label><input type="text" id="user" name="user" class="textbox"></p>
    <p><label for="password">管理员密码：</label><input type="password" id="password" name="password" class="textbox"></p>
    <input type="button" value="登录" id="loginBtn" alt="<%=request.getContextPath() %>">
  </div>
</section>

<footer id="footer">
  <div>Copyright © HSL 胆小鬼放飞的梦| 渝ICP 备120110119 号| 网站经营许可证：L-YC-BK12345</div>
</footer>

</body>
</html>
