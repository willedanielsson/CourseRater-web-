<?php
require 'connector.php';

$university = $_POST['university'];
$courseCode = $_POST['courseCode'];
$hasLecture = $_POST['hasLecture'];
$hasLesson = $_POST['hasLesson'];
$hasExam = $_POST['hasExam'];
$hasLaboratory = $_POST['hasLaboratory'];
$hasSeminar = $_POST['hasSeminar'];
$hasProject = $_POST['hasProject']; 
$hasHomeassignment = $_POST['hasHomeassignment'];
$hasCase = $_POST['hasCase'];


/* Convert boolean values to tinyint for MYSQL*/
if($hasLecture=='true'){
	$hasLecture=1;
}else{
	$hasLecture=0;
}

if($hasLesson=='true'){
	$hasLesson=1;
}else{
	$hasLesson=0;
}

if($hasExam=='true'){
	$hasExam=1;
}else{
	$hasExam=0;
}

if($hasLaboratory=='true'){
	$hasLaboratory=1;
}else{
	$hasLaboratory=0;
}

if($hasSeminar=='true'){
	$hasSeminar=1;
}else{
	$hasSeminar=0;
}
if($hasProject=='true'){
	$hasProject=1;
}else{
	$hasProject=0;
}

if($hasHomeassignment=='true'){
	$hasHomeassignment=1;
}else{
	$hasHomeassignment=0;
}

if($hasCase=='true'){
	$hasCase=1;
}else{
	$hasCase=0;
}

$doesUniversityExist = mysqli_query($con, "SELECT name FROM universities WHERE name='$university'");

$numberOfRows = mysqli_num_rows($doesUniversityExist);

if($numberOfRows==1){
	$result = mysqli_query($con, "INSERT INTO courses(university, code, hasLecture,
		hasLesson, hasExam, hasLaboratory, hasSeminar, hasProject, hasHomeassignment,
		hasCase) 
		VALUES ('$university', '$courseCode','$hasLecture', '$hasLesson', '$hasExam', 
		'$hasLaboratory', '$hasSeminar', '$hasProject', '$hasHomeassignment', '$hasCase')");
}else{

}


mysqli_close($con);
?>