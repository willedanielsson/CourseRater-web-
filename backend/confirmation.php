<?php
	require("connector.php");

	$passkey = $_GET['passkey'];


	$sql = "SELECT * FROM tempUsers WHERE confirm ='$passkey'";

	$result = mysqli_query($con, $sql);
	$numberOfRows = mysqli_num_rows($result);

	if($numberOfRows==1){
		$rows = mysqli_fetch_array($result);

		$email = $rows['email'];
		$password = $rows['password'];
		$country = $rows['country'];
		$university = $rows['university'];

		$insertUser = "INSERT INTO users (email, password, country, university) VALUES ('$email', '$password', '$country', '$university')";
		$res = mysqli_query($con, $insertUser);

		$sql3 = "DELETE FROM tempUsers WHERE confirm = '$passkey'";
		$result3 = mysqli_query($con, $sql3);
		header("Location: ..#/message/emailConfirmed");

	}else{
		header("Location: ..#/message/wrongCode");
	}

		

?>