(function (app) {

  app.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');
  });

  app.run(function () {
  });

}(angular.module('ngbp', [
  'templates-app',
  'templates-common',
  'ui.router.state',
  'ui.router',
])));
