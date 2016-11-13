/**
 * Created by RED-DRAGON on 20/09/2015.
 */
(function(module) {
  'use strict';
  angular
    .module('ngbp.animateo', ['ui.router'])
    .config(function($stateProvider) {
      $stateProvider.state('gaia', {
        url: '/gaia?id',
        views: {
          'main': {
            template: '<animate-section></animate-section>'
          }
        },
        reloadOnSearch: false,
        resolve: {
          data: ($stateParams) => {
            console.log('hi', $stateParams.id);
            return $stateParams.id;
          }
        },
        data: {
          pageTitle: 'animate'
        }
      });
    });

})();
