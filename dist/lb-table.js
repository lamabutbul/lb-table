'use strict';

angular.module('lbTable', []);

'use strict';

angular.module('lbTable').directive('lbTableRowNumber', [function(){
    return {
        restrict: 'A',
        require: '^^lbTable',
        template: `
            <span ng-bind="$index + 1"></span>
        `,
        link: function($scope, $element, $attrs, lbTableController){
            
        }
    };
}]);

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

'use strict';

angular.module('lbTable').directive('lbTableSelect', ['$parse', function($parse){
    return {
        restrict: 'A',
        require: 'lbTable',
        controllerAs: 'lbTableSelectController',
        controller: [function(){
            
        }],
        link: function($scope, $element, $attrs, lbTableController){
            var ctrl = $scope.lbTableSelectController;

            var model = ctrl.model = lbTableController.state.select = $parse($attrs.lbTableSelect)($scope);

            angular.extend(model, {
                '*': false,
                in: {},
                nin: {},
            });

            ctrl.selectAll = function(){
                model['*'] = true;
                model['in'] = {};
                model.nin = {};
            };

            ctrl.unselectAll = function(){
                model['*'] = false;
                model['in'] = {};
                model.nin = {};
            };

            ctrl.select = function(key){
                model['in'][key] = true;
            };

            ctrl.unselect = function(key){
                if (model['*']) {
                    model.nin[key] = true;
                }
                else if (key in model['in']) {
                    delete model['in'][key];
                }
            };
        }
    };
}]);

'use strict';

angular.module('lbTable').directive('lbTableService', ['$injector', function($injector){
    function tableStateToFindParams(state) {
        let params = {};

        if (state.sort.length) {
            let sort = [];
            for (let i = 0; i < state.sort.length; i++) {
                sort.push((state.sort[i][1] > 0 ? '' : '-') + state.sort[i][0]);
            }
            params.sort = sort.join(',');
        }

        return params;
    }

    function tableStateToBindParams(state) {
        let params = {};

        if (state.sort.length) {
            let sort = [];
            for (let i = 0; i < state.sort.length; i++) {
                sort.push([state.sort[i][0], state.sort[i][1] > 0 ? 'ASC' : 'DESC']);
            }
            params.sort = sort;
        }

        return params;
    }

    return {
        restrict: 'A',
        require: 'lbTable',
        link: function($scope, $element, $attrs, lbTableController){

            let service = $injector.get($attrs.lbTableService);

            let unbind = null;

            lbTableController.pipe = function findAll() {
                service.findAll(tableStateToFindParams(lbTableController.state)).then(function(){
                    if (unbind) unbind();
                    unbind = service.bindAll(tableStateToBindParams(lbTableController.state), $scope, $attrs.lbTable);
                });
            };

            // init
            lbTableController.pipe();
        }
    };
}]);

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

'use strict';

angular.module('lbTable').directive('lbTableSortable', ['$parse', function($parse){
    return {
        restrict: 'A',
        require: 'lbTable',
        controllerAs: 'lbTableSortableController',
        controller: [function(){
            
        }],
        link: function($scope, $element, $attrs, lbTableController){
            let ctrl = $scope.lbTableSortableController;

            let model = ctrl.model = lbTableController.state.sort = $parse($attrs.lbTableSortable)($scope);

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
                return direction;
            };
        }
    };
}]);

'use strict';

angular.module('lbTable').directive('lbTable', [function(){
    return {
        restrict: 'A',
        controllerAs: 'lbTableController',
        controller: [function(){
            var ctrl = this;

            var state = ctrl.state = {
                
            };

            var pipe = ctrl.pipe = function(){

            };
        }]
    };
}]);
