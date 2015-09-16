xdescribe('AppController', function () {
  xdescribe('isCurrentUrl', function () {
    var AppCtrl, $location, $scope;

    beforeEach(module('ngbp'));

    beforeEach(inject(function ($controller, _$location_, $rootScope) {
      $location = _$location_;
      $scope = $rootScope.$new();
      AppCtrl = $controller('AppController', {$location: $location, $scope: $scope});
    }));

    it('should pass a dummy test', inject(function () {
      expect(AppCtrl).toBeTruthy();
    }));
  });
});

