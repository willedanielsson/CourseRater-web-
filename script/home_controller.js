courseApp.controller('homeController', function($scope, $http, ipCookie){
    $scope.message_register="";


    $http.get("backend/getCountries.php").success(function(response){
        if(response=="getCountriesFailed"){
            $scope.message_register="Failed to retrieve countries, please refresh!";
        }else{
            $scope.countries = response;
        }
    });

    $scope.getUniversities = function(country){
        $http.get("backend/getUniversitiesForCountry.php?country="+country).success(function(response){      
        $scope.universities = response;
            
        });
    }

    $scope.registerUser = function(email, country, university, pass, rePass){
        if(email!=undefined && country!=undefined && university!=undefined && pass!=undefined && rePass!=undefined){
    
            if(pass.length>7){
                if(pass!==rePass){
                $scope.message_register="Passwords does not match";
            }else{
                $scope.message_register="";

                var data = {
                    'email': email,
                    'country': country,
                    'university': university,
                    'password': pass,
                    'repassword': rePass
                };

                $http.post("backend/register.php", data).success(function(response){
        
                    if(response=="userExist"){
                        $scope.message_register="This email already has an account";

                    }else if(response=="notConfirmed"){
                        $scope.message_register="You have not activated your account, check your mail";

                    }else if(response=="emailFailed"){
                        $scope.message_register="Failed to send activation email";

                    }else if(response=="emailSent"){
                        $scope.message_register="Activation email sent! The email can be placed in your junk folder";

                    }else if(response=="connectionFailed"){
                        $scope.message_register="Failed to connect to server";

                    }
                });
            }
          }else{
              $scope.message_register="Choose a stronger password!";
          }
      }        
  }

});