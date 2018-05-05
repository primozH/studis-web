(function() {

    listEnrolledService.$inject = ["$http", "$window", "authentication"];

    function listEnrolledService($http, $window, authentication) {
        var apiBase = "/api/v1";

        var token = authentication.getToken();
        console.log(token);

        var seznamPredmetov = function(leto) {
            return $http.get(apiBase + "/predmet/izvajanje?studijsko-leto=" + leto,
                {headers:{'Authorization': 'Bearer ' + token}})
                .then(function(response) {
                    return response.data;
                }, function(err) {
                    return err;
                })
        };

        var seznamStudentov = function(leto, sifraPredmeta) {
            return $http.get(apiBase + "/predmet/studenti?studijsko-leto="+leto+"&sifra-predmeta="+sifraPredmeta,
                {headers:{'Authorization': 'Bearer ' + token}})
                .then(function(response) {
                    return response.data;
                }, function(err) {
                    return err;
                })
        };

        

        return {
            seznamPredmetov: seznamPredmetov,
            seznamStudentov: seznamStudentov
        };
    }

    angular
        .module("studis")
        .service("listEnrolledService", listEnrolledService);
})();