courseApp.controller('courseController', function($scope, $http){

	$http.get("http://www.ashiya.se/Develop/CourseRaterWeb/Production/getCountries.php").success(function(response){
		$scope.countries = response;
	});

	$scope.page = 'def';
	//$scope.parts=['Lectures', 'Lessons', 'Exam', 'Laboratory', 'Seminar', 'Project', 'Case'];


  	$scope.getUniversities = function(country){
  		$http.get("http://www.ashiya.se/Develop/CourseRaterWeb/Production/getUniversitiesForCountry.php?country="+country).success(function(response){
  			$scope.universities = response;
  		});

  		// When a country has been chosen, show that the university-list is unlocked
  		$scope.styleSelectUniversity = {
  			'pointer-events':"visible",
  			'background-color': "#fff"
  		}
	}

	$scope.getCourses = function(university){
		$http.get("http://www.ashiya.se/Develop/CourseRaterWeb/Production/getCoursesForUniversity.php?chosenUniversity="+university).success(function(response){
			$scope.courses = response;
		})
		// When a university has been chosen, show that the course-list is unlocked
		$scope.styleSelectCourse = {
  			'pointer-events':"visible",
  			'background-color': "#fff"
  		}
	}

	$scope.clickedCourse = function(){

		// When a course has been chosen, display that the 'View Course'-button can be clicked
		$scope.styleViewCourseButton = {
			'border': "2px solid green"
		}
		var button = angular.element(document.querySelector( '#view_course_button' ) );
		button.removeAttr('disabled');
	}


	$scope.addCourse = function(){
			$scope.page='addCourse';
			$scope.message="";
	}

	$scope.submitCourse = function(university, course, lectures, lessons, exam, lab, seminar, project, home, casep){
		if(university!==undefined || course!==undefined){
			if(lectures==true){
				lectures=1;
			}else{
				lectures=0;
			}

			if(lessons==true){
				lessons=1;
			}else{
				lessons=0;
			}

			if(exam==true){
				exam=1;
			}else{
				exam=0;
			}

			if(lab==true){	
				lab=1;
			}else{
				lab=0;
			}

			if(seminar==true){
				seminar=1;
			}else{
				seminar=0;
			}

			if(project==true){
				project=1;
			}else{
				project=0;
			}

			if(home==true){
				home=1;
			}else{
				home=0;
			}

			if(casep==true){
				casep=1;
			}else{
				casep=0;
			}

			var data = {
				'university': university,
				'courseCode': course,
				'course_part_lectures': lectures,
				'course_part_lessons': lessons,
				'course_part_exam': exam,
				'course_part_laboratory': lab,
				'course_part_seminar': seminar,
				'course_part_project': project,
				'course_part_homeassignment': home,
				'course_part_case': casep
			};


			$http.post("backend/addCourseWeb.php", data).success(function(response){	
				console.log(response);
				if(response=="courseAlreadyExist"){
					$scope.message="That course already exists!";

				}else if(response=="universityDoesNotExist"){
					$scope.message="Strange. That university does not seem to exist!";

				}else if(response=="connectionError"){
					$scope.message="Could not connect to the database!";

				}else if(response=="courseIsEmpty"){
					$scope.message="What is the code for the course?";

				}else if(response=="universityIsEmpty"){
					$scope.message="You have to choose a university!";

				}else if(response=="courseAdded"){
				$scope.message="Course added!";	
				}
       	 	});
		}
	}

	$scope.addReview = function(course, university){
		$scope.page="addReview"
		//$scope.course = course;
		//$scope.university = university;
		$scope.course="TANA21";
		$scope.university = "Linköpings tekniska högskola";
		$scope.message_review="";

	}

	$scope.getCourseInformation = function(course, value){

		//When pressed 'View Course', we display the ratings by default
		$scope.page='view';

		$scope.course = course;
		$http.get("http://localhost:8888/Test/getCourseInformation.php?chosenCourse="+course).success(function(response){

			//Give the ratings their needed data
			$scope.courseInformation = response;
			console.log(response);

			var averageRating = 0;
			var numberOfParts = 0;
			if(response.Ratings[0]['AVG(cI.usefulness)'] > 0){
				var usefulnessPercent = (response.Ratings[0]['AVG(cI.usefulness)'])*20;
				averageRating = averageRating + (response.Ratings[0]['AVG(cI.usefulness)']*1);
				numberOfParts++;
				$scope.usefulness_bar = {
					'width' : usefulnessPercent+"%"
				}
			}else{
				$scope.usefulness_style = {
					'display' : "none"
				}
			}

			if(response.Ratings[0]['AVG(cI.difficulty)'] > 0){
				var difficultyPercent = (response.Ratings[0]['AVG(cI.difficulty)'])*20;
				averageRating = averageRating + (response.Ratings[0]['AVG(cI.difficulty)']*1);
				numberOfParts++;
				$scope.difficulty_bar = {
					'width' : difficultyPercent+"%"
				}
			}else{
				$scope.difficulty_style = {
					'display' : "none"
				}

			}

			if(response.Ratings[0]['AVG(cI.examRating)'] > 0){
				var examPercent = (response.Ratings[0]['AVG(cI.examRating)'])*20;
				averageRating = averageRating + (response.Ratings[0]['AVG(cI.examRating)']*1);
				numberOfParts++;
				$scope.exam_bar = {
					'width' : examPercent+"%"
				}
			}else{
				$scope.exam_style = {
					'display' : "none"
				}
			}

			if(response.Ratings[0]['AVG(cI.lectureRating)'] > 0){
				var lecturePercent = (response.Ratings[0]['AVG(cI.lectureRating)'])*20;
				averageRating = averageRating + (response.Ratings[0]['AVG(cI.lectureRating)']*1);
				numberOfParts++;
				$scope.lecture_bar = {
					'width' : lecturePercent+"%"
				}
			}else{
				$scope.lecture_style = {
					'display' : "none"
				}
			}

			if(response.Ratings[0]['AVG(cI.lessonRating)'] > 0){
				var lessonPercent = (response.Ratings[0]['AVG(cI.lessonRating)'])*20;
				averageRating = averageRating + (response.Ratings[0]['AVG(cI.lessonRating)']*1);
				numberOfParts++;
				$scope.lesson_bar = {
					'width' : lessonPercent+"%"
				}
			}else{
				$scope.lesson_style = {
					'display' : "none"
				}
			}

			if(response.Ratings[0]['AVG(cI.laboratoryRating)'] > 0){
				var laboratoryPercent = (response.Ratings[0]['AVG(cI.laboratoryRating)'])*20;
				averageRating = averageRating + (response.Ratings[0]['AVG(cI.laboratoryRating)']*1);
				numberOfParts++;
				$scope.laboratory_bar = {
					'width' : laboratoryPercent+"%"
				}
			}else{
				$scope.laboratory_style = {
					'display' : "none"
				}
			}

			if(response.Ratings[0]['AVG(cI.seminarRating)'] > 0){
				var seminarPercent = (response.Ratings[0]['AVG(cI.seminarRating)'])*20;
				averageRating = averageRating + (response.Ratings[0]['AVG(cI.seminarRating)']*1);
				numberOfParts++;
				$scope.seminar_bar = {
					'width' : seminarPercent+"%"
				}
			}else{
				$scope.seminar_style = {
					'display' : "none"
				}
			}

			if(response.Ratings[0]['AVG(cI.projectRating)'] > 0){
				var projectPercent = (response.Ratings[0]['AVG(cI.projectRating)'])*20;
				averageRating = averageRating + (response.Ratings[0]['AVG(cI.projectRating)']*1);
				numberOfParts++;
				$scope.project_bar = {
					'width' : projectPercent+"%"
				}
			}else{
				$scope.project_style={
					'display' : "none"
				}
			}

			if(response.Ratings[0]['AVG(cI.homeassignmentRating)'] > 0){
				var homePercent = (response.Ratings[0]['AVG(cI.homeassignmentRating)'])*20;
				averageRating = averageRating + (response.Ratings[0]['AVG(cI.homeassignmentRating)']*1);
				numberOfParts++;
				$scope.homeassignment_bar = {
					'width' : homePercent+"%"
				}
			}else{
				$scope.homeassignment_style = {
					'display' : "none"
				}
			}

			if(response.Ratings[0]['AVG(cI.caseRating)'] > 0){
				var casePercent = (response.Ratings[0]['AVG(cI.caseRating)'])*20;
				averageRating = averageRating + (response.Ratings[0]['AVG(cI.caseRating)']*1);
				numberOfParts++;
				$scope.case_bar = {
					'width' : casePercent+"%"
				}
			}else{
				$scope.case_style = {
					'display' : "none"
				}
			}
			
			$scope.generalRating = averageRating/numberOfParts;

		});
	}

	

});


