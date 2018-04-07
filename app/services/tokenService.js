
var tokenService = function($http){

    var getToken = function(query){
        return {"leto":2008, "letnik":2, "nacin":3, "oblika":"neki", "prostaIzbira":false,
            "studijskiProgram":"neki", "studijskoLeto":"2017/2018", "vrstaVpisa":"neki"};
    };

    var deleteToken = function(){

    };

    var getTokens = function(){

    };

    return{
        getToken: getToken,
        getTokens: getTokens,
        deleteToken: deleteToken
    };
};


angular
    .module('studis')
    .service('tokenService', tokenService);