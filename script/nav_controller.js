courseApp.controller('navController', function($scope, $location, $timeout, $http, user, ipCookie){
	if(ipCookie('email')!==undefined){

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

		$scope.userEmail = ipCookie('email');

	}

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

					ipCookie('email', response[0], {expires: 10});
					ipCookie('country', response[1], {expires: 10});
					ipCookie('university', response[2], {expires: 10});

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
		
		ipCookie.remove('email');
		ipCookie.remove('country');
		ipCookie.remove('university');

		$scope.userEmail="";
	}

});

// Configure the routes
courseApp.config(function($routeProvider, $locationProvider){
	$routeProvider

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

		//$locationProvider.html5Mode(true);

});

courseApp.controller('contactController', function($scope){
});









