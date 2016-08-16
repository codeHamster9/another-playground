(function() {
  'use strict';

  angular
    .module('ngbp')
    .directive('loginSection', () => {
      return {
        scope: {},
        templateUrl: 'login/login.tpl.html',
        controller: loginController,
        controllerAs: 'vm',
        bindToController: true,
        transclude: true
      };
    });

  function loginController($scope, $compile, $element) {
    const vm = this;
    vm.hello = 'hello';
    let init = () => {
      var template = '<div ng-repeat="i in [1,2,3,4]">compiled by me: {{vm.hello + ($index+1)}}</div>';
      let clone = $compile(template)($scope);

      // $element.append(clone);

    };

    init();
  }

})();
