(function () {

    potrdiVpisCtrl.$inject = ["$location", "$routeParams", "potrdiVpisService", "izvozService"];

    function potrdiVpisCtrl($location, $routeParams, potrdiVpisService, izvozService) {
        var vm = this;
        vm.vpisani = true;
        vm.leto = 2017;
        vm.letnik = 1;
        vm.vpisaniMsg = "Vpisani";

        vm.prikaziNevpisane = function() {
            potrdiVpisService.seznamNepotrjenih()
                .then(function (response) {
                    vm.nepotrjeni = response;
                }, function (err) {
                    console.log(err);
                });
        };
        
        vm.prikaziVpisane = function() {
            potrdiVpisService.seznamVpisanihLetnik(vm.leto, vm.letnik)
                .then(function (response) {
                    vm.potrjeni = response;
                }, function (err) {
                    console.log(err);
                })
        };

        vm.preklop = function() {
            if (vm.vpisani) {
                vm.vpisaniMsg = "Vpisani";
            }
            else {
                vm.prikaziNevpisane();
                vm.vpisaniMsg = "Nevpisani";
            }
        };

        vm.potrdi = function(id, leto) {
            potrdiVpisService.potrdi(id, leto)
            .then(function (response) {
            }, function (err) {
                console.log(err);
            }); //*/
        };

        vm.pdfPotrdilo = function(id, leto) {
            potrdiVpisService.pdfPotrdilo(id, leto)
            .then(function (response) {
            }, function (err) {
                console.log(err);
            });
        };

        vm.naStudenta = function(id) {
            $location.path("/profil/" + id);
        };
        
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
