(function() {
  'use strict';

  function checkbox() {

    this.$onInit = () => {
      console.log('$onInit:model = ',this.model);
    };

    this.$onChanges = function(changesObj) {
      console.log('$onChanges:model = ',changesObj.model);
      console.log('$onChanges:model = ',this.model);

    };

    this.$onDestroy = function() {
      console.log('$onDestroy:model = ',this.model);
    };

  }

  function textbox() {
    const vm = this;
    vm.update = function($event) {
      vm.onChange({ model: $event.target.value });
    };
  }

  angular
    .module('ngbp')
    .component('checkBox', {
      bindings: {
        onChange: '&',
        model: '<',
        cssClass: '@'
      },
      controller: checkbox,
      controllerAs: 'vm',
      template: '<div ng-class="vm.cssClass" style="display:inline-block" ng-click="vm.onChange({model:vm.model})">\n' +
        '<input type="checkbox" ng-checked="vm.model"/>\n' +
        '<label ></label>\n' +
        '</div>'

    });

  angular
    .module('ngbp')
    .component('textBox', {
      bindings: {
        onChange: '&',
        model: '<',
        cssClass: '@'
      },
      controller: textbox,
      controllerAs: 'vm',
      template: '<input type="text" class="form-control" value="{{vm.model}}" ng-blur="vm.update($event)"/>'

    });
})();

// '<div ng-class="$ctrl.cssClass" >\n' +
//    '<input type="checkbox" id="check" checked="{{$ctrl.model}}" ng-model="$ctrl.model" ng-change="$ctrl.onChange({model:$ctrl.model})"/>\n' +
//    '<label for="check"></label>\n' +
// '</div>'
