<?php
require 'connector.php';

$postdata = file_get_contents("php://input");
$data = json_decode($postdata);

$university = $data->university;
$university = trim($university);
$university = mysqli_real_escape_string($con, $university);
$courseCode = $data->courseCode;
$courseCode = trim($courseCode);
$courseCode = mysqli_real_escape_string($con, $courseCode);
$courseCode = htmlspecialchars($courseCode, ENT_QUOTES);


$lectures = $data->course_part_lectures;
$lessons = $data->course_part_lessons;
$exam = $data->course_part_exam;
$laboratory = $data->course_part_laboratory;
$seminar = $data->course_part_seminar;
$project = $data->course_part_project;
$homeassignment = $data->course_part_homeassignment;
$case = $data->course_part_case;

$userEmail = $data->userEmail;
$userEmail = trim($userEmail);
$userEmail = mysqli_real_escape_string($con, $userEmail);


if(isset($university)){
	if(isset($courseCode)){

		$sql = "SELECT name FROM universities WHERE name='$university'";

		if($doesUniversityExist = mysqli_query($con, $sql)){

			$numberOfRows = mysqli_num_rows($doesUniversityExist);

			if($numberOfRows==1){

				$sql2 = "SELECT code FROM courses WHERE code='$courseCode'";

				$doesCourseAlreadyExist = mysqli_query($con, $sql2);

				$numRows = mysqli_num_rows($doesCourseAlreadyExist);

				if($numRows==1){
					print_r("courseAlreadyExist");
				}else{

				$result = mysqli_query($con, "INSERT INTO courses(university, code, hasLecture,
					hasLesson, hasExam, hasLaboratory, hasSeminar, hasProject, hasHomeassignment,
					hasCase, userEmail)
					VALUES ('$university', '$courseCode','$lectures', '$lessons', '$exam', 
					'$laboratory', '$seminar', '$project', '$homeassignment', '$case', '$userEmail')");

				print_r("courseAdded");
				}	
			}else{
				print_r("universityDoesNotExist");
			}
		}else{
			print_r("connectionError");
		}
	}else{
		print_r("courseIsEmpty");
	}	
}else{
	print_r("universityIsEmpty");
}	

mysqli_close($con);
?>