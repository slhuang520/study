$(function() {

	menu = {
		//修改的行号
		editRowId : undefined,
		//选择的行号
		selectedRowId : undefined,
		//添加
		add : function() {
			var selectRow = $("#menu").treegrid("getSelected");
			//console.log(selectRow);
			if (selectRow != null && selectRow.nid != 0) {
				$.messager.alert("警告", "不能在叶子菜单添加子菜单！", "warning");
				return;
			}
			$("#menu_add").dialog("restore");
			$("#menu_add").dialog("resize", {width: 350});
			$("#menu_add").dialog("open");
			$("#menu_text").focus();
		},
		//修改
		edit : function() {
			if (menu.editRowId != undefined) {
				$("#menu").treegrid("endEdit", menu.editRowId);
			} else {
				if (menu.selectedRowId == undefined) {
					$.messager.alert("警告", "修改必须或只能选择一条数据!", "warning");
				} else {
					$("#menu").treegrid("beginEdit", menu.selectedRowId);
					menu.editRowId = menu.selectedRowId;
					$('#menu_save,#menu_redo').show();
				}
			}
		},
		//取消修改
		redo : function() {
			$("#menu").treegrid("cancelEdit", menu.editRowId);
			menu.editRowId = undefined;
			$('#manager').treegrid('rejectChanges');
			$("#menu_redo,#menu_save").hide();
		},
		//保存
		save : function() {
			$("#menu").treegrid("endEdit", menu.editRowId);
			$("#menu_redo,#menu_save").hide();
		},
		//删除
		remove : function() {
			if (menu.selectedRowId == undefined) {
				$.messager.alert("警告", "删除必须或只能选择一行!", "warning");
			} else {
				$.messager.confirm('确定操作', '您真的要删除所选的记录吗？', function (flag) {
					if (flag) {
						//console.log(menu.selectedRowId);
						$.ajax({
							url : "/fr/menuServlet.do",
							type : "post",
							data : {
								method : "delete",
								id : menu.selectedRowId,
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
								if (data == true) {
									$.messager.show({
										title : '提示',
										msg : '成功菜单删除',
									});
									$("#menu").treegrid("reload");
									menu.editRow = undefined;
									menu.selectedRowId = undefined;
								} else {
									$.messager.alert("错误", "删除菜单失败！", "error", function() {
										//........
									});
								}
							},
							error : function(XMLHttpRequest, textStatus, errorThrown) {
								$.messager.progress("close");
								$.messager.alert("错误", "删除菜单失败！", "error", function() {
									//........
								});
							}
						});
					}
				});
			}
		}
	};
	
	//菜单树
	$("#menu").treegrid({
		url : "/fr/menuServlet.do?method=list",
		fit : true,
		fitColumns : true,
		striped : true,
		rownumbers : true,
        collapsible: true,
		border : false,
		lines : true,
		//pagination : true,
		//pageSize : 20,
		//pageList : [20, 30, 40, 50],
		//pageNumber : 1,
		toolbar : '#menu_tool',
		loadMsg : "加载中，请稍等...",
		idField : "id",
		treeField : "text",
		animate : true,
		columns : [[
		      {
		    	  field : "text",
		    	  title : "名称",
		    	  width : 100,
		    	  halign : 'center',
		    	  editor : {
		    		  type : "validatebox",
		    		  options : {
		    			  required : true
		    		  }
		    	  }
		      },
		      {
		    	  field : "iconCls",
		    	  title : "菜单图标",
		    	  width : 100,
		    	  halign : "center",
		    	  editor : {
		    		  type : "textbox",
		    		  options : {
		    			  required : true
		    		  }
		    	  }
		      },
		      {
		    	  field : "url",
		    	  title : "路径",
		    	  width : 100,
		    	  halign : "center",
		    	  editor : {
		    		  type : "textbox",
		    	  }
		      }
		]],
		//加载成功后，展开全部节点
		onLoadSuccess : function(row, data) {
			var _this = this;
			if (data) {
				$(data).each(function(index, value) {
					if (this.state == 'closed') {
						$(_this).treegrid("expandAll");
					}
				});
			}
		},
		//保存选择的行号--主要用于添加验证
		onClickRow : function(rowData) {
			menu.selectedRowId = rowData.id;
		},
		onDblClickRow : function(rowData) {
			//console.log(rowData);
			//console.log(menu.editRowId);
			
			menu.selectedRowId = rowData.id;
			if (menu.editRowId != undefined) {
				$('#menu').treegrid('endEdit', menu.editRowId);
				
				if (!$('#menu').treegrid("validateRow", menu.editRowId)) {
					$.messager.alert("警告", "有一条数据正在被修改中！", "warning");
				} 
				
			} else {
				$('#menu_save,#menu_redo').show();
				$('#menu').treegrid('beginEdit', rowData.id);
				menu.editRowId = rowData.id;
			}
		 },
		 onContextMenu : function(e, rowData) {
			 e.preventDefault();
			 //console.log(rowData);
			 $("#menu").treegrid("select", rowData.id);
			 menu.selectedRowId = rowData.id;
			 $('#menu_menu').menu('show', {
				left : e.pageX,
				top : e.pageY,
			});
		 },
		 /* 编辑之后的处理
		  * rowIndex: 修改的行
		  * rowData: 修改后的数据
		  * changes: 修改的数据
		  */
		 onAfterEdit : function (rowData, changes) {
			$('#menu_save,#menu_redo').hide();
			//console.log(rowData);
			//console.log(changes);
			var updated = $("#menu").treegrid("getChanges", "updated");
			var inserted = $("#menu").treegrid("getChanges", "inserted");
			//console.log(updated);
			//console.log(inserted);
			
			var info = "";
			if (inserted.length > 0) {
				info = "新增";
			} else if (updated.length > 0) {
				info = "修改";
			}
			
			if (!$.isEmptyObject(changes)) {
				$.ajax({
					url : "/fr/menuServlet.do",
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
								msg : info + '菜单成功',
							});
							$("#menu").treegrid("reload");
							menu.editRowId = undefined;
						} else {
							$.messager.alert("错误", info + "菜单失败！", "error", function() {
								
							});
						}
					},
					error : function(XMLHttpRequest, textStatus, errorThrown) {
						$.messager.progress("close");
						$.messager.alert("错误", info + "菜单失败！", "error", function() {
							
						});
					}
				});
			} else {
				menu.editRowId = undefined;
			}
		},
	});
	
	//菜单添加对话框
	$("#menu_add").show();  //初始化为隐藏，需要先显示，然后再设置为 dialog,否则样式会变样
	$("#menu_add").dialog({
		title : "添加菜单",
		modal : true,
		closed: true,
		iconCls : "icon-outline",
		buttons : [{
			text : "保存",
			iconCls : "icon-save",
			handler : function() {
				if ($('#menu_add').form('validate')) {
					var selectRow = $("#menu").treegrid("getSelected");
					var id = null;
					if (selectRow != null && selectRow != undefined && selectRow.length != 0) {
						id = selectRow.id;
					}
					$.ajax({
						url : "/fr/menuServlet.do",
						type : "post",
						data : {
							method : "save",
							time : new Date(),
							type : id,
							text : $("#menu_text").val(),
							iconCls : $("#menu_iconCls").val(),
							url : $("#menu_url").val(),
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
									msg : '添加菜单成功',
								});
								$("#menu_add").dialog("close").form("reset");
								$('#menu').treegrid('reload');
								//重新加载全部页面,注意处理缓存
								var href = window.location.href;
								window.location.href = href.substring(0, href.indexOf(".jsp")+4)+'?date='+new Date();
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
				$("#menu_add").dialog("close").form("reset");
			}
		}],
		//在打开之前显示验证框，不然远程验证会在 此验证框 被加载时运行
		onBeforeOpen : function() {
			//console.log("onBeforeOpenMenu");
			var selected = $("#menu").treegrid("getSelected");
			//console.log(selected);
			//console.log(selected.length);
			if (selected == null || selected == undefined) {
				
			} else {
				$("#menu_url").validatebox({
					required : true,
					missingMessage : "请输入菜单路径！"
				});
			}
			$("#menu_text").validatebox({
				required : true,
				validType : {
					remote : ['/fr/menuServlet.do?method=checkName&parentId='+menu.selectedRowId,'menuName']
				},
				missingMessage : "请输入菜单名称！",
				invalidMessage : "菜单名称已经存在！"
			});
		}
	});
	
});