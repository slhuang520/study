$(function() {

	/** 
	* 在页面中任何嵌套层次的窗口中获取顶层窗口 可能直接使用 window 对象
	* @return 当前页面的顶层窗口对象 
	*/
	function getTopWinow() {
		var p = window;
		while (p != p.parent) {
			p = p.parent;
		}
		return p;
	}
	
	function re_login() {
		//alert(1);
		window.location.href = "http://" + window.location.host
		+ "/fr/login.jsp"; // 跳转到登陆页面
	}
	
	// 设置 session 失效处理
	$.ajaxSetup({
		beforeSend : function(XMLHttpRequest, setting) {
			//解决 “not well formed”异常，因为通过 getJson 发送的 ajax 请求，若返回不是 json,就会出这个错
			if (XMLHttpRequest.overrideMimeType) {
				XMLHttpRequest.overrideMimeType("application/json");
			}
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			if (XMLHttpRequest.status == 403) {
				$.messager.alert('我的消息', '您没有权限访问此资源或进行此操作！', 'success');
				return false;
			}
		},
		complete : function(XMLHttpRequest, textStatus) {
			var sessionstatus = XMLHttpRequest
					.getResponseHeader("sessionstatus"); // 通过XMLHttpRequest取得响应头,sessionstatus，
			if (sessionstatus == 'timeout') {
				// 如果超时就处理 ，指定要跳转的页面
				//var top = getTopWinow(); // 获取当前页面的顶层窗口对象
				$.messager.alert('我的消息', '登录超时-请重新登录！', 'info');
				setTimeout("window.location.href = 'http://' + window.location.host+ '/fr/login.jsp'", 1000);
			}
		}
	});
	
	/*
	$(document).ajaxStart(function() {
		$('#loading').show();
	}).ajaxStop(function() {
		$('#loading').hide();
	});
	*/
	
	//首页-第一个 tab
	//小图日历
	var transEndEventNames = {
		'WebkitTransition' : 'webkitTransitionEnd',
		'MozTransition' : 'transitionend',
		'OTransition' : 'oTransitionEnd',
		'msTransition' : 'MSTransitionEnd',
		'transition' : 'transitionend'
	},
	transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ],
	$wrapper = $( '#custom-inner' ),
	$calendar = $( '#calendar2' ),
	cal = $calendar.calendario( {
		onDayClick : function( $el, $contentEl, dateProperties ) {

			if( $contentEl.length > 0 ) {
				showEvents( $contentEl, dateProperties );
			}

		},
		caldata : codropsEvents,
		displayWeekAbbr : true
	} ),
	$month2 = $( '#custom-month2' ).html( cal.getMonthName() ),
	$year2 = $( '#custom-year2' ).html( cal.getYear() );
	$( '#custom-next2' ).on( 'click', function() {
		cal.gotoNextMonth( updateMonthYear2 );
	} );
	$( '#custom-prev2' ).on( 'click', function() {
		cal.gotoPreviousMonth( updateMonthYear2 );
	} );
	function updateMonthYear2() {				
		$month2.html( cal.getMonthName() );
		$year2.html( cal.getYear() );
	}
	// just an example..
	function showEvents( $contentEl, dateProperties ) {
		hideEvents();
		var $events = $( '<div id="custom-content-reveal" class="custom-content-reveal"><h4>Events for ' + dateProperties.monthname + ' ' + dateProperties.day + ', ' + dateProperties.year + '</h4></div>' ),
			$close = $( '<span class="custom-content-close"></span>' ).on( 'click', hideEvents );
		$events.append( $contentEl.html() , $close ).insertAfter( $wrapper );
		setTimeout( function() {
			$events.css( 'top', '0%' );
		}, 25 );
	}
	function hideEvents() {
		var $events = $( '#custom-content-reveal' );
		if( $events.length > 0 ) {
			$events.css( 'top', '100%' );
			Modernizr.csstransitions ? $events.on( transEndEventName, function() { $( this ).remove(); } ) : $events.remove();
		}
	}
	
	//大图日历
	$("#bigCalender").click(function() {
		$("#demo2").hide("slow");
		$("#demo1").show("slow");
	});
	$("#smallCalender").click(function() {
		$("#demo1").hide("slow");
		$("#demo2").show("slow");
		return false;
	});
	var cal1 = $( '#calendar1' ).calendario( {
		onDayClick : function( $el, $contentEl, dateProperties ) {
			for( var key in dateProperties ) {
				console.log( key + ' = ' + dateProperties[ key ] );
			}
		},
		caldata : codropsEvents
	} );
	$month1 = $( '#custom-month1' ).html( cal1.getMonthName() );
	$year1 = $( '#custom-year1' ).html( cal1.getYear() );
	$( '#custom-next1' ).on( 'click', function() {
		cal1.gotoNextMonth( updateMonthYear );
	} );
	$( '#custom-prev1' ).on( 'click', function() {
		cal1.gotoPreviousMonth( updateMonthYear );
	} );
	$( '#custom-current' ).on( 'click', function() {
		cal1.gotoNow( updateMonthYear );
	} );
	function updateMonthYear() {				
		$month1.html( cal1.getMonthName() );
		$year1.html( cal1.getYear() );
	}
	
	//时钟、天气
	$('#digiclock').jdigiclock({
		weatherImagesPath : "/fr/img/weather/logo/",
		clockImagesPath : "/fr/jdigiclock/images/",
		weatherLocationCode : "重庆",
		weatherMetric : "c",
		weatherUpdate : 1
	});
	
	//登录链接
	$("#login_a").linkbutton({
		plain: true
	});
	
	//注册链接
	$("#regest_a").linkbutton({
		plain: true
	});
	
	//选项卡
	$("#tabs").tabs({
		fit : true,
		border : false,
		onContextMenu : function(e, title, index) {
			e.preventDefault();
			$('#refreshMenu').menu('show', {
				left : e.pageX,
				top : e.pageY,
			});	
			obj = {
				refresh : function() {
					$("#tabs").tabs("getTab", index).panel('refresh');
				}
			};
		}
	});
	
	//阻止默认右键菜单
	$("#tabs").tabs("getSelected").on("contextmenu", function(e) {
		e.preventDefault();
		return false;
	});
	
	//点击登录链接，弹出登录框
	$("#login_a").click(function() {
		$("#loginDiv").dialog("open");
	});
	
	//登录框
	$("#loginDiv").dialog({
		title : "登录",
		closed : true,
		modal : true
	});
	
	//点击退出
	$("#logout").click(function() {
		var host = $(this).attr("href");
		$.ajax({
			url : "/fr/loginServlet.do",
			type : "post",
			data : {
				method : "logout",
			},
			dataType : "json",
			beforeSend : function(XMLHttpRequest) {
				$.messager.progress({
					text : "正在退出中...",
				});
			},
			success : function(data, textStatus, jqXHR) {
				$.messager.progress('close');
				if (data == false) {
					$.messager.alert("错误", "退出失败！", "error", function() {
						//......
					});
				} else {
					location.href = '/fr/login.jsp';
				}
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				$.messager.progress('close');
				$.messager.alert("错误", "退出失败！", "error", function() {
					//.....
				});
			}
		});
		return false;
	});

	//导航树
	$("#nav").tree({
		url : "/fr/adminServlet.do?method=searchNav",
		lines : true,
		//加载成功后，展开全部节点
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
		//单击树的叶子节点
		onClick : function(node) {
			//console.log(node);
			if (node.url) {
				if ($("#tabs").tabs("exists", node.text)) {
					$("#tabs").tabs("select", node.text);
					// 调用 'refresh' 方法更新选项卡面板的内容
					var tab = $('#tabs').tabs('getSelected');  // 获取选择的面板
					tab.panel('refresh', node.url + ".jsp");
					/* 这样不可以
					$('#tabs').tabs('update', {
						tab: tab,
						options: {
							href: node.url + ".jsp"  // 新内容的URL
						}
					});
					*/
				} else {
					$("#tabs").tabs("add", {
						title : node.text,
						iconCls : node.iconCls,
						closable : true,
						href : node.url + ".jsp",
						fit : true,
						width : 100,
						heigth : 100,
						plain : true,
						onBeforeLoad : function() {
							
						},
						onLoad : function() {
							
						}
					});
				}
			}
		}
	});
	
	//双击导航框，折叠所有节点
	$("#west").dblclick(function() {
		$("#nav").tree("collapseAll");
	});
	
	//头部的时间
	(function showDynamicTime() {
		var nowDay = new Date();
		
		var y = nowDay.getFullYear();
		var M = nowDay.getMonth();
		var d = nowDay.getDate();
		var h = nowDay.getHours();
		var m = nowDay.getMinutes();
		var s = nowDay.getSeconds();
		var w = nowDay.getDay();
		
		var weeks = ['日','一','二','三','四','五','六'];
		var days = [31,28,31,30,31,30,31,31,30,31,30,31];
		
		function isLeapYear(Year) {
			if (((Year % 4)==0) && ((Year % 100)!=0) || ((Year % 400)==0)) {
				return true;
			} else { 
				return false; 
			}
		}
		
		function setSecMonth(year) {
			if (isLeapYear(year)) {
				days[1] = 29;
			} else {
				days[1] = 28;
			}
		}
			
		setSecMonth(y);
		
		
		setInterval(setS, 1000);
		function setS() {
			if (s < 59) {
				s++;
				if (s < 10) {
					s = "0" + s;
				}
			} else {
				s = '00';
				if (m < 59) {
					m++;
					if (m < 10) {
						m = '0' + m;
					}
				} else {
					m = '00';
					if (h < 23) {
						h++;
						if (h < 10) {
							h = '0' + h;
						}
					} else {
						h = '00';
						if (d < days[M]) {
							d++;
							if (d < 10) {
								d = '0' + d;
							}
						} else {
							d = '00';
							if (M < 12) {
								M++;
								if (M < 10) {
									M = '0' + M;
								}
							} else {
								M = '00';
								setSecMonth(++y);
							}
						}
					}
				}
			}
			$("#dynamicTime").html(y + "年" + ((M + 1) < 10 ? ('0' + (M + 1)) : (M + 1)) + "月" + d + "日 " + h + ":" + m + ":" + s + " (星期" + weeks[w] + ")");
		};
		
	})();
	
});