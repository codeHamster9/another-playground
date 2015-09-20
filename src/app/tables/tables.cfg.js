/**
 * Created by RED-DRAGON on 20/09/2015.
 */
(function (module) {

  module.config(function ($stateProvider) {
    $stateProvider.state('tables', {
      url: '/tables',
      views: {
        'main': {
          template: '<tables-section></tables-section>'
        }
      },
      data: {
        pageTitle: 'Home'
      }
    });
  });
}(angular.module('ngbp')));
