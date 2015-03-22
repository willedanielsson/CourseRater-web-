<?php

require 'connector.php';

$chosenUniversity = $_GET['chosenUniversity'];
$chosenUniversity = trim($chosenUniversity);
$chosenUniversity = mysqli_real_escape_string($con, $chosenUniversity);
$chosenUniversity = htmlspecialchars($chosenUniversity, ENT_QUOTES);


if($result = mysqli_query($con, "SELECT code FROM courses WHERE university='$chosenUniversity'")){

	while($r = mysqli_fetch_assoc($result)){
	    $rows[] = $r['code'];
	}

	$json = json_encode($rows);
	echo $json;
}else{
	print_r("getCourseFailed");
}


mysqli_close($con);
?>