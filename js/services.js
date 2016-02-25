var mainAppServices = angular.module('mainAppServices', ['ngResource']);

mainAppServices.factory('company', ['$resource',
    function($resource){
        return $resource('/api/companies/', {}, {
            query: {method:'GET', params:{}, isArray:true}
        });
    }]);