/**
 * Created by touremamadou on 06/05/2016.
 */
'use strict';

app.config(['$stateProvider',function($stateProvider) {
    var enabledCache = false;
    $stateProvider
        .state('home', {
            url: '/',
            cache: enabledCache,
            templateUrl: 'js/view/home.html',
            controller:'HomeController'
        })
        .state('detailPlat', {
            url: '/detailPlat/:idPlat',
            cache: enabledCache,
            templateUrl: 'js/view/detailPlat.html',
            controller:'DetailPlatController'
        })
    ;
}]);