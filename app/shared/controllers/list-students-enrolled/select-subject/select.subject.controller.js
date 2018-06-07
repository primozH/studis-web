(function () {

    listEnrolledCtrl.$inject = ["$location", "$routeParams", "listEnrolledService", "izvozService"];

    function listEnrolledCtrl($location, $routeParams, listEnrolledService, izvozService) {
        var vm = this;
        vm.predmeti = [];
        

        vm.spremembaLeta = function() {
            vm.izbranoLeto = true;
            listEnrolledService.seznamPredmetov(vm.leto)
            .then(function (response) {
                vm.predmeti = response;
                (vm.predmeti).sort(function(a,b){
                    return a.predmet.naziv.localeCompare(b.predmet.naziv ,"cs-CS");
                });
                if (vm.predmeti.length > 0) {
                    vm.izvoz = true;
                    vm.predmet = vm.predmeti[0];
                }

            }, function (err) {
                console.log(err);
            });
        };

        vm.prikaziStudente = function(leto, sifraPredmeta, nazivPredmeta) {
            $location.path("/seznamVpisanih/" + leto  + "/" + sifraPredmeta + "/" + nazivPredmeta);
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
        .controller("listEnrolledCtrl", listEnrolledCtrl);
})();
