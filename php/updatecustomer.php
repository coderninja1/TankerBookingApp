<?php 

    require_once "db-functions.php";
	$objdb=new  db_functions;

	$username=$_GET['username'];
	
	$login=$username;

	$resultData=$objdb->selectall($login,'tank_users');

	$outp = "";

	foreach ($resultData as $key => $value) {

	    if ($outp != "") {$outp .= ",";}
	    $outp .= '{"id":"'  . $value[0] . '",';
	    $outp .= '"username":"'   . $value[1]        . '",';
	    $outp .= '"userrole":"'   . $value[2]        . '",';
	    $outp .= '"password":"'   . $value[3]        . '",';
	    $outp .= '"status":"'   . $value[4]        . '",';
	    $outp .= '"created_at":"'   . $value[5]        . '",';  
	    $outp .= '"phone":"'   . $value[6]        . '",';  
	    $outp .= '"email":"'. $value[7]    . '",';     /* . '"}'; */
		$id=$value[0];
	}

	$resultData=$objdb->selectAllUserMeta($id,'tank_users_meta');
	if ($resultData) {

		$firstname=$resultData[0]['meta_value'];
		$lastname=$resultData[1]['meta_value'];
		$city=$resultData[2]['meta_value'];
		$meternumber=$resultData[3]['meta_value'];
		$building_image=$resultData[4]['meta_value'];
		$outp .= '"firstname":"' .$firstname. '",';
	    $outp .= '"lastname":"' .$lastname . '",';
	    $outp .= '"city":"'   .$city. '",';
	    $outp .= '"meternumber":"'.$meternumber. '",';
	    $outp .= '"building_image":"' .$building_image .'"}'; 
	}
	
	$outp ='{"records":['.$outp.']}';
    echo $outp;

 ?>