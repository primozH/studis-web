
var tokenService = function($http){

    var getToken = function(id, vrstaVpisa){
        return $http.get("http://localhost:8080/api/v1/zeton/" + id + "?vrsta-vpisa=" + vrstaVpisa);
    };

    var deleteToken = function(id, vrstaVpisa){
        return $http.delete("localhost:8080/api/v1/zeton?student=" + id + "&vrsta-vpisa=" + vrstaVpisa);
    };

    var updateToken = function(id){
        return $http.put("http://localhost:8080/api/v1/zeton/" + id);
    };

    var getTokens = function(){
        return $http.get("http://localhost:8080/api/v1/zeton");
    };

    return{
        updateToken: updateToken,
        getToken: getToken,
        getTokens: getTokens,
        deleteToken: deleteToken
    };
};


angular
    .module('studis')
    .service('tokenService', tokenService);