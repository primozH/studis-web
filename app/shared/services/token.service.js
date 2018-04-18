(function() {

    var tokenService = function($http, $window){

        var token;

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

        var getTokens = function(id, izkoriscen){
            var path = "/api/v1/zeton";
            if (id != null) {
                path += "/" + id;
                if (izkoriscen != null) {
                    path += "?izkoriscen=" + izkoriscen;
                }
            }
            return $http.get(path);
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

        var setSelectedToken = function(token) {
            $window.sessionStorage["zeton"] = JSON.stringify(token);
        };

        var getSelectedToken = function() {
            if ($window.sessionStorage["zeton"])
                return JSON.parse($window.sessionStorage["zeton"]);
            return null;
        };

        var deleteSelectedToken = function() {
            $window.sessionStorage.removeItem("zeton");
        };

        return{
            postToken: postToken,
            putToken: putToken,
            getToken: getToken,
            getTokens: getTokens,
            deleteToken: deleteToken,
            setMessage: setMessage,
            getMessage: getMessage,
            setSelectedToken: setSelectedToken,
            getSelectedToken: getSelectedToken,
            deleteSelectedToken: deleteSelectedToken
        };
    };

    tokenService.$inject = ["$http", "$window"];

    angular
        .module('studis')
        .service('tokenService', tokenService);
})();