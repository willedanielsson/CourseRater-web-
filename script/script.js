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

		.when('/message', {
			templateUrl : 'message.php',
			controller : 'messageController'
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








