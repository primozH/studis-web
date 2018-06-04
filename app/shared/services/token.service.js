(function() {

    var tokenService = function($http, $window){

        var token;

        var getTokensForStudent = function(student, izkoriscen) {
            return $http.get("/api/v1/zeton/student/" + student + "?izkoriscen=" + izkoriscen)
                .then(function (response) {
                    return response.data;
                })
        };

        var getToken = function(id){
            return $http.get("/api/v1/zeton/" + id);
        };

        var deleteToken = function(id){
            return $http.delete("/api/v1/zeton/" + id);
        };

        var putToken = function(id, data){
            console.log("data to send");
            console.log(data);
            return $http.put("/api/v1/zeton/" + id, data);
        };

        var getTokens = function(izkoriscen){
            return $http.get("/api/v1/zeton?izkoriscen=" + izkoriscen);
        };

        var postToken = function(id){
            return $http.post("/api/v1/zeton/student/" + id);
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
            getTokensForStudent: getTokensForStudent,
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