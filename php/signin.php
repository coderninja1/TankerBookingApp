<?php 
 		require_once "db-functions.php";
		$objdb=new  db_functions;
		$login=$_POST["un"];
		$password=$_POST["ps"];
	    $login = stripslashes($login);
		$password = stripslashes($password);
		$password=md5($password);
		$signin_data=$objdb->fnSigninUSer($login,$password,'tank_users');
		$outp = "";
		if($signin_data){
		
		   foreach ($signin_data as $key => $value) {
		   	    if ($outp != "") {$outp .= ",";}
	            $outp .= '{"id":"'  . $value[0] . '",';
	            $outp .= '"username":"'  . $value[1] . '",';
	            $outp .= '"status":"'  . $value[4] . '",';
		   	   	$outp .= '"userrole":"'.$value[2] .'"}'; 
	          		  
	          }

		   	$outp ='{"records":['.$outp.']}';
	        echo $outp;
		}

		else{
				$outp .= '{"id":"' .'0'. '"}'; 
				$outp ='{"records":['.$outp.']}';	
				echo $outp;
		}
	

 ?>