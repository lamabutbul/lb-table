'use strict';

angular.module('lbTable').directive('lbTableSelect', [function(){
    return {
        restrict: 'A',
        require: 'lbTable',
        controllerAs: 'lbTableSelectController',
        controller: [function(){
            
        }],
        link: function($scope, $element, $attrs, lbTableController){
            var ctrl = $scope.lbTableSelectController;
            var model = ctrl.model = lbTableController.select = {
                '*': false,
                in: {},
                nin: {},
            };

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
