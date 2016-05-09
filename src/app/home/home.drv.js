(function(module) {
  'use strict';
  module.directive('homeSection', homeSection);

  function homeSection() {
    return {
      scope           : {},
      restrict        : 'E',
      controller      : 'HomeController',
      controllerAs    : 'vm',
      bindToController: true,
      templateUrl     : 'home/home.tpl.html'
    };
  }
})(angular.module('ngbp'));
