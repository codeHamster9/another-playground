(function (module) {
  'use strict';
  module.directive('multiCheckbox', multiCheckbox);

  function multiCheckbox() {
    return {
      scope: {
        model: '=',
        change: '&',
        placeholder: '@',
        configObj: '@'
      },
      restrict: 'E',
      controller: 'multiCheckboxController',
      controllerAs: 'vm',
      bindToController: true,
      templateUrl: 'common/components/multi-checkbox/multi-checkbox.tpl.html'
    };
  }
})(angular.module('ngbp'));
