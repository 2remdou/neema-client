/**
 * Created by touremamadou on 23/05/2016.
 */
'use strict';

app.service('GeoLocalisationService',[
    '$cordovaGeolocation','$rootScope',
    function($cordovaGeolocation,$rootScope){

        this.getPosition = function(){
            var posOptions = {timeout: 10000, enableHighAccuracy: false};
            $cordovaGeolocation
                .getCurrentPosition(posOptions)
                .then(function (position) {
                    $rootScope.$broadcast('geolocalisation.success',{position:position});
                }, function(err) {
                    var message='';
                    if(err.code === 1){//PositionError.PERMISSION_DENIED
                        message='Veuillez nous autoriser à vous la geolocaliser, pour nous permettre d\' obtenir votre adresse de livraison';
                    }else if(err.code === 2){ //PositionError.POSITION_UNAVAILABLE
                        message='Veuillez vous connectez à internet, pour nous permettre d\'obtenir votre adresse de livraison';
                    }else if(err.code === 3){ //PositionError.TIMEOUT
                        message='Impossible de vous géolocaliser, pour nous permettre d\' obtenir votre adresse de livraison';
                    }
                    $rootScope.$broadcast('geolocalisation.error',{message:message});
                    log(err);
                });

        };
    }
]);