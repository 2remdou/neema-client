/**
 * Created by touremamadou on 06/05/2016.
 */

app.controller('SuiviController',
    ['$scope','GeoLocalisationService','SpinnerService','$ionicModal','$state','CommandeService',
    'DistanceMatrixService',
    function($scope,GeoLocalisationService,SpinnerService,$ionicModal,$state,CommandeService,
    DistanceMatrixService){

        $scope.distanceMatrixIsDefined = false;

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
            var commande = $scope.commandes[index];

            var coordClient = new google.maps.LatLng(commande.latitude,commande.longitude);
            var coordRestaurant = new google.maps.LatLng(commande.restaurant.latitude,commande.restaurant.longitude);
            
            var infoMarkerClient = {
                position:coordClient,
                title:'Votre position lors de la commande',
                icon:'https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld=C|FF0000|000000'
            };

            var infoMarkerRestaurant = {
                position:coordRestaurant,
                title:'La position du restaurant',
                icon:'https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld=R|FFFF00|000000'
            };



            var origin = {lat:parseFloat(commande.restaurant.latitude),lng:parseFloat(commande.restaurant.longitude)};
            var destination = {lat:parseFloat(commande.latitude),lng:parseFloat(commande.longitude)};
            
            DistanceMatrixService.getDistanceMatrix(origin,destination).then(function(distanceMatrice){
                $scope.distanceMatrixIsDefined = true;
                $scope.duration=distanceMatrice.duration;
                $scope.distance='('+distanceMatrice.distance+')';
            },function(message){
                $scope.titreModal = 'Echec lors du calcul de la distance';
                $scope.messageModal = message;
                $scope.modal.show();

            });

            GeoLocalisationService.clearAllMarker();
            

            GeoLocalisationService.addMarker(infoMarkerClient);
            GeoLocalisationService.addMarker(infoMarkerRestaurant);
        };

        //***************LISTENER*******************

        $scope.$on('commande.list',function(event,args){
            $scope.commandes = args.commandes;
        });

        $scope.$on('$destroy', function() {
            $scope.modal.remove();
        });
        $scope.$on('modal.hidden', function() {
            $state.go('home');
        });

    }]);
