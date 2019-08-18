<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE html>

<html>
	<head>
		<meta charset="UTF-8">
		<title>demo</title>
        <link rel="stylesheet" type="text/css" href="css/jquery.jdigiclock.css" />
        <script type="text/javascript" src="<%=request.getContextPath() %>/js/jquery.js"></script>
        <script type="text/javascript" src="<%=request.getContextPath() %>/weather/jquery.simpleWeather.js"></script>
        <script type="text/javascript" src="lib/jquery.jdigiclock.js"></script>
	</head>
	<body>
		<div id="digiclock"></div>	
	</body>
    <script type="text/javascript">
        $(document).ready(function() {
            $('#digiclock').jdigiclock({
				weatherImagesPath : "<%=request.getContextPath() %>/img/weather/logo/"
			});
        });
    </script>
</html>