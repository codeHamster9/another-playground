(function(app) {
    app.service('someService', ['$interval', function($interval) {
        var service = this;

        service.getMsg = function() {
            return "Hello";
        };


    }]);
}(angular.module("ngbp-test")));
