$(function() {
	
	//按钮事件
	platform = {
		//修改的行号
		editRow : undefined,
		//新增
		add : function() {
			if (this.editRow != undefined) {
				$.messager.alert("警告", "有一条数据正在被修改中,不能添加!", "warning");
			} else {
				$("#platform_add").dialog("restore");
				$("#platform_add").dialog("resize", {width: 350});
				$("#platform_add").dialog("open");
				$("#user").focus();
			}
		},
		//修改
		edit : function() {
			var rows = $("#platform").datagrid("getSelections");
			console.log(rows);
			console.log(this.editRow);
			if (rows.length == 1) {
				if (this.editRow != undefined) {
					$('#platform').datagrid('endEdit', this.editRow);
					//$("#undo").hide();
				} else {
					var index = $('#platform').datagrid('getRowIndex', rows[0]);
					$('#platform_save,#platform_redo').show();
					$('#platform').datagrid('beginEdit', index);
					this.editRow = index;
					//$("#platform_remove,#add_platform").hide();
					$("#platform_remove,#add_platform").linkbutton("disable");
					//$('#platform').datagrid('unselectRow', index);
				}
			} else {
				$.messager.alert('警告', '修改必须或只能选择一行！', 'warning');
			}
		},
		//保存
		save : function() {
			$('#platform').datagrid('endEdit', this.editRow);
			 //$("#undo").hide();
		},
		//取消修改
		redo : function() {
			$('#platform_save,#platform_redo').hide();
			this.editRow = undefined;
			$('#platform').datagrid('rejectChanges');
			$("#platform_remove,#add_platform").linkbutton("enable");
			//$("#undo").hide();
		},
		//取消选择
//		undo : function() {
//			$("#platform").datagrid("unselectAll");
//			$("#undo").hide();
//		},
		remove : function() {
			var rows = $('#platform').datagrid('getSelections');
			if (rows.length != 1) {
				$.messager.alert("警告", "删除必须或只能选择一行!", "warning");
			} else {
				console.log(rows[0]);
				if (this.editRow != undefined) {
					$.messager.alert("警告", "有一条数据正在被修改中，不能进行删除!", "warning");
				} else {
					var index = $('#platform').datagrid('getRowIndex', rows[0]);
					$.messager.confirm('确定操作', '您真的要删除所选的记录吗？', function (flag) {
						if (flag) {
							var ids = [];
							for (var i = 0; i < rows.length; i ++) {
								ids.push(rows[i].id);
							}
							$.ajax({
								url : "/fr/platformServlet.do",
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
											msg : '成功删除平台',
										});
										$("#platform").datagrid("reload");
										platform.editRow = undefined;
									} else {
										$.messager.alert("错误", "删除平台失败！", "error", function() {
											//........
										});
									}
								},
								error : function(XMLHttpRequest, textStatus, errorThrown) {
									$.messager.progress("close");
									$.messager.alert("错误", "删除平台失败！", "error", function() {
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
	$("#platform").datagrid({
		url : "/fr/platformServlet.do?method=list",
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
		toolbar : '#platform_tool',
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
		    	  title : "平台名称",
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
		    	  field : "region",
		    	  title : "所属区域",
		    	  width : 100,
		    	  sortable : true,
		    	  halign : 'center',
		    	  editor : {
		    		  type : 'textbox'
		    	  }
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
			if (platform.editRow != undefined) {
				$('#platform').datagrid('endEdit', platform.editRow);
				if (!$('#platform').datagrid("validateRow", platform.editRow)) {
					$.messager.alert("警告", "有一条数据正在被修改中！", "warning");
				}
			} else {
				$('#platform_save,#platform_redo').show();
				$('#platform').datagrid('beginEdit', rowIndex);
				platform.editRow = rowIndex;
				$("#platform_remove,#add_platform").linkbutton("disable");
			}
		 },
		 onRowContextMenu : function(e, rowIndex, rowData) {
			 e.preventDefault();
			 $("#platform").datagrid("selectRow", rowIndex);
			 $('#platform_menu').menu('show', {
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
//			 if ($("#platform").datagrid("getSelections") < 1) {
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
			$('#platform_save,#platform_redo').hide();
			$("#platform_remove,#add_platform").linkbutton("enable");
			//console.log(rowIndex);
			//console.log(rowData);
			//console.log(changes);
			var updated = $("#platform").datagrid("getChanges", "updated");
			var inserted = $("#platform").datagrid("getChanges", "inserted");
			
			var info = "";
			if (inserted.length > 0) {
				info = "新增";
			} else if (updated.length > 0) {
				info = "修改";
			}
			
			if (!$.isEmptyObject(changes)) {
				$.ajax({
					url : "/fr/platformServlet.do",
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
								msg : info + '平台成功',
							});
							$("#platform").datagrid("reload");
							platform.editRow = undefined;
						} else {
							$.messager.alert("错误", info + "平台失败！", "error", function() {
								
							});
						}
					},
					error : function(XMLHttpRequest, textStatus, errorThrown) {
						$.messager.progress("close");
						$.messager.alert("错误", info + "平台失败！", "error", function() {
							
						});
					}
				});
			} else {
				platform.editRow = undefined;
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
	
	$("#platform").datagrid("getPager").pagination({
        layout:['list','sep','first','prev','sep','links','sep','next','last','sep','refresh'],
		displayMsg : '显示 {from} 到 {to} 条,共 {total} 条记录',
		//beforePageText : '第',
		//afterPageText : '共{pages}条',
    });
	
	//职位添加对话框
	$("#platform_add").show();  //初始化为隐藏，需要先显示，然后再设置为 dialog,否则样式会变样
	$("#platform_add").dialog({
		title : "添加职位",
		modal: true,
		closed: true,
		doSize : true,
		iconCls : "icon-laptop",
		buttons : [{
			text : "保存",
			iconCls : "icon-save",
			handler : function() {
				if ($('#platform_add').form('validate')) {
					$.ajax({
						url : "/fr/platformServlet.do",
						type : "post",
						data : {
							method : "save",
							time : new Date(),
							name : $("#platform_name").val(),
							region : $("#platform_region").val(),
							demo : $("#platform_demo").val()
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
									msg : '添加平台成功',
								});
								$("#platform_add").dialog("close").form("reset");
								$('#platform').datagrid('reload');
							} else {
								$.messager.alert("错误", "添加平台失败！", "error", function() {
									
								});
							}
						},
						error : function(XMLHttpRequest, textStatus, errorThrown) {
							$.messager.progress("close");
							$.messager.alert("错误", "添加平台失败！", "error", function() {
								
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
				$("#platform_add").dialog("close").form("reset");
			}
		}],
		//提交验证
		onBeforeOpen : function(){
			//$("#platform_add").parent().find("div.dialog-button").css("text-align", "center");
			$("#platform_name").validatebox({
				required : true,
				validType : {
					remote : ['/fr/platformServlet.do?method=checkName','platformName']
				},
				missingMessage : "请输入平台名称！",
				invalidMessage : "平台名称已经存在！",
			});
		}
	});
});
