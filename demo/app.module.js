'use strict';

const lbTableDemoModule = angular.module('lbTable.demo', [
  'ui.router',
  'lbTable',
]);

lbTableDemoModule.config(['$httpProvider', '$urlRouterProvider', '$stateProvider', function($httpProvider, $urlRouterProvider, $stateProvider){
  $httpProvider.interceptors.push('apiMiddleware');
  
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('customers', {
      url: '/',
      template: '<customers-page></customers-page>',
    })
  ;
}]);

lbTableDemoModule.factory('apiMiddleware', function(){
  return {
    request: function(config){
      config.url = 'http://localhost:9001/' + config.url;
      return config;
    }
  };
});

lbTableDemoModule.run([function(){
  
}]);
