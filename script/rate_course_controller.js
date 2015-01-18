courseApp.controller('rateCourseController', function($scope, $http, ipCookie){

    $scope.years=[
        '2015',
        '2014',
        '2013',
        '2012',
        '2011',
        '2010',
        '2009',
        '2008'
    ];

	// Get values of chosen course to check which parts that is in the course
    var university;
    if($scope.preUniversity==undefined){
        university = $scope.university;
    }else{
        university = $scope.preUniversity;
    }
      
    var course = $scope.course;


    $http.get("backend/getReviewParts.php?university="+university+"&course="+course).success(function(response){

        $scope.reviewParts = response;

        if($scope.reviewParts[0]==1){
            var lecturesObject = {
                current: 1,
                name: "Lectures",
                comment: "",
                max: 5
            };
            $scope.ratings.push(lecturesObject);
        }

        if($scope.reviewParts[1]==1){
            var lessonsObject = {
                current: 1,
                name: "Lessons",
                comment: "",
                max: 5
            };
            $scope.ratings.push(lessonsObject);
        }

        if($scope.reviewParts[2]==1){
            var examObject = {
                current: 1,
                name: "Exam",
                comment: "",
                max: 5
            };
            $scope.ratings.push(examObject);
        }

        if($scope.reviewParts[3]==1){
            var laboratoryObject = {
                current: 1,
                name: "Laboratory",
                comment: "",
                max: 5
            };
            $scope.ratings.push(laboratoryObject);
        }

        if($scope.reviewParts[4]==1){
            var seminarObject = {
                current: 1,
                name: "Seminar",
                comment: "",
                max: 5
            };
            $scope.ratings.push(seminarObject);
        }

        if($scope.reviewParts[5]==1){
            var projectObject = {
                current: 1,
                name: "Project",
                comment: "",
                max: 5
            };
            $scope.ratings.push(projectObject);
        }

        if($scope.reviewParts[6]==1){
            var homeassignmentObject = {
                current: 1,
                name: "Homeassignment",
                comment: "",
                max: 5
            };
            $scope.ratings.push(homeassignmentObject);
        }

        if($scope.reviewParts[7]==1){
            var caseObject = {
                current: 1,
                name: "Case",
                comment: "",
                max: 5
            };
            $scope.ratings.push(caseObject);
        }

    });


    $scope.submitReview = function (data, year){
        
        var usefulnessRating = data[0].current;
        var difficultyRating = data[1].current;
     
        var lecturesRating=0;
        var lecturesComment="";
        var lessonsRating=0;
        var lessonsComment="";
        var examRating=0;
        var examComment="";
        var laboratoryRating=0;
        var laboratoryComment="";
        var seminarRating=0;
        var seminarComment="";
        var projectRating=0;
        var projectComment="";
        var homeassignmentRating=0;
        var homeassignmentComment=" ";
        var caseRating=0;
        var caseComment=" ";

        if(data[2]!==undefined){
            var lecturesRating = data[2].current;
            var lecturesComment = data[2].comment;
        }

        if(data[3]!==undefined){
            var lessonsRating = data[3].current;
            var lessonsComment = data[3].comment;
        }

        if(data[4]!==undefined){
            var examRating = data[4].current;
            var examComment = data[4].comment;
        }

        if(data[5]!==undefined){
            var laboratoryRating = data[5].current;
            var laboratoryComment = data[5].comment;
        }
        
        if(data[6]!==undefined){
            var seminarRating = data[6].current;
            var seminarComment = data[6].comment;
        }

        if(data[7]!==undefined){
            var projectRating = data[7].current;
            var projectComment = data[7].comment;
        }

        if(data[8]!==undefined){
            var homeassignmentRating = data[8].current;
            var homeassignmentComment = data[8].comment;
        }

        if(data[9]!==undefined){
            var caseRating = data[9].current;
            var caseComment = data[9].comment;
        }
        inputData = {
            'course': course,
            'university': university,
            'usefulnessRating': usefulnessRating,
            'difficultyRating': difficultyRating,
            'lectureRating': lecturesRating,
            'lectureComment': lecturesComment,
            'lessonRating': lessonsRating,
            'lessonComment': lessonsComment,
            'examRating': examRating,
            'examComment': examComment,
            'laboratoryRating': laboratoryRating,
            'laboratoryComment': laboratoryComment,
            'seminarRating': seminarRating,
            'seminarComment': seminarComment,
            'projectRating': projectRating,
            'projectComment': projectComment,
            'homeassignmentRating': homeassignmentRating,
            'homeassignmentComment': homeassignmentComment,
            'caseRating': caseRating,
            'caseComment': caseComment,
            'userEmail': ipCookie('email'),
            'year': year
        };
       
        $http.post("backend/addReviewWeb.php", inputData).success(function(response){
           if(response=="addCourseFailed"){
                $scope.message="Something went wrong when adding the course!";
           }else if(response=="couldntFindCourse"){
                $scope.message="Couldn't find the course to rate!";
           }else{
                $scope.showRatingAdded();

           }
        });

    }

    $scope.ratings = [{
        current: 1,
        name: "Usefulness",
        max: 5
    }, {
        current: 1,
        name: "Difficulty",
        max: 5
    }];

    $scope.rating = 0;
    

    $scope.getSelectedRating = function (rating) {
        
    }
});

courseApp.directive('starRating', function () {
    return {
        restrict: 'A',
        template: '<ul class="rating">' +
            '<li ng-repeat="star in stars" ng-class="star" ng-click="toggle($index)">' +
            '\u2605' +
            '</li>' +
            '</ul>',
        scope: {
            ratingValue: '=',
            max: '=',
            onRatingSelected: '&'
        },
        link: function (scope, elem, attrs) {

            var updateStars = function () {
                scope.stars = [];
                for (var i = 0; i < scope.max; i++) {
                    scope.stars.push({
                        filled: i < scope.ratingValue
                    });
                }
            };

            scope.toggle = function (index) {
                scope.ratingValue = index + 1;
                scope.onRatingSelected({
                    rating: index + 1
                });
            };

            scope.$watch('ratingValue', function (oldVal, newVal) {
                if (newVal) {
                    updateStars();
                }
            });
        }
    }


});