(function(module) {
  'use strict';

  module.directive('myInput', myInput);

  function myInput() {
    return {
      scope: {
        model: '=',
        change: '&',
        placeholder: '@'
      },
      restrict: 'E',
      controller: myInputController,
      controllerAs: 'vm',
      bindToController: true,
      transclude: true,
      templateUrl: 'components/my-input/my-input.tpl.html'
    };
  }

  function myInputController() {

    var vm = this;
    vm.onChange = onChange;

    init();

    function init() {}

    function onChange() {
      vm.change({
        key: vm.placeholder,
        data: vm.model
      });
    }
  }
})(angular.module('ngbp'));

