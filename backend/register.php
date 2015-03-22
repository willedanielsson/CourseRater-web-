<?php
require("PasswordHash.php");
require("connector.php");

$postdata = file_get_contents("php://input");
$data = json_decode($postdata);

$userEmail = $data->email;
$userEmail = trim($userEmail);
$userEmail = mysqli_real_escape_string($con, $userEmail);
$userEmail = htmlspecialchars($userEmail, ENT_QUOTES);


$alreadyUser = ("SELECT email FROM users WHERE email='$userEmail'");

if($result=mysqli_query($con, $alreadyUser)){

	$numberOfRows = mysqli_num_rows($result);

	if($numberOfRows>0){
		print_r("userExist");
	}else{
		//User dont exist
		$notConfirmed = ("SELECT email from tempUsers WHERE email='$userEmail'");
		$result2=mysqli_query($con, $notConfirmed);

		$numRows = mysqli_num_rows($result2);

		if($numRows>0){
			print_r("notConfirmed");
		}else{

			$hasher = new PasswordHash(8,false);

			$userPassword = $data->password;
			$userPassword = trim($userPassword);
			$userPassword = mysqli_real_escape_string($con, $userPassword);
			$userPassword = htmlspecialchars($userPassword, ENT_QUOTES);

			$hash = $hasher->HashPassword($userPassword);
			$userPassword = null;

			$userCountry = $data->country;
			$userCountry = trim($userCountry);
			$userCountry = mysqli_real_escape_string($con, $userCountry);
			$userCountry = htmlspecialchars($userCountry, ENT_QUOTES);

			$userUniversity = $data->university;
			$userUniversity = trim($userUniversity);
			$userUniversity = mysqli_real_escape_string($con, $userUniversity);
			$userUniversity = htmlspecialchars($userUniversity, ENT_QUOTES);

			//Random confirmation code
			$confirmCode = md5(uniqid(rand())); 

			$sql = ("INSERT INTO tempUsers (email, password, country, university, confirm)
					VALUES ('$userEmail', '$hash','$userCountry', '$userUniversity', '$confirmCode')");

			$result = mysqli_query($con, $sql);

			// Mailer
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

			$pm->Subject = "CourseRater Activation";
			$pm->Body = "Activate your account on CourseRater by clicking on this link: \n\n http://www.courserater.net/backend/confirmation.php?passkey=$confirmCode";


			// Skicka
			if(!$pm->Send()) {
			    print_r("emailFailed");
			}
			else {
			    print_r("emailSent");

			}
		}
	}
}else{
	print_r("connectionFailed");
}

mysqli_close($con);

?>