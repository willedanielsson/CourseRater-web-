

courseApp.controller('navController', function($scope, $location, $timeout, $http, user){

	$scope.hideLoginDiv = function(){
		$scope.login_message = {
			'display': "none"
		};
	}

	$scope.hideLockedDiv = function(){
		$scope.locked_message = {
			'display': "none"
		};
	}

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

				if(response==="credFail"){
					$scope.login_message = {
						'display': "block"
					};
					$scope.locked_message = {
						'display': "none"
					};
					$timeout(function () {
						$scope.hideLoginDiv();
					}, 7000);

				}else if(response==="lockedOut"){

					$scope.locked_message = {
						'display': "block"
					};
					$scope.login_message = {
						'display': "none"
					};

					$timeout(function () {
						$scope.hideLockedDiv();
					}, 3000);

				}else{

					$scope.login_form = {
						'display': "none"
					};

					$scope.logged_in_box = {
						'display': "inline-block"
					};

					$scope.login_message = {
						'display': "none"
					};

					$scope.locked_message = {
						'display': "none"
					};

					user.email=response[0];
					user.country = response[1];
					user.university = response[2];

					$scope.userEmail = response[0];

				}

				

			});
		}	
	}

	$scope.logout = function(){

		$scope.login_form = {
			'display': "inline-block"
		};

		$scope.logged_in_box = {
			'display': "none"
		};
		user.email="";
		user.country="";
		user.university="";

		$scope.userEmail="";
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

		.when('/message/:type', {
			templateUrl : 'message.html',
			controller : 'messageController'
		})

		.when('/confirmation', {
			templateUrl : 'backend/confirmation.php'
		})

		.when('/about', {
			templateUrl : 'about.html',
			
		})

		.when('/contact', {
			templateUrl : 'contact.html',
			controller : 'contactController'
		})

		.when('/restorePass', {
			templateUrl : 'restorePass.html',
			controller : 'restorePassController'
		});

});

courseApp.controller('contactController', function($scope){
	$scope.message = 'Contact mee pleeaase';
});









