'use strict';

angular.module('lbTable').directive('lbTableSort', [function(){
    return {
        restrict: 'A',
        require: '^^lbTableSortable',
        link: function($scope, $element, $attrs, lbTableSortableController){
            $element.addClass('lb-sortable');

            var key = $attrs.lbTableSort;

            $element.on('click', function($event){
                lbTableSortableController.sort(key);
                $scope.$apply();
            });
        }
    };
}]);
