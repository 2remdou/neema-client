/**
 * Created by touremamadou on 06/05/2016.
 */
'use strict';

app.config(['$stateProvider',function($stateProvider) {
    var enabledCache = false;
    $stateProvider
        .state('app', {
            url: '/',
            cache: enabledCache,
            abstract:true,
            templateUrl: 'js/view/menu.html'
        })
        .state('app.home', {
            url: 'list',
            cache: enabledCache,
            views:{
                'menuContent':{
                  templateUrl: 'js/view/home.html',
                  controller:'HomeController'
              }
            }
        })
        .state('app.plat', {
            url: 'plat/:idPlat',
            cache: enabledCache,
            views:{
                'menuContent':{
                    templateUrl: 'js/view/plat.html',
                    controller:'PlatController'
                }
            }
        })
        .state('app.restaurant', {
            url: 'restaurant/:idRestaurant',
            cache: enabledCache,
            views:{
                'menuContent':{
                    templateUrl: 'js/view/restaurant.html',
                    controller:'RestaurantController'
                }
            }
        })
        .state('app.commande', {
            url: 'commande/:idPlat',
            cache: enabledCache,
            views:{
                'menuContent':{
                    templateUrl: 'js/view/commande.html',
                    controller:'CommandeController'
                }
            }
        })
        .state('app.suivi', {
            url: 'suivi',
            cache: enabledCache,
            views:{
                'menuContent':{
                    templateUrl: 'js/view/suivi.html',
                    controller:'SuiviController'
                }
            }
        })
    ;
}]);