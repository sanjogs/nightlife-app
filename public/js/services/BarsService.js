angular.module('nightLife').factory('BarSvc', ['$http', function($http) {

    return {
        get: function(location) {
            return $http.get('/api/bars?location=' + location);
        },
          checkIn: function(businessId) {
                return $http.post('/api/check-in/' + businessId);
            },
            cancelCheckIn: function(businessId) {
                return $http.post('/api/cancel-check-in/' + businessId);
            }
        }
    
}]);