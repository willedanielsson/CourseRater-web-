<?php
require("PasswordHash.php");

require('connector.php');

$postdata = file_get_contents("php://input");
$data = json_decode($postdata);

$userEmail = $data->email;
$userEmail = trim($userEmail);
$userEmail = mysqli_real_escape_string($con, $userEmail);
$userEmail = htmlspecialchars($userEmail, ENT_QUOTES);


$userPassword = $data->password;
$userPassword = trim($userPassword);
$userPassword = mysqli_real_escape_string($con, $userPassword);
$userPassword = htmlspecialchars($userPassword, ENT_QUOTES);

$hasher = new PasswordHash(8,false);

$findUser = "SELECT password FROM users WHERE email='$userEmail'";
$result = mysqli_query($con, $findUser);

if(mysqli_num_rows($result)>0){
	$row = $result->fetch_row();
	$storedHash = $row[0];

	$check = $hasher->CheckPassword($userPassword, $storedHash);
	$userPassword = null;

	$getFailedAttempts = mysqli_query($con, "SELECT * FROM loginAttempts WHERE email = '$userEmail'");
	$rows = mysqli_fetch_assoc($getFailedAttempts);
	$failedLoginCount = $rows['attempts'];
	$firstFailed = $rows['timeOut'];
	$currentTime = time();
	$diff = $currentTime-$firstFailed;
	
	//Har failat förut
	if(mysqli_num_rows($getFailedAttempts)===1){

		// Failat och tid över 10 min
		if($failedLoginCount>=3 && $diff < 600){
			print_r("lockedOut");
		}
		
		else if(!$check){
			
				//Failat men tiden har gått ut så vi startar om tiden och antal försök
				if($diff > 600){
					mysqli_query($con, "UPDATE loginAttempts SET attempts=1, timeOut='$currentTime' WHERE email='$userEmail'");
				
				}else{
					mysqli_query($con, "UPDATE loginAttempts SET attempts= attempts+1 WHERE email='$userEmail'");
				}
			print_r("credFail");	
		}else{
			//RÄtt lösen

			$getInfoQuery = mysqli_query($con, "SELECT email, country, university FROM users");
				$rows = array();

				while($r = mysqli_fetch_assoc($getInfoQuery)){
					$rows[] = $r['email'];
					$rows[] = $r['country'];
					$rows[] = $r['university'];
				}

				$json = json_encode($rows);
				echo $json;

		}
		
	}else{	
		//Finns inte med i loginAttempts
		if(!$check){
			mysqli_query($con, "INSERT INTO loginAttempts (email, attempts, timeOut) VALUE('$userEmail', 1, '$currentTime')");
			print_r("credFail");	

		}else{

				$getInfoQuery = mysqli_query($con, "SELECT email, country, university FROM users");
					$rows = array();

					while($r = mysqli_fetch_assoc($getInfoQuery)){
						$rows[] = $r['email'];
						$rows[] = $r['country'];
						$rows[] = $r['university'];
					}

					$json = json_encode($rows);
					echo $json;
		}
	}

}else{
	print_r("credFail");
}
mysqli_close($con);













?>