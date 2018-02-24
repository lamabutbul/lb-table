'use strict';

const customersService = lbTableDemoModule.service('customersService', [
  '$http', 
  function($http){
    function findAll(params) {
      return $http.get('customers', params).then(
        function(e) {
          console.log(e);
          return e.data;
        },
        function(e) {
          console.error(e);
        }
      );
    }

    return {
      findAll: findAll,
    };
  },
]);
