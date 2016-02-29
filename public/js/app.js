'use strict';

/* App Module */

var mainApp = angular.module('mainApp', [
    'ngRoute',
    'MainController',
    'smart-table',
    'ngCookies'
    //'mainAppFilters',
    //'mainAppServices'
]);

mainApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'partials/table.html',
                controller: 'MainController'
            })
    }]);
