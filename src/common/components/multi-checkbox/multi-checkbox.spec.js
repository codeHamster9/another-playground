'use strict';

describe('components', function() {
    describe('multi-checkbox', function() {

        var element,
            controller;

        beforeEach(module('ngbp'));

        beforeEach(inject(function($rootScope, $compile) {
            var scope = $rootScope.$new();
            scope.outerModel = { name: 'hello' };
            scope.config = 'idan,yair';
            scope.cb = function() { console.log('click'); };

            element = angular.element('<multi-checkbox model="outerModel" change="cb" config-obj="config"></multi-checkbox>'); //jshint ignore:line
            $compile(element)(scope);
            scope.$digest();

        }));

        it('should compile the directive', function(done) {
            expect(element[0].children.length).toBeGreaterThan(0);
        });
    });
});
