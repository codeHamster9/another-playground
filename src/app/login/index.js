/**
 * Created by RED-DRAGON on 20/09/2015.
 */
(function (module) {
  'use strict';

  module.config(function ($stateProvider) {
    $stateProvider.state('login', {
      url: '/login',
      views: {
        'main': {
          template: '<login-section></login-section>'
        }
      },
      data: {
        pageTitle: 'Login'
      }
    });
  });
}(angular.module('ngbp')));
