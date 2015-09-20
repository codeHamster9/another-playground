(function (module) {

  module.controller('HomeController', function ($scope, $timeout) {

    var vm = this;
    vm.state = {};
    vm.removeAlert = removeAlert;
    vm.changeRdy = changeRdy;
    vm.state = {};

    init();

    function init() {

      //simulate async call
      //$timeout(function () {
      //  vm.state = {};
      //  vm.state.name = 'idan';
      //  vm.state.last = 'sagi';
      //}, 3000);

    }

    function changeRdy(key, data) {

      if (angular.isArray(data) && !data.length) {
        delete vm.state[key];
      }

      $timeout(function () {
        console.log('SEND to service:', vm.state);
      }, 0);

    }

    function removeAlert(alert) {
      delete vm.state[alert];
      console.log('send to service:', vm.state);

    }
  });
}(angular.module('ngbp')));