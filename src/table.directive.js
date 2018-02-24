'use strict';

const lbTableDirective = lbTableModule.directive('lbTable', [
  function(){
    return {
      restrict: 'A',
      controller: [
        '$injector',
        '$scope',
        '$log',
        '$attrs',
        function($injector, $scope, $log, $attrs){
          const $ctrl = this;
          const service = $injector.get($attrs.lbTableService);

          const state = $ctrl.state = {
            with: [],
            sort: [],
            limit: 10,
            skip: 0,
          };

          function getFindAllParams() {
            let params = {};
            $log.info('lbTable findAllParams:', params);
            return params;
          }

          function bind(data) {
            let dest = $scope;
            let segs = $attrs.lbTable.split('.');
            let path = segs.pop();
            while (segs.length) {
              dest = dest[segs.shift()];
            }
            dest[path] = data;
          }

          const pipe = $ctrl.pipe = function(){
            $scope.$broadcast('lbTable.pipeStart');
            return service.findAll(getFindAllParams()).then(function(data){
              bind(data);
              $scope.$broadcast('lbTable.pipeEnd');
            });
          };

          const sort = $ctrl.sort = function(field, defaultDirection, preserveSort){
            $scope.$broadcast('lbTable.sortStart');

            let sortOption;
            for (let i = 0; i < state.sort.length; i++) {
              if (state.sort[i].field === field) {
                sortOption = state.sort[i];
                sortOption.direction = 0 - sortOption.direction;
                break;
              }
            }

            if (!preserveSort) {
              state.sort = [];
            }

            if (!sortOption) {
              sortOption = {
                field: field,
                direction: defaultDirection,
              }
              state.sort.push(sortOption);
            }

            pipe().then(() => {
              $scope.$broadcast('lbTable.sortEnd');
            });
          };
        },
      ],
    };
  },
]);
