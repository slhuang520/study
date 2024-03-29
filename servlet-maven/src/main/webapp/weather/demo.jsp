<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE html>

<html>
	<head>
		<meta charset="utf-8">
		<title>Weather</title>
		<script type="text/javascript" src="<%=request.getContextPath() %>/js/jquery.js"></script>
		<script type="text/javascript" src="jquery.simpleWeather.js"></script>
		<style type="text/css">
			html {
			  width: 100%;
			  height: 100%;
			  background: #1192d3 url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/93/austin-2.jpg) no-repeat bottom right;
			  background-size: cover;
			}

			body {
			  padding: 45px 0;
			  font: 13px 'Open Sans', "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
			}

			#weather {
			  width: 500px;
			  margin: 0px auto;
			  text-align: center;
			  text-transform: uppercase;
			}

			i {
			  color: #fff;
			  font-family: weather;
			  font-size: 150px;
			  font-weight: normal;
			  font-style: normal;
			  line-height: 1.0;
			}

			.icon-0:before { content: ":"; }
			.icon-1:before { content: "p"; }
			.icon-2:before { content: "S"; }
			.icon-3:before { content: "Q"; }
			.icon-4:before { content: "S"; }
			.icon-5:before { content: "W"; }
			.icon-6:before { content: "W"; }
			.icon-7:before { content: "W"; }
			.icon-8:before { content: "W"; }
			.icon-9:before { content: "I"; }
			.icon-10:before { content: "W"; }
			.icon-11:before { content: "I"; }
			.icon-12:before { content: "I"; }
			.icon-13:before { content: "I"; }
			.icon-14:before { content: "I"; }
			.icon-15:before { content: "W"; }
			.icon-16:before { content: "I"; }
			.icon-17:before { content: "W"; }
			.icon-18:before { content: "U"; }
			.icon-19:before { content: "Z"; }
			.icon-20:before { content: "Z"; }
			.icon-21:before { content: "Z"; }
			.icon-22:before { content: "Z"; }
			.icon-23:before { content: "Z"; }
			.icon-24:before { content: "E"; }
			.icon-25:before { content: "E"; }
			.icon-26:before { content: "3"; }
			.icon-27:before { content: "a"; }
			.icon-28:before { content: "A"; }
			.icon-29:before { content: "a"; }
			.icon-30:before { content: "A"; }
			.icon-31:before { content: "6"; }
			.icon-32:before { content: "1"; }
			.icon-33:before { content: "6"; }
			.icon-34:before { content: "1"; }
			.icon-35:before { content: "W"; }
			.icon-36:before { content: "1"; }
			.icon-37:before { content: "S"; }
			.icon-38:before { content: "S"; }
			.icon-39:before { content: "S"; }
			.icon-40:before { content: "M"; }
			.icon-41:before { content: "W"; }
			.icon-42:before { content: "I"; }
			.icon-43:before { content: "W"; }
			.icon-44:before { content: "a"; }
			.icon-45:before { content: "S"; }
			.icon-46:before { content: "U"; }
			.icon-47:before { content: "S"; }

			#weather h2 {
			  margin: 0 0 8px;
			  color: #fff;
			  font-size: 100px;
			  font-weight: 300;
			  text-align: center;
			  text-shadow: 0px 1px 3px rgba(0, 0, 0, 0.15);
			}

			#weather ul {
			  margin: 0;
			  padding: 0;
			}

			#weather li {
			  background: #fff;
			  background: rgba(255,255,255,0.90);
			  padding: 20px;
			  display: inline-block;
			  border-radius: 5px;
			}

			#weather .currently {
			  margin: 0 20px;
			}
		</style>
		<script type="text/javascript">
			$(function(){
				$.simpleWeather({
				location: 'Chongqing, Shanghai', 
				woeid: '',
				unit: 'c',
				success: function(weather) {
				  html = '<h2><i class="icon-'+weather.code+'"></i> '+weather.temp+'&deg;'+weather.units.temp+'</h2>';
				  html += '<ul><li>'+weather.city+', '+weather.region+'</li>';
				  html += '<li class="currently">'+weather.currently+'</li>';
				  html += '<li>'+weather.wind.direction+' '+weather.wind.speed+' '+weather.units.speed+'</li></ul>';
			  
				  $("#weather").html(html);
				},
				error: function(error) {
				  $("#weather").html('<p>'+error+'</p>');
				}
			  });
			});
		</script>
	</head>
	<body>
		<div id="weather"></div>
	</body>
</html>