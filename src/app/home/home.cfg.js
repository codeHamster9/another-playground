(function (module) {

  module.config(function ($stateProvider) {
    $stateProvider.state('home', {
      url: '/home',
      views: {
        'main': {
          template: '<home-section></home-section>'
        }
      },
      resolve: {
        meta: function (buildRecipe) {
          buildRecipe.items = [{
            templateKey: 'components/my-input/my-input.tpl.html',
            title: 'First Name',
            fieldName: 'name'
          },
            {
              templateKey: 'components/my-input/my-input.tpl.html',
              title: 'Last Name',
              fieldName: 'last'
            }];
        }
      },
      data: {
        pageTitle: 'Home'
      }
    }).state('login', {
      url: '/login',
      views: {
        'main': {
          template: '<home-section></home-section>'
        }
      },
      data: {
        pageTitle: 'Login'
      }
    });
  });
}(angular.module('ngbp')));
