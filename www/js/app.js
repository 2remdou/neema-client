// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('neema',
    [
        'ionic',
        'ngMessages',
        'restangular',
        'ngCordova',
        'angular-jwt'
    ]);

    app
        .constant('PATHSERVER','http://localhost:8000')
        .constant('UrlApi','http://localhost:8000/api')
    ;


