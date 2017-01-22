'use strict';

angular.module('lbTable').directive('lbTableSelectRow', [function(){
    return {
        restrict: 'A',
        require: '^^lbTableSelect',
        scope: {
            key: '=lbTableSelectRow',
        },
        template: `
            <input type="checkbox" ng-model="lbTableSelectRowController.selected" ng-click="lbTableSelectRowController.onChange()" />
        `,
        controllerAs: 'lbTableSelectRowController',
        controller: [function(){
            var lbTableSelectRowController = this;

            lbTableSelectRowController.selected = false;
        }],
        link: function($scope, $element, $attrs, lbTableSelectController){
            var ctrl = $scope.lbTableSelectRowController;

            ctrl.onChange = function(){
                if (ctrl.selected) {
                    lbTableSelectController.select($scope.key);
                }
                else {
                    lbTableSelectController.unselect($scope.key);
                }
            };

            $scope.$watch(
                function(){
                    return lbTableSelectController.model['*'];
                },
                function(newValue, oldValue){
                    if (newValue !== oldValue) {
                        ctrl.selected = newValue;
                    }
                }
            );
        }
    };
}]);
