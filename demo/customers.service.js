'use strict';

angular.module('lbTable.demo').service('customersService', ['DS', function(DS){
    return DS.defineResource({
        name: 'customer',
        endpoint: 'customers',
    });
}]);
