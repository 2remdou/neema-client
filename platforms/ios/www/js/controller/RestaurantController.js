/**
 * Created by touremamadou on 16/05/2016.
 */

app.controller('DetailPlatController',
    ['$scope','PlatService','$stateParams','$state',
        function($scope,PlatService,$stateParams,$state){

            if(!$stateParams.idPlat) $state.go('home');

            PlatService.get($stateParams.idPlat).then(function(response){
                $scope.plat = response;
            },function(error){
                $state.go('home')
            });

            //***************LISTENER*******************
            $scope.$on('plat.list',function(event,args){
                $scope.plats = args.plats;
            });

}]);
