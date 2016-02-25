'use strict';

/* Filters */

var mainAppFilters = angular.module('mainAppFilters', []);


mainAppFilters.filter('mainAppFilter', function () {
    return function (input, scope) {

        var _input = Array();

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
                var val = findElement(scope.condition1Val,input[i]);

                console.log(val);
            }


        }

        scope.matches = _input.length+" matches";

        return _input;
    };
});



function findElement(key, items){

    console.log(key);
    return;
    if(typeof items[key] == 'undefined' && (typeof items == 'object' || typeof items == 'array' )) {

        for (var k in items) {

        }

    }else{
        return items[key];
    }

}