'use strict';

/* Controllers */

var MainController = angular.module('MainController', []);

MainController.controller('MainController', ['$scope', '$cookies', '$http', '$filter',
        function($scope, $cookies, $http, $filter) {

            // scope variables
            var collection1Fields = ['symbol','exchange', 'avgDailyVolume', 'marketCap'];

            // Default screen
            $scope.defaultScreen = {
                "_id":"default",
                "title":"default",
                "filter":{
                    "1" : {
                        "matches":0,
                        "isactive":true,
                        "index":1,
                        "field1":{
                            "value":"symbol",
                            "hidden":false
                        },
                        "field2":{
                            "value":">",
                            "hidden":false
                        },
                        "field3":{
                            "value":"",
                            "hidden":false
                        },
                        "field4":{
                            "value":"roc",
                            "hidden":true
                        }
                    }
                }
            };

            // current screen
            $scope.curscreen = 'default';

            // current screen filters
            $scope.currentFilters = $scope.defaultScreen.filter;

            // current filter
            $scope.currentFilter = 1;

            // current search key
            $scope.searchkey = 'symbol';

            angular.element(document).ready(function () {

                $scope.companiesOrigin = $scope.companies;

                // initialize screens
                $scope.initScreens();

                // set watchers
                $scope.setWatchers();

            });

            // Setting watchers
            $scope.setWatchers = function(){
                $scope.$watch('curscreen', $scope.switchScreen ,true); // screen switched
                $scope.$watch('currentFilter', $scope.filterSwitched ,true); // filter switched
                $scope.$watch('currentFilters', $scope.filterChanged, true); // watch for changes in filter
                $scope.$watch('filtered', $scope.updateMatchesCount,true); // auto update matches count
            };

            // updateing matches count
            $scope.updateMatchesCount = function(){
                if($scope.filtered){
                    //$scope.currentFilters[$scope.currentFilter]['matches'] = $scope.filtered.length;
                }else {
                    //$scope.currentFilters[$scope.currentFilter]['matches'] = $scope.totalcount;
                }
            };

            // init screens
            $scope.initScreens = function(){
                $scope.screens = []; // set current list of screens to null
                $scope._screens = $scope.unpackScreens($scope._screens); // unpack screens
                $scope._screens.push($scope.defaultScreen); // add default screen
                $scope.screens = $scope._screens;
            };

            // unpack filters in screens
            $scope.unpackScreens = function(screens){
                if(screens && screens.length > 0){
                    for(var i in screens){
                        screens[i]['filter'] = JSON.parse(screens[i]['filter']);
                    }
                }else{
                    screens = [];
                }
                return screens;
            };

            // switch screen
            $scope.switchScreen = function(screen){
                if(screen){
                    for(var i in $scope.screens){
                        if($scope.screens[i]['_id']==screen){
                            $scope.currentFilters = $scope.screens[i]['filter'];
                        }
                    }
                }
            };

            // show/hide filters
            $scope.toggle = function(obj) {
                $(event.target).siblings("form").toggle();
                if($(event.target).siblings("form").css('display') == 'block') {
                    $(event.target).html("Hide Quick Screener").removeClass().addClass('glyphicon glyphicon-triangle-bottom');
                }else{
                    $(event.target).html("Open Quick Screener").removeClass().addClass('glyphicon glyphicon-triangle-up');
                }
                event.preventDefault();
                return false;
            };

            // add new rule to screen
            $scope.addFilter = function() {

                var i = 1;
                for(var _filter in $scope.currentFilters){
                    i++;
                }

                $scope.currentFilters[i] = {
                    "isactive":false,
                    "index":i,
                    "matches":$scope.filtered.length,
                    "field1":{
                        "value":"symbol",
                        "hidden":false
                    },
                    "field2":{
                        "value":">",
                        "hidden":false
                    },
                    "field3":{
                        "value":"",
                        "hidden":false
                    },
                    "field4":{
                        "value":"roc",
                        "hidden":true
                    }
                };

                event.preventDefault();
                return false;
            };

            // remove rule from screen
            $scope.removeRule = function(index) {

                var _filters = {};
                var i=1;
                for(var rule in $scope.currentFilters){
                    if(index != $scope.currentFilters[rule]['index']) {
                        var _f = $scope.currentFilters[rule];
                        _f['index'] = i;
                        _filters[i]=_f;
                        i++;
                    }
                }

                $scope.currentFilters = _filters;

                event.preventDefault();
                return false;

            };

            // filter changed
            $scope.filterChanged = function(filter) {

                $scope.companies = $scope.companiesOrigin;

                var activeFilters = $scope.activeFilters();

                console.log(activeFilters);

                var _companies = $scope.companies;
                angular.forEach(activeFilters, function(filter, key) {
                    _companies = $scope.filterCompaniesByFilter(_companies, filter);
                }, _companies);

                $scope.companies = _companies;
                return false;

            };

            // filter companies by concrete filter
            $scope.filterCompaniesByFilter = function(items, filter) {

                var searchKey = filter['field1']['value'];
                var criteria = filter['field2']['value'];
                var searchValue = filter['field3']['value'];

                var expression = {};
                expression[searchKey] = searchValue;

                if(searchKey.indexOf(".") > -1){
                    searchKey = searchKey.split(".");
                    expression = {};
                    expression[searchKey[0]] = {};
                    expression[searchKey[0]][searchKey[1]] = searchValue;
                }

                if(searchValue.indexOf("x")>-1) {
                    filter['field4']['hidden'] = false;
                }else{
                    filter['field4']['hidden'] = true;
                }

                var res = $filter('filter')(items, expression, function(actual, expected){

                    if(expected == "") return true;

                    if(angular.isNumber(actual) ){

                        expected = parseFloat(expected);

                        if(criteria == ">" &&  actual > expected){
                            return true;
                        }
                        if(criteria == "<" &&  actual < expected){
                            return true;
                        }
                        if(criteria == "=" &&  actual == expected){
                            return true;
                        }
                        if(criteria == "!" &&  actual != expected){
                            return true;
                        }

                        return false;
                    }

                    if(angular.isString(actual) ){

                        if(criteria == ">" &&  actual.indexOf(expected) === 0){
                            return true;
                        }
                        if(criteria == "<" && actual.length>=expected.length && actual.indexOf(expected, actual.length-expected.length) == actual.length-expected.length){
                            return true;
                        }
                        if(criteria == "=" && (actual == expected)){
                            return true;
                        }
                        if(criteria == "!" && (actual != expected)){
                            return true;
                        }

                        return false;
                    }

                    return false;

                });

                filter['matches'] = res.length;

                return res;
            };

            // search companies in second collection
            $scope.search2 = function(haystack, needle, criteria){

                if(!needle || needle == '') return haystack;

                var log=[];

                angular.forEach(haystack, function(company, key) {

                    angular.forEach(company['formtenk'], function(formtenk, key){

                        var v = formtenk[$scope.searchkey];

                        if(criteria == ">"){
                            if(v > needle && log.indexOf(company) == -1) log.push(company);
                        }
                        if(criteria == "<"){
                            if(v < needle && log.indexOf(company) == -1) log.push(company);
                        }
                        if(criteria == "="){
                            if(v == needle && log.indexOf(company) == -1) log.push(company);
                        }
                        if(criteria == "!"){
                            if(v != needle && log.indexOf(company) == -1) log.push(company);
                        }

                    });

                }, log);
                $scope.companies = log;
                return log;
            };

            // save screen
            $scope.saveScreen = function(){

                if($scope.newRuleName) {

                    var data = {
                        'title': $scope.newRuleName,
                        'filter':$scope.currentFilters
                    };

                    $http({
                        method: 'POST',
                        url: '/api/screen',
                        data: data
                    });

                    $('#saveRooles').modal('hide');
                }

                event.preventDefault();
                return false;
            };

            // switch filter in screen
            $scope.filterSwitched = function(index){
                $scope.filterChanged($scope.currentFilters);
            };

            // return active filters
            $scope.activeFilters = function() {
                var _filters = [];
                for(var i in $scope.currentFilters){
                    if($scope.currentFilters[i]['isactive']) _filters.push($scope.currentFilters[i]);
                }
                return _filters;
            }

        }]
);

