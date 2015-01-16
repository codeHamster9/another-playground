(function(app) {
    app.controller('AboutController', function($scope) {

        $scope.obj = {
            name: 'idan',
            last: 'sagi',
            age: 22
        };

        $scope.msg = "call me";

        // $scope.items = [1,2,3,4,5,6,7,8,9];

        $scope.callFn = function(msg) {
            $scope.msg = msg;
        };

        $scope.$watch('obj', function(newVal, oldVal) {
            console.log(newVal.age);
        }, true);

        var init = function() {
            var ngStats = showAngularStats();

            ngStats.listeners.digestLength.nameOfYourListener = function(digestLength) {
                console.log('Digest: ' + digestLength);
            };

            ngStats.listeners.watchCount.nameOfYourListener = function(watchCount) {
                console.log('Watches: ' + watchCount);
            };

        };

        init();
    });
}(angular.module('ngbp-test.about')));
