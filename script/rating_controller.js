courseApp.controller('formController', ['$scope', function ($scope) {

    $scope.submitReview = function (){
        console.log("Sending");
        console.log("Usefulness"+$scope.ratings[0].current);
        console.log("Difficulty"+$scope.ratings[1].current);
        console.log("Lectures"+$scope.ratings[2].current);
    }



    $scope.rating = 0;
    
    $scope.parts=['Lectures', 'Lessons'];
    
    $scope.ratings = [{
        current: 1,
        name: "Usefulness",
        max: 5
    }, {
        current: 1,
        name: "Difficulty",
        max: 5
    }, {
        current: 1,
        name: "Lectures",
        max: 5
    }, {
        current: 1,
        name: "Lessons",
        max: 5
    }, {
        current: 1,
        name: "Exam",
        max: 5
    }, {
        current: 1,
        name: "Laboratory",
        max: 5
    }, {
        current: 1,
        name: "Seminar",
        max: 5
    }, {
        current: 1,
        name: "Project",
        max: 5
    }, {
        current: 1,
        name: "Case",
        max: 5
    }];

    $scope.getSelectedRating = function (rating) {
        
    }
}]);

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
