(function(app) {

    app.config(function($stateProvider, $urlRouterProvider, $provide) {

        $urlRouterProvider.otherwise('/home');

        // $provide.decorator('datepickerDirective', function($delegate, $controller) {
        //     var directive = $delegate[0];
        //     directive.scope.data = "=";
        //     // directive.templateUrl = '';

        //     var controllerName = directive.controller;
        //     directive.controller = function($scope, $attrs, dateFilter, datepickerConfig) {
        //         console.log($scope);

        //         angular.extend(this, $controller(controllerName, {
        //             $scope: $scope,
        //             $attrs: $attrs,
        //             dateFilter: dateFilter,
        //             datepickerConfig: datepickerConfig
        //         }));

        //         console.log($scope.data);
        //         console.log($scope);


        //     };
        //     return $delegate;
        // });
    });

    app.run(function() {});

    app.controller('AppController', function($scope,$timeout,someService,$http) {
        $scope.dt = new Date();

        $scope.data = [1,2,3];
    });

}(angular.module("ngbp-test", [
    'placeholders',
    'ngbp-test.home',
    'ngbp-test.about',
    // 'ngbp-test.boot-grid',
    // 'ngbp-test.common',
    'angularStats',
    'ui.bootstrap',
    'templates-app',
    'templates-common',
    'ui.router.state',
    'ui.router'
    // 'ui.grid',
])));
