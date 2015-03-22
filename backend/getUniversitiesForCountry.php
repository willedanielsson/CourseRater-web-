<?php

require 'connector.php';

$country = $_GET['country'];
$country = trim($country);
$country = mysqli_real_escape_string($con, $country);
$country = htmlspecialchars($country, ENT_QUOTES);

$result = mysqli_query($con, "SELECT u.name FROM universities u
							JOIN countries c ON (u.country_id = c.id)
							WHERE c.name = '$country'");

	$rows = array();

	while($r = mysqli_fetch_assoc($result)){
		$rows[] = $r['name'];
	}
	$json = json_encode($rows);
	echo $json;


mysqli_close($con);

?>