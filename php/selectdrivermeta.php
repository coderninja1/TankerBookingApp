<?php 
	require_once "db-functions.php";
    $objdb=new  db_functions;
	$id=$_GET['id'];

	$userdata=$objdb->selectUserData($id,'tank_users');

	$id=$userdata[0]['id'];

	$user_role=$userdata[0]['user_role'];

	$user_name=$userdata[0]['user_name'];

	$phone=$userdata[0]['phone'];

    $email=$userdata[0]['email'];

	$data=$objdb->selectAllUserMeta($id,'tank_users_meta');

	$fname=$data[0][0];
	$lname=$data[1][0];
	$city= $data[2][0];
	$nwcnumber=$data[3][0];
	$nwcregister=$data[4][0];
	$tanksize=$data[5][0];
	$profile_image=$data[6][0];
	$vehicle_image=$data[7][0];
    $outp = "";
		if($data){
		   	    if ($outp != "") {$outp .= ",";}
	            $outp .= '{"fname":"'  .$fname . '",';
	            $outp .= '"lname":"'  . $lname . '",';
	            $outp .= '"city":"'  . $city . '",';
	            $outp .= '"id":"'  	. $id . '",';
	            $outp .= '"user_role":"'. $user_role . '",';
	            $outp .= '"user_name":"'. $user_name . '",';
	            $outp .= '"phone":"'  . $phone . '",';
	            $outp .= '"email":"'  . $email . '",';
	            $outp .= '"nwcnumber":"'  . $nwcnumber . '",';
	            $outp .= '"nwcregister":"' . $nwcregister . '",'; 
	            $outp .= '"tanksize":"'  . $tanksize . '",';          
	            $outp .= '"vehicle_image":"'  . $vehicle_image . '",';
		   	   	$outp .= '"profile_image":"'.$profile_image.'"}'; 
			   	$outp ='{"records":['.$outp.']}';
		        echo $outp;
		}

 ?>