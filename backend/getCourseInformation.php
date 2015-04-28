<?php

require 'connector.php';

$courseName = $_GET['course'];
$courseName = trim($courseName);
$courseName = mysqli_real_escape_string($con, $courseName);
$courseName = htmlspecialchars($courseName, ENT_QUOTES);

$array = array(
	'Ratings' => array(),
	'Comments' => array(),
	'examComments' => array(),
	'lectureComments' => array(),
	'lessonComments' => array(),
	'labaratoryComments' => array(),
	'seminarComments' => array(),
	'projectComments' => array(),
	'homeassignmentComments' => array(),
	'caseComments' => array(),
	);


$result = mysqli_query($con, "SELECT AVG(cI.usefulness), AVG(cI.difficulty), AVG(cI.examRating), AVG(cI.lectureRating), AVG(cI.lessonRating),
	AVG(cI.laboratoryRating), AVG(cI.seminarRating), AVG(cI.projectRating),
	AVG(cI.homeassignmentRating), AVG(cI.caseRating)
	FROM courseInformation cI
	JOIN courseHandler cH ON (cI.id = cH.courseInformationID)
	JOIN courses c ON (cH.courseID = c.id)
	WHERE c.code = '$courseName'");

$examCommentQuery = mysqli_query($con, 
	"SELECT examComment, year 
	FROM courseInformation cI
	JOIN courseHandler cH ON (cI.id = cH.courseInformationID)
	JOIN courses c ON (cH.courseID = c.id)
	WHERE c.code = '$courseName'");
$lectureCommentQuery = mysqli_query($con, 
	"SELECT lectureComment, year 
	FROM courseInformation cI
	JOIN courseHandler cH ON (cI.id = cH.courseInformationID)
	JOIN courses c ON (cH.courseID = c.id)
	WHERE c.code = '$courseName'");
$lessonCommentQuery = mysqli_query($con, 
	"SELECT lessonComment, year 
	FROM courseInformation cI
	JOIN courseHandler cH ON (cI.id = cH.courseInformationID)
	JOIN courses c ON (cH.courseID = c.id)
	WHERE c.code = '$courseName'");
$laboratoryommentQuery = mysqli_query($con, 
	"SELECT laboratoryComment, year 
	FROM courseInformation cI
	JOIN courseHandler cH ON (cI.id = cH.courseInformationID)
	JOIN courses c ON (cH.courseID = c.id)
	WHERE c.code = '$courseName'");
$seminarCommentQuery = mysqli_query($con, 
	"SELECT seminarComment, year 
	FROM courseInformation cI
	JOIN courseHandler cH ON (cI.id = cH.courseInformationID)
	JOIN courses c ON (cH.courseID = c.id)
	WHERE c.code = '$courseName'");
$projectCommentQuery = mysqli_query($con, 
	"SELECT projectComment, year
	FROM courseInformation cI
	JOIN courseHandler cH ON (cI.id = cH.courseInformationID)
	JOIN courses c ON (cH.courseID = c.id)
	WHERE c.code = '$courseName'");
$homeassignmentCommentQuery = mysqli_query($con, 
	"SELECT homeassignmentComment, year 
	FROM courseInformation cI
	JOIN courseHandler cH ON (cI.id = cH.courseInformationID)
	JOIN courses c ON (cH.courseID = c.id)
	WHERE c.code = '$courseName'");
$caseCommentQuery = mysqli_query($con, 
	"SELECT caseComment, year 
	FROM courseInformation cI
	JOIN courseHandler cH ON (cI.id = cH.courseInformationID)
	JOIN courses c ON (cH.courseID = c.id)
	WHERE c.code = '$courseName'");


while ($row = mysqli_fetch_assoc($result)) {
	$array['Ratings'][0] = $row;
}


while($r = mysqli_fetch_assoc($examCommentQuery)){
	if(trim($r['examComment']) != ""){
		$array['examComments'][] = $r;
	}
}

while($r = mysqli_fetch_assoc($lectureCommentQuery)){
	if(trim($r['lectureComment']) != ""){
		$array['lectureComments'][] = $r;
	}
}

while($r = mysqli_fetch_assoc($lessonCommentQuery)){
	if(trim($r['lessonComment']) != ""){
		$array['lessonComments'][] = $r;
	}
}

while($r = mysqli_fetch_assoc($laboratoryommentQuery)){
	if(trim($r['laboratoryComment']) != ""){
		$array['laboratoryComments'][] = $r;
	}
}

while($r = mysqli_fetch_assoc($seminarCommentQuery)){
	if(trim($r['seminarComment']) != ""){
		$array['seminarComments'][] = $r;
	}	
}

while($r = mysqli_fetch_assoc($projectCommentQuery)){
	if(trim($r['projectComment']) != ""){
		$array['projectComments'][] = $r;
	}	
}

while($r = mysqli_fetch_assoc($homeassignmentCommentQuery)){
	if(trim($r['homeassignmentComment']) != ""){
		$array['homeassignmentComments'][] = $r;
	}
}

while($r = mysqli_fetch_assoc($caseCommentQuery)){
	if(trim($r['caseComment']) != ""){
		$array['caseComments'][] = $r;
	}
}



$json = json_encode($array);
echo $json;

mysqli_close($con);
?>

