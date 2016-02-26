'use strict';

/* Controllers */

var MainController = angular.module('MainController', []);

MainController.controller('MainController', ['$scope',
        function($scope) {

            $scope.toggle = function(obj) {
                $(event.target).siblings("form").toggle();
                if($(event.target).siblings("form").css('display') == 'block') {
                    $(event.target).html("Hide Quick Screener");
                }else{
                    $(event.target).html("Open Quick Screener");
                }
                event.preventDefault();
                return false;
            }

        }]
);

