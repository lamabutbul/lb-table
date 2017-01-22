'use strict';

angular.module('lbTable.demo').directive('app', [function(){
    return {
        restrict: 'E',
        template: `
            <customers></customers>
        `,
    };
}]);
