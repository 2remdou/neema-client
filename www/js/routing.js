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
            //abstract:true,
            templateUrl: 'js/view/menu.html',
            controller:'InitController'
        })
/*
        .state('app.init', {
            url: '/init',
            cache: enabledCache,
            views:{
                'menuContent':{
                    controller:'InitController'
                }
            }
        })
*/
        .state('app.inscription', {
            url: 'inscription',
            cache: enabledCache,
            views:{
                'menuContent':{
                  templateUrl: 'js/view/inscription.html',
                  controller:'InscriptionController'
              }
            }
        })
        .state('app.login', {
            url: 'login',
            cache: enabledCache,
            views:{
                'menuContent':{
                  templateUrl: 'js/view/login.html',
                  controller:'LoginController'
              }
            }
        })
        .state('app.logout', {
            url: 'login',
            cache: enabledCache,
            views:{
                'menuContent':{
                  controller:'LogoutController'
              }
            }
        })
        .state('app.forgotPassword', {
            url: 'forgotPassword',
            cache: enabledCache,
            views:{
                'menuContent':{
                  templateUrl: 'js/view/forgotPassword.html',
                  controller:'ForgotPasswordController'
              }
            }
        })
        .state('app.codeForReset', {
            url: 'codeForReset',
            cache: enabledCache,
            views:{
                'menuContent':{
                  templateUrl: 'js/view/codeForReset.html',
                  controller:'CodeForResetController'
              }
            }
        })
        .state('app.codeForActivation', {
            url: 'codeForActivation',
            cache: enabledCache,
            views:{
                'menuContent':{
                  templateUrl: 'js/view/codeForReset.html',
                  controller:'CodeForActivationController'
              }
            }
        })
        .state('app.newPassword', {
            url: 'newPassword/:telephone',
            cache: enabledCache,
            views:{
                'menuContent':{
                  templateUrl: 'js/view/newPassword.html',
                  controller:'NewPasswordController'
              }
            }
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
            url: 'commande',
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