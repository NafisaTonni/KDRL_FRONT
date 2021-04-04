<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
	<%@ page isELIgnored="false" %>
		<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
			<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
				<tiles:importAttribute name="javascripts"/>
				<tiles:importAttribute name="stylesheets"/>
				
	

<!DOCTYPE html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Education Management &amp; Information System | Login</title>
  <!-- Tell the browser to be responsive to screen width -->
  <meta name="viewport" content="width=device-width, initial-scale=1">
			
	 <!-- stylesheets -->
	    <c:forEach var="css" items="${stylesheets}">
	        <link rel="stylesheet" type="text/css" href="<c:url value="${css}"/>">
	    </c:forEach>
	    <!-- end stylesheets -->
 
</head>
<body class="hold-transition login-page ">
	<section class="content">
		<div class="container-fluid">

			<tiles:insertAttribute name="body" />


 		</div><!-- /.container-fluid -->
    </section>
	<!-- scripts -->
    <c:forEach var="script" items="${javascripts}">
        <script src="<c:url value="${script}"/>"></script>
    </c:forEach>
    <!-- end scripts -->

</body>
</html>
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
				    
				    		


		



		    
		    
		    

<%-- 

<tiles:getAsString name="title" />
<tiles:insertAttribute name="navbar" />
<tiles:insertAttribute name="sidebar" />
<tiles:getAsString name="pageInfo" />
<tiles:insertAttribute name="body" />
<tiles:insertAttribute name="footer" /> --%>

