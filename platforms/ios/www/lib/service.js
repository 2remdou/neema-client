/**
 * Created by mdoutoure on 24/11/2015.
 */
'use strict';

var displayAlert = function(message,typeAlert,scope){
    var response={};
    response.data = [{texte:message,'typeAlert':typeAlert}];
    successRequest(response,scope);

};
var successRequest = function(response,scope){
    scope.$emit('showMessage',response.data);
};

var log = function(message){
    console.log(message);
};


var extractId = function(object){
    if(typeof object != "undefined" && object){
        if(object.hasOwnProperty('id')){
            return object.id;
        }
    }
    return null;
};

var deleteProperty = function(object,property){
    if(object.hasOwnProperty(property)){
        delete  object[property];
    }
};

var isDefined = function(object){
    return angular.isDefined(object);
};

/**
 * Mettre la première lettre en majuscule
 * @returns {string}
 */
String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};
/**
 *
 * @param dateOperation la date de debut de l'operation(en milliseconde)
 * @param dureeOperation le temps prevu pour l'operation(en milliseconde)
 *
 * @return dureeRestant(en milliseconde)
 */
var getDureeRestant = function(dateOperation,dureeOperation){
    var dateActuel = new Date().getTime();
    var tempsEcoule = dateActuel-dateOperation;
    var dureeRestant = dureeOperation - tempsEcoule;

    return dureeRestant<0?0:dureeRestant;

};
/**
 * Created by touremamadou on 06/06/2016.
 */
'use strict';

app.filter('conversion',function(){
    return function(value,uniteSource,uniteDestination){
            switch (uniteSource) {
                case 'second':
                    switch (uniteDestination) {
                        case 'minute':
                                value = Math.round(value/60)+' minutes';
                            break;
                        default:
                            break;
                    }
                    break;

                case 'minute':
                    switch (uniteDestination) {
                        case 'second':
                                value = Math.round(value*60)+' secondes';
                            break;
                        default:
                            break;
                    }
                    break;

                case 'metre':
                    switch (uniteDestination) {
                        case 'km':
                                value = Math.round(value/1000)+' km';
                            break;
                        default:
                            break;
                    }
                    break;

                case 'km':
                    switch (uniteDestination) {
                        case 'metre':
                                value = Math.round(value*1000)+' m';
                            break;
                        default:
                            break;
                    }
                    break;
                default:
                    break;

            }
            return value;

    }

});
/**
 * Created by touremamadou on 06/06/2016.
 */
'use strict';

app.filter('montant',function(){
    return function numberFormat(_montant) {
        var _sep=' ';
        _montant = typeof _montant != "undefined" && _montant > 0 ? _montant : "";
        _montant = _montant.toString();
        _montant = _montant.replace(new RegExp("^(\\d{" + (_montant.length%3? _montant.length%3:0) + "})(\\d{3})", "g"), "$1 $2").replace(/(\d{3})+?/gi, "$1 ").trim();
        if(typeof _sep != "undefined" && _sep != " ") {
            _montant = _montant.replace(/\s/g, _sep);
        }
        return _montant+' GNF';
    }
});
/**
 * Created by touremamadou on 02/10/2015.
 */
'use strict';

app.directive('neemaColorTimer', [function() {
    return {
        restrict: 'AE',
        scope:{
            minute:'=',
            seconde: '='
        },
        controller:['$scope','$element','$attrs',function($scope,$element,$attrs){
           $scope.$watch('minute',function(newValue,oldValue){
               if(newValue <= 5){
                   $element.css('color','red');
               }
           });
        }]
    };
}]);
/**
 * Created by mdoutoure on 30/10/2015.
 */
'use strict';

app.directive('ntBtnImage',[function(){
   return {
       restrict: 'A',
       scope: {
         cible: '@',
         replace: '@'
       },
       link : function(scope,element,attributes){
            element.on('click',function(e){
                var cible = $('#'+attributes.cible);
                var replace = $('#'+attributes.replace);
                $(cible).trigger('click');
                $(replace).remove();
                e.preventDefault();
            });
       }
   }
}]);
/**
 * Created by touremamadou on 02/10/2015.
 */
'use strict';

app.directive('ngThumb', ['$window', function($window) {
    var helper = {
        support: !!($window.FileReader && $window.CanvasRenderingContext2D),
        isFile: function(item) {
            return angular.isObject(item) && item instanceof $window.File;
        },
        isImage: function(file) {
            var type =  '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
            return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
        }
    };

    return {
        restrict: 'A',
        template: '<canvas></canvas>',
        link: function(scope, element, attributes) {
            if (!helper.support) return;

            var params = scope.$eval(attributes.ngThumb);

            if (!helper.isFile(params.file)) return;
            if (!helper.isImage(params.file)) return;

            var canvas = element.find('canvas');
            var reader = new FileReader();

            reader.onload = onLoadFile;
            reader.readAsDataURL(params.file);

            function onLoadFile(event) {
                var img = new Image();
                img.onload = onLoadImage;
                img.src = event.target.result;
            }

            function onLoadImage() {
                var width = params.width || this.width / this.height * params.height;
                var height = params.height || this.height / this.width * params.width;
                canvas.attr({ width: width, height: height });
                canvas[0].getContext('2d').drawImage(this, 0, 0, width, height);
            }
        }
    };
}]);
/**
 * Created by touremamadou on 07/05/2016.
 */

'use strict';

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
                    $rootScope.$broadcast('commande.list',{commandes:response.commandes});
                },function(error){
                    var alert = {textAlert:error.data.textAlert,typeAlert:error.data.typeAlert};
                    $rootScope.$broadcast('show.message',{alert:error.data});
                   log(error);
                });
            };

            this.listByRestaurant = function(){
                _commandeService.one('restaurantConnected').customGET().then(function(response){
                    $rootScope.$broadcast('commande.list',{commandes:response});
                },function(error){
                    log(error)
                    $rootScope.$broadcast('show.message',{alert:error.data});
                });

            };

            this.listByUserConnected = function(){
                _commandeService.one('userConnected').getList().then(function(response){
                    $rootScope.$broadcast('commande.list',{commandes:response});
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

'use strict';


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

'use strict';


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

'use strict';


app.service('PlatService',
    ['$rootScope','Restangular','$q',
        function($rootScope,Restangular,$q){

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
                _platService.getList().then(function(response){
                    $rootScope.$broadcast('plat.list',{plats:response});
                },function(error){
                    log(error);
                });
            };

            this.listOnMenu = function(page){
                var deffered = $q.defer();
                _platService.one('onMenu').getList(null,{page:page}).then(function(response){
                    $rootScope.$broadcast('plat.list',{plats:response});
                    deffered.resolve(response);
                },function(error){
                    deffered.reject(error);
                    log(error);
                });
                return deffered.promise;
            };

            this.listByRestaurant = function(restaurant){
                _platService.customGET(null,'restaurant/'+restaurant.id).then(function(response){
                    //_platService.getList().then(function(response){
                    var plats = Restangular.restangularizeCollection(_platService,response.plats);
                    $rootScope.$broadcast('plat.list',{plats:plats});
                },function(error){
                    $rootScope.$broadcast('show.message',{alert:error.data});
                    log(error);
                });
            };

            this.listByRestaurantByUserConnected = function(){
                _platService.one('restaurant/userConnected').getList().then(function(response){
                    $rootScope.$broadcast('plat.list',{plats:response});
                },function(error){
                    $rootScope.$broadcast('show.message',{alert:error.data});
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

'use strict';


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
                    $rootScope.$broadcast('show.message',{alert:error.data});
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

'use strict';

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
                    $rootScope.$broadcast('restaurant.list',{restaurants:response});
                },function(error){
                    $rootScope.$broadcast('show.message',{alert:error.data});
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

'use strict';


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

'use strict';

app.service('UserService',
    ['$rootScope','Restangular','localStorageFactory','jwtHelper','$q',
        function($rootScope,Restangular,localStorageFactory,jwtHelper,$q){

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
                    that.setRefreshToken(response.refresh_token);
                    $rootScope.userConnnected = that.getUser();
                    $rootScope.$broadcast('user.connected',{token:response.token});
                },function(error){
                    that.clear();
                    $rootScope.$broadcast('show.message',{alert:error.data});
                });
            };

            this.refreshToken = function(){
                var deffered = $q.defer();
                _loginService.one('token/refresh').post('',{refresh_token:that.getRefreshToken()}).then(function(response){
                    that.setToken(response.token);
                    that.setRefreshToken(response.refresh_token);
                    deffered.resolve(response);
                },function(error){
                    deffered.reject(error);
                });
                return deffered.promise;
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

            this.inscriptionClient = function(user){
                _loginService.post(user).then(function(response){
                    that.setToken(response.data.token);
                    $rootScope.userConnnected = that.getUser();
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

            this.newPassword = function(username,newPassword,confirmationPassword){
                _loginService.customPUT({username:username,newPassword:newPassword,confirmationPassword:confirmationPassword},'newPassword').then(function(response){
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

            this.resetClient = function(user){
                _loginService.customPUT(null,'resetClient/'+user.telephone).then(function(response){
                    $rootScope.$broadcast('user.password.reseted',{alert:response.data});
                },function(error){
                    $rootScope.$broadcast('show.message',{alert:error.data});
                });
            };

            this.enabled = function(code){
                _loginService.customPUT(code,'enabled').then(function(response){
                    $rootScope.$broadcast('user.account.enabled',{alert:response.data});
                },function(error){
                    $rootScope.$broadcast('show.message',{alert:error.data});
                });
            };

            this.sendBackCodeActivation = function(telephone){
                _loginService.customPUT({username:telephone},'sendBackActivationCode').then(function(response){
                    $rootScope.$broadcast('user.code.sendback',{alert:response.data});
                },function(error){
                    $rootScope.$broadcast('show.message',{alert:error.data});
                });
            };

            this.checkCode = function(telephone,code){
                _loginService.customPUT({username:telephone,code:code},'checkCode').then(function(response){
                    $rootScope.$broadcast('user.code.checked',{alert:response.data});
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
                    var tokenDecoded= jwtHelper.decodeToken(that.getToken());
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
                user = null;
                delete $rootScope.userConnnected;
            };

}]);

'use strict';


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
    setArray: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getArray: function(key) {
        if($window.localStorage[key]) return JSON.parse($window.localStorage[key]);

        return [];
    },
    clear:function(){
    	$window.localStorage.clear();
    }
  }
}]);