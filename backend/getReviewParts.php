<?php

require 'connector.php';

$university = $_GET['university'];
$university = trim($university);
$university = mysqli_real_escape_string($con, $university);
$university = htmlspecialchars($university, ENT_QUOTES);

$course = $_GET['course'];
$course = trim($course);
$course = mysqli_real_escape_string($con, $course);
$course = htmlspecialchars($course, ENT_QUOTES);

if($result = mysqli_query($con, "SELECT hasLecture, hasLesson, hasExam, hasLaboratory, hasSeminar, hasProject, hasHomeassignment, hasCase 
	FROM courses WHERE code='$course' AND university='$university'")){

	$rows = array();
	while($r = mysqli_fetch_assoc($result)){
		$rows[] = $r['hasLecture'];
		$rows[] = $r['hasLesson'];
		$rows[] = $r['hasExam'];
		$rows[] = $r['hasLaboratory'];
		$rows[] = $r['hasSeminar'];
		$rows[] = $r['hasProject'];
		$rows[] = $r['hasHomeassignment'];
		$rows[] = $r['hasCase'];

	}
	$json = json_encode($rows);
	echo $json;
}else{
	print_r("getReviewFailed");
}
mysqli_close($con);

?>