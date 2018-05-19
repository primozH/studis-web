(function () {

    listStudentsCtrl.$inject = ["$location", "$routeParams", "listEnrolledService", "izvozService"];

    function listStudentsCtrl($location, $routeParams, listEnrolledService, izvozService) {
        var vm = this;
        vm.studenti = [];
        vm.predmetNaziv = $routeParams.nazivPredmeta;
        vm.predmetSifra = $routeParams.sifraPredmeta;

        listEnrolledService.seznamStudentov($routeParams.leto, $routeParams.sifraPredmeta)
        .then(function (response) {
            vm.studenti = response;
            if (vm.studenti.length > 0) {
                vm.izvoz = true;
                vm.leto = vm.studenti[0].studijskoLeto;
            }

            (vm.studenti).sort(function(a,b){
                return a.student.priimek.localeCompare(b.student.priimek, "cs-CS");
            });
        }, function (err) {
            console.log(err);
        });

        vm.izvozi = function(tip) {
            var metadata = {
                "subject": {
                    "sifra": vm.predmetSifra,
                    "naziv": vm.predmetNaziv
                },
                "studyYear": vm.leto
            },
            tableHeader = {"row":["Zaporedna številka","Vpisna številka","Priimek","Ime","Vrsta vpisa"]};
            tableRows = [];

            for (var i = 1; i <= vm.studenti.length; i++) {
                var temp = vm.studenti[i-1];
                var trow = {"row":[i,temp.student.vpisnaStevilka,temp.student.priimek,temp.student.ime,temp.nacinStudija.opis]};
                tableRows.push(trow);
            }
            izvozService.izvoziCSVPDF("Seznam vpisanih", metadata, tableHeader, tableRows, tip);
        };
    }    


    angular
        .module("studis")
        .controller("listStudentsCtrl", listStudentsCtrl);
})();
