(function() {

    prijaviStudentaService.$inject = ["$http", "$window", "authentication"];

    function prijaviStudentaService($http, $window, authentication) {
        var apiBase = "/api/v1";

        var seznamRokov = function(predmet, leto) {
            return $http.get(apiBase + "/rok?predmet="+predmet+"&studijsko-leto="+leto,
                {headers:{'Authorization': 'Bearer ' + authentication.getToken()}})
                .then(function(response) {
                    return response.data;
                }, function(err) {
                    return err;
                })
        };

        var prijaviStudenta = function(tip, rok, student) {
            var data = {
                "rok": {
                    "id": rok
                },
                "student": {
                    "vpisnaStevilka": student
                }
            }
            return $http.post(apiBase + "/rok/"+tip+"-studenta", data,
                {headers:{'Authorization': 'Bearer ' + authentication.getToken()}})
                .then(function(response) {
                    return response.data;
                }, function(err) {
                    return err;
                })
        };


        return {
            seznamRokov: seznamRokov,
            prijaviStudenta: prijaviStudenta
        };
    }

    angular
        .module("studis")
        .service("prijaviStudentaService", prijaviStudentaService);
})();