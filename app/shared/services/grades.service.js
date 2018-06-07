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
            console.log("testiranje.......");
            var podatki ={
    "koncnaOcena":koncna,
    "prijavaRok":{
        "id":idRoka,
        "rok":{
            "izvajanjePredmeta":{
                "predmet":{
                    "sifra":predmetSifra
                },
                "studijskoLeto":{
                    "id":leto
                }
            }
        },
        "student":{
            "vpisnaStevilka":vpisna
        }
    }};


            return $http.post(apiBase + "/izpit/koncna", podatki,
                {headers:{'Authorization': 'Bearer ' + authentication.getToken()}})
                .then(function(response) {
                    return response;
                }, function(err) {
                    return err;
                })
        };
        var vnesiOceno = function(koncna,predmetSifra,leto,vpisna,polaganjLetos,polaganjSkupno,datum) {
            datum = datum + "";
            var parts = datum.split(" ");
            var months = {Jan: "01",Feb: "02",Mar: "03",Apr: "04",May: "05",Jun: "06",Jul: "07",Aug: "08",Sep: "09",Oct: "10",Nov: "11",Dec: "12"};
            datum = parts[3]+"-"+months[parts[1]]+"-"+parts[2];
            console.log(datum);


            var podatki = {"koncnaOcena":koncna,
            "prijavaRok":{            
                "rok":{
                    "izvajanjePredmeta":{
                        "predmet":{"sifra":predmetSifra},
                        "studijskoLeto":{"id":leto}
                    }
                }, "student":{"vpisnaStevilka":vpisna}},
                    "stPolaganjaLeto":polaganjLetos,
                    "stPolaganjaSkupno":polaganjSkupno,
                    "datum": datum
            };

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


        var preveriCePrijava = function(predmet, student) {
            return $http.get(apiBase + "/rok/prijava/"+predmet+"/"+student,
                {headers:{'Authorization': 'Bearer ' + authentication.getToken()}})
                .then(function(response) {
                    return response;
                }, function(err) {
                    return err;
                })
        };


        var index = function(id) {
            return $http.get(apiBase + "/izpit/"+id+"/opravljeni",
                {headers:{'Authorization': 'Bearer ' + authentication.getToken()}})
                .then(function(response) {
                    return response;
                }, function(err) {
                    return err;
                })
        };

        var idIzVpisne = function(vpisna) {
            return $http.get(apiBase + "/student")
                .then(function(response) {
                    for (var i = 0; i < response.data.length; i++) {
                        if (response.data[i].vpisnaStevilka == vpisna)
                            return response.data[i]; //vrnem celga studenta
                    }
                    return -1;
                }, function(err) {
                    return err;
                })
        };

        var dataIzID = function(id) {
            return $http.get(apiBase + "/student/"+id)
                .then(function(response) {
                    return response.data;
                }, function(err) {
                    return err;
                })
        };



        return {
            seznamRokov: seznamRokov,
            seznamStudentov: seznamStudentov,
            getGradesHistory: getGradesHistory,
            header: header,
            vnesiOceno: vnesiOceno,
            vnesiOcenoID: vnesiOcenoID,
            preveriCePrijava: preveriCePrijava,
            index: index,
            idIzVpisne: idIzVpisne,
            dataIzID: dataIzID
        };
    }

    angular
        .module("studis")
        .service("gradesService", gradesService);
})();