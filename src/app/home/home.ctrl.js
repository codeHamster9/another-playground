(function (module) {

  module.controller('HomeController', function ($scope, $timeout) {

    var vm = this;
    vm.items = undefined;

    init();

    function init() {
      $scope.$watch(function () {
        return vm.items;
      }, function (newV, oldV) {
        if (!oldV) {
          return;
        }
        console.log('call some srv with newV', newV);
      }, true);

      //simulate async call
      $timeout(function () {
        vm.items = {};
        vm.items.name = 'idan';
        vm.items.last = 'sagi';
      }, 3000);
    }
  });
}(angular.module('ngbp')));