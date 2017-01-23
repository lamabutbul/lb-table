'use strict';

angular.module('lbTable').directive('lbTableSortable', ['$parse', function($parse){
    return {
        restrict: 'A',
        require: 'lbTable',
        controllerAs: 'lbTableSortableController',
        controller: [function(){
            
        }],
        link: function($scope, $element, $attrs, lbTableController){
            var ctrl = $scope.lbTableSortableController;

            var model = ctrl.model = lbTableController.state.sort = $parse($attrs.lbTableSortable)($scope);

            ctrl.sort = function(key){
                let direction = 1;
                for (let i = model.length - 1; i >= 0; i--) {
                    if (model[i][0] == key) {
                        direction = -model[i][1];
                    }
                    model.pop();
                }
                model.push([key, direction]);
                lbTableController.pipe();
            };
        }
    };
}]);
