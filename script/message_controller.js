courseApp.controller('messageController', function($scope, $http, $routeParams){

	var input = $routeParams.type;
	console.log(input);

	if(input=="emailConfirmed"){
		$scope.message="Your account has been activated!";
	}else if(input=="wrongCode"){
		$scope.message="The activation failed, your activation code was incorrent!";
	}else if(input=="passChanged"){
		$scope.message="Your password has been restored!";
	}else if(input=="error"){
		$scope.message="Something went wrong!";
	}else if(input=="notForgotten"){
		$scope.message="You haven't told us that you have forgotten your password";
	}

});
