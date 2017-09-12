<?php 
header('Access-Control-Allow-Origin: *'); 
require_once "db-functions.php";
$objdb=new  db_functions;
$data    = $_POST["result"];
$data    = json_decode("$data", true);

$bookingdate=$data['bookingdate'];
$bookingtime=$data['bookingtime'];
$customer_id=$data['customerdetails'];

$arrData=array(
		'user_id'=>$customer_id,
		'booking_time'=>$bookingtime,
		'booking_date'=>$bookingdate,
		'status'=>'incomplete'
	);

$insertid=$objdb->insert($arrData,'advanced_booking');

 ?>	