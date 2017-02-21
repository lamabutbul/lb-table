'use strict';

angular.module('lbTable.demo').component('customers', {
    template: `
        <customers-list on-edit-customer="customersController.onEditCustomer(customer)"></customers-list>
        <customer-form customer="customersController.customer"></customer-form>
    `,
    controllerAs: 'customersController',
    controller: ['$scope', function($scope){
        let ctrl = this;

        ctrl.onEditCustomer = function(customer){
            ctrl.customer = customer;
        };
    }],
});
