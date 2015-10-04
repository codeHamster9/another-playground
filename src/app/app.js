(function (app) {

  app.config(function ($stateProvider, $urlRouterProvider, $compileProvider) {
    $urlRouterProvider.otherwise('/home');
    $compileProvider.debugInfoEnabled(false);
  });

  app.run(function () {
  });

}(angular.module('ngbp', [
  'templates-app',
  'templates-common',
  'ui.router.state',
  'ui.router',
  'ui.bootstrap',
  'smart-table'
])));
