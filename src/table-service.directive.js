'use strict';

angular.module('lbTable').directive('lbTableService', ['$injector', function($injector){
    return {
        restrict: 'A',
        require: 'lbTable',
        link: function($scope, $element, $attrs, lbTableController){

            var service = $injector.get($attrs.lbTableService);

            var unbind = null;

            // init
            service.findAll().then(function(){
                unbind = service.bindAll({}, $scope, $attrs.lbTable);
            });
        }
    };
}]);
