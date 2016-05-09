/* jshint ignore:start */
module.exports = function(karma) {
    karma.set({
        /**
         * From where to look for files, starting with the location of this file.
         */
        basePath: '../',

        /**
         * This is the list of file patterns to load into the browser during testing.
         */
        files: ['vendor/jasmine-given/dist/jasmine-given.js',
            
            'vendor/angular/angular.js',
            
            'vendor/angular-animate/angular-animate.js',
            
            'vendor/angular-sanitize/angular-sanitize.js',
            
            'vendor/angular-bootstrap/ui-bootstrap-tpls.js',
            
            'vendor/angular-ui-router/release/angular-ui-router.js',
            
            'vendor/js-data/dist/js-data.js',
            
            'vendor/js-data-angular/dist/js-data-angular.js',
            
            'vendor/lodash/lodash.js',
            
            'vendor/angular-smart-table/dist/smart-table.js',
            
            'vendor/angular-loading-bar/build/loading-bar.js',
            
            'vendor/ui-select-master/dist/select.js',
            
            'build/templates-app.js',
            
            'vendor/angular-mocks/angular-mocks.js',
            
            'src/**/*.module.js',
            'src/app/app.js',
            'src/**/*.js',
            'src/**/*.spec.js',
            'src/**/*.tpl.html'
        ],
        exclude: [
            'src/assets/**/*.js',
            'scss/**/*.*'
        ],
        frameworks: ['jasmine'],
        plugins: ['karma-jasmine',
            'karma-coverage',
            'karma-firefox-launcher',
            'karma-chrome-launcher',
            'karma-phantomjs-launcher',
            'karma-babel-preprocessor',
            'karma-ng-html2js-preprocessor'

        ],
        preprocessors: {
            'src/**/*.js': ['babel'],
            '{src,src/!(common)/**}/!(*.spec|*.module|*.drv).js': ['coverage'],
            'src/**/*.tpl.html': ['ng-html2js']
        },

        ngHtml2JsPreprocessor: {
            stripPrefix: 'src/',
            moduleName: 'templates-app'
        },

        /**
         * How to report, by default.
         */
        reporters: ['progress', 'coverage'],

        coverageReporter: {
            type: 'lcov',
            dir: 'reporter/'
        },

        /**
         * On which port should the browser connect, on which port is the test runner
         * operating, and what is the URL path for the browser to use.
         */
        port: 9018,
        runnerPort: 9100,
        urlRoot: '/',

        /**
         * Disable file watching by default.
         */
        autoWatch: true,
        colors: false,

        /**
         * The list of browsers to launch to test on. This includes only "Firefox" by
         * default, but other browser names include:
         * Chrome, ChromeCanary, Firefox, Opera, Safari, PhantomJS
         *
         * Note that you can also use the executable name of the browser, like "chromium"
         * or "firefox", but that these vary based on your operating system.
         *
         * You may also leave this blank and manually navigate your browser to
         * http://localhost:9018/ when you're running tests. The window/tab can be left
         * open and the tests will automatically occur there during the build. This has
         * the aesthetic advantage of not launching a browser every time you save.
         */
        browsers: ['PhantomJS']
    });
};
