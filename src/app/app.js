(function(app) {
  'use strict';

  app.config(function($stateProvider, $urlRouterProvider, $compileProvider) {
    $urlRouterProvider.otherwise('/home');
    $compileProvider.debugInfoEnabled(true);
  });

  function decoratorTab($delegate, $controller) {
    let directive = $delegate[0];
    let ctrl = directive.controller;

    directive.controller = function() {
      if (!_.isFunction(ctrl)) {
        ctrl = $controller(ctrl);
      }

      angular.extend(this, ctrl);

      this.$$tabs = {
        set: 'sass'
      };
    };

    return $delegate;

  }

  app.run(function() {});

}(angular.module('ngbp', [
  'templates-app',
  // 'templates-common',
  'ui.router.state',
  'ui.router',
  'ui.bootstrap',
  'smart-table',
  'ngbp.tabs',
  'ui.select',
  'LocalStorageModule'
])));

