'use strict';

const lbTableSortDirective = lbTableModule.directive('lbTableSort', [function(){
  return {
    restrict: 'A',
    require: '^^lbTable',
    link: function($scope, $element, $attrs, lbTableController){
      $element.addClass('lb-sortable');

      const lbTableSort = $attrs.lbTableSort;
      const field = lbTableSort[0] === '-' ? lbTableSort.substr(1) : lbTableSort;
      const defaultDirection = lbTableSort[0] === '-' ? -1 : 1;

      $element.on('click', function($event){
        lbTableController.sort(field, defaultDirection);
      });

      $scope.$on('lbTable.sort', function($e, sort){
        if (field in sort) {
          if (sort[field].direction > 0) {
            $element.addClass('lb-sort-asc');
          }
          else {
            $element.addClass('lb-sort-desc');
          }
        }
        else {
          $element.removeClass('lb-sort-asc lb-sort-desc');
        }
      });
    },
  };
}]);
