angular.module('nightLife')
    .controller('BarsController', ['$scope', 'BarSvc', 'UserSvc', function($scope, barSvc, userSvc) {
        $scope.location = '';

        var nightlifeSearch = function(location) {
            barSvc.get(location).then(function success(response) {

                if (response.data.error) {
                    $scope.businesses = [];
                    $scope.error = response.data.error;
                } else {
                    $scope.error = null;
                }
                $scope.businesses = response.data.data;
            },
                function(error) {
                    $scope.businesses = [];
                    $scope.error = "Something went wrong";
                });
        };

        $scope.search = function(location) {
            nightlifeSearch(location);
        };

        $scope.checkIn=function(businessId){
            
            barSvc.checkIn(businessId);
        }

        userSvc.loginInfo().then(function success(response) {
            if (response.data && response.data.lastSearch) {
                $scope.location = response.data.lastSearch;
                nightlifeSearch($scope.location);
            }
        });
    }]);