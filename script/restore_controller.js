courseApp.controller('restorePassController', function($scope, $http){
	$scope.message = "LEST RESTORE";

	$scope.restorePass = function(email, pass, re_pass){
		if(pass==re_pass){
			var data = {
				'email': email,
				'pass': pass
			}
			$http.post("backend/restorePassword.php", data).success(function(response){
	  			if(response=="succes"){
	  				console.log("Added");
	  			}else if(response=="connectionError"){
	  				console.log("Connection error");
	  			}else if(response=="noUser"){
	  				console.log("User Does not exist");
	  			}
	  		});
		}else{
			//DEVELOP
		}
	}
});