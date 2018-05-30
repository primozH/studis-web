(function () {

    gradesDateCtrl.$inject = ["$location", "$routeParams", "gradesService", "izvozService"];

    function gradesDateCtrl($location, $routeParams, gradesService, izvozService) {
        var vm = this;
        vm.predmeti = [];
        //vm.prikaziTabelo = false;

        vm.spremembaLeta = function() {
            gradesService.seznamRokov(vm.leto)
            .then(function (response) {
                vm.roki = response;
                (vm.roki).sort(function(a,b){
                    return a.izvajanjePredmeta.predmet.naziv.localeCompare(b.izvajanjePredmeta.predmet.naziv ,"cs-CS");
                });
                vm.prikaziTabelo = true;
                console.log(response);

            }, function (err) {
                console.log(err);
            });
        }


        vm.prikaziOcene = function(idRoka) {
            $location.path("/seznamOcen/" + idRoka);
        };

        vm.izvozi = function(tip) {
            var metadata = {
                "subject": vm.predmet
            };
            tableHeader = {"row":["Šifra predmeta","Naziv predmeta","Študijsko leto"]};
            tableRows = [];

            for (var i = 1; i <= vm.predmeti.length; i++) {
                var temp = vm.predmeti[i-1];
                var trow = {"row":[temp.predmet.sifra, temp.predmet.naziv, temp.studijskoLeto.studijskoLeto]};
                tableRows.push(trow);
            }
            izvozService.izvoziCSVPDF("Seznam predmetov", null, tableHeader, tableRows, tip);
        };
    }    


    angular
        .module("studis")
        .controller("gradesDateCtrl", gradesDateCtrl);
})();
