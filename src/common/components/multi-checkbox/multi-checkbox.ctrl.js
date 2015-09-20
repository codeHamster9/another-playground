(function (module) {
  'use strict';
  module.controller('multiCheckboxController', multiCheckboxController);

  function multiCheckboxController($scope) {

    var vm = this;
    vm.innerState = [];
    vm.setValue = setValue;

    init();


    function init() {
      vm.innerState = _.map(vm.configObj.split(','),
          function (item) {
            return {
              label: item,
              value: false
            };
          });


      $scope.$watch(function () {
        return vm.model;
      }, function (newV, oldV) {
        if (newV === oldV) {
          return;
        }

        if (newV === undefined) {
          vm.innerState.forEach(function (state) {
            state.value = false;
          });
        }
      });
    }

    function setValue(val, idx) {

      vm.model = angular.isDefined(vm.model) ? vm.model : [];

      if (event.target.checked) {
        vm.model.push(val);
      } else {
        vm.model.splice(idx, 1);
      }

      vm.change({key: vm.placeholder, data: vm.model});
    }
  }
})(angular.module('ngbp'));
