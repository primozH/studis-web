(function() {

    gradesService.$inject = ["$http", "$window", "authentication"];

    function gradesService($http, $window, authentication) {
        var apiBase = "/api/v1";

        var seznamRokov = function() {
            return $http.get(apiBase + "/rok/vsi-roki?studijsko-leto=2018",
                {headers:{'Authorization': 'Bearer ' + authentication.getToken()}})
                .then(function(response) {
                    return response.data;
                }, function(err) {
                    return err;
                })
        };

        var seznamStudentov = function(idRoka) {
            return $http.get(apiBase + "/izpit/prijavljeni-ocene?sifra-roka=" + idRoka,
                {headers:{'Authorization': 'Bearer ' + authentication.getToken()}})
                .then(function(response) {
                    return response.data;
                }, function(err) {
                    return err;
                })
        };

        

        return {
            seznamRokov: seznamRokov,
            seznamStudentov: seznamStudentov
        };
    }

    angular
        .module("studis")
        .service("gradesService", gradesService);
})();