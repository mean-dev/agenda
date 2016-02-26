'use strict';

/* App Module */

var mainApp = angular.module('mainApp', [
    'ngRoute',
    'MainController',
    'smart-table'
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
