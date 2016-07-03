app
    .run(
    ['$ionicPlatform','$state','$location',function($ionicPlatform,$state,$location) {
        $ionicPlatform.ready(function() {
            if(window.cordova && window.cordova.plugins.Keyboard) {
                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

                // Don't remove this line unless you know what you are doing. It stops the viewport
                // from snapping when text inputs are focused. Ionic handles this internally for
                // a much nicer keyboard experience.
                cordova.plugins.Keyboard.disableScroll(true);
            }
            if(window.StatusBar) {
                StatusBar.styleDefault();
            }
            // $location.path('/list');

            //$state.go('commande',{idPlat:'2241ef6a-14b9-11e6-b945-e0397cc46092'});
        });


    }])
    .run(
    ['$rootScope','UserService','SpinnerService','$state',
        function($rootScope,UserService,SpinnerService,$state){

            $rootScope.userConnected = UserService.getUser();

            if(!$rootScope.userConnected) $state.go('app.login');

    }])
    .run(
    ['PopupService','$rootScope','SpinnerService',
        function(PopupService,$rootScope,SpinnerService){

            $rootScope.$on('show.message',function(event,args){
                SpinnerService.stop();
                if(!args.alert){
                    args.alert = {textAlert:'Ooops, nous allons régler ce petit souci dans quelques instants',typeAlert:'danger'}
                }
                var alert = args.alert;
                var popup = {
                    title:'Neema',
                    message:alert.textAlert,
                    cssClass:'popup'+alert.typeAlert.capitalizeFirstLetter()
                };
                PopupService.show(popup);
            });

        }])
    .run(
    ['Restangular','$state','SpinnerService',
        function(Restangular,$state,SpinnerService){
            Restangular.setErrorInterceptor(function(response, deferred, responseHandler) {

                if(response.status === 401) {
                    $state.go('app.login');
                }

                if(response.status === 409) {
                    $state.go('app.codeForActivation');
                }

                SpinnerService.stop();

            });

        }])
    .run(
    ['PanierService','$rootScope',
        function(PanierService,$rootScope){

            PanierService.getInLocalStorage();

            $rootScope.panierIsEmpty = PanierService.isEmpty;

            $rootScope.inPanier = PanierService.inPanier;
    }])

    ;


