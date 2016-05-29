/**
 * Created by touremamadou on 16/05/2016.
 */
'use strict';
app.controller('CommandeController',
    ['$scope','PlatService','$stateParams','$state','GeoLocalisationService','$ionicLoading',
        function($scope,PlatService,$stateParams,$state,GeoLocalisationService,$ionicLoading){

            $scope.commande={};

            //if(!$stateParams.idPlat) $state.go('home');

            //$scope.nbreLoader = 2;
            //$ionicLoading.show({
            //    templateUrl: 'js/view/spinner.html'
            //});

            GeoLocalisationService.getPosition();
/*
            PlatService.get($stateParams.idPlat).then(function(response){
                $scope.nbreLoader--;
                $scope.plat = response;
                $scope.transport = Math.floor(Math.random() * 15000 + 10000) ;

                $scope.total = $scope.plat.prix+$scope.transport;

            },function(error){
                $state.go('home')
            });

            $scope.valider = function(commande){

            };

            $scope.$watch('nbreLoader', function(newValue, oldValue, scope) {
                if($scope.nbreLoader<=0) $ionicLoading.hide();
                ;
            });
*/



            //***************LISTENER*******************

            $scope.$on('geolocalisation.success',function(event,args){
                $scope.errorGeoLocalisation = true;
                $scope.messageErrorLocalisation = args.position.coords.latitude+','+args.position.coords.longitude;
                $scope.nbreLoader--;
                //$scope.errorGeoLocalisation = false;
                $scope.commande.latitude = args.position.coords.latitude;
                $scope.commande.longitude = args.position.coords.longitude;
            });
            $scope.$on('geolocalisation.error',function(event,args){
                $scope.errorGeoLocalisation = true;
                $scope.messageErrorLocalisation = args.message;
                $ionicLoading.hide();
            });

}]);