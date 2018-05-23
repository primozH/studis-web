(function () {

    potrdiVpisCtrl.$inject = ["$location", "$routeParams", "potrdiVpisService", "izvozService"];

    function potrdiVpisCtrl($location, $routeParams, potrdiVpisService, izvozService) {
        var vm = this;
        
        potrdiVpisService.seznamNepotrjenih()
        .then(function (response) {
            vm.nepotrjeni = response;
            
            /*for (var i = 0; i < response.length; i++) {
                potrdiVpisService.podrobnostiVpisa(vm.nepotrjeni[i].id)
                .then(function (response2) {
                    console.log(response2);
                    //if (response2)
                    //vm.program[i] = response2.studijskiProgram.naziv;
                });
            } //*/
        }, function (err) {
            console.log(err);
        });


        vm.potrdi = function(id) {
            potrdiVpisService.potrdi(id, 2018)
            .then(function (response) {
            }, function (err) {
                console.log(err);
            });
        };

        vm.pdfPotrdilo = function(id) {
            potrdiVpisService.pdfPotrdilo(id, 2018)
            .then(function (response) {
            }, function (err) {
                console.log(err);
            });
        }
        
        vm.izvozi = function(tip) {
            tableHeader = {"row":["Naziv predmeta","Število vpisanih"]};
            tableRows = [];

            for (var i = 0; i < vm.vsi_predmeti.length; i++) {
                var trow = {"row":[vm.vsi_predmeti[i].naziv, vm.stevilo_vsi_predmeti[i]]};
                tableRows.push(trow);
            }
            var program_naziv = null;
            if (vm.program == 1000468) program_naziv="Računalništvo in informatika UNI-1.st";
            else if (vm.program == 1000407) program_naziv="Računalništvo in matematika UNI-1.st";
            else if (vm.program == 1000470) program_naziv="Računalništvo in informatika VS-1.st";
            else if (vm.program == 1000471) "Računalništvo in infomatika MAG 2.st";
            else if (vm.program == 1000474) program_naziv="Računalništvo in informatika DR-3.st";
            izvozService.izvoziCSVPDF("Seznam vpisanih\n v letu "+vm.leto+" v program "+program_naziv+" "+vm.letnik+". letnik",null, tableHeader, tableRows, tip);
        };
    }    


    angular
        .module("studis")
        .controller("potrdiVpisCtrl", potrdiVpisCtrl);
})();
