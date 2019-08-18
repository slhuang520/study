<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<!DOCTYPE HTML>
<html>
	<script type="text/javascript" src="<%=request.getContextPath() %>/js/position.js"></script>
	<link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/css/position.css">
	
	<table id="position"></table>
  
  	<div id="position_tool" style="display: none;" class="tool_div">
		<div style="margin-bottom:5px;" id="btnDiv">
			<a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-add-new',plain:true" id="add_position" onclick="position.add();">添加</a>
			<a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-edit-new',plain:true" id="edit_position" onclick="position.edit();">修改</a>
			<a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-delete-new',plain:true" id="position_remove" onclick="position.remove();">删除</a>
			<a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-save',plain:true" id="position_save" style="display: none;" onclick="position.save();">保存</a>
			<a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-redo',plain:true" id="position_redo" style="display: none;" onclick="position.redo();">取消编辑</a>		
		</div>
	</div>
	
	<div id="position_menu" class="easyui-menu" style="width:120px;display:none;">
		<div onclick="position.add();" data-Options="iconCls:'icon-add'">增加</div>
		<div onclick="position.edit();" data-Options="iconCls:'icon-edit'">修改</div>
		<div onclick="position.remove();" data-Options="iconCls:'icon-remove'">删除</div>
	</div>
	
	<form id="position_add" style="display: none;" class="add_dialog">
		<p><label for="position_name">职位名称：</label><input type="text" id="position_name" name="position_name" class="textbox"></p>
		<p><label for="position_demo">职位说明：</label><input type="text" id="position_demo" name="position_demo" class="textbox"></p>
	</form>

</html>
