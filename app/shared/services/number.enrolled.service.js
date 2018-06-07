(function() {

    numberEnrolledService.$inject = ["$http", "$window", "authentication"];

    function numberEnrolledService($http, $window, authentication) {
        var apiBase = "/api/v1";

        ///predmetnik/predmeti?leto=2018&program=1000468&letnik=3
        var vsiPredmeti = function(leto, program, letnik) {
            return $http.get(apiBase + "/predmetnik/predmeti?leto="+leto+"&program="+program+"&letnik="+letnik,
                {headers:{'Authorization': 'Bearer ' + authentication.getToken()}})
                .then(function(response) {
                    return response.data;
                }, function(err) {
                    return err;
                })
        };

        ///predmetnik/vpisani-studenti?studijski-program=1000468&studijsko-leto=2018&letnik=3
        var vsiVpisani = function(leto, program, letnik) {
            return $http.get(apiBase + "/predmetnik/vpisani-studenti?studijski-program="+program+"&studijsko-leto="+leto+"&letnik="+letnik,
                {headers:{'Authorization': 'Bearer ' + authentication.getToken()}})
                .then(function(response) {
                    return response.data;
                }, function(err) {
                    return err;
                })
        };

        

        return {
            vsiPredmeti: vsiPredmeti,
            vsiVpisani: vsiVpisani
        };
    }

    angular
        .module("studis")
        .service("numberEnrolledService", numberEnrolledService);
})();