'use strict';

angular.module('lbTable').directive('lbTableSort', [function(){
    return {
        restrict: 'A',
        require: '^^lbTableSortable',
        link: function($scope, $element, $attrs, lbTableSortableController){
            $element.addClass('lb-sortable');

            let key = $attrs.lbTableSort;

            $element.on('click', function($event){
                let direction = lbTableSortableController.sort(key);
                $element.parent().children().removeClass('lb-sort-asc lb-sort-desc');
                if (direction > 0) {
                    $element.addClass('lb-sort-asc');
                }
                else {
                    $element.addClass('lb-sort-desc');
                }
                $scope.$apply();
            });
        }
    };
}]);
