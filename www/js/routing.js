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
        .state('restaurant', {
            url: '/restaurant/:idRestaurant',
            cache: enabledCache,
            templateUrl: 'js/view/restaurant.html',
            controller:'RestaurantController'
        })
        .state('commande', {
            url: '/commande/:idPlat',
            cache: enabledCache,
            templateUrl: 'js/view/commande.html',
            controller:'CommandeController'
        })
    ;
}]);