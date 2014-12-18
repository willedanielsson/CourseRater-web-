 courseApp.controller('courseController', function($scope, $http){


	$http.get("http://www.ashiya.se/app/getCountries.php").success(function(response){
		$scope.countries = response;
	});

  	$scope.getUniversities = function(country){
  		$http.get("http://www.ashiya.se/app/getUniversitiesForCountry.php?country="+country).success(function(response){
  			$scope.universities = response;
  		});
  		$scope.styleSelectUniversity = {
  			'pointer-events':"visible",
  			'border': "2px solid green"
  		}
	}

	$scope.getCourses = function(university){
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

	$scope.getCourseInformation = function(course){
		$http.get("http://www.ashiya.se/app/getCourseInformation.php?chosenCourse="+course).success(function(response){
			//var caseR = response.Ratings[0]['AVG(cI.usefulness)'];
			//console.log(caseR);

			$scope.courseInformation = response;
			$scope.course = course;

			console.log(response.Ratings[0]);
		});
	}


	
});