(function(app) {

    app.config(function ($stateProvider) {
        $stateProvider.state('about', {
            url: '/about',
            views: {
                "main": {
                    controller: 'AboutController',
                    templateUrl: 'about/about.tpl.html'
                }
            },
            data:{ pageTitle: 'About' }
        });
    });

    

}(angular.module("ngbp-test.about", [
    'ui.router',
    'angularStats'
])));