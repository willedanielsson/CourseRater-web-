 courseApp.controller('courseController', function($scope, $http){


	$http.get("http://www.ashiya.se/app/getCountries.php").success(function(response){
		$scope.countries = response;
	});

  	$scope.getUniversities = function(country){
  		console.log("Valde"+country);
  		$http.get("http://www.ashiya.se/app/getUniversitiesForCountry.php?country="+country).success(function(response){
  			$scope.universities = response;
  		});
  		$scope.styleSelectUniversity = {
  			'pointer-events':"visible",
  			'border': "2px solid green"
  		}
	}

	$scope.getCourses = function(university){
		console.log("Valde university"+university);
		$http.get("http://www.ashiya.se/app/getCoursesForUniversity.php?chosenUniversity="+university).success(function(response){
			$scope.courses = response;
		})

		$scope.styleSelectCourse = {
  			'pointer-events':"visible",
  			'border': "2px solid green"
  		}
	}

	$scope.clickedCourse = function(){
		console.log("Chose a course");
		$scope.styleViewCourseButton = {
			'border': "2px solid green"
		}
		var button = angular.element(document.querySelector( '#view_course_button' ) );
		button.removeAttr('disabled');
	}

	$scope.click = function(){
		console.log("Button click");
	}


	
});