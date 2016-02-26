'use strict';

/* Controllers */

var MainController = angular.module('MainController', []);

MainController.controller('MainController', ['$scope',
        function($scope) {


            var collection1Fields = ['symbol','exchange', 'avgDailyVolume', 'marketCap'];

            $scope.filter = {
                "1" : {
                    "isactive":1,
                    "index":1,
                    "field1":{
                        "value":"symbol"
                    },
                    "field2":{
                        "value":">"
                    },
                    "field3":{
                        "value":""
                    },
                    "field4":{
                        "value":""
                    }
                }
            };

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

            $scope.addNewRule = function(obj) {

                var i = 1;
                for(var _filter in $scope.filter){
                    i++;
                }

                $scope.filter[i] = {
                    "isactive":0,
                    "index":i,
                    "field1":{
                        "value":"symbol"
                    },
                    "field2":{
                        "value":">"
                    },
                    "field3":{
                        "value":""
                    },
                    "field4":{
                        "value":""
                    }
                };

                $('#newRuleConfirm').modal('hide');

                event.preventDefault();
                return false;
            }

            $scope.filterChanged = function(index, field) {


                if(field == 'radio'){


                    for(var _filter in $scope.filter){
                        if($scope.filter[_filter].index == index){
                            $scope.filter[_filter].isactive = 1;
                        }
                        else{
                            $scope.filter[_filter].isactive = 0;
                        }
                    }

                }

                if($scope.filter[index].isactive ==1) {

                    if(field == 'field1'){
                        $scope.searchkey = $scope.filter[index][field]['value'];
                        $scope.search = {};


                        var res = $.inArray( $scope.filter[index][field]['value'], collection1Fields );
                        if(res > -1){
                            console.log(find("select"));
                            //console.log(angular.find("select#fields2").removeClass('invis'));
                        }

                    }
                    if(field == 'field3'){
                        $scope.search[$scope.searchkey] = $scope.filter[index][field]['value'];
                    }


                    if(field == 'radio'){
                        console.log(index);
                        $scope.search[$scope.searchkey] = $scope.filter[index][field]['value'];
                    }

                }
                return true;
            }

        }]
);

