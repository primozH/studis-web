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
            var tableHeader = {"row":["Zaporedna številka","Priimek", "Ime", "Vpisna številka", "Program", "Letnik"]};
            var tableRows = [];

            for (var i = 1; i <= vm.potrjeni.length; i++) {
                var temp = vm.potrjeni[i-1];
                var trow = {"row":[i,temp.student.priimek,temp.student.ime,temp.student.vpisnaStevilka,temp.studijskiProgram.naziv,
                        temp.letnik.letnik]};
                tableRows.push(trow);
            }
            izvozService.izvoziCSVPDF("Seznam vpisanih", {
                yearOfStudy: vm.potrjeni[0].letnik,
                studyYear: vm.potrjeni[0].studijskoLeto
                }, tableHeader, tableRows, tip);

        };
    }    


    angular
        .module("studis")
        .controller("potrdiVpisCtrl", potrdiVpisCtrl);
})();
