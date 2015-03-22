<?php

require 'connector.php';

$postdata = file_get_contents("php://input");
$data = json_decode($postdata);

$course = $data->course;
$course = trim($course);
$course = mysqli_real_escape_string($con, $course);

$university = $data->university;
$university = trim($university);
$university = mysqli_real_escape_string($con, $university);

$usefulnessRating = $data->usefulnessRating;
$difficultyRating = $data->difficultyRating;

$lectureRating = $data->lectureRating;
$lectureComment = $data->lectureComment;
$lectureComment = trim($lectureComment);
$lectureComment = mysqli_real_escape_string($con, $lectureComment);
$lectureComment = htmlspecialchars($lectureComment, ENT_QUOTES);

$lessonRating = $data->lessonRating;
$lessonComment = $data->lessonComment;
$lessonComment = trim($lessonComment);
$lessonComment = mysqli_real_escape_string($con, $lessonComment);
$lessonComment = htmlspecialchars($lessonComment, ENT_QUOTES);

$examRating = $data->examRating;
$examComment = $data->examComment;
$examComment = trim($examComment);
$examComment = mysqli_real_escape_string($con, $examComment);
$examComment = htmlspecialchars($examComment, ENT_QUOTES);

$laboratoryRating = $data->laboratoryRating;
$laboratoryComment = $data->laboratoryComment;
$laboratoryComment = trim($laboratoryComment);
$laboratoryComment = mysqli_real_escape_string($con, $laboratoryComment);
$laboratoryComment = htmlspecialchars($laboratoryComment, ENT_QUOTES);

$seminarRating = $data->seminarRating;
$seminarComment =$data->seminarComment;
$seminarComment = trim($seminarComment);
$seminarComment = mysqli_real_escape_string($con, $seminarComment);
$seminarComment = htmlspecialchars($seminarComment, ENT_QUOTES);

$projectRating = $data->projectRating;
$projectComment = $data->projectComment;
$projectComment = trim($projectComment);
$projectComment = mysqli_real_escape_string($con, $projectComment);
$projectComment = htmlspecialchars($projectComment, ENT_QUOTES);

$homeassignmentRating = $data->homeassignmentRating;
$homeassignmentComment = $data->homeassignmentComment;
$homeassignmentComment = trim($homeassignmentComment);
$homeassignmentComment = mysqli_real_escape_string($con, $homeassignmentComment);
$homeassignmentComment = htmlspecialchars($homeassignmentComment, ENT_QUOTES);

$caseRating = $data->caseRating;
$caseComment = $data->caseComment;
$caseComment = trim($caseComment);
$caseComment = mysqli_real_escape_string($con, $caseComment);
$caseComment = htmlspecialchars($caseComment, ENT_QUOTES);

$userEmail = $data->userEmail;
$userEmail = trim($userEmail);
$userEmail = mysqli_real_escape_string($con, $userEmail);
$userEmail = htmlspecialchars($userEmail, ENT_QUOTES);

$year = $data->year;
$year = trim($year);
$year = mysqli_real_escape_string($con, $year);
$year = htmlspecialchars($year, ENT_QUOTES);

if($courseIdQuery = mysqli_query($con, "SELECT id FROM courses WHERE code ='$course' AND university ='$university'")){
	 
	$r = mysqli_fetch_assoc($courseIdQuery);
	$courseId = $r['id'];

	if($addReviewData = mysqli_query($con, "INSERT INTO courseInformation (usefulness, difficulty, lectureRating, lectureComment, lessonRating, lessonComment, laboratoryRating, laboratoryComment, seminarRating, seminarComment, projectRating, projectComment, homeassignmentRating, homeassignmentComment, examRating, examComment, caseRating, caseComment, reviewerEmail, year) 
		VALUES ('$usefulnessRating', '$difficultyRating', '$lectureRating', '$lectureComment', '$lessonRating', '$lessonComment', '$laboratoryRating', '$laboratoryComment', '$seminarRating', '$seminarComment', '$projectRating', '$projectComment', '$homeassignmentRating', '$homeassignmentComment', '$examRating', '$examComment', '$caseRating', '$caseComment', '$userEmail', '$year')")){

		if($addIdToCourseHandler = mysqli_query($con, "INSERT INTO courseHandler(courseID, courseInformationID) VALUES('$courseId', LAST_INSERT_ID())")){

		}else{
			print_r("addCourseFailed");
		}
	}else{
		print_r("addCourseFailed");
	}
	
}else{
	print_r("couldntFindCourse");
}

mysqli_close($con);

?>