(function(module) {
  'use strict';


  module.directive('masterTab', masterTab);

  function masterTab() {
    return {
      scope: {
        config: '@'
      },
      restrict: 'E',
      templateUrl: 'tabs/master-tab/master-tab.tpl.html',
      controller: masterTabCtrl,
      controllerAs: 'vm',
      bindToController: true
    };
  }

  function masterTabCtrl() {
    var vm = this;
    vm.tabs = [];
    vm.getState = getState;
    vm.setState = setState;
    vm.model = 'compile this(master)!';

    init();

    function init() {

      vm.availableColors = ['Red', 'Green', 'Blue', 'Yellow', 'Magenta',
                                         'Maroon', 'Umbra', 'Turquoise'];
      vm.multipleDemo = {};
      vm.multipleDemo.colors = ['Blue', 'Red'];

      vm.tabs.push({
        id: 1,
        state: false,
        title: 'idan',
        class: '"btn-warning"'
      }, {
        id: 2,
        state: false,
        title: 'sagi',
        class: '"btn-danger"'
      });
    }

    function setState(id, value) {
      vm.tabs[id - 1].state = value;
      return angular.copy(vm.tabs[id - 1]);
    }

    function getState(id) {
      return angular.copy(vm.tabs[id - 1]);
    }
  }

})(angular.module('ngbp.tabs'));
