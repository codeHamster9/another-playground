(function(module) {
  'use strict';
  module.controller('yfiles', yfiles);

  function yfiles($scope) {

    const vm = this;
    vm.selectedAccount = null;

    $scope.nodesFilter = null;

    vm.select = (key, arr) => {

      $scope.nodesModel = arr[vm.selectedAccount.name];
      $scope.nodesModel = $scope.nodesModel[key];
      $scope.nodesFilter = key;

    };

    vm.getLength = val => {
      return Object.keys(val).length;

    };

    init();

    if (true) return

    function init() {
      $scope.nodesModel = nodeData;
      $scope.edgesModel = edgeData;
      $scope.groupsData = groupsData;

      $scope.$watch('currentNode', function(newValue, oldValue, scope) {
        console.log(newValue);
      });
      nodeData.forEach(item => {
        item.icon = 'assets/AWS_Simple_Icons_Virtual_Private_Cloud.svg';
      });

      let accounts = _(nodeData).groupBy('cloudAccountId').value();
      let regions = _(nodeData).groupBy('region').value();

      var groupedAcc = {};
      var groupedReg = {};

      for (let acc in regions) {
        groupedReg[acc] = _.groupBy(regions[acc], 'cloudAccountId');
      }

      for (let acc in accounts) {
        groupedAcc[acc] = _.groupBy(accounts[acc], 'region');
      }
      vm.accounts = groupedAcc;
      vm.regions = groupedReg;
      vm.regKeys = _.keys(vm.regions);
      vm.accKeys = _.keys(vm.accounts);
      console.log('accKeys ', vm.accKeys);
    }
  }
})(angular.module('ngbp'));
