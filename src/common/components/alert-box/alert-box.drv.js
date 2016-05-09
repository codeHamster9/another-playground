(function(module) {
  'use strict';
  module.directive('alertBox', alertBox);

  function alertBox() {
    return {
      scope           : {
        alerts     : '=',
        alertRemove: '&'
      },
      restrict        : 'E',
      controller      : 'alertBoxController',
      controllerAs    : 'vm',
      bindToController: true,
      templateUrl     : 'components/alert-box/alert-box.tpl.html',
    };
  }
})(angular.module('ngbp'));
