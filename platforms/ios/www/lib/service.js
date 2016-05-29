/**
 * Created by touremamadou on 07/05/2016.
 */

app.service('CommandeService',
    ['$rootScope','Restangular',
        function($rootScope,Restangular){

            var self=this;

            var _commandeService = Restangular.all('commandes');

            this.post = function(commande){
                _commandeService.post(commande).then(function(response){
                    var alert = {textAlert:response.data.textAlert,typeAlert:response.data.typeAlert};
                    $rootScope.$broadcast('commande.created',{commande:response.data,alert:alert});
                },function(error){
                    log(error);
                    $rootScope.$broadcast('show.message',{alert:error.data});
                });
            };

            this.list = function(){
                _commandeService.getList().then(function(response){
                    $rootScope.$broadcast('commande.list',{commandes:response});
                },function(error){
                    var alert = {textAlert:error.data.textAlert,typeAlert:error.data.typeAlert};
                    $rootScope.$broadcast('show.message',{alert:error.data});
                   log(error);
                });
            };

            this.listByRestaurant = function(idRestaurant){
                _commandeService.one('restaurantConnected').customGET().then(function(response){
                    $rootScope.$broadcast('commande.list',{commandes:response.commandes});
                },function(error){
                   log(error)
                });

            };

            this.update = function(commande){
                commande.put().then(function(response){
                    $rootScope.$broadcast('commande.updated', {alert:response.data})
                },function(error){
                    log(error);
                    $rootScope.$broadcast('show.message', {alert:error.data});
                });
            };

            this.delete = function(commande){
                commande.remove().then(function(response){
                    $rootScope.$broadcast('commande.deleted', {alert:response.data})
                },function(error){
                    log(error);
                    $rootScope.$broadcast('show.message', {alert:error.data});
                })
            }
}]);
/**
 * Created by touremamadou on 07/05/2016.
 */

app.service('CommuneService',
    ['$rootScope','Restangular',
        function($rootScope,Restangular){

            var self=this;

            var _communeService = Restangular.all('communes');

            this.post = function(commune){
                _communeService.post(commune).then(function(response){
                    var alert = {textAlert:response.data.textAlert,typeAlert:response.data.typeAlert};
                    $rootScope.$broadcast('commune.created',{commune:response.data,alert:alert});
                },function(error){
                    log(error);
                    $rootScope.$broadcast('show.message',{alert:error.data});
                });
            };

            this.list = function(){
                _communeService.getList().then(function(response){
                    $rootScope.$broadcast('commune.list',{communes:response});
                },function(error){
                    var alert = {textAlert:error.data.textAlert,typeAlert:error.data.typeAlert};
                    $rootScope.$broadcast('show.message',{alert:error.data});
                    log(error);
                });
            };

            this.update = function(commune){
                commune.put().then(function(response){
                    $rootScope.$broadcast('commune.updated', {alert:response.data})
                },function(error){
                    log(error);
                    $rootScope.$broadcast('show.message', {alert:error.data});
                });
            };

            this.delete = function(commune){
                commune.remove().then(function(response){
                    $rootScope.$broadcast('commune.deleted', {alert:response.data})
                },function(error){
                    log(error);
                    $rootScope.$broadcast('show.message', {alert:error.data});
                })
            }
}]);
/**
 * Created by touremamadou on 07/05/2016.
 */

app.service('LivreurService',
    ['$rootScope','Restangular',
        function($rootScope,Restangular){

            var self=this;

            var _livreurService = Restangular.all('livreurs');

            this.post = function(livreur){
                _livreurService.post(livreur).then(function(response){
                    var alert = {textAlert:response.data.textAlert,typeAlert:response.data.typeAlert};
                    $rootScope.$broadcast('livreur.created',{livreur:response.data,alert:alert});
                },function(error){
                    log(error);
                    $rootScope.$broadcast('show.message',{alert:error.data});
                });
            };

            this.list = function(){
                _livreurService.getList().then(function(response){
                    $rootScope.$broadcast('livreur.list',{livreurs:response});
                },function(error){
                    var alert = {textAlert:error.data.textAlert,typeAlert:error.data.typeAlert};
                    $rootScope.$broadcast('show.message',{alert:error.data});
                   log(error);
                });
            };

            this.update = function(livreur){
                livreur.put().then(function(response){
                    $rootScope.$broadcast('livreur.updated', {alert:response.data})
                },function(error){
                    log(error);
                    $rootScope.$broadcast('show.message', {alert:error.data});
                });
            };

            this.delete = function(livreur){
                livreur.remove().then(function(response){
                    $rootScope.$broadcast('livreur.deleted', {alert:response.data})
                },function(error){
                    log(error);
                    $rootScope.$broadcast('show.message', {alert:error.data});
                })
            }
}]);
/**
 * Created by touremamadou on 07/05/2016.
 */

app.service('PlatService',
    ['$rootScope','Restangular',
        function($rootScope,Restangular){

            var self=this;

            var _platService = Restangular.all('plats');

            this.post = function(plat){
                _platService.post(plat).then(function(response){
                    $rootScope.$broadcast('plat.created',{plat:response.data.plat});
                },function(error){
                    log(error);
                    $rootScope.$broadcast('show.message',{alert:error.data});
                });
            };

            this.get = function(id){
                return _platService.get(id);
            };


            this.list = function(){
                _platService.customGET().then(function(response){
                //_platService.getList().then(function(response){
                    var plats = Restangular.restangularizeCollection(_platService,response.plats.data) ;
                    $rootScope.$broadcast('plat.list',{plats:plats});
                },function(error){
                    log(error);
                });
            };

            this.listByRestaurant = function(restaurant){
                _platService.customGET(null,'restaurant/'+restaurant.id).then(function(response){
                    //_platService.getList().then(function(response){
                    var plats = Restangular.restangularizeCollection(_platService,response.plats.data) ;
                    $rootScope.$broadcast('plat.list',{plats:plats});
                },function(error){
                    log(error);
                });
            };

            this.listByRestaurantByUserConnected = function(){
                _platService.customGET('restaurant/userConnected').then(function(response){
                    //_platService.getList().then(function(response){
                    var plats = Restangular.restangularizeCollection(_platService,response.plats.data) ;
                    $rootScope.$broadcast('plat.list',{plats:plats});
                },function(error){
                    log(error);
                });
            };

            this.updateMenu = function(menu){
                Restangular.one('updateMenu').customPUT({plats:menu}).then(function(response){
                    var alert = {textAlert:response.data.textAlert,typeAlert:response.data.typeAlert};
                    $rootScope.$broadcast('menu.updated',{alert:alert,fail:response.data.fail});
                },function(error){
                    var alert = {textAlert:error.data.textAlert,typeAlert:error.data.typeAlert};
                    $rootScope.$broadcast('show.message',{alert:alert});
                    log(error);
                });
            };

            this.update = function(plat){
                delete plat.image;
                delete plat.restaurant;
                plat.put().then(function(response){
                    $rootScope.$broadcast('plat.updated', {alert:response.data})
                },function(error){
                    log(error);
                    $rootScope.$broadcast('show.message', {alert:error.data});
                });
            };


        }]);
/**
 * Created by touremamadou on 07/05/2016.
 */

app.service('QuartierService',
    ['$rootScope','Restangular',
        function($rootScope,Restangular){

            var self=this;

            var _quartierService = Restangular.all('quartiers');

            this.post = function(quartier){
                quartier.commune = extractId(quartier.commune);
                _quartierService.post(quartier).then(function(response){
                    var alert = {textAlert:response.data.textAlert,typeAlert:response.data.typeAlert};
                    $rootScope.$broadcast('quartier.created',{quartier:response.data,alert:alert});
                },function(error){
                    log(error);
                    $rootScope.$broadcast('show.message',{alert:error.data});
                });
            };

            this.list = function(){
                _quartierService.getList().then(function(response){
                    $rootScope.$broadcast('quartier.list',{quartiers:response});
                },function(error){
                   log(error);
                });
            };

            this.update = function(quartier){
                quartier.commune = extractId(quartier.commune);
                quartier.put().then(function(response){
                    $rootScope.$broadcast('quartier.updated', {alert:response.data})
                },function(error){
                    log(error);
                    $rootScope.$broadcast('show.message', {alert:error.data});
                });
            };

            this.delete = function(quartier){
                quartier.remove().then(function(response){
                    $rootScope.$broadcast('quartier.deleted', {alert:response.data})
                },function(error){
                    log(error);
                    $rootScope.$broadcast('show.message', {alert:error.data});
                })
            }
}]);
/**
 * Created by touremamadou on 08/05/2016.
 */

app.service('RestaurantService',
    ['$rootScope','Restangular',
        function($rootScope,Restangular){

            var self=this;

            var _restaurantService = Restangular.all('restaurants');

            this.post = function(restaurant){
                restaurant.quartier = extractId(restaurant.quartier);
                _restaurantService.post(restaurant).then(function(response){
                    ///var alert = {textAlert:response.data.textAlert,typeAlert:response.data.typeAlert};
                    $rootScope.$broadcast('restaurant.created',{restaurant:response.data.restaurant});
                },function(error){
                    log(error);
                    $rootScope.$broadcast('show.message',{alert:error.data});
                });
            };

            this.list = function(){
                _restaurantService.getList().then(function(response){
                    log(response);
                    $rootScope.$broadcast('restaurant.list',{restaurants:response});
                },function(error){
                   log(error);
                });
            };

            this.get = function(id){
                return _restaurantService.get(id);
            };

            this.update = function(restaurant){
                restaurant.quartier = extractId(restaurant.quartier);
                restaurant.put().then(function(response){
                    $rootScope.$broadcast('restaurant.updated', {restaurant:response.data.restaurant})
                },function(error){
                    log(error);
                    $rootScope.$broadcast('show.message', {alert:error.data});
                });
            };

            this.delete = function(restaurant){
                restaurant.remove().then(function(response){
                    $rootScope.$broadcast('restaurant.deleted', {alert:response.data})
                },function(error){
                    log(error);
                    $rootScope.$broadcast('show.message', {alert:error.data});
                })
            };

            this.deleteImage = function(image){
              _restaurantService.customDELETE('image/'+image.id).then(function(response){
                  $rootScope.$broadcast('restaurant.image.deleted', {alert:response.data,image:image})
              },function(error){
                  log(error);
              });
            };
}]);
/**
 * Created by touremamadou on 10/05/2016.
 */

app.service('UploaderService',
    ['FileUploader','UserService','UrlApi',
        function(FileUploader,UserService,UrlApi){
            var that = this;

            this.getUploader = function (route) {
                return new FileUploader({
                    url : UrlApi+route,
                    headers : {
                        'Authorization': 'Bearer '+ UserService.getToken()
                    }
                });
            }
        }]);
/**
 * Created by touremamadou on 07/05/2016.
 */

app.service('UserService',
    ['$rootScope','Restangular','localStorageFactory','jwtHelper',
        function($rootScope,Restangular,localStorageFactory,jwtHelper){

            var that=this;
            var user=null;

            var _loginService = Restangular.all('users');


            this.list = function(){
                _loginService.getList().then(function(response){
                    $rootScope.$broadcast('user.list',{users:response});
                },function(error){
                    log(error);
                });
            };

            this.login = function(user){
                _loginService.one('token').post('',user).then(function(response){
                    that.setToken(response.token);
                    $rootScope.userConnnected = that.getUser();
                    $rootScope.$broadcast('user.connected',{token:response.token});
                },function(error){
                    that.clear();
                    $rootScope.$broadcast('show.message',{alert:error.data});
                });
            };

            this.inscription = function(user){
                user.restaurant = extractId(user.restaurant);
                _loginService.one('userRestaurant').post('',user).then(function(response){
                    $rootScope.$broadcast('user.registred',{alert:response.data});
                },function(error){
                    that.clear();
                    $rootScope.$broadcast('show.message',{alert:error.data});
                });
            };

            this.changePassword = function(user){
                _loginService.customPUT(user,'changePassword').then(function(response){
                    $rootScope.$broadcast('user.password.changed',{alert:response.data});
                },function(error){
                    $rootScope.$broadcast('show.message',{alert:error.data});
                });
            };

            this.reset = function(user){
                _loginService.customPUT(user,'reset/'+user.id).then(function(response){
                    $rootScope.$broadcast('user.password.reseted',{alert:response.data});
                },function(error){
                    $rootScope.$broadcast('show.message',{alert:error.data});
                });
            };

            this.get = function(id){
                return _loginService.get(id);
            };

            this.edit = function(user){
                _loginService.customPUT(user,'edit/'+user.id).then(function(response){
                    that.setToken(response.data.token);
                    var alert = {textAlert:response.data.textAlert,typeAlert:response.data.typeAlert};
                    $rootScope.$broadcast('user.edited',{user:response.data.user,alert:alert});
                },function(error){
                    $rootScope.$broadcast('show.message',{alert:error.data});
                });
            };

            this.logout = function(){
                that.clear();
                $rootScope.$broadcast('user.logout');

            };

            this.setToken = function(token){
                localStorageFactory.set('token',token);
            };

            this.getToken = function(){
                return localStorageFactory.get('token');
            };

            this.getUser= function(){
                if(user) return user; //si la fonction déja executée

                if(that.getToken()){ // si un token existe
                    tokenDecoded= jwtHelper.decodeToken(that.getToken());
                    user = {
                        id : tokenDecoded.id,
                        nom:tokenDecoded.nom,
                        prenom:tokenDecoded.prenom,
                        username:tokenDecoded.username,
                        roles : tokenDecoded.roles,
                        restaurant : tokenDecoded.restaurant
                    };
                    return user;
                }
            };

            this.getRoles = function(){
                if(user) return user.roles;
                return ['ANONYMOUS'];
            };

            this.getRefreshToken = function(){
                return localStorageFactory.get('refresh_token');
            };

            this.setRefreshToken = function(refreshToken){
                localStorageFactory.set('refresh_token',refreshToken);
            };

            this.clear = function(){
                localStorageFactory.clear();
                delete $rootScope.userConnnected;
            };

}]);
app.factory('localStorageFactory', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || null);
    },
    clear:function(){
    	$window.localStorage.clear();
    }
  }
}]);