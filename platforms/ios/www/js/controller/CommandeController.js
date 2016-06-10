/**
 * Created by touremamadou on 16/05/2016.
 */
'use strict';
app.controller('CommandeController',
    ['$scope','PlatService','$stateParams','$state','GeoLocalisationService','$ionicLoading','CommandeService',
        function($scope,PlatService,$stateParams,$state,GeoLocalisationService,$ionicLoading,CommandeService){

            $scope.commande={};

            if(!$stateParams.idPlat) $state.go('app.home');

            $scope.nbreLoader = 2;
            $ionicLoading.show({
                templateUrl: 'js/view/spinner.html'
            });

            GeoLocalisationService.getPosition().then(function(position){
                $scope.nbreLoader--;
                $scope.errorGeoLocalisation = false;
                $scope.commande.latitude = position.coords.latitude;
                $scope.commande.longitude = position.coords.longitude;
            },function(message){
                $scope.nbreLoader--;
                $scope.errorGeoLocalisation = true;
                $scope.messageErrorLocalisation = message;
            });

            PlatService.get($stateParams.idPlat).then(function(response){
                $scope.nbreLoader--;
                $scope.plat = response;
                $scope.transport = Math.floor(Math.random() * 15000 + 10000) ;

                $scope.total = $scope.plat.prix+$scope.transport;

            },function(error){
                $state.go('app.home')
            });

            $scope.valider = function(commande){
                var detailCommande = {
                    quantite:1,
                    prix:$scope.plat.prix,
                    plat:$scope.plat.id
                };
                commande.detailCommandes = [detailCommande];
                commande.fraisTransport = $scope.transport;
                CommandeService.post(commande);

            };

            $scope.$watch('nbreLoader', function(newValue, oldValue, scope) {
                if($scope.nbreLoader<=0) $ionicLoading.hide();
                ;
            });



            //***************LISTENER*******************

            $scope.$on('commande.created',function(event,args){
                log(args);
            });

        }]);