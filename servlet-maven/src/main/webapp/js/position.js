$(function() {
	
	//按钮事件
	position = {
		//修改的行号
		editRow : undefined,
		//新增
		add : function() {
			if (this.editRow != undefined) {
				$.messager.alert("警告", "有一条数据正在被修改中,不能添加!", "warning");
			} else {
				$("#position_add").dialog("restore");
				$("#position_add").dialog("resize", {width: 350});
				$("#position_add").dialog("open");
				$("#user").focus();
			}
		},
		//修改
		edit : function() {
			var rows = $("#position").datagrid("getSelections");
			console.log(rows);
			console.log(this.editRow);
			if (rows.length == 1) {
				if (this.editRow != undefined) {
					$('#position').datagrid('endEdit', this.editRow);
					//$("#undo").hide();
				} else {
					var index = $('#position').datagrid('getRowIndex', rows[0]);
					$('#position_save,#position_redo').show();
					$('#position').datagrid('beginEdit', index);
					this.editRow = index;
					//$("#position_remove,#add_position").hide();
					$("#position_remove,#add_position").linkbutton("disable");
					//$('#position').datagrid('unselectRow', index);
				}
			} else {
				$.messager.alert('警告', '修改必须或只能选择一行！', 'warning');
			}
		},
		//保存
		save : function() {
			$('#position').datagrid('endEdit', this.editRow);
			 //$("#undo").hide();
		},
		//取消修改
		redo : function() {
			$('#position_save,#position_redo').hide();
			this.editRow = undefined;
			$('#position').datagrid('rejectChanges');
			$("#position_remove,#add_position").linkbutton("enable");
			//$("#undo").hide();
		},
		//取消选择
//		undo : function() {
//			$("#position").datagrid("unselectAll");
//			$("#undo").hide();
//		},
		remove : function() {
			var rows = $('#position').datagrid('getSelections');
			if (rows.length != 1) {
				$.messager.alert("警告", "删除必须或只能选择一行!", "warning");
			} else {
				console.log(rows[0]);
				if (this.editRow != undefined) {
					$.messager.alert("警告", "有一条数据正在被修改中，不能进行删除!", "warning");
				} else {
					var index = $('#position').datagrid('getRowIndex', rows[0]);
					$.messager.confirm('确定操作', '您真的要删除所选的记录吗？', function (flag) {
						if (flag) {
							var ids = [];
							for (var i = 0; i < rows.length; i ++) {
								ids.push(rows[i].id);
							}
							$.ajax({
								url : "/fr/positionServlet.do",
								type : "post",
								data : {
									method : "delete",
									id : rows[0].id,
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
											msg : '成功删除部门',
										});
										$("#position").datagrid("reload");
										position.editRow = undefined;
									} else {
										$.messager.alert("错误", "删除部门失败！", "error", function() {
											//........
										});
									}
								},
								error : function(XMLHttpRequest, textStatus, errorThrown) {
									$.messager.progress("close");
									$.messager.alert("错误", "删除部门失败！", "error", function() {
										//........
									});
								}
							});
						}
					});
				}
			}
		}
	};
	
	//数据表
	$("#position").datagrid({
		url : "/fr/positionServlet.do?method=list",
		fit : true,
		fitColumns : true,
		striped : true,
		rownumbers : true,
		singleSelect : true,
		//showPageList : true,
		border : false,
		//beforePageText : '第',
		//afterPageText : '共{pages}条',
		//displayMsg : '显示{from}到{to},共{total}记录',
		pagination : true,
		pageSize : 20,
		pageList : [5, 10, 15, 20, 50],
		pageNumber : 1,
		sortName : 'update_time',
		sortOrder : 'desc',
		toolbar : '#position_tool',
		loadMsg : "加载中，请稍等...",
		columns : [[
		      {
		    	  field : "id",
		    	  title : "编号",
		    	  width : 100,
		    	  checkbox : true,
		    	  hidden : true,
		    	  halign : 'center'
		      },
		      {
		    	  field : "name",
		    	  title : "职位名称",
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
		    	  field : "demo",
		    	  title : "说明",
		    	  width : 100,
		    	  sortable : true,
		    	  halign : 'center',
		    	  editor : {
						type : 'textbox',
					},
		      },
		      {
		    	  field : "createTime",
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
		    	  field : "updateTime",
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
			if (position.editRow != undefined) {
				$('#position').datagrid('endEdit', position.editRow);
				if (!$('#position').datagrid("validateRow", position.editRow)) {
					$.messager.alert("警告", "有一条数据正在被修改中！", "warning");
				}
			} else {
				$('#position_save,#position_redo').show();
				$('#position').datagrid('beginEdit', rowIndex);
				position.editRow = rowIndex;
				$("#position_remove,#add_position").linkbutton("disable");
			}
		 },
		 onRowContextMenu : function(e, rowIndex, rowData) {
			 e.preventDefault();
			 $("#position").datagrid("selectRow", rowIndex);
			 $('#position_menu').menu('show', {
				left : e.pageX,
				top : e.pageY,
			});
		 },
//		 onSelect : function(rowIndex, rowData) {
//			 $("#undo").show();
//		 },
//		 onCheckAll : function(rowIndex, rowData) {
//			 $("#undo").show();
//		 },
//		 onUnselect : function(rowIndes, rowData) {
//			 if ($("#position").datagrid("getSelections") < 1) {
//				 //$("#undo").hide();
//			 }
//		 },
//		 onUnselectAll : function(rows) {
//			 $("#undo").hide();
//		 },
		 /* 编辑之后的处理
		  * rowIndex: 修改的行
		  * rowData: 修改后的数据
		  * changes: 修改的数据
		  */
		 onAfterEdit : function (rowIndex, rowData, changes) {
			$('#position_save,#position_redo').hide();
			$("#position_remove,#add_position").linkbutton("enable");
			//console.log(rowIndex);
			//console.log(rowData);
			//console.log(changes);
			var updated = $("#position").datagrid("getChanges", "updated");
			var inserted = $("#position").datagrid("getChanges", "inserted");
			
			var info = "";
			if (inserted.length > 0) {
				info = "新增";
			} else if (updated.length > 0) {
				info = "修改";
			}
			
			if (!$.isEmptyObject(changes)) {
				$.ajax({
					url : "/fr/positionServlet.do",
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
								msg : info + '部门成功',
							});
							$("#position").datagrid("reload");
							position.editRow = undefined;
						} else {
							$.messager.alert("错误", info + "部门失败！", "error", function() {
								
							});
						}
					},
					error : function(XMLHttpRequest, textStatus, errorThrown) {
						$.messager.progress("close");
						$.messager.alert("错误", info + "部门失败！", "error", function() {
							
						});
					}
				});
			} else {
				position.editRow = undefined;
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
	
	$("#position").datagrid("getPager").pagination({
        layout:['list','sep','first','prev','sep','links','sep','next','last','sep','refresh'],
		displayMsg : '显示 {from} 到 {to} 条,共 {total} 条记录',
		//beforePageText : '第',
		//afterPageText : '共{pages}条',
    });
	
	//职位添加对话框
	$("#position_add").show();  //初始化为隐藏，需要先显示，然后再设置为 dialog,否则样式会变样
	$("#position_add").dialog({
		title : "添加职位",
		modal: true,
		closed: true,
		doSize : true,
		iconCls : "icon-drink-red",
		buttons : [{
			text : "保存",
			iconCls : "icon-save",
			handler : function() {
				if ($('#position_add').form('validate')) {
					$.ajax({
						url : "/fr/positionServlet.do",
						type : "post",
						data : {
							method : "save",
							time : new Date(),
							name : $("#position_name").val(),
							demo : $("#position_demo").val()
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
									msg : '添加部门成功',
								});
								$("#position_add").dialog("close").form("reset");
								$('#position').datagrid('reload');
							} else {
								$.messager.alert("错误", "添加部门失败！", "error", function() {
									
								});
							}
						},
						error : function(XMLHttpRequest, textStatus, errorThrown) {
							$.messager.progress("close");
							$.messager.alert("错误", "添加部门失败！", "error", function() {
								
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
				$("#position_add").dialog("close").form("reset");
			}
		}],
		//提交验证
		onBeforeOpen : function(){
			//$("#position_add").parent().find("div.dialog-button").css("text-align", "center");
			$("#position_name").validatebox({
				required : true,
				validType : {
					remote : ['/fr/positionServlet.do?method=checkName','positionName']
				},
				missingMessage : "请输入部门名称！",
				invalidMessage : "部门名称已经存在！",
			});
		}
	});
});
