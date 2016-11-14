(function(module) {
  'use strict';

  module.config(function($stateProvider) {
    $stateProvider.state('home', {
      url: '/home',
      views: {
        'main': {
          template: '<home-section></home-section>'
        }
      },
      resolve: {
        meta: function(buildRecipe) {
          buildRecipe.items = [{
            templateKey: '<my-input></my-input>',
            title: 'First Name',
            fieldName: 'name'
          }, {
            templateKey: '<my-input></my-input>',
            title: 'Last Name',
            fieldName: 'last'
          }, {
            templateKey: '<multi-checkbox></multi-checkbox>',
            title: 'priority',
            fieldName: 'priority',
            configObj: ['low', 'mid', 'heavy']
          }];
        }
      },
      data: {
        pageTitle: 'Home'
      }
    });
  });
}(angular.module('ngbp')));
