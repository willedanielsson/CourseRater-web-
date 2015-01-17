courseApp.controller('addCourseController', function($scope, $http, user){

	if(user.country==""){
		$scope.preCountry = "Select Country";
	}else{
		$scope.preCountry = user.country;
		$scope.styleSelectUniversity = {
  			'pointer-events':"visible",
  			'background-color': "#fff"
  		}
	}

	if(user.university==""){
		$scope.preUniversity = "Select University";
	}else{
		$scope.preUniversity = user.university;
		$scope.styleSelectCourse = {
  			'pointer-events':"visible",
  			'background-color': "#fff"
  		}

	}

	$scope.submitCourse = function(university, course, lectures, lessons, exam, lab, seminar, project, home, casep){
		if(university!==undefined || course!==undefined){
			if(lectures==true){
				lectures=1;
			}else{
				lectures=0;
			}

			if(lessons==true){
				lessons=1;
			}else{
				lessons=0;
			}

			if(exam==true){
				exam=1;
			}else{
				exam=0;
			}

			if(lab==true){	
				lab=1;
			}else{
				lab=0;
			}

			if(seminar==true){
				seminar=1;
			}else{
				seminar=0;
			}

			if(project==true){
				project=1;
			}else{
				project=0;
			}

			if(home==true){
				home=1;
			}else{
				home=0;
			}

			if(casep==true){
				casep=1;
			}else{
				casep=0;
			}

			var data = {
				'university': university,
				'courseCode': course,
				'course_part_lectures': lectures,
				'course_part_lessons': lessons,
				'course_part_exam': exam,
				'course_part_laboratory': lab,
				'course_part_seminar': seminar,
				'course_part_project': project,
				'course_part_homeassignment': home,
				'course_part_case': casep,
				'userEmail': user.email
			};


			$http.post("backend/addCourseWeb.php", data).success(function(response){	
				if(response=="courseAlreadyExist"){
					$scope.message="That course already exists!";

				}else if(response=="universityDoesNotExist"){
					$scope.message="Strange. That university does not seem to exist!";

				}else if(response=="connectionError"){
					$scope.message="Could not connect to the database!";

				}else if(response=="courseIsEmpty"){
					$scope.message="What is the code for the course?";

				}else if(response=="universityIsEmpty"){
					$scope.message="You have to choose a university!";

				}else if(response=="courseAdded"){
					$scope.showCourseAdded();
				}
       	 	});
		}
	}

});