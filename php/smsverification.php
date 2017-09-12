<?php
	 		require_once "db-functions.php";
			$objdb=new  db_functions;
			$email = $_GET['email'];
			$code = $_GET['code'];		
			$strMessage = "Your one time password is ";
			echo $email;
		/*	$strMessage .= "";
			$strMessage .= $code;
			$ext=966;
			$url='http://bulksmsindia.mobi/sendurlcomma.aspx?user=20080840&pwd=rahul40&senderid=SMS%20ALERT&mobileno='.$ext.$phone.'&msgtext='.$strMessage.'&countrycode=all';
			$url=urlencode($url);
			$ch = curl_init();
		   	curl_setopt($ch, CURLOPT_URL, $url);
		   	// Set so curl_exec returns the result instead of outputting it.
		   	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		   	// Get the response and close the channel.
		   	$response = curl_exec($ch);*/


    		if(!empty($email) && $email!=='')
    		{
    		
    			require 'mail/PHPMailerAutoload.php';

    			$mail = new PHPMailer;
    	                  
    			$mail->isSMTP();                                      // Set mailer to use SMTP
    			$mail->Host = 'smtp.gmail.com';  // Specify main and backup SMTP servers
    			$mail->SMTPAuth = true;                               // Enable SMTP authentication
    			$mail->Username = 'dipak.r@wmsindia.com';                 // SMTP username
    			$mail->Password = 'Qwerty*1#';                           // SMTP password
    			$mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
    			$mail->Port = 587;                                    // TCP port to connect to

    			$mail->setFrom('dipak.r@wmsindia.com', 'Mailer');
    			$mail->addAddress($email, 'text');     // Add a recipient
    			// $mail->addAddress('dipak.r@wmsindia.com');               // Name is optional
    			// $mail->addReplyTo('dipak.r@wmsindia.com', 'Information');
    			// $mail->addCC('dipak.r@wmsindia.com');
    			// $mail->addBCC('dipak.r@wmsindia.com');

    			$mail->isHTML(true);                                  // Set email format to HTML

    			$mail->Subject = 'Here is the subject';
    			$mail->Body    = 'Your one time password is'. " " .$code;
    			// $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';
    			if(!$mail->send()) {
    		
    			} else {
    			    
    			}
       		 }	

		   	
?>
