<?php
 	    //for User Signup

 		require_once "db-functions.php";
		$objdb=new  db_functions;
		require_once "config.php";

		$firstname=$_POST["fn"];
		
		$lastname=$_POST["ln"];
		$username=$_POST["un"];
		$password=$_POST["ps"];
		$password=md5($password);
		$phone=$_POST["ph"];
		$emailid=$_POST["em"];
		$city=$_POST["ct"];
		$meternumber=$_POST["mn"];
		$image_link=$_GET["imagelink"];

		// To protect MySQL injection for Security purpose
		$firstname =stripslashes($firstname);
		$lastname =stripslashes($lastname);
		$username = stripslashes($username);
		$password=stripslashes($password);
		$phone=stripslashes($phone);
		$emailid=stripslashes($emailid);
		$city=stripslashes($city);
	    $meternumber=stripslashes($meternumber);

		$arrCheckuser=$objdb->fnChkKeyAvl('user_name',$username,'tank_users');
		if($arrCheckuser)
			$checkuser=$arrCheckuser[0]['id'];
		else
			$checkuser=null;
		
	    $arrCheckphone=$objdb->fnChkKeyAvl('phone',$phone,'tank_users');
	    if($arrCheckphone)
	    	$checkphone=$arrCheckphone[0]['id'];
	    else
	    	$checkphone=null;

        $arrData = array(
						'user_name' =>$username,
						'user_role' =>'user',
						'password' =>$password,
						'phone'=>$phone,
						'email'=>$emailid,
						'status'=>0			
				);
       
   
	     $insert_id=$objdb->insert($arrData,'tank_users');

	    if($insert_id>0){
	    	echo "Success";
	    }
	    else{
	    	echo "failed";
	    }

	    $data=$objdb->fnAddUserMeta($insert_id,'firstname',$firstname);

		$data=$objdb->fnAddUserMeta($insert_id,'lastname',$lastname);

		$data=$objdb->fnAddUserMeta($insert_id,'city',$city);

		$data=$objdb->fnAddUserMeta($insert_id,'meternumber',$meternumber);

	    $data=$objdb->fnAddUserMeta($insert_id,'building_image',$image_link);

	

?> 