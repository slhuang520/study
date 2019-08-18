$(function() {
	
	//查询条件
	$("#emp_dept").combobox({
		//value : '请选择部门',
		valueField: 'id',    
		textField: 'name',
		mode : 'remote',
		url : '/fr/employeeServlet.do?method=getDepts',
		onSelect : function(record) {
			var url = "/fr/employeeServlet.do?method=getManagers&dept="+record.id;
			$("#emp_manager").combobox('reload', url);
			$("#employee_manager").combobox('clear');
		},
		onChange : function(newValue, oldValue) {
			if (newValue == '') {
				var url = "/fr/employeeServlet.do?method=getManagers";
				$("#emp_manager").combobox('reload', url);
			}
		}
	});
	$("#emp_position").combobox({
		//value : '请选择职位',
		valueField: 'id',    
		textField: 'name',
		mode : 'remote',
		url : '/fr/employeeServlet.do?method=getPositions'
	});
	$("#emp_manager").combobox({
		//value : '请选择角色',
		mode : 'remote',
		groupField : 'positionName',
		panelWidth : 150,
		valueField : 'id',
		textField : 'name',
		formatter : function(rowData) {
			if (rowData.deptName != null) {
				return rowData.name + "-[" + rowData.deptName + "]";
			} else {
				return rowData.name;
			}
		},
		url : '/fr/employeeServlet.do?method=getManagers'
	});
	
	$("#emp_date_from").datebox({
		editable : false,
		//formatter与parser要成对出现
    	formatter : function(date) {
    		var y = date.getFullYear();
            var m = date.getMonth() + 1 < 10 ? ("0" + (date.getMonth() + 1)) : date.getMonth() + 1;
            var d = date.getDate() < 10 ? ("0" + date.getDate()) : date.getDate();
            return y + "-" + m + "-" + d;
		},
		parser : function(s) {
			if (!s) return new Date();
            var ss = (s.split('-'));
            var y = parseInt(ss[0],10);
            var m = parseInt(ss[1],10);
            var d = parseInt(ss[2],10);
            if (!isNaN(y) && !isNaN(m) && !isNaN(d)){
                return new Date(y,m-1,d);
            } else {
                return new Date();
            }
		}
	});
	$("#emp_date_to").datebox({
		editable : false,
		//formatter与parser要成对出现
    	formatter : function(date) {
    		var y = date.getFullYear();
    		var m = date.getMonth() + 1 < 10 ? ("0" + (date.getMonth() + 1)) : date.getMonth() + 1;
            var d = date.getDate() < 10 ? ("0" + date.getDate()) : date.getDate();
            return y + "-" + m + "-" + d;
		},
		parser : function(s) {
			if (!s) return new Date();
            var ss = (s.split('-'));
            var y = parseInt(ss[0],10);
            var m = parseInt(ss[1],10);
            var d = parseInt(ss[2],10);
            if (!isNaN(y) && !isNaN(m) && !isNaN(d)){
                return new Date(y,m-1,d);
            } else {
                return new Date();
            }
		}
	});
	
	//按钮事件
	employee = {
		//修改的行号
		editRow : undefined,
		//新增
		search : function() {
			$("#employee").datagrid("load", {
				user : $.trim($("#conditionDiv input[name='user']").val()),
				dept : $.trim($("#conditionDiv input[name='dept']").val()),
				position : $.trim($("#conditionDiv input[name='position']").val()),
				manager : $.trim($("#conditionDiv input[name='manager']").val()),
				dateFrom : $.trim($("#conditionDiv input[name='date_from']").val()),
				dateTo : $.trim($("#conditionDiv input[name='date_to']").val()),
			});
			$("#employee_undo,#employee_save,#employee_redo").hide();
			this.editRow = undefined;
		},
		add : function() {
			$("#employee_add").dialog("restore");
			$("#employee_add").dialog("resize", {width: 750});
			$("#employee_add").dialog("open");
			$("#user").focus();
		},
		//修改
		edit : function() {
			var rows = $("#employee").datagrid("getSelections");
			console.log(rows);
			if (rows.length == 1) {
				console.log(this.editRow);
				if (this.editRow != undefined) {
					if ($('#employee').datagrid("validateRow", this.editRow)) {
						$('#employee').datagrid('endEdit', this.editRow);
						$("#employee_undo,#employee_redo").hide();
					} else {
						$.messager.alert("警告", "请输入必填字段!", "warning");
					}
				}
			
				if (this.editRow == undefined) {
					var index = $('#employee').datagrid('getRowIndex', rows[0]);
					$('#employee_save,#employee_redo').show();
					$('#employee').datagrid('beginEdit', index);
					this.editRow = index;
					$("#employee_remove,#add_employee").linkbutton("disable");
					//$('#employee').datagrid('unselectRow', index);
				}
			} else {
				$.messager.alert('警告', '修改必须或只能选择一行！', 'warning');
			}
		},
		//保存
		save : function() {
			if ($('#employee').datagrid("validateRow", this.editRow)) {
				$('#employee').datagrid('endEdit', this.editRow);
				$("#employee_undo,#employee_redo").hide();
			} else {
				$.messager.alert("警告", "请输入必填字段!", "warning");
			}
		},
		//取消修改
		redo : function() {
			$('#employee_save,#employee_redo').hide();
			this.editRow = undefined;
			$('#employee').datagrid('rejectChanges');
			$("#employee_undo").hide();
			$("#employee_remove,#add_employee").linkbutton("enable");
		},
		undo : function() {
			$("#employee").datagrid("unselectAll");
			$("#employee_undo").hide();
		},
		remove : function() {
			var rows = $('#employee').datagrid('getSelections');
			console.log(rows);
			if (rows.length > 0) {
				var flg = true;
				$(rows).each(function(index, row) {
					console.log(index);
					console.log(row);
					if (row.positionId != 1) {
						$.messager.alert("警告","所选删除员工中,有"+row.positionName+"存在,不能进行删除!","warning");
						flg = false;
						return false;
					}
				});
				
				if (flg) {
					$.messager.confirm('确定操作', '您真的要删除所选的记录吗？', function (flag) {
						if (flag) {
							var ids = [];
							for (var i = 0; i < rows.length; i ++) {
								ids.push(rows[i].id);
							}
							$.ajax({
								url : "/fr/employeeServlet.do",
								type : "post",
								data : {
									method : "delete",
									ids : ids.join(","),
									time : new Date()
								},
								dataType : "json",
								beforeSend : function(XMLHttpRequest) {
									$.messager.progress({
										text : "正在提交中...",
									});
								},
								success : function(data, textStatus, jqXHR) {
									$.messager.progress("close");
									if (data != null && data.total > 0) {
										$.messager.show({
											title : '提示',
											msg : '成功删除' + data.total + '个员工',
										});
										$("#employee").datagrid("reload");
										employee.editRow = undefined;
									} else {
										$.messager.alert("错误", "删除员工失败！", "error", function() {
											//........
										});
									}
								},
								error : function(XMLHttpRequest, textStatus, errorThrown) {
									$.messager.progress("close");
									$.messager.alert("错误", "删除员工失败！", "error", function() {
										//........
									});
								}
							});
						}
					});
				}
			} else {
				$.messager.alert("提示", "请选择你要删除的数据！", "info");
			}
		}
	};
	
	//数据表
	$("#employee").datagrid({
		url : "/fr/employeeServlet.do?method=list",
		fit : true,
		fitColumns : true,
		striped : true,
		rownumbers : true,
		//singleSelect : true,
		//showPageList : true,
		border : false,
		//beforePageText : '第',
		//afterPageText : '共{pages}条',
		//displayMsg : '显示{from}到{to},共{total}记录',
		pagination : true,
		pageSize : 20,
		pageList : [10, 20, 30, 40, 50],
		pageNumber : 1,
		sortName : 'updateTime',
		sortOrder : 'desc',
		toolbar : '#employee_tool',
		loadMsg : "加载中，请稍等...",
		columns : [[
		      {
		    	  field : "id",
		    	  title : "编号",
		    	  width : 10,
		    	  checkbox : true,
		    	  halign : 'center'
		      },
		      {
		    	  field : "name",
		    	  title : "名称",
		    	  width : 20,
		    	  sortable : true,
		    	  halign : 'center',
		    	  editor : {
						type : 'validatebox',
						options : {
							required : true,
						},
					},
		      },
		      {
		    	  field : "phone",
		    	  title : "联系方式",
		    	  width : 20,
		    	  sortable : true,
		    	  halign : 'center',
		    	  align : 'center',
		    	  editor : {
						type : 'textbox'
					},
		      },
		      {
		    	  field : "sex",
		    	  title : "性别",
		    	  width : 10,
		    	  sortable : true,
		    	  halign : 'center',
		    	  align : "center",
		    	  formatter : function(value, rowData, rowIndex) {
		    		  //console.log(value);
		    		  //console.log(rowData);
		    		  //console.log(rowIndex);
		    		  if ("0" == rowData.sex) {
		    			  return "女";
		    		  } else if ("1" == rowData.sex) {
		    			  return "男";
		    		  } else {
		    			  return "保密";
		    		  }
		    	  },
		    	  editor : {
						type : 'combobox',
						options : {
							valueField: 'value',
							textField: 'label',
					        data : [{
					        	value : '1',
					        	label : "男"
					        },
					        {
					        	value : '0',
					        	label : "女"
					        },
					        {
					        	//注意这里需要使用字符串，不然 afterEditRow 方法中的 if (!$.isEmptyObject(changes)) { 判断过不了
					        	value : '',
					        	label : "保密"
					        }]
						},
					},
		      },
		      {
		    	  field : "email",
		    	  title : "邮箱",
		    	  width : 25,
		    	  sortable : true,
		    	  halign : 'center',
		    	  editor : {
						type : 'validatebox',
						options : {
							validType : "email"
						},
					},
		      },
		      {
		    	  field : "birth",
		    	  title : "生日",
		    	  width : 20,
		    	  sortable : true,
		    	  halign : 'center',
		    	  align : "center",
		    	  editor : {
						type : 'datebox',
						options : {
							required : true,
							editable : false,
							//formatter与parser要成对出现
					    	formatter : function(date) {
					    		var y = date.getFullYear();
					    		var m = date.getMonth() + 1 < 10 ? ("0" + (date.getMonth() + 1)) : date.getMonth() + 1;
					            var d = date.getDate() < 10 ? ("0" + date.getDate()) : date.getDate();
					            return y + "-" + m + "-" + d;
				    		},
				    		parser : function(s) {
				    			if (!s) return new Date();
				                var ss = (s.split('-'));
				                var y = parseInt(ss[0],10);
				                var m = parseInt(ss[1],10);
				                var d = parseInt(ss[2],10);
				                if (!isNaN(y) && !isNaN(m) && !isNaN(d)){
				                    return new Date(y,m-1,d);
				                } else {
				                    return new Date();
				                }
							}
						},
					},
		      },
		      {
		    	  field : 'deptName',
		    	  title : '所属部门',
		    	  width : 25,
		    	  sortable : true,
		    	  halign : 'center',
		    	  align : 'center',
		    	  /*editor : {
		    		  type : 'combobox',
		    		  options : {
		    			  required : true,
		    			  valueField: 'id',    
					      textField: 'name',
					      url : '/fr/employeeServlet.do?method=getDepts'
		    		  }
		    	  }*/
		      },
		      {
		    	  field : 'positionName',
		    	  title : '担当职位',
		    	  width : 20,
		    	  sortable : true,
		    	  halign : 'center',
		    	  align : 'center',
		    	  /*editor : {
		    		  type : 'combobox',
		    		  options : {
		    			  required : true,
		    			  valueField : 'id',
		    			  textField : 'name',
		    			  url : '/fr/employeeServlet.do?method=getPositions'
		    		  }
		    	  }*/
		      },
		      {
		    	  field : 'managerId',
		    	  title : '上级',
		    	  width : 25,
		    	  sortable : true,
		    	  halign : 'center',
		    	  align : 'center',
		    	  formatter : function(value,row,index) {
		    		  return row.managerName;
		    	  },
		    	  editor : {
		    		  type : 'combobox',
		    		  options : {
		    			  required : true,
		    			  mode : 'remote',
		    			  groupField : 'positionName',
		    			  panelWidth : 150,
		    			  valueField : 'id',
		    			  textField : 'name',
		    			  formatter : function(rowData) {
		    				  if (rowData.deptName != null) {
		    					  return rowData.name + "-[" + rowData.deptName + "]";
		    				  } else {
		    					  return rowData.name;
		    				  }
		    			  },
		    			  url : '/fr/employeeServlet.do?method=getManagers'
		    		  }
		    	  }
		      },
		      {
		    	  field : 'roleIds',
		    	  title : '扮演角色',
		    	  widht : 35,
		    	  halign : 'center',
		    	  formatter : function(value,row,index) {
		    		  //console.log(value);
		    		  //console.log(row);
		    		  //console.log(index);
		    		  return row.roleNames;
		    	  },
		    	  editor : {
		    		  type : 'combobox',
		    		  options : {
		    			  required : true,
		    			  mode : 'remote',
		    			  multiple : true,
		    			  valueField : 'id',
		    			  textField : 'name',
		    			  url : '/fr/employeeServlet.do?method=getRoles'
		    		  }
		    	  }
		      },
		      {
		    	  field : 'economyNo',
		    	  title : '经济编号',
		    	  width : 15,
		    	  halign : 'center',
		    	  sortable : true,
		    	  editor : {
		    		  type : 'textbox',
		    		  options : {
		    			  required : true
		    		  }
		    	  }
		      },
		      {
		    	  field : 'roomNo',
		    	  title : '房间号',
		    	  width : 20,
		    	  halign : 'center',
		    	  editor : {
		    		  type : 'textbox'
		    	  }
		      },
		      {
		    	  field : 'region',
		    	  title : '区域',
		    	  width : 10,
		    	  sortable : true,
		    	  halign : 'center',
		    	  editor : {
		    		  type : 'textbox'
		    	  }
		      },
		      {
		    	  field : 'demo',
		    	  title : '说明',
		    	  width : 30,
		    	  sortable : true,
		    	  halign : 'center',
		    	  editor : {
		    		  type : 'textbox'
		    	  }
		      },
		      {
		    	  field : "createTime",
		    	  title : "创建时间",
		    	  width : 30,
		    	  sortable : true,
		    	  halign : 'center',
		    	  align : "center",
		    	  editor : {
						type : 'datetimebox',
						options : {
							required : true,
							editable : false,
							//formatter与parser要成对出现
					    	formatter : function(datetime) {
					    		//console.log(datetime);
					    		var y = datetime.getFullYear();
					    		var M = datetime.getMonth() + 1 < 10 ? ("0" + (datetime.getMonth() + 1)) : datetime.getMonth() + 1;
					            var d = datetime.getDate() < 10 ? ("0" + datetime.getDate()) : datetime.getDate();
					            var h = datetime.getHours() < 10 ? ("0" + datetime.getHours()) : datetime.getHours();
					            var m = datetime.getMinutes() < 10 ? ("0" + datetime.getMinutes()) : datetime.getMinutes();
					            var s = datetime.getSeconds() < 10 ? ("0" + datetime.getSeconds()) : datetime.getSeconds();
					            return y + '-' + M + '-' + d + " " + h + ":" + m + ":" + s;
				    		},
				    		parser : function(s) {
				    			//console.log("s= " + s);
				    			if (!s) return new Date();
				    			var ds = (s.split(" "));
				    			//console.log("ds= " + ds);
				                var ymd = (ds[0].split('-'));
				                //console.log("ymd= " + ymd);
				                var y = parseInt(ymd[0],10);
				                var m = parseInt(ymd[1],10);
				                var d = parseInt(ymd[2],10);
				                var hms = (ds[1].split('\:'));
				                var h = parseInt(hms[0],10);
				                var M = parseInt(hms[1],10);
				                var s = parseInt(hms[2],10);
				                if (!isNaN(y) && !isNaN(m) && !isNaN(d) && !isNaN(h) && !isNaN(m) && !isNaN(s)){
				                    return new Date(y,m-1,d,h,M,s);
				                } else {
				                    return new Date();
				                }
							}
						},
					},
		      },
		      {
		    	  field : "updateTime",
		    	  title : "更新时间",
		    	  width : 30,
		    	  sortable : true,
		    	  halign : 'center',
		    	  align : "center",
		    	  editor : {
						type : 'datetimebox',
						options : {
							required : false,
							editable : false,
							//formatter与parser要成对出现
					    	formatter : function(datetime) {
					    		//console.log(datetime);
					    		var y = datetime.getFullYear();
					    		var M = datetime.getMonth() + 1 < 10 ? ("0" + (datetime.getMonth() + 1)) : datetime.getMonth() + 1;
					            var d = datetime.getDate() < 10 ? ("0" + datetime.getDate()) : datetime.getDate();
					            var h = datetime.getHours() < 10 ? ("0" + datetime.getHours()) : datetime.getHours();
					            var m = datetime.getMinutes() < 10 ? ("0" + datetime.getMinutes()) : datetime.getMinutes();
					            var s = datetime.getSeconds() < 10 ? ("0" + datetime.getSeconds()) : datetime.getSeconds();
					            return y + '-' + M + '-' + d + " " + h + ":" + m + ":" + s;
				    		},
				    		parser : function(s) {
				    			//console.log("s= " + s);
				    			if (!s) return new Date();
				    			var ds = (s.split(" "));
				    			//console.log("ds= " + ds);
				                var ymd = (ds[0].split('-'));
				                //console.log("ymd= " + ymd);
				                var y = parseInt(ymd[0],10);
				                var m = parseInt(ymd[1],10);
				                var d = parseInt(ymd[2],10);
				                var hms = (ds[1].split('\:'));
				                var h = parseInt(hms[0],10);
				                var M = parseInt(hms[1],10);
				                var s = parseInt(hms[2],10);
				                if (!isNaN(y) && !isNaN(m) && !isNaN(d) && !isNaN(h) && !isNaN(m) && !isNaN(s)){
				                    return new Date(y,m-1,d,h,M,s);
				                } else {
				                    return new Date();
				                }
							}
						},
					},
		      }
		 ]],
		 onDblClickRow : function(rowIndex, rowData) {
			if (employee.editRow != undefined) {
				$('#employee').datagrid('endEdit', employee.editRow);
				if (!$('#employee').datagrid("validateRow", employee.editRow)) {
					$.messager.alert("警告", "有一条数据正在被修改中！", "warning");
				}
			} else {
				$('#employee_save,#employee_redo').show();
				$("#employee_remove,#add_employee").linkbutton("disable");
				$('#employee').datagrid('beginEdit', rowIndex);
				$('#employee').datagrid('selectRow', rowIndex);
				//验证生日不能比当天大
				var birth = $(this).datagrid('getEditor', {
					index : rowIndex,
					field : "birth"
				});
				$(birth.target).datebox("calendar").calendar({
					validator : function (date) {
						var now = new Date();
						if (date > now) {
							return false;
						} else {
							return true;
						}
					}
				});
				employee.editRow = rowIndex;
			}
		 },
		 onRowContextMenu : function(e, rowIndex, rowData) {
			 e.preventDefault();
			 $("#employee").datagrid("selectRow", rowIndex);
			 $('#employee_menu').menu('show', {
				left : e.pageX,
				top : e.pageY,
			});
		 },
		 onSelect : function(rowIndex, rowData) {
			 $("#employee_undo").show();
		 },
		 onCheckAll : function(rowIndex, rowData) {
			 $("#employee_undo").show();
		 },
		 onUnselect : function(rowIndes, rowData) {
			 if ($("#employee").datagrid("getSelections") < 1) {
				 $("#employee_undo").hide();
			 }
		 },
		 onUnselectAll : function(rows) {
			 $("#employee_undo").hide();
		 },
		 /* 编辑之后的处理
		  * rowIndex: 修改的行
		  * rowData: 修改后的数据
		  * changes: 修改的数据
		  */
		 onAfterEdit : function (rowIndex, rowData, changes) {
			$('#employee_save,#employee_redo').hide();
			$("#employee_remove,#add_employee").linkbutton("enable");
			//console.log(rowIndex);
			//console.log(rowData);
			//console.log(changes);
			var updated = $("#employee").datagrid("getChanges", "updated");
			var inserted = $("#employee").datagrid("getChanges", "inserted");
			
			var info = "";
			if (inserted.length > 0) {
				info = "新增";
			} else if (updated.length > 0) {
				info = "修改";
			}
			
			if (!$.isEmptyObject(changes)) {
				$.ajax({
					url : "/fr/employeeServlet.do",
					type : "post",
					data : {
						method : "update",
						time : new Date(),
						row : rowData
					},
					dataType : "json",
					beforeSend : function(XMLHttpRequest) {
						$.messager.progress({
							text : "正在提交中...",
						});
					},
					success : function(data, textStatus, jqXHR) {
						$.messager.progress("close");
						if (data == true) {
							$.messager.show({
								title : '提示',
								msg : info + '员工成功',
							});
							$("#employee").datagrid("reload");
							employee.editRow = undefined;
						} else {
							$.messager.alert("错误", info + "员工失败！", "error", function() {
								
							});
						}
					},
					error : function(XMLHttpRequest, textStatus, errorThrown) {
						$.messager.progress("close");
						$.messager.alert("错误", info + "员工失败！", "error", function() {
							
						});
					}
				});
			} else {
				employee.editRow = undefined;
			}
		},
		onLoadSuccess : function(data) {
			//console.log(data.total);
			if (data.total == 0) {
				/*
				//$(this).datagrid("getPanel").context("11111");
				//console.log($(this).datagrid("getPanel"));
				$(this).datagrid("insertRow", {
					index : 0,
					row : {
						id : "",
						name : "没有数据！",
						password : "",
						sex : "",
						email : "",
						birth : "",
						date : ""
					}
				});
				$(this).datagrid("mergeCells", {
					index : 0,
					field : name,
					colspan : 6
				});
				 */
				$.messager.alert("信息", "没有数据！", "info");
			}
		}
	});
	
	$("#employee").datagrid("getPager").pagination({
        layout:['list','sep','first','prev','sep','links','sep','next','last','sep','refresh'],
		displayMsg : '显示 {from} 到 {to} 条,共 {total} 条记录',
		//beforePageText : '第',
		//afterPageText : '共{pages}条',
    });
	
	//员工添加对话框
	$("#employee_add").show();  //初始化为隐藏，需要先显示，然后再设置为 dialog,否则样式会变样
	$("#employee_add").dialog({
		width:750,
		title : "添加员工",
		modal: true,
		closed: true,
		doSize : true,
		iconCls : "icon-user-add",
		buttons : [{
			text : "保存",
			iconCls : "icon-save",
			handler : function() {
				if ($('#employee_add').form('validate')) {
					$.ajax({
						url : "/fr/employeeServlet.do",
						type : "post",
						data : {
							method : "save",
							time : new Date(),
							user : $("#employee_add input[name='user'").val(),
							phone : $("#employee_add input[name='phone'").val(),
							sex : $("#employee_add input[name='sex']:checked").val(),
							email : $("#employee_add input[name='email'").val(),
							birth : $("#employee_add input[name='birth']").val(), //最好用name取值
							dept : $("#employee_add input[name='dept'").val(),
							manager : $("#employee_add input[name='manager'").val(),
							position : $("#employee_add input[name='position'").val(),
							role : $("#employee_role").combobox("getValues").join(","),
							economy_no : $("#employee_add input[name='economy_no'").val(),
							room_no : $("#employee_add input[name='room_no'").val(),
							region : $("#employee_add input[name='region'").val(),
							demo : $("#employee_add input[name='demo'").val(),
						},
						dataType : "json",
						beforeSend : function(XMLHttpRequest) {
							$.messager.progress({
								text : "正在提交中...",
							});
						},
						success : function(data, textStatus, jqXHR) {
							$.messager.progress("close");
							if (data == true) {
								$.messager.show({
									title : '提示',
									msg : '添加员工成功',
								});
								$("#employee_add").dialog("close").form("reset");
								$('#employee').datagrid('reload');
							} else {
								$.messager.alert("错误", "添加员工失败！", "error", function() {
									
								});
							}
						},
						error : function(XMLHttpRequest, textStatus, errorThrown) {
							$.messager.progress("close");
							$.messager.alert("错误", "添加员工失败！", "error", function() {
								
							});
						}
					});
				}
			}
		},
		{
			text : "取消",
			iconCls : "icon-redo",
			handler : function() {
				$("#employee_add").dialog("close").form("reset");
			}
		}],
		onBeforeOpen : function(){
		$("#employee_add").parent().find("div.dialog-button").css("text-align", "center");
	}
	});
	// 添加员工的验证
	$("#employee_demo").textbox({
		multiline : true,
		height : 66,
		width : 520
	});
	//生日
	$("#emp_birth").datebox({
		required : true,
		editable : false,
		missingMessage : "请选择生日！",
		//formatter与parser要成对出现
    	formatter : function(date) {
    		var y = date.getFullYear();
            var m = date.getMonth() + 1 < 10 ? ("0" + (date.getMonth() + 1)) : date.getMonth() + 1;
            var d = date.getDate() < 10 ? ("0" + date.getDate()) : date.getDate();
            return y + "-" + m + "-" + d;
		},
		parser : function(s) {
			if (!s) return new Date();
            var ss = (s.split('-'));
            var y = parseInt(ss[0],10);
            var m = parseInt(ss[1],10);
            var d = parseInt(ss[2],10);
            if (!isNaN(y) && !isNaN(m) && !isNaN(d)){
                return new Date(y,m-1,d);
            } else {
                return new Date();
            }
		},
		onShowPanel : function() {
			$(this).datebox("calendar").calendar({
				validator : function(date) {
					var now = new Date();
					if (date > now)
						return false;
					else 
						return true;
				}
			});
		}
	});
	//提交验证
	$("#emp_user").validatebox({
		required : true,
		validType : {
			remote : ['/fr/employeeServlet.do?method=checkName','employeeName']
		},
		missingMessage : "请输入员工名称！",
		invalidMessage : "员工名称已经存在！",
		//validType : "remote['/fr/employeeServlet.do?method=checkName','userName']"
	});
	//添加背景图片
	//$("#emp_user").addClass("user_text_bg_img");
	
//	$("#emp_phone").validatebox({
//		required : false,
//		validType : "phone",
//		invalidMessage : "联系方式不合法！"
//	});
	
	$("#emp_email").validatebox({
		required : false,
		validType : "email",
		invalidMessage : "邮箱不合法！"
	});
	
	$("#employee_dept").combobox({
		valueField: 'id',    
		textField: 'name',
		mode : 'remote',
		url : '/fr/employeeServlet.do?method=getDepts',
		required : true,
		missingMessage : "请选择部门！",
		onSelect : function(record) {
			var url = "/fr/employeeServlet.do?method=getManagers&dept="+record.id;
			$("#employee_manager").combobox('reload', url);
			$("#employee_manager").combobox('clear');
		},
		onChange : function(newValue, oldValue) {
			if (newValue == '') {
				var url = "/fr/employeeServlet.do?method=getManagers";
				$("#employee_manager").combobox('reload', url);
			}
		}
	});
	$("#employee_position").combobox({
		//value : '请选择职位',
		valueField: 'id',    
		textField: 'name',
		required : true,
		missingMessage : "请选择职位！",
		mode : 'remote',
		url : '/fr/employeeServlet.do?method=getPositions'
	});
	$("#employee_manager").combobox({
		url : '/fr/employeeServlet.do?method=getManagers',
		mode : 'remote',
		groupField : 'positionName',
		panelWidth : 150,
		required : true,
		missingMessage : "请选择上级主管！",
		valueField : 'id',
		textField : 'name',
		formatter : function(rowData) {
			if (rowData.deptName != null) {
				return rowData.name + "-[" + rowData.deptName + "]";
			} else {
				return rowData.name;
			}
		},
		onSelect : function(record) {
			var url = "/fr/employeeServlet.do?method=getPositions&manager="+record.id;
			$("#employee_position").combobox('reload', url);
			$("#employee_position").combobox('clear');
		},
		onChange : function(newValue, oldValue) {
			if (newValue == '') {
				var url = "/fr/employeeServlet.do?method=getPositions";
				$("#employee_position").combobox('reload', url);
			}
		}
	});
	$("#employee_role").combobox({
		required : true,
		missingMessage : "请选择角色！",
		mode : 'remote',
		multiple : true,
		valueField : 'id',
		textField : 'name',
		url : '/fr/employeeServlet.do?method=getRoles'
	});
	$("#employee_economy_no").validatebox({
		required : true,
		missingMessage : "请输入经济编号！",
	});
	
	// extend the 'equals' rule    
	$.extend($.fn.validatebox.defaults.rules, {    
	    equals: {    
	        validator: function(value,param){    
	            return value == $(param[0]).val();    
	        },    
	        message: '再次输入不一致！'
	    }    
	}); 
	
	var buttons = $.extend([], $.fn.datebox.defaults.buttons);
	buttons.splice(1, 0, {
		text: 'Clear',
		handler: function(target){
			//console.log(target);
			$(target).datebox("clear");
		}
	});
	$('#emp_date_from').datebox({
		buttons: buttons
	});
	$('#emp_date_to').datebox({
		buttons: buttons
	});
});