<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
	<link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/css/employee.css">
	<script type="text/javascript" src="<%=request.getContextPath() %>/js/employee.js"></script>
	<table id="employee"></table>

	<div id="employee_tool" style="display: none;" class="tool_div">
	
		<div style="margin-bottom:5px;" id="btnDiv">
			<a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-add-new',plain:true" onclick="employee.add();" id="add_employee">添加</a>
			<a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-edit-new',plain:true" onclick="employee.edit();">修改</a>
			<a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-delete-new',plain:true" onclick="employee.remove();" id="employee_remove">删除</a>
			<a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-undo',plain:true" id="employee_undo" style="display: none;" onclick="employee.undo();">取消所有选择</a>
			<a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-save',plain:true" id="employee_save" style="display: none;" onclick="employee.save();">保存</a>
			<a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-redo',plain:true" id="employee_redo" style="display: none;" onclick="employee.redo();">取消编辑</a>		
		</div>
		<div style="padding:0 0 0 7px;color:#333;" id="conditionDiv">
			查询姓名：<input type="text" class="textbox" name="user" style="width:110px">
			所属部门：<input type="text" class="textbox" name="dept" style="width:110px" id="emp_dept">
			担当职位：<input type="text" class="textbox" name="position" style="width:110px" id="emp_position">
			上级主管：<input type="text" class="textbox" name="manager" style="width:110px" id="emp_manager">
			创建时间从：<input type="text" id="emp_date_from" name="date_from" style="width:110px">
			到：<input type="text" id="emp_date_to" name="date_to" style="width:110px">
			<a href="#" class="easyui-linkbutton"  data-options="iconCls:'icon-search'" onclick="employee.search();">查询</a>
		</div>
	</div>
	
	<div id="employee_menu" class="easyui-menu" style="width:120px;display:none;">
		<div onclick="employee.add();" data-Options="iconCls:'icon-add'">增加</div>
		<div onclick="employee.edit();" data-Options="iconCls:'icon-edit'">修改</div>
		<div onclick="employee.remove();" data-Options="iconCls:'icon-remove'">删除</div>
	</div>
	
	<form id="employee_add" style="display: none;"class="add_dialog_employee">
		<div class="left">
			<p><label for="user">员工姓名：</label><input type="text" id="emp_user" name="user" class="textbox"></p>
			<p><label for="phone">联系方式：</label><input type="text" id="emp_phone" name="phone" class="textbox"></p>
			<p><label>员工性别:</label><label for="boy" style="margin-left: 20px;margin-top: 3px;">男</label><input type="radio" id="boy" name="sex" value="1">&nbsp;&nbsp;<label for="girl">女</label><input id="girl" type="radio" name="sex" value="0"></p>
			<p><label for="email">员工邮箱：</label><input type="text" id="emp_email" name="email" class="textbox"></p>
			<p><label for="birth">员工生日：</label><input type="text" id="emp_birth" name="birth" class="textbox"></p>
			<p><label for="employee_economy_no">经济编号：</label><input type="text" id="employee_economy_no" name="economy_no" class="textbox"></p>
		</div>
		<div class="right">
			<p><label for="employee_dept">所属部门：</label><input type="text" id="employee_dept" name="dept" class="textbox"></p>
			<p><label for="employee_manager">上级主管：</label><input type="text" id="employee_manager" name="manager" class="textbox"></p>
			<p><label for="employee_position">担当职位：</label><input type="text" id="employee_position" name="position" class="textbox"></p>
			<p><label for="employee_role">扮演角色：</label><input type="text" id="employee_role" name="role" class="textbox"></p>
			<p><label for="employee_room_no">房间号码：</label><input type="text" id="employee_room_no" name="room_no" class="textbox"></p>
			<p><label for="employee_region">所在区域：</label><input type="text" id="employee_region" name="region" class="textbox"></p>
		</div>
		<div class="center">
			<p><label for="employee_demo">其他说明：</label><input type="text" id="employee_demo" name="demo" class="textbox"></p>
		</div>
	</form>
	
</html>