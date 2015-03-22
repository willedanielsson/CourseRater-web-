<?php
	require("connector.php");
	require("PasswordHash.php");

	$postdata = file_get_contents("php://input");
	$data = json_decode($postdata);

	$userEmail = $data->email;
	$userEmail = trim($userEmail);
	$userEmail = mysqli_real_escape_string($con, $userEmail);
	$userEmail = htmlspecialchars($userEmail, ENT_QUOTES);

	$alreadyUser = "SELECT email FROM users WHERE email='$userEmail'";

	if($result=mysqli_query($con, $alreadyUser)){

		$numberOfRows = mysqli_num_rows($result);

		if($numberOfRows>0){

			$alreadyForgot =mysqli_query($con, "SELECT email FROM forgotPass WHERE email='$userEmail'");
			$numRows = mysqli_num_rows($alreadyForgot);
			if($numRows=1){
				$delete = mysqli_query($con, "DELETE FROM forgotPass WHERE email='$userEmail'");
			}

			$userPass = $data->pass;
			$userPass = trim($userPass);
			$userPass = mysqli_real_escape_string($con, $userPass);
			$userPass = htmlspecialchars($userPass, ENT_QUOTES);
			$hasher = new PasswordHash(8,false);
			$hash = $hasher->HashPassword($userPass);
			$userPass = null;

			$confirmCode = md5(uniqid(rand())); 

			if($result2 = mysqli_query($con, "INSERT INTO forgotPass (email, pass, code) VALUES ('$userEmail', '$hash', '$confirmCode')")){
				
				require 'PHPMailer/PHPMailerAutoload.php';
				$pm = new PHPMailer();

				$sender = 'noreply@courserater.net';
				$senderName = 'CourseRater';
				$recipient = $userEmail;
				$recipientName = $userEmail;

				$pm->SetFrom($sender, $senderName);
				$pm->AddReplyTo($sender, $senderName);
				$pm->Sender = $pm->From;
				$pm->AddAddress($recipient, $recipientName);

				$pm->Subject = "CourseRater Password Restoration";
				$pm->Body = "Activate your new password on CourseRater by clicking on this link: \n\n http://www.courserater.net/backend/newPass.php?passkey=$confirmCode";


				// Skicka
				if(!$pm->Send()) {
				    //echo "Mail kunde ej skickas: " . $mail->ErrorInfo;
				    print_r("emailFailed");
				}
				else {
				    print_r("emailSent");
				}
				
			}else{
				print_r("connectionError");
			}
		}else{
			print_r("noUser");
		}
	}else{
		print_r("connectionError");
	}	
	
?>