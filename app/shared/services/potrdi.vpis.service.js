(function() {

    potrdiVpisService.$inject = ["$http", "$window", "authentication"];

    function potrdiVpisService($http, $window, authentication) {
        var apiBase = "/api/v1";

        var seznamVpisanihLetnik = function(leto, letnik) {
            return $http.get(apiBase + "/student/vpis/leto/" + leto + "/letnik/" + letnik)
                .then(function (response) {
                    return response.data;
                }, function (err) {
                    return err;
                })
        };

        var seznamNepotrjenih = function() {
            return $http.get(apiBase + "/student/vrni-nepotrjene-vpise",
                {headers:{'Authorization': 'Bearer ' + authentication.getToken()}})
                .then(function(response) {
                    return response.data;
                }, function(err) {
                    return err;
                })
        };

        var potrdi = function(id, leto) {
            return $http.get(apiBase + "/student/"+id+"/potrdi-vpis?studijsko-leto="+leto,
                {headers:{'Authorization': 'Bearer ' + authentication.getToken()}})
                .then(function(response) {
                    return response.data;
                }, function(err) {
                    return err;
                })
        };

        var podrobnostiVpisa = function(id) {
            return $http.get(apiBase + "/student/"+id+"/zadnji-vpis",
                {headers:{'Authorization': 'Bearer ' + authentication.getToken()}})
                .then(function(response) {
                    return response.data;
                }, function(err) {
                    return err;
                })
        };

        var pdfPotrdilo = function(id, leto) {
            return $http.get(apiBase + "/student/"+id+"/potrdilo?studijsko-leto="+leto,
                {headers:{'Authorization': 'Bearer ' + authentication.getToken()}, responseType: 'arraybuffer'})
                .then(function(response) {
                    var file = new Blob([response.data], {type: "application/pdf"});
                    saveAs(file, "download.pdf");
                }, function(err) {
                    return err;
                })
        };

        var pdfPrikazi = function(id, leto) {
            return $http.get(apiBase + "/student/"+id+"/potrdilo?studijsko-leto="+leto,
                {headers:{'Authorization': 'Bearer ' + authentication.getToken()}, responseType: 'arraybuffer'})
                .then(function(response) {
                    return response;
                }, function(err) {
                    return err;
                })
        };
       

        return {
            seznamNepotrjenih: seznamNepotrjenih,
            potrdi: potrdi,
            pdfPotrdilo: pdfPotrdilo,
            podrobnostiVpisa: podrobnostiVpisa,
            pdfPrikazi: pdfPrikazi,
            seznamVpisanihLetnik: seznamVpisanihLetnik
        };
    }

    angular
        .module("studis")
        .service("potrdiVpisService", potrdiVpisService);
})();