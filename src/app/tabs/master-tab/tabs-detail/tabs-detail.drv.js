(function(module) {
  'use strict';

  module.directive('detailTab', detailTab);

  function detailTab() {
    return {
      scope: {
        getS: '&',
        setS: '&',
        add: '&'
      },
      templateUrl: 'tabs/master-tab/tabs-detail/detail-tab.tpl.html',
      controller: detailTabCtrl,
      controllerAs: 'vm',
      bindToController: true,
      transclude: true
    };
  }

  function detailTabCtrl($scope,$stateParams,$element,$transclude,$compile) {
    var vm = this;
    vm.changeState = changeState;
    vm.model = 'compile this(details)!';
    vm.api = {
      changeMe: changeState
    };

    init();

    function init() {

      vm.tab = vm.getS({
        id: $stateParams.id
      });
      console.log(vm.tab);
      // let newScope = $scope.$new();

      let destination = $element.find('section');

      let clonFn = function(clone, $scope) {

        let directiveName = _.camelCase(clone[0].tagName);

        // angular.module('ngbp')
        //   .decorator(directiveName, decoratorTab);

        // destination.append('<my-input model="vm.model"></my-input>');
        destination.append(clone);
      };

      $transclude($scope, clonFn);

      // destination.append($transclude($scope));
      // $compile(destination)($scope);
    }

    function changeState() {
      vm.tab = vm.setS({
        id: $stateParams.id,
        value: !vm.tab.state
      });
      console.log(vm.tab);
    }

    function decoratorTab($delegate, $controller) {
      let directive = $delegate[0];
      let ctrl = directive.controller;

      directive.controller = function() {
        if (!_.isFunction(ctrl)) {
          ctrl = $controller(ctrl);
        }

        angular.extend(this, ctrl);

        this.$$tabs = {
          set: changeState
        };
      };

      return $delegate;

    }
  }
})(angular.module('ngbp.tabs'));

