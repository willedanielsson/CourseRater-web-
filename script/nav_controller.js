//Module
var courseApp = angular.module('courseApp', ['ngRoute']);

courseApp.controller('navController', function($scope, $location, $http){

	$scope.login_message="";

	$scope.isActive = function(route){
		return route === $location.path();
	}

	$scope.login = function(email, password){
		if(email!==undefined || password!==undefined){
			var data = {
				'email': email,
				'password': password
			}

			$http.post("backend/login.php", data).success(function(response){
				if(response=="failed"){

				}else{
					//Login success
					var user = response;

					$scope.login_form = {
						'display': "none"
					};

					$scope.logged_in_box = {
						'display': "inline-block"
					};

					$scope.userEmail = user;
				}
			});
		}	
	}

});

// Configure the routes
courseApp.config(function($routeProvider){
	$routeProvider

		//route for Home page
		.when('/', {
			templateUrl : 'home.html',
			controller : 'homeController'
		})

		//route for courses
		.when('/courses', {
			templateUrl : 'courses.php',
			controller : 'courseController'
		})

		.when('/message', {
			templateUrl : 'message.php',
			controller : 'messageController'
		})

		.when('/confirmation', {
			templateUrl : 'backend/confirmation.php'
		})

		.when('/contact', {
			templateUrl : 'contact.html',
			controller : 'contactController'
		});
});


courseApp.controller('messageController', function($scope){
	$scope.message = 'Im all about the bass';
});

courseApp.controller('contactController', function($scope){
	$scope.message = 'Contact mee pleeaase';
});








