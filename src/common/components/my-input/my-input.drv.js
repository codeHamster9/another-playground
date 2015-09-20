(function (module) {
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
      controller:'myInputController',
      controllerAs: 'vm',
      bindToController: true,
      templateUrl: 'components/my-input/my-input.tpl.html'
    };
  }
})(angular.module('ngbp'));
