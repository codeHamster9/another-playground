(function(module) {
  'use strict';
  module.config(config);

  function config($stateProvider) {
    $stateProvider.state('tabs', {
        url: '/tabs',
        views: {
          main: {
            template: '<master-tab></master-tab>'
          }
        }
      })
      .state('tabs.detail', {
        url: '/detail/:id',
        template: '<detail-tab get-s="vm.getState(id)"' +
          'set-s="vm.setState(id,value)"' +
          'add-s="vm.addState()">' +
          '<my-input model="vm.model"></my-input>' +
          '</detail-tab>',

      });
  }


})(angular.module('ngbp.tabs', ['ui.router']));

