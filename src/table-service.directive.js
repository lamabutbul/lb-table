'use strict';

angular.module('lbTable').directive('lbTableService', ['$injector', function($injector){
    function tableStateToFindParams(state) {
        var params = {};
        var sort = [];
        for (var i = 0; i < state.sort.length; i++) {
            sort.push((state.sort[i][1] > 0 ? '' : '-') + state.sort[i][0]);
        }
        params.sort = sort.join(',');
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

            var service = $injector.get($attrs.lbTableService);

            var unbind = null;

            lbTableController.pipe = function findAll() {
                service.findAll(tableStateToFindParams(lbTableController.state)).then(function(){
                    if (unbind) unbind();
                    console.log(tableStateToBindParams(lbTableController.state));
                    unbind = service.bindAll(tableStateToBindParams(lbTableController.state), $scope, $attrs.lbTable);
                });
            };

            // init
            lbTableController.pipe();
        }
    };
}]);
