(function (module) {
  'use strict';
  module.controller('myInputController', myInputController);

  function myInputController() {

    var vm = this;
    vm.onChange = onChange;

    init();

    function init() {
    }

    function onChange() {
      vm.change({
        key: vm.placeholder,
        data: vm.model
      });
    }
  }
})(angular.module('ngbp'));
