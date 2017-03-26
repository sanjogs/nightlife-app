angular.module('nightLife')
    .controller('mainController', ['$scope', 'UserSvc', function($scope, userSvc) {


        $scope.isLoggedIn = false;
        $scope.displayName = '';
        userSvc.loginInfo().then(function success(response) {
            $scope.isLoggedIn = true;
            $scope.displayName = response.data.twitter.name;

        }, function error(error) {
            $scope.isLoggedIn = false;
            console.log(error);

        });



    }]);