(function() {
  angular
    .module('ngbp.animateo', [])
    .component('animateSection', {
      bindings: {},
      controller: animateDomeCtrl,
      controllerAs: 'vm',
      templateUrl: 'animation-dome/animate-dome.tpl.html'
    });

  function animateDomeCtrl($state, $scope, $rootScope, $stateParams) {
    const vm = this;

    $scope.$on('$locationChangeSuccess', (event) => {
      console.log('$locationChangeSuccess', event);
      vm.url = $stateParams.id;
    });

    $scope.$on('$stateChangeStart', function(event, next, current) {
      console.log('$stateChangeStart');
    });

    $scope.$on('$stateChangeSucces', function(event, next, current) {
      console.log('$stateChangeSucces');
    });


    init();

    function init() {
      console.log('init!');
    }

    vm.clickRoute = (url) => {
      $state.go('.', { id: url }, { notify: true, reload: false });
    };
  }

})();
