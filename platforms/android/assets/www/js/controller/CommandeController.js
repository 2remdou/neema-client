/**
 * Created by touremamadou on 16/05/2016.
 */
'use strict';
app.controller('CommandeController',
    ['$scope','PlatService','PanierService','$state','GeoLocalisationService',
        'SpinnerService','CommandeService','PopupService',
        function($scope,PlatService,PanierService,$state,GeoLocalisationService,
                 SpinnerService,CommandeService,PopupService){

            if(PanierService.isEmpty()){
                var popup = {
                    title:'Neema',
                    message:'Aucun plat dans la commande, Veuillez selectionner un plat',
                    cssClass:'popupInfo'
                };
                PopupService.show(popup).then(function(res){
                    $state.go('app.home');
                });

            }
            $scope.commande={};


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
                $scope.commande.latitude = position.coords.latitude;
                $scope.commande.longitude = position.coords.longitude;

                $scope.plats = PanierService.getPanier();

                refreshCommande();

                $scope.commande.telephone = $scope.userConnected.username;
                SpinnerService.stop();
            },function(message){
                SpinnerService.stop();
                var popup = {
                    title:'Géolocalisation',
                    message:message,
                    cssClass:'popupDanger'
                };
                PopupService.show(popup).then(function(res){
                    $state.go('app.home');
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
                SpinnerService.start();
                commande.restaurant = $scope.plats[0].restaurant.id;
                CommandeService.post(commande);

            };

            $scope.clearPanier = function() {
                var popup = {
                    title: 'Confirmation',
                    message: 'Voulez-vous vider le panier'
                };
                PopupService.confirmation(popup).then(function(res) {
                    if(res){
                        PanierService.clear();
                        $state.go('app.home');
                    }
                });
            };


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
                    $state.go('app.suivi');
                });

            });

        }]);