describe('AppController', function() {
    describe('isCurrentUrl', function() {
        var AppCtrl, $location, $scope;

        beforeEach(angular.mock.module('ngbp-test'));

        beforeEach(inject(function($controller, _$location_, $rootScope) {
            $location = _$location_;
            $scope = $rootScope.$new();
            AppCtrl = $controller('AppController', {
                $location: $location,
                $scope: $scope
            });
        }));

         it('should be Defined', inject(function() {
            expect(AppCtrl).toBeDefined();
        }));

        it('data should be instantiated', inject(function() {
            expect($scope.data.length).toEqual(3);
        }));

         it('should pass a dummy test', inject(function() {
            expect($scope.dt).toBeDefined();
        }));
    });
});
