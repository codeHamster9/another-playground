(function(app) {
    'use strict';
    /*ngInject*/
    app.controller('HomeController', HomeController);

    function HomeController($scope) {

        var vm = this;

        vm.someVar = 'blue';
        vm.someList = ['one', 'two', 'three'];
        vm.someFunctionUsedByTheHomePage = someFunctionUsedByTheHomePage;
        vm.dt = new Date();

        init();

        function init() {
            // console.log(vm);
        }

        function someFunctionUsedByTheHomePage() {
            alert('Congratulations');
            // console.log(vm);
        }

    }

}(angular.module("ngbp-test.home")));
