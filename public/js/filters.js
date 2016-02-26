'use strict';

/* Filters */

angular.module('mainFilter', []).filter('mainFilter', function() {
    return function(input) {
        console.log(input);
    };
});