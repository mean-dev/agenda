'use strict';

/* App Module */

var mainApp = angular.module('mainApp', [
    'ngRoute',
    'mainAppControllers',
    'mainAppFilters',
    'mainAppServices'
]);

mainApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'templates/table.html',
                controller: 'mainController'
            }).
            when('/page/:page', {
                templateUrl: 'templates/table.html',
                controller: 'mainController'
            })
    }]);


