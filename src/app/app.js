    (function(app) {
      'use strict';

      app.config(function($stateProvider, $urlRouterProvider, $compileProvider) {
        $urlRouterProvider.otherwise('/yfiles');
        $compileProvider.debugInfoEnabled(true);

      });

      function decoratorTab($delegate, $controller) {
        let directive = $delegate[0];
        let ctrl = directive.controller;

        directive.controller = function() {

          if (!_.isFunction(ctrl)) ctrl = $controller(ctrl);

          angular.extend(this, ctrl);

          this.$$tabs = { set: 'sass' };
        };

        return $delegate;

      }

      app.run(function(gettextCatalog, $rootScope) {
        gettextCatalog.debug = true;
        gettextCatalog.setStrings("he_IL", { 'lang1': 'אנגלית', 'lang2': 'עיברית','lang3':'גרמנית' });
        gettextCatalog.setStrings("en", { 'lang1':'english', 'lang2':'hebrew','lang3':'german' });
        gettextCatalog.setCurrentLanguage('en');
      });

    }(angular.module('ngbp', [
      'templates-app',
      'templates-common',
      'ngbp.animateo',
      'ngAnimate',
      'ui.router.state',
      'ui.router',
      'ui.bootstrap',
      'smart-table',
      'ngbp.tabs',
      'LocalStorageModule',
      'gettext'
    ])));
