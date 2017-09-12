	<?php

	require_once "db-functions.php";
	$objdb=new  db_functions;
	$user_id=$_GET['userid'];
	$firstname= $_POST['fn'];	
	$lastname=$_POST['ln'];
	$username= $_POST['un'];
	$password= $_POST['ps'];
	$email=$_POST['em'];
	$phone=$_POST['ph'];
	$city=$_POST['ct'];
	$meternumber=$_POST['mn'];
	$building_image=$_POST['bi'];

	$arrData=array(
		 'user_name'=>$username,
		 'password'=>$password,
		 'phone'=>$phone,
		 'email'=>$email
		);

	$data=$objdb->fnUpdateUser($arrData,$user_id,'tank_users');
	$updatedata=$objdb->fnUpdateUserMeta('firstname',$firstname,$user_id,'tank_users_meta');
	$updatedata=$objdb->fnUpdateUserMeta('lastname',$lastname,$user_id,'tank_users_meta');
	$updatedata=$objdb->fnUpdateUserMeta('city',$city,$user_id,'tank_users_meta');
	$updatedata=$objdb->fnUpdateUserMeta('meternumber',$meternumber,$user_id,'tank_users_meta');
	
	if($building_image !==''){
	  $updatedata=$objdb->fnUpdateUserMeta('building_image',$building_image,$user_id,'tank_users_meta');
	}	
	if($updatedata){
		echo "1";
	}
	else{
		echo "0";
	}

	?>