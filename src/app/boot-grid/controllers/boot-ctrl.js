(function(app) {
    'use strict';

    /*ngInject*/
    app.controller('BootController', BootController);

    function BootController($scope) {

        var vm = this;

        init();

        function init() {
            // console.log(vm);
        }

        function toggle() {
            // console.log(obj);
        }
    }
}(angular.module("ngbp-test.boot-grid")));
