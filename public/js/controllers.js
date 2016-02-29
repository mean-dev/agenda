'use strict';

/* Controllers */

var MainController = angular.module('MainController', []);

MainController.controller('MainController', ['$scope', '$cookies',
        function($scope, $cookies) {

            var collection1Fields = ['symbol','exchange', 'avgDailyVolume', 'marketCap'];

            $scope.searchkey = 'symbol';

            var _filters = ($cookies.get('filters') ? JSON.parse($cookies.get('filters')): false );

            // add default screen
            if(!_filters){
                _filters = {};
            }
            _filters['default'] = {
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
                        "value":""
                    }
                }
            };

            $scope._screens = [];
            for(var ind in _filters ){
                $scope._screens.push(ind);
            }
            $scope.screens = _filters;

            // set to default screen
            $scope.curscreen = 'default';
            $scope.filter = $scope.screens['default'];

            // set default filter in screen
            $scope.activeFilter = 1;

            $scope.switchScreen = function(){
                $scope.filter = $scope.screens[$scope.curscreen];
                $scope.switchfilter(1);
            }

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

            $scope.addNewRule = function() {

                var i = 1;
                for(var _filter in $scope.filter){
                    i++;
                }

                $scope.filter[i] = {
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

            $scope.filterChanged = function(index, field) {

                if(field == 'field1'){
                    var res = $.inArray( $scope.filter[index][field]['value'], collection1Fields );
                    if(res > -1){
                        $scope.filter[index]['field2']['hidden'] = true;
                    }else{
                        $scope.filter[index]['field2']['hidden'] = false;
                    }
                }

                if($scope.activeFilter ==index) {

                    if(field == 'field1'){
                        $scope.searchkey = $scope.filter[index][field]['value'];
                        $scope.search = {};
                    }

                    if(field == 'field3'){
                        $scope.search = {};
                        var searchKey=$scope.filter[index]['field1']['value'];
                        var searchValue=$scope.filter[index][field]['value'];
                        $scope.search[searchKey] = searchValue;
                    }

                }
                return true;
            }

            $scope.saveRules = function(){

                if($scope.newRuleName) {

                    var filtername = $scope.newRuleName;
                    var existedFilters = $cookies.get('filters')? JSON.parse($cookies.get('filters')) : {}

                    if(existedFilters) {
                        existedFilters[filtername] = $scope.filter;
                    }else{
                        existedFilters = {};
                        existedFilters[filtername] = $scope.filter
                    }

                    $cookies.put('filters', JSON.stringify(existedFilters));

                    $('#saveRooles').modal('hide');
                }

                event.preventDefault();
                return false;
            }

            $scope.$watch('filtered', function() {

                console.log($scope.activeFilter);
                if($scope.filtered){

                    $scope.filter[$scope.activeFilter]['matches'] = $scope.filtered.length;
                }else {
                    $scope.filter[$scope.activeFilter]['matches'] = $scope.totalcount;
                }

            },true);

            $scope.switchfilter = function(index){
                $scope.activeFilter = index;
                $scope.filterChanged(index,'field3');
            }


        }]
);

