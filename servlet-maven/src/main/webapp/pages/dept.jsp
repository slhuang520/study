<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<!DOCTYPE HTML>
<html>
	<script type="text/javascript" src="<%=request.getContextPath() %>/js/dept.js"></script>
	<link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/css/dept.css">
	
	<table id="dept"></table>
  
  	<div id="dept_tool" style="display: none;" class="tool_div">
		<div style="margin-bottom:5px;" id="btnDiv">
			<a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-add-new',plain:true" id="add_dept" onclick="dept.add();">添加</a>
			<a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-edit-new',plain:true" id="edit_dept" onclick="dept.edit();">修改</a>
			<a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-delete-new',plain:true" id="dept_remove" onclick="dept.remove();">删除</a>
			<a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-save',plain:true" id="dept_save" style="display: none;" onclick="dept.save();">保存</a>
			<a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-redo',plain:true" id="dept_redo" style="display: none;" onclick="dept.redo();">取消编辑</a>		
		</div>
	</div>
	
	<div id="dept_menu" class="easyui-menu" style="width:120px;display:none;">
		<div onclick="dept.add();" data-Options="iconCls:'icon-add'">增加</div>
		<div onclick="dept.edit();" data-Options="iconCls:'icon-edit'">修改</div>
		<div onclick="dept.remove();" data-Options="iconCls:'icon-remove'">删除</div>
	</div>
	
	<form id="dept_add" style="display: none;" class="add_dialog">
		<p><label for="dept_name">部门名称：</label><input type="text" id="dept_name" name="dept_name" class="textbox"></p>
		<p><label for="dept_room_no">部门房间：</label><input type="text" id="dept_room_no" name="dept_room_no" class="textbox"></p>
		<p><label for="dept_demo">部门说明：</label><input type="text" id="dept_demo" name="dept_demo" class="textbox"></p>
	</form>

</html>
