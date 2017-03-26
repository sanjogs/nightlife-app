// public/js/appRoutes.js
angular.module('nightLife')
    .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

        $routeProvider
            // home page
            .when('/', {
                templateUrl: 'views/home.html',
                controller: 'BarsController'
            });
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });

    }]);