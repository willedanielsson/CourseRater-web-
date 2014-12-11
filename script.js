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

courseApp.controller('courseController', function($scope){
	$scope.message = 'Im the courses';
});

courseApp.controller('aboutController', function($scope){
	$scope.message = 'Im all about the bass';
});

courseApp.controller('contactController', function($scope){
	$scope.message = 'Contact mee pleeaase';
});








