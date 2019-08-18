<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
  	<script type="text/javascript" src="<%=request.getContextPath() %>/js/menu.js"></script>
	<link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/css/menu.css">
	
	<table id="menu"></table>
  
  	<div id="menu_tool" style="display: none;" class="tool_div">
		<div style="margin-bottom:5px;" id="btnDiv">
			<a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-add-new',plain:true" onclick="menu.add();">添加</a>
			<a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-edit-new',plain:true" onclick="menu.edit();">修改</a>
			<a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-delete-new',plain:true" onclick="menu.remove();">删除</a>
			<a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-save',plain:true" id="menu_save" style="display: none;" onclick="menu.save();">保存</a>
			<a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-redo',plain:true" id="menu_redo" style="display: none;" onclick="menu.redo();">取消编辑</a>		
		</div>
	</div>
	
	<div id="menu_menu" class="easyui-menu" style="width:120px;display:none;">
		<div onclick="menu.add();" data-Options="iconCls:'icon-add'">增加</div>
		<div onclick="menu.edit();" data-Options="iconCls:'icon-edit'">修改</div>
		<div onclick="menu.remove();" data-Options="iconCls:'icon-remove'">删除</div>
	</div>
	
	<form id="menu_add" style="display: none;" class="add_dialog">
		<input type="hidden" id="menu_type" name="menu_type">
		<p><label for="menu_text">菜单名称：</label><input type="text" id="menu_text" name="menu_text" class="textbox"></p>
		<p><label for="menu_url">菜单路径：</label><input type="text" id="menu_url" name="menu_url" class="textbox"></p>
		<p><label for="menu_iconCls">图标类名：</label><input type="text" id="menu_iconCls" name="menu_iconCls" class="textbox"></p>
	</form>
</html>
