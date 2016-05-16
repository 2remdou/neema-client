/**
 * Created by touremamadou on 06/05/2016.
 */

'use strict';

app.config(['RestangularProvider','UrlApi',function(RestangularProvider,UrlApi){
    RestangularProvider.setBaseUrl(UrlApi);
}]);