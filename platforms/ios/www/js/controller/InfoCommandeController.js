/**
 * Created by touremamadou on 06/05/2016.
 */
'use strict';

app.controller('InfoCommandeController',
    ['$scope','SpinnerService','$state','CommandeService',
    function($scope,SpinnerService,$state,CommandeService
    ){

        CommandeService.listByUserConnected();

        SpinnerService.start();

        $scope.indexSelected = 0;

        $scope.selectCommande = function($selected){
            SpinnerService.start();
            //deselectionner le precedent, avant de recuperer le nouvel index
            $scope.commandes[$scope.indexSelected].selected = false;

            //recuperer le nouvel index
            $scope.indexSelected=_.findIndex($scope.commandes, {id: $selected});
            if($scope.indexSelected === -1) return; 

            $scope.commandes[$scope.indexSelected].selected = true;

            SpinnerService.stop();


        };

        //***************LISTENER*******************

        $scope.$on('commande.list',function(event,args){
            $scope.commandes = args.commandes;
            angular.forEach($scope.commandes,function(commande){
                commande.dureeRestant =Math.round(getDureeRestant(new Date(commande.dateCommande).getTime(),commande.durationEstimative*1000)/1000);
                
                commande.total = commande.fraisTransport;
                angular.forEach(commande.detailCommandes,function(detail){
                    commande.total += detail.prix;
                });

            });
            
            //selectionner la premiere commande par defaut
            if($scope.commandes.length !== 0)
                $scope.commandes[$scope.indexSelected].selected = true;


            SpinnerService.stop();

        });
    }]);
