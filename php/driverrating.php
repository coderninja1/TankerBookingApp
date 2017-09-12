<?php
	
	header('Access-Control-Allow-Origin: *'); 
	require_once "db-functions.php";
	$objdb=new db_functions;
	$data    = $_POST["result"];
	$data    = json_decode("$data", true);
	$id=$data['driverid'];
	$data=$objdb->fnDriverRating($id,'rating_details');
	$sum = 0;
	if(!empty($data)){
		foreach ($data as $key => $value) {
				$sum=$sum+$value['rating_count'];
		}
	 	$count = count(($data));
		$avg= $sum/$count;	
		echo $avg;
	}
	else{
		$avg=0;
		echo $avg;
	}

?>