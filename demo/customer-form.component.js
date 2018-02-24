'use strict';

const customersFormComponent = lbTableDemoModule.component('customerForm', {
  template: `
    <form name="customerForm" novalidate>
      <label for="first_name">First name</label>
      <input id="first_name"
             name="first_name"
             type="text"
             ng-model="$ctrl.customer.first_name"
      />
      <label for="last_name">Last name</label>
      <input id="last_name"
             name="last_name"
             type="text"
             ng-model="$ctrl.customer.last_name"
      />
      <button type="button" ng-click="$ctrl.onSave()">Save</button>
    </form>
  `,
  controller: ['$scope', function($scope){
    const $ctrl = this;
  }],
  bindings: {
    customer: '=',
  },
});
