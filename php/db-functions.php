<?php

require_once "config.php";
	  
	class db_functions{

		 function insert($arrData , $strTblName){
		                global $conn;
					  	foreach ($arrData as $strkey => $strvalue) {
					  			$values[]  = $strvalue;
					  	}

					  	$strfields  = '`' . implode( '`, `', array_keys( $arrData ) ) . '`';
					  	$strvalues = implode( "', '", $values );
					  	$stm=$conn->prepare("INSERT INTO `$strTblName` ($strfields) VALUES ('$strvalues')");   
					  	$execute=$stm->execute();
				  		$InsertId=$conn->lastInsertId();
				  		return $InsertId;
				
					 }

	  	 function fnAddUserMeta($id , $key, $value){
				$arrData = array(
						'id' => $id,
						'meta_key' => $key,
						'meta_value' => $value
					);

				$this->insert($arrData , 'tank_users_meta');

			}

			function fnChkKeyAvl($key,$value,$strTblName){
					global $conn;
					$stm=$conn->prepare("SELECT id from $strTblName WHERE $key ='$value' LIMIT 1");	
				    $execute=$stm->execute();
				    $result=$stm->fetchAll();
				    return $result;

			}

			function select($username,$password,$strTblName){
				global $conn;
			    $stm=$conn->prepare("SELECT user_name from $strTblName WHERE user_name LIKE '".$username."' and password like '".$password."' ");
			    $execute=$stm->execute();
			    $result=$stm->fetchAll(\PDO::FETCH_COLUMN);
				return $result;
			}

			function selectmeta($id,$strTblName,$meta_key){
				global $conn;
			    $stm=$conn->prepare("SELECT $meta_key from $strTblName WHERE id=$id");
			    $execute=$stm->execute();
			    $result=$stm->fetchAll(\PDO::FETCH_COLUMN);
				return $result;
			}


			function fnSigninUSer($login,$password,$strTblName){
					global $conn;
					$stm=$conn->prepare("SELECT * from  $strTblName where (user_name='$login' OR email = '$login') and password='$password'");
					$execute=$stm->execute();
				    $result=$stm->fetchAll();	
					return $result;
		
			}


			function fnSelectEmail($phone,$strTblName){
					global $conn;
					$stm=$conn->prepare("SELECT email from  $strTblName where phone='$phone'");
					$execute=$stm->execute();
				    $result=$stm->fetchAll(\PDO::FETCH_COLUMN);	
					return $result;
			
			}

			function selectall($login,$strTblName){
					global $conn;
					$stm=$conn->prepare("SELECT * from  $strTblName where (user_name='$login' OR email = '$login') ");
					$execute=$stm->execute();
				    $result=$stm->fetchAll();
				   // print_r($result);
					return $result;

			}

			function selectAllUserMeta($id,$strTblName){
					global $conn;
					$stm=$conn->prepare("SELECT meta_value from  $strTblName where id='$id'");
				    $execute=$stm->execute();
				    $result=$stm->fetchAll();		
				    return $result;
			}

			function selectUserData($id,$strTblName){
					global $conn;
					$stm=$conn->prepare("SELECT id,user_role,user_name,phone,email from  $strTblName where id='$id'");
				    $execute=$stm->execute();
				    $result=$stm->fetchAll();		
				    return $result;
			}

			function fnSelectMeta($meta_key,$meta_value,$strTblName){
				    global $conn;
					$stm=$conn->prepare("SELECT id from $strTblName where meta_key='$meta_key' and meta_value='$meta_value' ");
				    $execute=$stm->execute();
				    $result=$stm->fetchAll();
				    return $result;
			}

			function fnUserId($meta_key,$meta_value,$strTblName){
				global $conn;
				$stm=$conn->prepare("SELECT id from $strTblName WHERE meta_key='$meta_key' and meta_value='$meta_value' LIMIT 1");	
				$execute=$stm->execute();
				$result=$stm->fetchColumn(0);
				return $result;

			}

			function fnUpadateForgotPassword($phone,$password,$strTblName){
				global $conn;
				$stm=$conn->prepare("UPDATE $strTblName set password ='$password' WHERE phone=$phone");	
				$execute=$stm->execute();
			    $result=$execute;
				return $result;
			}

		  function update(){

			    global $conn;
				$stm=$conn->prepare("UPDATE $strTblName set password ='$password' WHERE phone=$phone");	
				$execute=$stm->execute();
			     //echo $execute;
			    $result=$execute;
				return $result;

			}

			function UpdateDriverMeta(){

			    global $conn;
				$stm=$conn->prepare("UPDATE $strTblName set password ='$password' WHERE phone=$phone");	
				$execute=$stm->execute();
			     //echo $execute;
			    $result=$execute;
				return $result;

			}

			function fnUpdateUser($arrData,$id,$strTblName){
			   
			    global $conn;

			  	foreach ($arrData as $strkey => $strvalue) {

			  			$arrfields[] = "`$strkey` = '" . $strvalue. "'";
			  	}

			  
	        	$strfields = implode( ', ', $arrfields );
	      
				$stm=$conn->prepare("UPDATE `$strTblName`  set $strfields  WHERE id=$id ");	
				$execute=$stm->execute();
			    // print_r($stm);
			
			}

			 function fnAddBookingMeta($id,$driver_id,$user_id,$faretotal,$services,$drivername,$username,$driverphone,$userphone,$booktime){
		
				$arrData = array(
						'booking_id' =>$id,
						'driver_id'=>$driver_id,
						'user_id'=>$user_id,
						'fare' =>$faretotal,
						'services' =>$services,
						'driver_name'=>$drivername,
						'user_name'=>$username,
						'driver_phone'=>$driverphone,
						'user_phone'=>$userphone,
						'booktime'=>$booktime
					);

				$this->insert($arrData , 'booking_meta');
			}

			function fnUpdateUserMeta($meta_key,$meta_value,$userid,$strTblName){							   
			    global $conn;
				$stm=$conn->prepare("UPDATE `$strTblName` SET meta_value = '$meta_value' WHERE id = '$userid' AND meta_key = '$meta_key'");	
				$execute=$stm->execute();	
			    
			    if($execute){
			      return "1";
			    }
	   			else{
	   			  return "0";
	   			}
	   		}

	   		function fnGetBookingDetails($strTblName,$key,$id){
	   			 global $conn;
	   		    $qry = "SELECT * FROM $strTblName WHERE $key=$id";
				$result = $conn->prepare($qry);
				$result->execute();		
				 if($result->rowCount() > 0){
			        $output = $result->fetchall();
			        foreach ($output as $o){
			           $response[] = array('id'=>$o['id'],'drivername'=>$o['driver_name'],'username'=>$o['user_name'],'fare'=>$o['fare'],'services'=>$o['services'],'driverphone'=>$o['driver_phone'],'userphone'=>$o['user_phone'],'booktime'=>$o['booktime']);
			        }
			        return json_encode($response);
			    }	
		
			}


			   function fnGetAdvancedBooking($strTblName,$key,$id){
			   			global $conn;
			   		    $qry = "SELECT * FROM $strTblName WHERE $key=$id";
						$result = $conn->prepare($qry);
						$result->execute();		
						 if($result->rowCount() > 0){
					        $output = $result->fetchall();
					        foreach ($output as $o){
					           $response[] = array('id'=>$o['id'],'userid'=>$o['user_id'],'bookingtime'=>$o['booking_time'],'bookingdate'=>$o['booking_date'],'status'=>$o['status']);
					        }
					        return json_encode($response);
					    }	
				
					}


			function TankCharges($strTblName){
			  	global $conn;
	   		    $qry = "SELECT per_ton,min_distance,extra_distance,water_pump,long_pipe from $strTblName";
	   		    $result = $conn->prepare($qry);
				$result->execute();
				$output = $result->fetchall();
			    foreach ($output as $o){
			           $response[] = array('per_ton'=>$o['per_ton'],'min_distance'=>$o['min_distance'],'extra_distance'=>$o['extra_distance'],'water_pump'=>$o['water_pump'],'long_pipe'=>$o['long_pipe']);
			        }
			     return json_encode($response);

			}

			function fnCheckRating($userid,$driverid,$strTblName){
				global $conn;
	   		    $qry = "SELECT booking_id from $strTblName where user_id='$userid' and driver_id='$driverid'  ";
	   		    $result = $conn->prepare($qry);
				$result->execute();
				$output = $result->fetchall();	   
			    return  $output;
			
			}

			function fnDriverRating($driverid,$strTblName){
				global $conn;
			    $sql = "SELECT id,rating_count FROM `$strTblName` WHERE driver_id ='$driverid' "; 
				$result = $conn->prepare($sql); 
				$result->execute(); 
				$output = $result->fetchall();	   
				return $output;
			
			}


	 }


?>