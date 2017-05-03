angular.module('nightLife')
    .controller('BarsController', ['$scope', 'BarSvc', 'UserSvc', function($scope, barSvc, userSvc) {
        $scope.location = '';

        var nightlifeSearch = function(location) {
            if(location && location.length)
            {barSvc.get(location).then(function success(response) {

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
        }
        else
        {
              $scope.businesses = [];
                    $scope.error = "Enter a location";
        }
        };

        $scope.search = function(location) {
            nightlifeSearch(location);
        };

        $scope.checkIn = function(businessId) {

            barSvc.checkIn(businessId).then(function(c) {
              var thisBusiness=  $scope.businesses.filter(function(b) {
                    return b.id === businessId
                })[0];
                thisBusiness.checkin_count += 1;
                thisBusiness.is_user_checkedin=true;
            });
        }
        $scope.cancelCheckIn = function(businessId) {

            barSvc.cancelCheckIn(businessId).then(function(c){
                var thisBusiness=  $scope.businesses.filter(function(b) {
                    return b.id === businessId
                })[0];
                thisBusiness.checkin_count -= 1;
                thisBusiness.is_user_checkedin=false;
            });
        }
        userSvc.loginInfo().then(function success(response) {
            if (response.data && response.data.lastSearch) {
                $scope.location = response.data.lastSearch;
                nightlifeSearch($scope.location);
            }
        });
    }]);