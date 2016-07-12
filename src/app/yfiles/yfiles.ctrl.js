(function(module) {
  'use strict';
  module.controller('yfiles', yfiles);

  function yfiles($scope) {

    $scope.hello = 'world';
    $scope.nodesModel = nodeData;
    $scope.edgesModel = edgeData;
    // $scope.groupsData = groupsData;

    init();

    function init() {

    }
  }
})(angular.module('ngbp'));
