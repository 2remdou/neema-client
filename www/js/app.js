// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('neema',
    [
        'ionic',
        'restangular',
        'ngCordova'
    ])
        .constant('PATHSERVER','http://localhost:8000')
        .constant('UrlApi','http://localhost:8000/api')
    .run(['$ionicPlatform','$state',function($ionicPlatform,$state) {
        $ionicPlatform.ready(function() {
            if(window.cordova && window.cordova.plugins.Keyboard) {
                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

                // Don't remove this line unless you know what you are doing. It stops the viewport
                // from snapping when text inputs are focused. Ionic handles this internally for
                // a much nicer keyboard experience.
                cordova.plugins.Keyboard.disableScroll(true);
            }
            if(window.StatusBar) {
                StatusBar.styleDefault();
            }

            $state.go('commande',{idPlat:'2241ef6a-14b9-11e6-b945-e0397cc46092'});
        });


    }])
        .run(['PATHSERVER','$rootScope',function(PATHSERVER,$rootScope){
            $rootScope.pathServer = PATHSERVER;
        }])
    ;


