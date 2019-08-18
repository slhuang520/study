<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<!DOCTYPE HTML>
<html>
	<script type="text/javascript" src="<%=request.getContextPath() %>/js/platform.js"></script>
	<link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/css/platform.css">
	
	<table id="platform"></table>
  
  	<div id="platform_tool" style="display: none;" class="tool_div">
		<div style="margin-bottom:5px;" id="btnDiv">
			<a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-add-new',plain:true" id="add_platform" onclick="platform.add();">添加</a>
			<a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-edit-new',plain:true" id="edit_platform" onclick="platform.edit();">修改</a>
			<a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-delete-new',plain:true" id="platform_remove" onclick="platform.remove();">删除</a>
			<a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-save',plain:true" id="platform_save" style="display: none;" onclick="platform.save();">保存</a>
			<a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-redo',plain:true" id="platform_redo" style="display: none;" onclick="platform.redo();">取消编辑</a>		
		</div>
	</div>
	
	<div id="platform_menu" class="easyui-menu" style="width:120px;display:none;">
		<div onclick="platform.add();" data-Options="iconCls:'icon-add'">增加</div>
		<div onclick="platform.edit();" data-Options="iconCls:'icon-edit'">修改</div>
		<div onclick="platform.remove();" data-Options="iconCls:'icon-remove'">删除</div>
	</div>
	
	<form id="platform_add" style="display: none;" class="add_dialog">
		<p><label for="platform_name">平台名称：</label><input type="text" id="platform_name" name="platform_name" class="textbox"></p>
		<p><label for="platform_region">平台区域：</label><input type="text" id="platform_region" name="platform_region" class="textbox"></p>
		<p><label for="platform_demo">平台说明：</label><input type="text" id="platform_demo" name="platform_demo" class="textbox"></p>
	</form>

</html>
