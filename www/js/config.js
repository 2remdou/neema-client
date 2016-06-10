/**
 * Created by touremamadou on 06/05/2016.
 */

'use strict';

app
    .config(['RestangularProvider','UrlApi',function(RestangularProvider,UrlApi){
    RestangularProvider.setBaseUrl(UrlApi);
    }])
    .config(['$httpProvider','jwtInterceptorProvider',function Config($httpProvider, jwtInterceptorProvider) {
        // Please note we're annotating the function so that the $injector works when the file is minified
        jwtInterceptorProvider.tokenGetter = ['UserService', function(UserService) {
            return UserService.getToken();
        }];

        $httpProvider.interceptors.push('jwtInterceptor');
    }])


;