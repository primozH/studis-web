(function() {

    gradesService.$inject = ["$http", "$window", "authentication"];

    function gradesService($http, $window, authentication) {
        var apiBase = "/api/v1";

        var seznamRokov = function(leto) {
            return $http.get(apiBase + "/rok/vsi-roki?studijsko-leto="+leto,
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

        var getGradesHistory = function(studentId){
            return $http.get("/api/v1/student/" + studentId + "/kartoteka", {
                headers: {
                    Authorization: 'Bearer ' + authentication.getToken()
                }
            });
        };

        return {
            seznamRokov: seznamRokov,
            seznamStudentov: seznamStudentov,
            getGradesHistory: getGradesHistory
        };
    }

    angular
        .module("studis")
        .service("gradesService", gradesService);
})();