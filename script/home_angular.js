 courseApp.controller('mainController', function($scope, $http){

 	$scope.message = 'Hello world';

 	$http.get("http://www.ashiya.se/app/getCountries.php").success(function(response){
		$scope.countries = response;
	});

 	$scope.getUniversities = function(country){
  		$http.get("http://www.ashiya.se/app/getUniversitiesForCountry.php?country="+country).success(function(response){
  			$scope.universities = response;
  		});
  	}


 });