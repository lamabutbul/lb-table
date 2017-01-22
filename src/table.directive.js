'use strict';

angular.module('lbTable').directive('lbTable', [function(){
    return {
        restrict: 'A',
        controllerAs: 'lbTableController',
        controller: [function(){
            var ctrl = this;

            var state = ctrl.state = {
                
            };
        }]
    };
}]);
