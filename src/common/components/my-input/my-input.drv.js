(function (module) {
  'use strict';

  module.directive('myInput', function () {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'components/my-input/my-input.tpl.html'
    };
  });
})(angular.module('ngbp'));
