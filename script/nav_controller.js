//Module
var courseApp = angular.module('courseApp', ['ngRoute']);

courseApp.controller('navController', function($scope, $location, $http){

	$scope.login_message="";

	$scope.isActive = function(route){
		return route === $location.path();
	}

	$scope.login = function(email, password){
		//if(email!==undefined || password!==undefined){
			var data = {
				'email': email,
				'password': password
			}

			$http.post("backend/login.php", data).success(function(response){
				if(response=="wrongVal"){
					$scope.login_message="Wrong Username or Password";
				}else if(response=="wrongVal2"){
					$scope.login_message="Wrong pass";
				}

				else if(response=="connectionFailed"){
					$scope.login_message="Connection failure";
				}else if(response=="emptyPassword"){
					$scope.login_message="Please enter a password";
				}else if(response=="emptyEmail"){
					$scope.login_message="Please enter an Email";
				}

				console.log(response);
			});
		/*}else{
			//Empty values, do nuttin
		}
		*/
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
			templateUrl : 'courses.html',
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








