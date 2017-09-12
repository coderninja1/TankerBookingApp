<?php
	header('Access-Control-Allow-Origin: *'); 
	require_once "db-functions.php";
	$objdb=new db_functions;
	$data    = $_POST["result"];
	$data    = json_decode("$data", true);
	$driverid=$data['driver_id'];
	$cutomerid=$data['customerid'];
	$ratingvalue=$data['ratingvalue'];
	$arrData=array(
		'driver_id'=>$driverid,
		'user_id'=>$cutomerid,
		'rating_count'=>$ratingvalue
		);
	$objdb->insert($arrData,'rating_details');

?>