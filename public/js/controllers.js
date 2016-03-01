'use strict';

/* Controllers */

var MainController = angular.module('MainController', []);

MainController.controller('MainController', ['$scope', '$cookies', '$http',
        function($scope, $cookies, $http) {

            // scope variables
            var collection1Fields = ['symbol','exchange', 'avgDailyVolume', 'marketCap'];

            // Default screen
            $scope.defaultScreen = {
                "_id":"default",
                "title":"default",
                "filter":{
                    "1" : {
                        "matches":0,
                        "isactive":1,
                        "index":1,
                        "field1":{
                            "active":true,
                            "value":"symbol"
                        },
                        "field2":{
                            "active":false,
                            "value":">",
                            "hidden":true
                        },
                        "field3":{
                            "value":""
                        },
                        "field4":{
                            "value":"",
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
                    $scope.currentFilters[$scope.currentFilter]['matches'] = $scope.filtered.length;
                }else {
                    $scope.currentFilters[$scope.currentFilter]['matches'] = $scope.totalcount;
                }
            }

            // init screens
            $scope.initScreens = function(){
                $scope.screens = []; // set current list of screens to null
                $scope._screens = $scope.unpackScreens($scope._screens); // unpack screens
                $scope._screens.push($scope.defaultScreen); // add default screen
                $scope.screens = $scope._screens;
            }

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
            }

            // switch screen
            $scope.switchScreen = function(screen){
                if(screen){
                    for(var i in $scope.screens){
                        if($scope.screens[i]['_id']==screen){
                            console.log($scope.screens[i]);
                            $scope.currentFilters = $scope.screens[i]['filter'];
                        }
                    }
                }
            }

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
            }

            // add new rule to screen
            $scope.addFilter = function() {

                var i = 1;
                for(var _filter in $scope.currentFilters){
                    i++;
                }

                $scope.currentFilters[i] = {
                    "isactive":0,
                    "index":i,
                    "matches":$scope.companies.length,
                    "field1":{
                        "active":true,
                        "value":"symbol"
                    },
                    "field2":{
                        "active":false,
                        "value":">",
                        "hidden":true
                    },
                    "field3":{
                        "value":""
                    },
                    "field4":{
                        "value":""
                    }
                };

                event.preventDefault();
                return false;
            }

            // remove rule from screen
            $scope.removeRule = function(index) {

                var _filter = {};

                delete $scope.filter[index];

                var i = 1;
                for(var filter_ in $scope.filter){
                    $scope.filter[filter_]['index'] = i;
                    _filter[i] = $scope.filter[filter_];
                    i++;
                }

                $scope.filter = _filter;
                $scope.activeFilter = 1;

                event.preventDefault();
                return false;
            }

            // filter changed
            $scope.filterChanged = function(filter) {

                $scope.companies = $scope.companiesOrigin;

                var curFilter = filter[$scope.currentFilter]; // current filter

                $scope.searchkey = curFilter['field1']['value']; // search key

                curFilter['field2']['hidden'] = $.inArray(curFilter['field1']['value'],collection1Fields) > -1; // show/hide second field

                curFilter['field4']['hidden'] = curFilter['field3']['value'].indexOf('x') == -1; // show/hide fourth field

                // search in first collection
                if(curFilter['field2']['hidden']){

                    $scope.search = {}; // search criteria
                    $scope.search[$scope.searchkey] = '';
                    $scope.search[$scope.searchkey] = curFilter['field3']['value'];
                    $scope.currentFilters[$scope.currentFilter]['matches'] = $scope.filtered.length;

                    return true;

                }else{
                    // search in second collection
                    $scope.companies = $scope.search2($scope.companiesOrigin,
                        curFilter['field3']['value'],
                        curFilter['field2']['value']);

                    $scope.currentFilters[$scope.currentFilter]['matches'] = $scope.companies.length;

                    return true;
                }

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
            }

            // switch filter in screen
            $scope.filterSwitched = function(index){
                $scope.currentFilter = index;
                $scope.filterChanged($scope.currentFilters);
            }

        }]
);

