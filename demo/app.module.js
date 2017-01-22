'use strict';

angular.module('lbTable.demo', [
    'ui.router',
    'js-data',
    'lbTable',
]);

angular.module('lbTable.demo').config(['$urlRouterProvider', function($urlRouterProvider){
    $urlRouterProvider.otherwise('/');
}]);

angular.module('lbTable.demo').factory('apiMiddleware', function(){
    return {
        request: function(config){
            config.url = 'http://localhost:9001/' + config.url;
            return config;
        }
    };
});

angular.module('lbTable.demo').config(['$httpProvider', function($httpProvider){
    $httpProvider.interceptors.push('apiMiddleware');
}]);

angular.module('lbTable.demo').run([function(){
    
}]);
