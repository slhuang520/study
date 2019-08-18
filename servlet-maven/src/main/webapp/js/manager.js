$(function() {
	
	$("#date_from").datebox({
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
	$("#date_to").datebox({
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
	manager = {
		//修改的行号
		editRow : undefined,
		//新增
		search : function() {
			$("#manager").datagrid("load", {
				user : $.trim($("#conditionDiv input[name='user']").val()),
				dateFrom : $.trim($("#conditionDiv input[name='date_from']").val()),
				dateTo : $.trim($("#conditionDiv input[name='date_to']").val()),
			});
			$("#manager_undo,#manager_save,#manager_redo").hide();
			this.editRow = undefined;
		},
		add : function() {
			$("#manager_add").dialog("restore");
			$("#manager_add").dialog("resize", {width: 350});
			$("#manager_add").dialog("open");
			$("#user").focus();
		},
		//修改
		edit : function() {
			var rows = $("#manager").datagrid("getSelections");
			if (rows.length == 1) {
				if (this.editRow != undefined) {
					$('#manager').datagrid('endEdit', this.editRow);
					 $("#manager_undo").hide();
				}
			
				if (this.editRow == undefined) {
					var index = $('#manager').datagrid('getRowIndex', rows[0]);
					$('#manager_save,#manager_redo').show();
					$('#manager').datagrid('beginEdit', index);
					this.editRow = index;
					//$('#manager').datagrid('unselectRow', index);
				}
			} else {
				$.messager.alert('警告', '修改必须或只能选择一行！', 'warning');
			}
		},
		//保存
		save : function() {
			$('#manager').datagrid('endEdit', this.editRow);
			 $("#manager_undo").hide();
		},
		//取消修改
		redo : function() {
			$('#manager_save,#manager_redo').hide();
			this.editRow = undefined;
			$('#manager').datagrid('rejectChanges');
			$("#manager_undo").hide();
		},
		undo : function() {
			$("#manager").datagrid("unselectAll");
			$("#manager_undo").hide();
		},
		remove : function() {
			var rows = $('#manager').datagrid('getSelections');
			if (rows.length > 0) {
				$.messager.confirm('确定操作', '您真的要删除所选的记录吗？', function (flag) {
					if (flag) {
						var ids = [];
						for (var i = 0; i < rows.length; i ++) {
							ids.push(rows[i].id);
						}
						$.ajax({
							url : "/fr/managerServlet.do",
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
										msg : '成功删除' + data.total + '个管理员',
									});
									$("#manager").datagrid("reload");
									manager.editRow = undefined;
								} else {
									$.messager.alert("错误", "删除管理员失败！", "error", function() {
										//........
									});
								}
							},
							error : function(XMLHttpRequest, textStatus, errorThrown) {
								$.messager.progress("close");
								$.messager.alert("错误", "删除管理员失败！", "error", function() {
									//........
								});
							}
						});
					}
				});
			} else {
				$.messager.alert("提示", "请选择你要删除的数据！", "info");
			}
		}
	};
	
	//数据表
	$("#manager").datagrid({
		url : "/fr/managerServlet.do?method=list",
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
		sortName : 'update_date',
		sortOrder : 'desc',
		toolbar : '#manager_tool',
		loadMsg : "加载中，请稍等...",
		columns : [[
		      {
		    	  field : "id",
		    	  title : "编号",
		    	  width : 100,
		    	  checkbox : true,
		    	  halign : 'center'
		      },
		      {
		    	  field : "name",
		    	  title : "账号",
		    	  width : 100,
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
		    	  field : "password",
		    	  title : "密码",
		    	  width : 100,
		    	  sortable : true,
		    	  halign : 'center',
		    	  editor : {
						type : 'validatebox',
						options : {
							required : true,
							validType : length[6,20],
						},
					},
		      },
		      {
		    	  field : "sex",
		    	  title : "性别",
		    	  width : 40,
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
							required : true,
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
					        	value : '',
					        	label : "保密"
					        }]
						},
					},
		      },
		      {
		    	  field : "isSysManager",
		    	  title : "系统管理",
		    	  width : 50,
		    	  sortable : true,
		    	  halign : "center",
		    	  align : "center",
		    	  formatter : function(value, rowData, rowIndex) {
		    		  //console.log(value);
		    		  //console.log(rowData);
		    		  //console.log(rowIndex);
		    		  if (rowData.isSysManager) {
		    			  return "是";
		    		  } else {
		    			  return "否";
		    		  }
		    	  },
		    	  editor : {
		    		  type : "combobox",
		    		  options : {
		    			  required : false,
		    			  valueField: 'value',    
					      textField: 'label',
					      data : [{
					          value : true,
					          label : "是"
					      },
					      {
					          value : false,
					          label : "否"
					      }]
		    		  }
		    	  }
		      },
		      {
		    	  field : "email",
		    	  title : "邮箱",
		    	  width : 100,
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
		    	  width : 50,
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
		    	  field : "createDate",
		    	  title : "创建时间",
		    	  width : 100,
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
		    	  field : "updateDate",
		    	  title : "更新时间",
		    	  width : 100,
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
			if (manager.editRow != undefined) {
				$('#manager').datagrid('endEdit', manager.editRow);
				if (!$('#manager').datagrid("validateRow", manager.editRow)) {
					$.messager.alert("警告", "有一条数据正在被修改中！", "warning");
				}
			} else {
				$('#manager_save,#manager_redo').show();
				$('#manager').datagrid('beginEdit', rowIndex);
				$('#manager').datagrid('selectRow', rowIndex);
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
				manager.editRow = rowIndex;
			}
		 },
		 onRowContextMenu : function(e, rowIndex, rowData) {
			 e.preventDefault();
			 $("#manager").datagrid("selectRow", rowIndex);
			 $('#manager_menu').menu('show', {
				left : e.pageX,
				top : e.pageY,
			});
		 },
		 onSelect : function(rowIndex, rowData) {
			 $("#manager_undo").show();
		 },
		 onCheckAll : function(rowIndex, rowData) {
			 $("#manager_undo").show();
		 },
		 onUnselect : function(rowIndes, rowData) {
			 if ($("#manager").datagrid("getSelections") < 1) {
				 $("#manager_undo").hide();
			 }
		 },
		 onUnselectAll : function(rows) {
			 $("#manager_undo").hide();
		 },
		 /* 编辑之后的处理
		  * rowIndex: 修改的行
		  * rowData: 修改后的数据
		  * changes: 修改的数据
		  */
		 onAfterEdit : function (rowIndex, rowData, changes) {
			$('#manager_save,#manager_redo').hide();
			//console.log(rowIndex);
			//console.log(rowData);
			//console.log(changes);
			var updated = $("#manager").datagrid("getChanges", "updated");
			var inserted = $("#manager").datagrid("getChanges", "inserted");
			
			var info = "";
			if (inserted.length > 0) {
				info = "新增";
			} else if (updated.length > 0) {
				info = "修改";
			}
			
			if (!$.isEmptyObject(changes)) {
				$.ajax({
					url : "/fr/managerServlet.do",
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
								msg : '修改管理员成功',
							});
							$("#manager").datagrid("reload");
							manager.editRow = undefined;
						} else {
							$.messager.alert("错误", "添加管理员失败！", "error", function() {
								
							});
						}
					},
					error : function(XMLHttpRequest, textStatus, errorThrown) {
						$.messager.progress("close");
						$.messager.alert("错误", "添加管理员失败！", "error", function() {
							
						});
					}
				});
			} else {
				manager.editRow = undefined;
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
	
	$("#manager").datagrid("getPager").pagination({
        layout:['list','sep','first','prev','sep','links','sep','next','last','sep','refresh'],
		displayMsg : '显示 {from} 到 {to} 条,共 {total} 条记录',
		//beforePageText : '第',
		//afterPageText : '共{pages}条',
    });
	
	//管理员添加对话框
	$("#manager_add").show();  //初始化为隐藏，需要先显示，然后再设置为 dialog,否则样式会变样
	$("#manager_add").dialog({
		title : "添加管理员",
		modal: true,
		closed: true,
		doSize : true,
		iconCls : "icon-user-add",
		buttons : [{
			text : "保存",
			iconCls : "icon-save",
			handler : function() {
				if ($('#manager_add').form('validate')) {
					$.ajax({
						url : "/fr/managerServlet.do",
						type : "post",
						data : {
							method : "save",
							time : new Date(),
							user : $("#add_user").val(),
							password : $("#add_password").val(),
							sex : $("input[name='sex']:checked").val(),
							email : $("#email").val(),
							birth : $("#manager_add input[name='birth']").val(), //最好用name取值
							isSysManger : $("#isSysManger").val()
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
									msg : '添加管理员成功',
								});
								$("#manager_add").dialog("close").form("reset");
								$('#manager').datagrid('reload');
							} else {
								$.messager.alert("错误", "添加管理员失败！", "error", function() {
									
								});
							}
						},
						error : function(XMLHttpRequest, textStatus, errorThrown) {
							$.messager.progress("close");
							$.messager.alert("错误", "添加管理员失败！", "error", function() {
								
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
				$("#manager_add").dialog("close").form("reset");
			}
		}],
		onBeforeOpen : function(){
			$("#manager_add").parent().find("div.dialog-button").css("text-align", "center");
		}
	});
	
	//生日
	$("#birth").datebox({
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
	//系统管理员
	$("#isSysManger").switchbutton({
		checked : false,
		onChange : function (checked) {
			$(this).val(checked);
		}
	});
	/*
	//分配权限
	$('#auth').combotree({
		disabled : true,
		url : "/fr/adminServlet.do?method=searchNav",
		lines : true,
		onLoadSuccess : function(node, data) {
			var _this = this;
			if (data) {
				$(data).each(function(index, value) {
					if (this.state == 'closed') {
						$(_this).tree("expandAll");
					}
				});
			}
		},
		required : true,
		missingMessage : "请分配权限！",
		multiple : true,
		checkbox : true,
		onlyLeafCheck : true,
	});
	*/
	
	//提交验证
	$("#add_user").validatebox({
		required : true,
		validType : {
			remote : ['/fr/managerServlet.do?method=checkName','userName']
		},
		missingMessage : "请输入管理员名称！",
		invalidMessage : "管理员名称已经存在！",
		//validType : "remote['/fr/managerServlet.do?method=checkName','userName']"
	});
	//添加背景图片
	$("#add_user").addClass("user_text_bg_img");
	
	$("#add_password").validatebox({
		required : true,
		validType : 'length[6,20]',
		missingMessage : "请输入管理员密码！",
		invalidMessage : "管理员密码不合法！"
	});
	$("#add_password").addClass("password_text_bg_img");
	
	$("#password2").validatebox({
		required : true,
		validType : "equals['#add_password']",
		missingMessage : "请再次输入管理员密码！",
		invalidMessage : "两次密码不一致！"
	});
	$("#password2").addClass("password_text_bg_img");
	
	$("#email").validatebox({
		required : false,
		validType : "email",
		invalidMessage : "邮箱不合法！"
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
	$('#date_from').datebox({
		buttons: buttons
	});
	$('#date_to').datebox({
		buttons: buttons
	});
});