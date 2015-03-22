<?php

require 'connector.php';

$course = $_POST['course'];
$university = $_POST['university'];
$usefulnessRating = $_POST['usefulnessRating'];
$difficultyRating = $_POST['difficultyRating'];
$lectureRating = $_POST['lectureRating'];
$lectureComment = $_POST['lectureComment'];
$lessonRating = $_POST['lessonRating'];
$lessonComment = $_POST['lessonComment'];
$examRating = $_POST['examRating'];
$examComment = $_POST['examComment'];
$laboratoryRating = $_POST['laboratoryRating'];
$laboratoryComment = $_POST['laboratoryComment'];
$seminarRating = $_POST['seminarRating'];
$seminarComment = $_POST['seminarComment'];
$projectRating = $_POST['projectRating'];
$projectComment = $_POST['projectComment'];
$homeassignmentRating = $_POST['homeassignmentRating'];
$homeassignmentComment = $_POST['homeassignmentComment'];
$caseRating = $_POST['caseRating'];
$caseComment = $_POST['caseComment'];

$courseIdQuery = mysqli_query($con, "SELECT id FROM courses WHERE code ='$course' AND university ='$university'");
 
$r = mysqli_fetch_assoc($courseIdQuery);
$courseId = $r['id'];

echo $courseId;

$addReviewData = mysqli_query($con, "INSERT INTO courseInformation (usefulness, difficulty, lectureRating, lectureComment, lessonRating, lessonComment, laboratoryRating, laboratoryComment, seminarRating, seminarComment, projectRating, projectComment, homeassignmentRating, homeassignmentComment, examRating, examComment, caseRating, caseComment) 
	VALUES ('$usefulnessRating', '$difficultyRating', '$lectureRating', '$lectureComment', '$lessonRating', '$lessonComment', '$laboratoryRating', '$laboratoryComment', '$seminarRating', '$seminarComment', '$projectRating', '$projectComment', '$homeassignmentRating', '$homeassignmentComment', '$examRating', '$examComment', '$caseRating', '$caseComment')");

$addIdToHandler = mysqli_query($con, "INSERT INTO courseHandler(courseID, courseInformationID) VALUES('$courseId', LAST_INSERT_ID())");


mysqli_close($con);

?>