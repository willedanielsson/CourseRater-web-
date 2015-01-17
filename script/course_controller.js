courseApp.controller('courseController', function($scope, $http, user){

	$scope.warning = "";

	if(user.country==""){
		$scope.preCountry = "Select Country";
	}else{
		$scope.preCountry = user.country;
		$scope.styleSelectUniversity = {
  			'pointer-events':"visible",
  			'background-color': "#fff"
  		}
	}

	if(user.university==""){
		$scope.preUniversity = "Select University";
	}else{
		$scope.preUniversity = user.university;
		$scope.styleSelectCourse = {
  			'pointer-events':"visible",
  			'background-color': "#fff"
  		}
  		$http.get("backend/getCoursesForUniversity.php?chosenUniversity="+user.university).success(function(response){
			$scope.courses = response;
		});
	}
	
	$http.get("backend/getCountries.php").success(function(response){
		if(response=="getCountriesFailed"){
			$scope.warning="Failed to retrieve countries, please refresh!";
		}else{
			$scope.countries = response;
		}
	});

	$scope.page = 'def';

	$scope.showRatingAdded = function(){
		$scope.page = 'rating_added';
	}

	$scope.showCourseAdded = function(){
		$scope.page = 'course_added';
	}




  	$scope.getUniversities = function(country){
  		$http.get("backend/getUniversitiesForCountry.php?country="+country).success(function(response){
  			$scope.universities = response;
  		});

  		// When a country has been chosen, show that the university-list is unlocked
  		$scope.styleSelectUniversity = {
  			'pointer-events':"visible",
  			'background-color': "#fff"
  		}
	}

	$scope.getCourses = function(university){
		$http.get("backend/getCoursesForUniversity.php?chosenUniversity="+university).success(function(response){
			$scope.courses = response;
		})
		// When a university has been chosen, show that the course-list is unlocked
		$scope.styleSelectCourse = {
  			'pointer-events':"visible",
  			'background-color': "#fff"
  		}
	}

	$scope.addReview = function(course, university){
		if(user.email!=""){
			$scope.page="addReview"
			$scope.course = course;
			$scope.university = university;
			$scope.add_review_message = {
				'display': "none"
			};
		}else{
			$scope.add_review_message = {
				'display': "inline-block"
			};
		}	
	} 
	
	$scope.addCourse = function(){
		if(user.email!=""){	
			$scope.page='addCourse';
			$scope.message="";
			$scope.add_course_warning_text = {
				'display': "none"
			};
		}else{
			$scope.add_course_warning_text = {
				'display': "block"
			};
		}
	}   


	$scope.getCourseInformation = function(course){

		if(course!==undefined){

			//When pressed 'View Course', we display the ratings by default

			$scope.course = course;
			$http.get("backend/getCourseInformation.php?course="+course).success(function(response){

				//Check if there is no ratings
				if(response.Ratings[0]['AVG(cI.usefulness)']==null ||
					response.Ratings[0]['AVG(cI.difficulty)']== null){
					// No ratings
					$scope.warning = "No one has rated this course yet!";
				}
					$scope.page='view';

				//Give the ratings their needed data
				$scope.courseInformation = response;

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
		}else{

		}

	}

});


