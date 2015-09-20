(function (module) {
  'use strict';
  module.directive('tablesSection', tablesSection);

  function tablesSection() {
    return {
      scope: {},
      restrict: 'E',
      controller: 'tablesController',
      controllerAs: 'vm',
      bindToController: true,
      templateUrl: 'tables/tables.tpl.html'
    };
  }
})(angular.module('ngbp'));
