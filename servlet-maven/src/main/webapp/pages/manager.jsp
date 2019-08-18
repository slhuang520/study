<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
	<link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/css/manager.css">
	<table id="manager"></table>

	<div id="manager_tool" style="display: none;" class="tool_div">
	
		<div style="margin-bottom:5px;" id="btnDiv">
			<a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-add-new',plain:true" onclick="manager.add();">添加</a>
			<a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-edit-new',plain:true" onclick="manager.edit();">修改</a>
			<a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-delete-new',plain:true" onclick="manager.remove();">删除</a>
			<a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-undo',plain:true" id="manager_undo" style="display: none;" onclick="manager.undo();">取消所有选择</a>
			<a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-save',plain:true" id="manager_save" style="display: none;" onclick="manager.save();">保存</a>
			<a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-redo',plain:true" id="manager_redo" style="display: none;" onclick="manager.redo();">取消编辑</a>		
		</div>
		<div style="padding:0 0 0 7px;color:#333;" id="conditionDiv">
			查询帐号：<input type="text" class="textbox" name="user" style="width:110px">
			创建时间从：<input type="text" id="date_from" name="date_from" style="width:110px">
			到：<input type="text" id="date_to" name="date_to" style="width:110px">
			<a href="#" class="easyui-linkbutton"  data-options="iconCls:'icon-search'" onclick="manager.search();">查询</a>
		</div>
	</div>
	
	<div id="manager_menu" class="easyui-menu" style="width:120px;display:none;">
		<div onclick="manager.add();" data-Options="iconCls:'icon-add'">增加</div>
		<div onclick="manager.edit();" data-Options="iconCls:'icon-edit'">修改</div>
		<div onclick="manager.remove();" data-Options="iconCls:'icon-remove'">删除</div>
	</div>

	<form id="manager_add" style="display: none;" class="add_dialog">
		<p><label for="user">管理员帐号：</label><input type="text" id="add_user" name="user" class="textbox"></p>
		<p><label for="password">管理员密码：</label><input type="password" id="add_password" name="password" class="textbox"></p>
		<p><label for="password2">请确认密码：</label><input type="password" id="password2" name="password2" class="textbox"></p>
		<p><label >管理员性别:</label><label for="boy" style="margin-left: 20px;margin-top: 3px;">男</label><input type="radio" id="boy" name="sex" value="1">&nbsp;&nbsp;<label for="girl">女</label><input id="girl" type="radio" name="sex" value="0"></p>
		<p><label for="email">管理员邮箱：</label><input type="text" id="email" name="email" class="textbox"></p>
		<p><label for="birth">管理员生日：</label><input type="text" id="birth" name="birth" class="textbox"></p>
		<p><label for="isSysManger">管理员权限：</label><input title="是否有权限登录系统" type="text" id="isSysManger" name="isSysManger" value="false"></p>
		<!-- <p><label for="auth">管理员权限：</label><input type="hidden" id="auth" name="auth" class="textbox"></p> -->
	</form>
	
	<script type="text/javascript" src="<%=request.getContextPath() %>/js/manager.js"></script>
</html>