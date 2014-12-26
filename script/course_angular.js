 courseApp.controller('courseController', function($scope, $http){

	$http.get("http://www.ashiya.se/app/getCountries.php").success(function(response){
		$scope.countries = response;
	});

  	$scope.getUniversities = function(country){
  		$http.get("http://www.ashiya.se/app/getUniversitiesForCountry.php?country="+country).success(function(response){
  			$scope.universities = response;
  		});

  		// When a country has been chosen, show that the university-list is unlocked
  		$scope.styleSelectUniversity = {
  			'pointer-events':"visible",
  			'border': "2px solid green"
  		}
	}

	$scope.getCourses = function(university){
		$http.get("http://www.ashiya.se/app/getCoursesForUniversity.php?chosenUniversity="+university).success(function(response){
			$scope.courses = response;
		})
		// When a university has been chosen, show that the course-list is unlocked
		$scope.styleSelectCourse = {
  			'pointer-events':"visible",
  			'border': "2px solid green"
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

	$scope.getComments = function(boolean, part){
		console.log(part)
		if(part=="exam"){
			$scope.custom = true;
		}
		if(part=="lectures"){
			$scope.custom = true;
		}	
		
	}

	$scope.getCourseInformation = function(course, ratings_or_comments){

		//When pressed 'View Course', we display the ratings by default
		$scope.ratings_or_comments = ratings_or_comments;

		$scope.course = course;
		$http.get("http://www.ashiya.se/app/getCourseInformation.php?chosenCourse="+course).success(function(response){

			//Give the ratings their needed data
			$scope.courseInformation = response;
			console.log(response);

			if(response.Ratings[0]['AVG(cI.usefulness)'] > 0){
				var usefulnessPercent = (response.Ratings[0]['AVG(cI.usefulness)'])*20;
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
				$scope.case_bar = {
					'width' : casePercent+"%"
				}
			}else{
				$scope.case_style = {
					'display' : "none"
				}
			}

		});
	}

	

});


