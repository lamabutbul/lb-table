'use strict';

angular.module('lbTable').directive('lbTableSelectAll', [function(){
    return {
        restrict: 'A',
        require: '^^lbTableSelect',
        template: `
            <input type="checkbox" ng-model="lbTableSelectAllController.selected" ng-click="lbTableSelectAllController.onChange()" />
        `,
        controllerAs: 'lbTableSelectAllController',
        controller: [function(){
            var ctrl = this;

            ctrl.selected = false;
        }],
        link: function($scope, $element, $attrs, lbTableSelectController){
            var ctrl = $scope.lbTableSelectAllController;

            ctrl.onChange = function(){
                if (ctrl.selected) {
                    lbTableSelectController.selectAll();
                }
                else {
                    lbTableSelectController.unselectAll();
                }
            };
        }
    };
}]);
