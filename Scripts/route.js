/*jslint browser: true*/
/*global $, jQuery, angular */

(function () {
    'use strict';
    
    angular.module("app", ['ngRoute', 'app.controllers', 'app.service'])
        
        .config(['$routeProvider', '$locationProvider',
            function ($routeProvider, $locationProvider) {
                //$locationProvider.html5Mode(true);
                $routeProvider.
                    when('/', {
                        templateUrl: 'Views/main.cshtml',
                        controller: 'MainCtrl',
                        title: "Upload | W-Lexicon"
                    }).
                    when('/upload', {
                        templateUrl: 'Views/main.cshtml',
                        controller: 'MainCtrl',
                        title: "Upload | W-Lexicon"
                    }).
                    when('/learn', {
                        templateUrl: 'Views/learn.cshtml',
                        controller: 'LearnCtrl',
                        title: "Learn | W-Lexicon"
                    }).
                    when('/results', {
                        templateUrl: 'Views/results.cshtml',
                        controller: 'ResultsCtrl',
                        title: "Results | W-Lexicon"
                    }).
                    when('/about', {
                        templateUrl: 'Views/about.cshtml',
                        controller: 'AboutCtrl',
                        title: "About | W-Lexicon"
                    }).
                    otherwise({
                        redirectTo: '/'
                    });
            }])
        
        .run(['$location', '$rootScope', function ($location, $rootScope) {
            $rootScope.$on("$routeChangeSuccess", function (event, currentRoute, previousRoute) {
                $rootScope.title = currentRoute.title;
            });
        }]);
}());