angular.module('nightLife').factory('UserSvc', ['$http', function($http) {

    return {
        loginInfo: function() {
            return $http.get('/api/users/login-info');
        }
    }
}]);