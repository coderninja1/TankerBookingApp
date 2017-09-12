<?php 

 		require_once "db-functions.php";
		$objdb=new  db_functions;

		$firstname=$_POST["fn"];	
		$lastname=$_POST["ln"];
		$username=$_POST["un"];
		$password=$_POST["ps"];
		$password=md5($password);
		$phone=$_POST["ph"];
		$emailid=$_POST["em"];
		$city=$_POST["ct"];
		$nwcnumber=$_POST["nwc"];
		$nwcregister=$_POST["nwr"];
		$tankersize=$_POST["ts"];
	    $driverimage_link=$_GET["driverimage"];
	    $vehicleimage_link=$_GET['vehicleimage'];

		// To protect MySQL injection for Security purpose
		$firstname =stripslashes($firstname);
		$lastname =stripslashes($lastname);
		$username = stripslashes($username);
		$password=stripslashes($password);
		$phone=stripslashes($phone);
		$emailid=stripslashes($emailid);
		$city=stripslashes($city);
	    $nwcnumber=stripslashes($nwcnumber);
		$nwcregister=stripslashes($nwcregister);
	    $tankersize=stripslashes($tankersize);
	    $driverimage_link=stripslashes($driverimage_link);
	    $vehicleimage_link=stripslashes($vehicleimage_link);

		$checkuser=$objdb->fnChkKeyAvl('user_name',$username,'tank_users');
	    $checkphone=$objdb->fnChkKeyAvl('meta_value',$phone,'tank_users_meta');

         $arrData = array(
						'user_name' =>$username,
						'user_role' =>'driver',
						'password' =>$password,
						'phone'=>$phone,
						'email'=>$emailid,
						'status'=>0			
				);

	    $insert_id=$objdb->insert($arrData,'tank_users');

	    $data=$objdb->fnAddUserMeta($insert_id,'firstname',$firstname);

		$data=$objdb->fnAddUserMeta($insert_id,'lastname',$lastname);

		$data=$objdb->fnAddUserMeta($insert_id,'city',$city);

		$data=$objdb->fnAddUserMeta($insert_id,'nwcnumber',$nwcnumber);

		$data=$objdb->fnAddUserMeta($insert_id,'nwcregister',$nwcregister);

		$data=$objdb->fnAddUserMeta($insert_id,'tankersize',$tankersize);
		
	    $data=$objdb->fnAddUserMeta($insert_id,'profile_image',$driverimage_link);

	    $data=$objdb->fnAddUserMeta($insert_id,'vehicle_image',$vehicleimage_link);

	 	if($insert_id!==""){
	 		echo "Success";
	 		
	 	}else{
	 		echo "fail";
	 	}	 	

die;



 ?>