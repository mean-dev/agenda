'use strict';

/* Controllers */

var mainAppControllers = angular.module('mainAppControllers', []);

mainAppControllers.controller('mainController', ['$scope', 'company',
    function($scope, companies) {

        $scope.condition1 = [
            {"value" : "symbol", "title" : "symbol"},
            {"value" : "exchange", "title" : "exchange"},
            {"value" : "avgDailyVolume", "title" : "avgDailyVolume"},
            {"value" : "marketCap", "title" : "marketCap"},
            {"value" : "formtek.ros", "title" : "ros"},
            {"value" : "roe", "title" : "roe"},
            {"value" : "roc", "title" : "roc"},
            {"value" : "dividendspaid", "title" : "dividendspaid"}
        ];

        $scope.condition2 = [
            {"value" : ">", "title" : "Greater than"},
            {"value" : "<", "title" : "Less than"},
            {"value" : "=", "title" : "Equal to"},
            {"value" : "!", "title" : "Not equal to"}
        ];

        $scope.items = companies.query(function(items){
            $scope.matches = $scope.items.length+" matches";
        });

        $scope.condition1Val = "symbol";
        $scope.condition2Val = ">";
        $scope.condition3Val = "";

        $scope.matches = $scope.items.length+" matches";

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

