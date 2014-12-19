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

	$scope.getCourseInformation = function(course, ratings_or_comments){

		//When pressed 'View Course', we display the ratings by default
		$scope.ratings_or_comments = ratings_or_comments;

		$scope.course = course;
		$http.get("http://www.ashiya.se/app/getCourseInformation.php?chosenCourse="+course).success(function(response){

			//Give the ratings their needed data
			$scope.courseInformation = response;

			console.log(response.Ratings[0]);
		});
	}

	

});

courseApp.controller('course_information_controller', function($scope){

	$scope.getComments = function(){
		console.log("Click");
	}

});

