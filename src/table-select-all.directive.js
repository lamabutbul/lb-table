'use strict';

angular.module('lbTable').directive('lbTableSelectAll', [function(){
  return {
    restrict: 'A',
    require: '^^lbTable',
    template: `
      <input type="checkbox" ng-model="$ctrl.selected" ng-click="$ctrl.onChange()" />
    `,
    controllerAs: '$ctrl',
    controller: [function(){
      const $ctrl = this;

      $ctrl.selected = false;
    }],
    link: function($scope, $element, $attrs, lbTableController){
      const $ctrl = $scope.$ctrl;

      $ctrl.onChange = function(){
        if ($ctrl.selected) {
          lbTableController.selectAll();
        }
        else {
          lbTableController.unselectAll();
        }
      };
    },
  };
}]);
