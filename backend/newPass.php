<?php
	require("connector.php");

	$passkey = $_GET['passkey'];

	$sql = "SELECT * FROM forgotPass WHERE confirm ='$passkey'";

	$result = mysqli_query($con, $sql);
	$numberOfRows = mysqli_num_rows($result);

	if($numberOfRows==1){
		$rows = mysqli_fetch_array($result);

		$email = $rows['email'];
		$password = $rows['pass'];	

		if($result2 = mysqli_query($con, "UPDATE users SET password='$password' WHERE email='$email'")){
			header("Location: ..#/message/passChanged");
			$password=null;
		}else{
			header("Location: ..#/message/error");
			$password=null;
		}

	}else{
		header("Location: ..#/message/notForgotten");
	}


?>