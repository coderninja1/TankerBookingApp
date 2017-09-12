<?php

	header('Access-Control-Allow-Origin: *'); 
	require_once "db-functions.php";
	$objdb=new db_functions;
	$data    = $_POST["result"];
	$data    = json_decode("$data", true);
	$userid=$data['customerdetails']['customer_id'];
	$driverid=$data['driverid'];
	$status=$objdb->fnCheckRating($userid,$driverid,'booking_meta');
	
	if(!empty($status)){
	echo $status[0][0];
	}
	else{
		$status=0;
		echo $status;
	} 
?>