<?php

require 'connector.php';

if($result = mysqli_query($con, "SELECT name FROM countries")){
	$rows = array();

	while($r = mysqli_fetch_assoc($result)){
		$rows[] = $r['name'];
	}

	$json = json_encode($rows);
	echo $json;
}else{
	print_r("getCountriesFailed");
}	

mysqli_close($con);
?>