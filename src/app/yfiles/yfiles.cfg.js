(function (module) {
  'use strict';

  module.config(function ($stateProvider) {
    $stateProvider.state('yfiles', {
      url: '/yfiles',
      views: {
        'main': {
          templateUrl: 'yfiles/yfiles.tpl.html',
          controller:'yfiles'
        }
      },
      resolve: {},
      data: {
        pageTitle: 'yFiles'
      }
    });
  });
}(angular.module('ngbp')));
