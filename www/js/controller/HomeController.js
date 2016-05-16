/**
 * Created by touremamadou on 06/05/2016.
 */

app.controller('HomeController',['$scope','PlatService',function($scope,PlatService){

    PlatService.list();


    //***************LISTENER*******************
    $scope.$on('plat.list',function(event,args){
        $scope.plats = args.plats;
    });
}]);