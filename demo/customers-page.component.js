'use strict';

const customersPageComponent = lbTableDemoModule.component('customersPage', {
  template: `
    <table class="table table-bordered"
           lb-table="$ctrl.customers"
           lb-table-service="customersService"
    >
      <thead>
        <tr>
          <th lb-table-select-all></th>
          <th>#</th>
          <th lb-table-sort="first_name">First name</th>
          <th lb-table-sort="last_name">Last name</th>
          <th>&nbsp;</th>
        </tr>
        <tr>
            <th></th>
            <th></th>
            <th lb-table-filter="first_name__like"></th>
            <th lb-table-filter="last_name__like"></th>
            <th>&nbsp;</th>
        </tr>
      </thead>
      <tbody>
        <tr ng-repeat="customer in $ctrl.customers">
          <td lb-table-select-row="customer.id"></td>
          <td lb-table-row-number></td>
          <td>{{ customer.first_name }}</td>
          <td>{{ customer.last_name }}</td>
          <td>
            <a ng-click="$ctrl.onEditCustomer({customer: customer});">Edit</a>
          </td>
        </tr>
      </tbody>
    </table>
  `,
  controller: ['$scope', function($scope){
    const $ctrl = this;

    $ctrl.customers = [];

    $ctrl.onEditCustomer = function(customer){
      $ctrl.customer = customer;
    };
  }],
});
