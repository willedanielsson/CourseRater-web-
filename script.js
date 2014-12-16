//Module
var courseApp = angular.module('courseApp', ['ngRoute']);

courseApp.controller('NavController', function($scope, $location){
	$scope.isActive = function(route){
		return route === $location.path();
	}
});

// Configure the routes
courseApp.config(function($routeProvider){
	$routeProvider

		//route for Home page
		.when('/', {
			templateUrl : 'home.html',
			controller : 'mainController'
		})

		//route for courses
		.when('/courses', {
			templateUrl : 'courses.html',
			controller : 'courseController'
		})

		.when('/about', {
			templateUrl : 'about.html',
			controller : 'aboutController'
		})

		.when('/contact', {
			templateUrl : 'contact.html',
			controller : 'contactController'
		});
});

//Controller
courseApp.controller('mainController', function($scope){
	//Test
	$scope.message = 'Hello world';
});

 courseApp.controller('courseController', function($scope, $http){
	console.log("Går in i CourseController");
	$scope.message = "Im the courses";


	$http.get("http://www.ashiya.se/app/getCountries.php").success(function(response){
		console.log("Använder getCountries");
		$scope.countries = response;
	});

  	$scope.getUniversities = function(country){
  		console.log("Valde"+country);
  		$http.get("http://www.ashiya.se/app/getUniversitiesForCountry.php?country="+country).success(function(response){
  			console.log(response);
  			console.log("Hämtar unviersitet för"+country);
  			$scope.universities = response;
  		});
	}

	$scope.getCourses = function(university){
		console.log("Valde university"+university);
		$http.get("http://www.ashiya.se/app/getCoursesForUniversity.php?chosenUniversity="+university).success(function(response){
			console.log(response);
			console.log("Hämtar kurser för"+university);
			$scope.courses = response;
		})
	}

	$scope.click = function(){
		console.log("Button click");
	}


	
});
/*

courseApp.controller('courseController', function($scope){
	$scope.message = 'Im the courses';

});

courseApp.controller('courseController', function($scope, $http){
	$http.get("http://localhost:8888/Production/getCountries.php")
	.success(function(response){
		$scope.countries = response;
	});
});
*/

courseApp.controller('aboutController', function($scope){
	$scope.message = 'Im all about the bass';
});

courseApp.controller('contactController', function($scope){
	$scope.message = 'Contact mee pleeaase';
});








