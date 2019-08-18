<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<!DOCTYPE HTML>
<html>
	<script type="text/javascript" src="<%=request.getContextPath() %>/js/role.js"></script>
	<link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/css/role.css">
	
	<table id="role"></table>
  
  	<div id="role_tool" style="display: none;" class="tool_div">
		<div style="margin-bottom:5px;" id="btnDiv">
			<a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-add-new',plain:true" id="add_role" onclick="role.add();">添加</a>
			<a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-edit-new',plain:true" id="edit_role" onclick="role.edit();">修改</a>
			<a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-delete-new',plain:true" id="role_remove" onclick="role.remove();">删除</a>
			<a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-save',plain:true" id="role_save" style="display: none;" onclick="role.save();">保存</a>
			<a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-redo',plain:true" id="role_redo" style="display: none;" onclick="role.redo();">取消编辑</a>		
		</div>
	</div>
	
	<div id="role_menu" class="easyui-menu" style="width:120px;display:none;">
		<div onclick="role.add();" data-Options="iconCls:'icon-add'">增加</div>
		<div onclick="role.edit();" data-Options="iconCls:'icon-edit'">修改</div>
		<div onclick="role.remove();" data-Options="iconCls:'icon-remove'">删除</div>
	</div>
	
	<form id="role_add" style="display: none;" class="add_dialog">
		<p><label for="role_name">角色名称：</label><input type="text" id="role_name" name="role_name" class="textbox"></p>
		<p><label for="role_demo">角色说明：</label><input type="text" id="role_demo" name="role_demo" class="textbox"></p>
	</form>

</html>
