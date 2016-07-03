/**
 * Created by touremamadou on 06/05/2016.
 */

app.controller('HomeController',
    ['$scope','PlatService','SpinnerService','INTERVAL_TIME_FOR_TRY_AGAIN_LOADING',
    function($scope,PlatService,SpinnerService,INTERVAL_TIME_FOR_TRY_AGAIN_LOADING){

        var page = 0;
        var allPlaIsLoaded = false;
        var timeLastLoading = new Date();
        $scope.plats = [];
        $scope.loadMore = function(){
            if(allPlaIsLoaded) {
                if(new Date().getTime() - timeLastLoading >= INTERVAL_TIME_FOR_TRY_AGAIN_LOADING){
                    allPlaIsLoaded=false;
                }else{
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                    return;
                }
            }
            SpinnerService.start();
            PlatService.listOnMenu(++page).then(function(plats){
                timeLastLoading = new Date().getTime();
                if(plats.length === 0){
                    --page;
                    allPlaIsLoaded = true;
                }
                $scope.plats = $scope.plats.concat(plats);
                $scope.$broadcast('scroll.infiniteScrollComplete');
                SpinnerService.stop();
            });
        };


        //***************LISTENER*******************

        $scope.$on('$stateChangeSuccess', function() {
            $scope.loadMore();
        });
}]);
