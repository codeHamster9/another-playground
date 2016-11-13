(function() {
  angular
    .module('ngbp.animateo')
    .component('animateSection', {
      bindings: {},
      controller: animateDomeCtrl,
      controllerAs: 'vm',
      templateUrl: 'animation-dome/animate-dome.tpl.html'
    });

  function animateDomeCtrl($state, $scope, $rootScope, $stateParams) {
    const vm = this;

    $scope.$on('$locationChangeSuccess', (event) => {
      console.log('$locationChangeSuccess');
      vm.url = $stateParams.id;
    });

    init();

    function init() {
      console.log('init!');
      vm.url = $stateParams.id;
      vm.items = [1,2,3,4];

    }

    vm.clickRoute = (url) => {
      $state.go('.', { id: url });
    };
  }

})();
