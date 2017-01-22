'use strict';

angular.module('lbTable.demo').component('customers', {
    template: `
        <table lb-table="customersController.customers"
               lb-table-service="customersService"
               lb-table-select="customersController.select"
               lb-table-filters="customersController.filters"
        >
            <head>
                <tr>
                    <th lb-table-select-all></th>
                    <th>#</th>
                    <th>First name</th>
                    <th>Last name</th>
                </tr>
                <tr>
                    <th></th>
                    <th></th>
                    <th lb-table-filter="first_name__like"></th>
                    <th lb-table-filter="last_name__like"></th>
                </tr>
            </thead>
            <tbody>
                <tr ng-repeat="customer in customersController.customers">
                    <td lb-table-select-row="customer.id"></td>
                    <td lb-table-row-number></td>
                    <td>{{ customer.first_name }}</td>
                    <td>{{ customer.last_name }}</td>
                </tr>
            </tbody>
        </table>
    `,
    controllerAs: 'customersController',
    controller: ['$scope', function($scope){
        var ctrl = this;

        ctrl.select = {};

        ctrl.filters = {};

        $scope.$watch('customersController.select', function(){
            console.log(ctrl.select);
        }, true);
    }],
});
