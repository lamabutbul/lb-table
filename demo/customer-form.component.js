'use strict';

angular.module('lbTable.demo').component('customerForm', {
    template: `
        <form name="customerForm" novalidate>
            <label for="first_name">First name</label>
            <input id="first_name"
                   name="first_name"
                   type="text"
                   ng-model="customerFormController.customer.first_name"
            />
            <label for="last_name">Last name</label>
            <input id="last_name"
                   name="last_name"
                   type="text"
                   ng-model="customerFormController.customer.last_name"
            />
            <button type="button" ng-click="customerFormController.onSave()">Save</button>
        </form>
    `,
    controllerAs: 'customerFormController',
    controller: ['$scope', function($scope){
        let ctrl = this;
    }],
    bindings: {
        customer: '=',
    },
});
