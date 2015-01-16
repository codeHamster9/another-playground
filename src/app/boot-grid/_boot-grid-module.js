(function(app) {
    'use strict';
    app.config(function($stateProvider,$provide) {
        $stateProvider.state('boot', {
            url: '/boot',
            views: {
                "main": {
                    controller: 'BootController as boot',
                    templateUrl: 'boot-grid/boot-grid.tpl.html'
                }
            },
            data: {
                pageTitle: 'Boot'
            }
        });

 

    });
}(angular.module('ngbp-test.boot-grid', ['ui.bootstrap'])));
