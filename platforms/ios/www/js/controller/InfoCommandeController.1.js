/**
 * Created by touremamadou on 06/05/2016.
 */
'use strict';

app.controller('InfoCommandeController',
    ['$scope','GeoLocalisationService','SpinnerService','$ionicModal','$state','CommandeService',
    'DistanceMatrixService',
    function($scope,GeoLocalisationService,SpinnerService,$ionicModal,$state,CommandeService,
    DistanceMatrixService){

        $scope.distanceMatrixIsDefined = false;
        $scope.dureeRestant=0;

        $ionicModal.fromTemplateUrl('js/view/modalMessage.html',{
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal){
            $scope.modal = modal;
        });

        CommandeService.listByUserConnected();

        SpinnerService.start();
        GeoLocalisationService.getMap().then(function(map){
            $scope.map = map;
            SpinnerService.stop();
        },function(message){
            SpinnerService.stop();
            $scope.titreModal = 'Echec géolocalisation';
            $scope.messageModal = message;
            $scope.modal.show();
        });

        $scope.selectCommande = function($selected){
            $scope.distanceMatrixIsDefined = false;
            var index=_.findIndex($scope.commandes, {id: $selected});
            if(index === -1) return; 

            $scope.commande = $scope.commandes[index];
            $scope.detailCommandes = $scope.commande.detailCommandes;
            $scope.dureeRestant = $scope.commande.dureeRestant; 

            $scope.total = $scope.commande.fraisTransport;
            angular.forEach($scope.detailCommandes,function(detail){
                $scope.total += detail.prix;
            });

            var origin = {lat:parseFloat($scope.commande.restaurant.latitude),lng:parseFloat($scope.commande.restaurant.longitude)};
            var destination = {lat:parseFloat($scope.commande.latitude),lng:parseFloat($scope.commande.longitude)};
            
            DistanceMatrixService.getDistanceMatrix(origin,destination).then(function(distanceMatrice){
                $scope.distanceMatrixIsDefined = true;
                $scope.duration=distanceMatrice.duration.text;
                $scope.distance='('+distanceMatrice.distance.text+')';
            },function(message){
                $scope.titreModal = 'Echec lors du calcul de la distance';
                $scope.messageModal = message;
                $scope.modal.show(); 

            });

        };

        //***************LISTENER*******************

        $scope.$on('commande.list',function(event,args){
            $scope.commandes = args.commandes;
            angular.forEach($scope.commandes,function(commande){
                commande.dureeRestant =Math.round(getDureeRestant(new Date(commande.dateCommande).getTime(),commande.durationEstimative*1000)/1000);
            });

        });

        $scope.$on('$destroy', function() {
            $scope.modal.remove();
        });
        $scope.$on('modal.hidden', function() {
            $state.go('home');
        });

    }]);
