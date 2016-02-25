'use strict';

/* Filters */

var mainAppFilters = angular.module('mainAppFilters', []);


mainAppFilters.filter('mainAppFilter', function () {
    return function (input, scope) {

        var _input = Array();
        var _ids = Array();

        var onPage = 5;

        for(var i=0; i<input.length; i++) {

            if(typeof input[i][scope.condition1Val] == 'string') {
                if( input[i][scope.condition1Val].toLowerCase() == '' ) {
                    _input.push(input[i]);
                }
                if( input[i][scope.condition1Val].toLowerCase().indexOf(scope.condition3Val.toLowerCase()) > -1 ) {
                    _input.push(input[i]);
                }
                $("#condition2Val").hide();
            }

            if(typeof input[i][scope.condition1Val] == 'number') {
                $("#condition2Val").show();

                var val = input[i][scope.condition1Val];

                switch (scope.condition2Val) {
                    case ">":
                        if(val > scope.condition3Val) _input.push(input[i]);
                        break;
                    case "<":
                        if(val < scope.condition3Val) _input.push(input[i]);
                        break;
                    case "=":
                        if(val == scope.condition3Val) _input.push(input[i]);
                        break;
                    case "!":
                        if(val != scope.condition3Val) _input.push(input[i]);
                        break;
                    default:

                }
            }

            if(typeof input[i][scope.condition1Val] == 'undefined') {
                var key = scope.condition1Val.split(".");
                var _items = input[i][key[0]];
                for(var z=0; z<_items.length; z++) {
                    var curVal = _items[z][key[1]];

                    if(typeof curVal == 'number') {
                        $("#condition2Val").show();

                        switch (scope.condition2Val) {
                            case ">":
                                if(curVal > scope.condition3Val ){
                                    if (_ids.indexOf(input[i]._id) < 0) {
                                        _ids.push(input[i]._id);
                                        _input.push(input[i]);
                                    }
                                }
                                break;
                            case "<":
                                if(curVal < scope.condition3Val ){
                                    if (_ids.indexOf(input[i]._id) < 0) {
                                        _ids.push(input[i]._id);
                                        _input.push(input[i]);
                                    }
                                }
                                break;
                            case "=":
                                if(curVal == scope.condition3Val ){
                                    if (_ids.indexOf(input[i]._id) < 0) {
                                        _ids.push(input[i]._id);
                                        _input.push(input[i]);
                                    }
                                }
                                break;
                            case "!":
                                if(curVal != scope.condition3Val ){
                                    if (_ids.indexOf(input[i]._id) < 0) {
                                        _ids.push(input[i]._id);
                                        _input.push(input[i]);
                                    }
                                }
                                break;
                            default:

                        }
                    }
                }
            }
        }

        scope._matches = _input.length;
        //scope._matches = 12;
        scope.matches = _input.length+" matches";

        if(scope._matches > onPage) {
            var _pages = Array();
            var pages = parseInt(scope._matches/onPage);
            if(scope._matches%onPage > 0) pages++;
            for(var i=1; i<=pages; i++)_pages.push(i);
            scope.pages = _pages;
        }

        return _input;
    };
});
