/**
 * Created by touremamadou on 16/05/2016.
 */
'use strict';
app.controller('CommandeController',
    ['$scope','PlatService','PanierService','$state','GeoLocalisationService',
        'SpinnerService','CommandeService','PopupService','DistanceMatrixService',
        function($scope,PlatService,PanierService,$state,GeoLocalisationService,
                 SpinnerService,CommandeService,PopupService,DistanceMatrixService){

            $scope.waitFinishLoading=2;
            if(PanierService.isEmpty()){
                PopupService.show(popup).then(function(res){
                    $state.go('home');
                });

            }
            $scope.commande={};
            $scope.plats = PanierService.getPanier();
            $scope.commande.restaurant = $scope.plats[0].restaurant;//car tous les plats viennent du même restaurant
            $scope.commande.telephone = $scope.userConnected.username;


            SpinnerService.start();

            var refreshCommande = function(){
                $scope.commande.total = 0;
                $scope.commande.detailCommandes = [];
                angular.forEach($scope.plats,function(plat){
                    $scope.commande.detailCommandes.push({
                        quantite:1,
                        prix:plat.prix,
                        plat:plat.id
                    });
                    $scope.commande.total += parseInt(plat.prix);

                });

                $scope.commande.total += parseInt($scope.commande.fraisTransport);
            };

            $scope.commande.fraisTransport = Math.floor(Math.random() * 15000 + 10000) ;


            GeoLocalisationService.getPosition().then(function(position){
                $scope.waitFinishLoading --;
                $scope.commande.latitude = position.coords.latitude;
                $scope.commande.longitude = position.coords.longitude; 

                //determination la distance et le temps entre le restaurant et le client

                var origin = {lat:parseFloat($scope.commande.restaurant.latitude),lng:parseFloat($scope.commande.restaurant.longitude)};
                var destination = {lat:parseFloat($scope.commande.latitude),lng:parseFloat($scope.commande.longitude)};
                DistanceMatrixService.getDistanceMatrix(origin,destination).then(function(distanceMatrice){
                    $scope.waitFinishLoading --;
                    $scope.commande.durationLivraison=distanceMatrice.duration.value;
                    $scope.commande.distance=distanceMatrice.distance.value;
                },function(message){
                    SpinnerService.stop();
                    var popup = {
                        title:'Echec lors du calcul de la distance',
                        message:message,
                        cssClass:'popupDanger'
                    };
                    PopupService.show(popup).then(function(res){
                        $state.go('home');
                    });
                });

                refreshCommande();

            },function(message){
                SpinnerService.stop();
                var popup = {
                    title:'Géolocalisation',
                    message:message,
                    cssClass:'popupDanger'
                };
                PopupService.show(popup).then(function(res){
                    $state.go('home');
                });

            });

            $scope.removeInPanier = function(plat){
                if($scope.plats.length===1){
                    $scope.clearPanier();
                    return;
                }
                var popup = {
                    title: 'Confirmation',
                    message: 'Voulez-vous retirer ce plat de la commande ?'
                };
                PopupService.confirmation(popup).then(function(res) {
                    if(res){
                        PanierService.remove(plat);
                        refreshCommande();
                    }
                });

            };

            $scope.valider = function(commande){
                var c = angular.copy(commande);
                c.restaurant = c.restaurant.id;
                SpinnerService.start();
                CommandeService.post(c);

            };

            $scope.clearPanier = function() {
                var popup = {
                    title: 'Confirmation',
                    message: 'Voulez-vous vider le panier'
                };
                PopupService.confirmation(popup).then(function(res) {
                    if(res){
                        PanierService.clear();
                        $state.go('home');
                    }
                });
            };

        $scope.$watch('waitFinishLoading', function(newValue, oldValue, scope) {
            if($scope.waitFinishLoading<=0) SpinnerService.stop();
        });



            //***************LISTENER*******************

            $scope.$on('commande.created',function(event,args){
                SpinnerService.stop();
                PanierService.clear();
                var popup = {
                    title: 'Commande',
                    message: 'Votre commande a été reçu',
                    cssClass: 'popupSuccess'
                };
                PopupService.show(popup).then(function(res) {
                    $state.go('suivi');
                });

            });

        }]);
