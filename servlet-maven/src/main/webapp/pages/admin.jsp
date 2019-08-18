<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html>
  <head>
    
    <title>管理员</title>
    
    <meta charset="UTF-8">
	<meta http-equiv="keywords" content="easyui,jQuery,background,system,manager">
	<meta http-equiv="description" content="admin page">
	
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath }/easyui/themes/default/easyui.css">
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath }/easyui/themes/color.css">
	<link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/easyui/themes/icon.css">
	<link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/easyui/themes/icon.css">
	<link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/css/basic.css">
	<link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/css/admin.css">
	
	<script type="text/javascript" src="<%=request.getContextPath() %>/js/jquery.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath() %>/easyui/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath() %>/js/login.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath() %>/js/admin.js"></script>
	
	<!-- 引入小图标 -->
	<link rel="shortcut icon" type="image/x-ico" href="<%=request.getContextPath() %>/img/basic/project.ico">
	
	<!-- 日历 -->
	<link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/Calendario/css/calendar.css" />
	<link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/Calendario/css/custom_2.css" />
	<link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/Calendario/css/custom_1.css" />
	<script type="text/javascript" src="<%=request.getContextPath() %>/Calendario/js/modernizr.custom.63321.js"></script>
	
	<!-- 时钟、天气 -->
	<link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/jdigiclock/css/jquery.jdigiclock.css" />
    <script type="text/javascript" src="<%=request.getContextPath() %>/weather/jquery.simpleWeather.js"></script>
    <script type="text/javascript" src="<%=request.getContextPath() %>/jdigiclock/lib/jquery.jdigiclock.js"></script>
  </head>
  
  <body class="easyui-layout">   
    <div id="header" data-options="region:'north',title:'North Title',noheader:true">
    	<div class="center">
	    	<div class="floatLeft">
	    		<div class="left">
	    			<img alt="" src="${pageContext.request.contextPath }/img/basic/word.png">
	    		</div>
	    		<div class="right">
		    		<span class="logo">系统|高效|安全|智能</span>
		    		<span class="news"><marquee scrollamount="3" behavior="scroll" direction="right" onmouseover="this.stop()" onmouseout="this.start();">滚动滚动字幕动字幕滚动字幕滚动字</marquee></span>
	    		</div>
	    	</div>
    		<div class="title"><span>财务报表信息管理系统</span></div>
	    	<div class="floatRight">
	    		<div class="theme">
    				<span>主题：</span> 
					<ul>
						<li title="black" class="black" style="color: #3d3d3d;">■</li>
						<li title="bootstrap" class="bootstrap" style="color: #F2F2F2;">■</li>
						<li title="default" class="default" style="color: #E0ECFF;">■</li>
						<li title="gray" class="gray" style="color: #f3f3f3;">■</li>
						<li title="metro" class="metro" style="color: #ffffff;">■</li>
					</ul>
   				</div>
   				<div class="user">
					<span id="dynamicTime"></span>
					<c:choose>
				    	<c:when test="${sessionScope.login_user != null && !empty sessionScope.login_user }">
				    		您好，${sessionScope.login_user.name } |<a href="<%=request.getContextPath() %>" id="logout">退出</a>
				    	</c:when>
				    	<c:otherwise>
				    		<a href="#" id="login_a">登录</a>|<a href="#" id="regest_a">注册</a>
				    	</c:otherwise>
				    </c:choose>
				</div>
	    	</div>
    	</div>
    </div>   
    <div id="west" data-options="region:'west',title:'导航',split:true,iconCls:'icon-world'" style="width:200px;">
    	<ul id="nav"></ul>
    </div>   
    <div id="center" data-options="region:'center'" style="background:#eee;overflow:hidden;">
    	<div id="tabs">
	    	<div id="tab1" title="欢迎页" style="padding: 0 10px;" data-options="iconCls:'icon-house'">
	    		<div class="container">
		    		<div id="demo2">
		    			<div class="left">
							<header class="clearfix">
								<nav class="codrops-demos">
									<span id="bigCalender">大图日历</span> | 
									<span class="current-demo">小图日历</span>
								</nav>
							</header>
							<section class="main">
								<div class="custom-calendar-wrap">
									<div id="custom-inner" class="custom-inner">
										<div class="custom-header clearfix">
											<nav>
												<span id="custom-prev2" class="custom-prev"></span>
												<span id="custom-next2" class="custom-next"></span>
											</nav>
											<h2 id="custom-month2" class="custom-month"></h2>
											<h3 id="custom-year2" class="custom-year"></h3>
										</div>
										<div id="calendar2" class="fc-calendar-container"></div>
									</div>
								</div>
							</section>
						</div>
						<div class="right">
							<div id="digiclock"></div>
						</div>
					</div>
					<div id="demo1" style="display: none;">
						<div class="custom-calendar-wrap custom-calendar-full">
							<div class="custom-header clearfix">
								<h2>Flexible Calendar <span><span>大图日历</span> | <a id="smallCalender" href="demo2.html">小图日历</a></span></h2>
								<h3 class="custom-month-year">
									<span id="custom-month1" class="custom-month"></span>
									<span id="custom-year1" class="custom-year"></span>
								</h3>
							    <nav>
							    	<span id="custom-prev1" class="custom-prev"></span>
									<span id="custom-next1" class="custom-next"></span>
									<span id="custom-current" class="custom-current" title="Got to current date"></span>
							    </nav>
							</div>
							<div id="calendar1" class="fc-calendar-container"></div>
						</div>
					</div>
				</div>
	    	</div>
    	</div>
    </div>   
    <div id="south" data-options="region:'south',title:'South Title',noheader:true">
    	<div>Copyright © HSL 胆小鬼放飞的梦| 渝ICP 备120110119 号| 网站经营许可证：L-YC-BK12345</div>
    </div>
    
    <!-- 登录框 -->
    <div id="loginDiv">
    	<p><label for="user">管理员帐号：</label><input type="text" id="user" name="user" class="textbox"></p>
		<p><label for="password">管理员密码：</label><input type="password" id="password" name="password" class="textbox"></p>
		<input type="button" value="登录" name="loginBtn" id="loginBtn" alt="<%=request.getContextPath() %>">
    </div>
    
    <div id="refreshMenu" class="easyui-menu" data-options="width:30" style="width:30px;display:none;">
    	<div onclick="obj.refresh()" data-Options="iconCls:'icon-reload'">刷新</div>
    </div>
    
    <img alt="" id="loading" src="${pageContext.request.contextPath }/img/basic/loading.gif" style="display: none;" >
    <!-- 日历 -->
    <script type="text/javascript" src="<%=request.getContextPath() %>/Calendario/js/jquery.calendario.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath() %>/Calendario/js/data.js"></script>
  </body>
</html>
