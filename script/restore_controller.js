courseApp.controller('restorePassController', function($scope, $http){

	
	$scope.message = "New Password";

	$scope.restorePass = function(email, pass, re_pass){
		if(pass.length>7){
			if(pass==re_pass){
				var data = {
					'email': email,
					'pass': pass
				}
				$http.post("backend/restorePassword.php", data).success(function(response){
		  			if(response=="succes"){
		  				$scope.warning = "A confirmation email has been sent!"
		  			}else if(response=="connectionError"){
		  				$scope.warning="Connection error";
		  			}else if(response=="noUser"){
		  				$scope.warning="User Does not exist!";
		  			}
		  		});
			}else{
				$scope.warning="Passwords didn't match!";
			}
		}else{
			$scope.warning="Choose a stronger password!";
		}
	}
});