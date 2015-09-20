(function (module) {
  'use strict';
  module.directive('smartTableWrapper', smartTableWrapper);

  function smartTableWrapper() {
    return {
      scope: {},
      restrict: 'E',
      controller: 'smartTableWrapperController',
      controllerAs: 'vm',
      bindToController: true,
      templateUrl: 'tables/smart-table/smart-table.tpl.html'
    };
  }
})(angular.module('ngbp'));
