(function() {

    var tokenService = function($http){

        var getToken = function(id, vrstaVpisa){
            return $http.get("/api/v1/zeton/" + id + "?vrsta-vpisa=" + vrstaVpisa);
        };

        var deleteToken = function(id, vrstaVpisa){
            return $http.delete("/api/v1/zeton/" + id + "?vrsta-vpisa=" + vrstaVpisa);
        };

        var putToken = function(id, vrstaVpisa, data){
            console.log("data to send");
            console.log(data);;
            return $http.put("/api/v1/zeton/" + id + "?vrsta-vpisa=" + vrstaVpisa, data);
        };

        var getTokens = function(id){
            if (id != null)
                return $http.get("/api/v1/zeton/" + id);
            return $http.get("/api/v1/zeton");
        };

        var postToken = function(id){
            return $http.post("/api/v1/zeton/" + id);
        };

        var message = null;

        var getMessage = function(){
            return message;
        };

        var setMessage = function(m){
            message = m;
        };

        return{
            postToken: postToken,
            putToken: putToken,
            getToken: getToken,
            getTokens: getTokens,
            deleteToken: deleteToken,
            setMessage: setMessage,
            getMessage: getMessage
        };
    };

    tokenService.$inject = ["$http"];

    angular
        .module('studis')
        .service('tokenService', tokenService);
})();