/**
 * Created by touremamadou on 16/05/2016.
 */

'use strict';
app.controller('PlatController',
    ['$scope','PlatService','$stateParams','$state','PanierService',
        function($scope,PlatService,$stateParams,$state,PanierService){

            if(!$stateParams.idPlat) $state.go('app.home');

            PlatService.get($stateParams.idPlat).then(function(response){
                $scope.plat = response;
            },function(error){
                $state.go('app.home')
            });

            $scope.addInPanier = function(plat){
                PanierService.add(plat);
            };

            $scope.removeInPanier = function(plat){
                PanierService.remove(plat);
            };

            //***************LISTENER*******************
            $scope.$on('plat.list',function(event,args){
                $scope.plats = args.plats;
            });

}]);