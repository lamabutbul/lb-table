'use strict';

angular.module('lbTable').directive('lbTableRowNumber', [function(){
    return {
        restrict: 'A',
        require: '^^lbTable',
        template: `
            <span ng-bind="::$index + 1"></span>
        `,
        link: function($scope, $element, $attrs, lbTableController){
            
        }
    };
}]);
