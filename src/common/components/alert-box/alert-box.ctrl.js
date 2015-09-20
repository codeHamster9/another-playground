(function (module) {
  'use strict';
  module.controller('alertBoxController', alertBoxController);

  function alertBoxController() {

    var vm = this;
    vm.closeAlert = closeAlert;

    init();

    function init() {

    }

    function closeAlert(key) {
      vm.alertRemove({alert: key});
      //delete vm.alerts[key];
    }
  }
})(angular.module('ngbp'));
