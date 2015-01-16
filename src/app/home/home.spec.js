/**
 * Tests sit right alongside the file they are testing, which is more intuitive
 * and portable than separating 'src' and 'test' directories. Additionally, the
 * build process will exclude all '.spec.js' files from the build
 * automatically.
 */
describe('home section', function() {

    var HomeCtrl, $location, $scope;

    beforeEach(module('ngbp-test.home'));

    beforeEach(inject(function($controller, _$location_, $rootScope) {
        $location = _$location_;
        $scope = $rootScope.$new();
        HomeCtrl = $controller('HomeController', {
            $location: $location,
            $scope: $scope 
        });
        // spyOn(HomeCtrl, 'init');
    }));

    it('should be Defined', inject(function() {
        expect(HomeCtrl).toBeDefined();
    }));  
});
