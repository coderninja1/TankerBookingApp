<?php
	require_once "db-functions.php";
	$objdb=new  db_functions;
	$charges=$objdb->TankCharges('tank_charges');
    echo $charges;
?>