(function() {

    izvozService.$inject = ["$http"];

    function izvozService($http, $window, FileSaver, $sce) {
        var apiBase = "/api/v1";

        var izvoziCsv = function(student, razsirjeno) {

            return $http.get(apiBase + "/izvoz/kartoteka/" + student + "?expanded=", razsirjeno)
                .then(function (response) {
                    return response.data;
                })

        };

        var izvoziCSVPDF = function(ime, metadata, tableHeader, tableRows, tip) {
            var podatki = {
                    "name": ime,
                    "documentType": "CSV",    
                    "tableHeader": tableHeader,
                    "tableRows": tableRows};

            if (metadata != null) {
                podatki.metadata = metadata;
            }

            if (tip == 'pdf')
                podatki.documentType = "PDF";
                
            
            $http.post(apiBase + "/izvoz", podatki, {responseType: 'arraybuffer'}).then(function(response) {
                var a = document.createElement("a");
                document.body.appendChild(a);
                var file = new Blob([response.data], {type: 'application/'+tip});
                a.href = window.URL.createObjectURL(file);
                a.download = "izvoz."+tip;
                a.click();                        
            })

        };

        var izvoziIndex = function(ime, priimek, vpisna, rows1, rows2, rows3) {
            var podatki = [    
                    {
                        "name": "Test",
                        "documentType": "PDF",
                        "indexMetadata": {
                            "student": {
                                "ime":ime,
                                "priimek":priimek,
                                "vpisnaStevilka":vpisna
                            }
                        },
                        "tableRows": rows1
                   },
                   
                   {
                        "tableRows": rows2
                   },
                   
                   {
                        "tableRows": rows3
                   }
                   
                ];
                
            
            $http.post(apiBase + "/izvoz/index", podatki, {responseType: 'arraybuffer'}).then(function(response) {
                var a = document.createElement("a");
                document.body.appendChild(a);
                var file = new Blob([response.data], {type: 'application/pdf'});
                a.href = window.URL.createObjectURL(file);
                a.download = "izvoz.pdf";
                a.click();                        
            })

        };
        return {
            izvoziCSVPDF:izvoziCSVPDF,
            izvoziCsvZaKartotecniList: izvoziCsv,
            izvoziIndex: izvoziIndex
        };
    }

    angular
        .module("studis")
        .service("izvozService", izvozService);
})();