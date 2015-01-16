(function(app) {
    app.directive('isolate', ['$timeout', function($timeout) {
        // Runs during compile
        return {
            // last: '',
            priority: 1,
            // terminal: true,
            scope: {
                obj: '=',
                fn: '&',
                text: '@'
            }, // {} = isolate, true = child, false/undefined = no change
            controller: function($scope, $element, $attrs, $transclude) {

            },
            // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
            restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
            // template: 
            templateUrl: 'about/directives/isolated-scope.tpl.html',
            replace: true,
            // transclude: true,
            // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
            link: function($scope, iElm, iAttrs, controller) {
                $scope.message = "hello";
                $scope.nutrition = {
                   name:  "potatao"
                };

            }
        };
    }]);
}(angular.module('ngbp-test.about')));
