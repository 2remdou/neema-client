/**
 * Created by touremamadou on 16/05/2016.
 */

app.controller('DetailCommandeController',
    ['$scope','PlatService','$stateParams','$state',
        function($scope,PlatService,$stateParams,$state){

            if(!$stateParams.idPlat) $state.go('home');

            PlatService.get($stateParams.idPlat).then(function(response){
                $scope.plat = response;
                $scope.transport = Math.floor(Math.random() * 15000 + 10000) ;

                $scope.total = $scope.plat.prix+$scope.transport;

            },function(error){
                $state.go('home')
            });


            //***************LISTENER*******************

}]);