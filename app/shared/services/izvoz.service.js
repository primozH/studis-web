(function() {

    izvozService.$inject = ["$http"];

    function izvozService($http, $window, FileSaver, $sce) {
        var apiBase = "/api/v1";

        var izvoziCSVPDF = function(tableHeader, tableRows, tip) {
            var podatki = {"documentType": "CSV",    
                    "tableHeader": tableHeader,
                    "tableRows": tableRows};

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
        return {
            izvoziCSVPDF:izvoziCSVPDF
        };
    }

    angular
        .module("studis")
        .service("izvozService", izvozService);
})();