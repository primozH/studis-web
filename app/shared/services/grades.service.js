(function() {

    gradesService.$inject = ["$http", "$window", "authentication"];

    function gradesService($http, $window, authentication) {
        var apiBase = "/api/v1";

        var header = function(idRoka) {
            return $http.get(apiBase + "/rok/" + idRoka,
                {headers:{'Authorization': 'Bearer ' + authentication.getToken()}})
                .then(function(response) {
                    return response.data;
                }, function(err) {
                    return err;
                })
        };

        var vnesiOcenoID = function(koncna,idRoka,predmetSifra,leto,vpisna) {
            console.log("test11");
            var podatki = {"koncnaOcena":koncna,
            "prijavaRok":{
                "id":idRoka,            
                "rok":{
                    "izvajanjePredmeta":{
                        "predmet":{"sifra":predmetSifra},
                        "studijskoLeto":{"id":leto}
                    }
                }, "student":{"vpisnaStevilka":vpisna}
            }}

            return $http.post(apiBase + "/izpit/koncna", podatki,
                {headers:{'Authorization': 'Bearer ' + authentication.getToken()}})
                .then(function(response) {
                    return response;
                }, function(err) {
                    return err;
                })
        };
        var vnesiOceno = function(koncna,predmetSifra,leto,vpisna,polaganjLetos,polaganjSkupno,datum) {
            console.log("test12");
            var podatki = {"koncnaOcena":koncna,
            "prijavaRok":{            
                "rok":{
                    "izvajanjePredmeta":{
                        "predmet":{"sifra":predmetSifra},
                        "studijskoLeto":{"id":leto}
                    }
                }, "student":{"vpisnaStevilka":vpisna},
                    "stPolaganjaLeto":polaganjLetos,
                    "stPolaganjaSkupno":polaganjSkupno,
                    "datum": datum
            }}

            return $http.post(apiBase + "/izpit/koncna", podatki,
                {headers:{'Authorization': 'Bearer ' + authentication.getToken()}})
                .then(function(response) {
                    return response;
                }, function(err) {
                    return err;
                })
        };

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
            getGradesHistory: getGradesHistory,
            header: header,
            vnesiOceno: vnesiOceno,
            vnesiOcenoID: vnesiOcenoID
        };
    }

    angular
        .module("studis")
        .service("gradesService", gradesService);
})();