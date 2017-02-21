'use strict';

angular.module('lbTable.demo').component('customersList', {
    template: `
        <table lb-table="customersListController.customers"
               lb-table-service="customersService"
               lb-table-select="customersListController.select"
               lb-table-filters="customersListController.filters"
               lb-table-sortable="customersListController.sort"
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
                <tr ng-repeat="customer in customersListController.customers">
                    <td lb-table-select-row="customer.id"></td>
                    <td lb-table-row-number></td>
                    <td>{{ customer.first_name }}</td>
                    <td>{{ customer.last_name }}</td>
                    <td>
                        <a ng-click="customersListController.onEditCustomer({customer: customer});">Edit</a>
                    </td>
                </tr>
            </tbody>
        </table>
    `,
    controllerAs: 'customersListController',
    controller: ['$scope', function($scope){
        let ctrl = this;

        ctrl.select = {};

        ctrl.sort = [];

        ctrl.filters = {};

        $scope.$watch('customersListController.select', function(){
            console.log('ctrl.select', ctrl.select);
        }, true);

        $scope.$watch('customersListController.sort', function(){
            console.log('ctrl.sort', ctrl.sort);
        }, true);
    }],
    bindings: {
        onEditCustomer: '&',
    },
});
