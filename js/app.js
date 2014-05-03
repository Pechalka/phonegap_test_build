// angular.module is a global place for creating, registering and retrieving Angular modules
// 'directory' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'directory.services' is found in services.js
// 'directory.controllers' is found in controllers.js
angular.module('directory', [
    'ionic'
    , 'directory.services'
    , 'directory.controllers'
    ])
    .config(function ($stateProvider, $urlRouterProvider) {

        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider

            .state('login', {
                url: '/login',
                templateUrl: 'templates/login.html',
                controller: 'LoginCtrl'
            })

            .state('categories', {
                url: '/categories/:id',
                templateUrl: 'templates/categories.html',
                controller: 'CategoriesCtrl'
            })
            .state('test', {
                url: '/test',
                templateUrl: 'templates/test.html',
                controller: 'TestCtrl'
            })

            .state('map', {
                url: '/map',
                templateUrl: 'templates/map.html',
                controller: 'MapCtrl'
            })

            .state('profile', {
                url: '/profile',
                templateUrl: 'templates/profile.html',
                controller: 'ProfileCtrl'
            })
            .state('change_password', {
                url: '/change_password',
                templateUrl: 'templates/change_password.html',
                controller: 'ProfileCtrl'
            })


        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/login');


        // setTimeout(function() {
        //     navigator.splashscreen.show();
        // }, 2000);

    });


