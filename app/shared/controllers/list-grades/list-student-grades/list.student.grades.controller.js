(function () {

    gradesStudentsCtrl.$inject = ["$location", "$routeParams", "gradesService", "izvozService"];

    function gradesStudentsCtrl($location, $routeParams, gradesService, izvozService) {
        var vm = this;

        gradesService.seznamStudentov($routeParams.idRoka)
        .then(function (response) {
            vm.studenti = response;
            console.log(response);
            (vm.studenti).sort(function(a,b){
                return a.student.priimek.localeCompare(b.student.priimek, "cs-CS");
            });
        }, function (err) {
            console.log(err);
        });

        vm.izvozi = function(tip) {
            /*var metadata = {
                "subject": {
                    "sifra": vm.predmetSifra,
                    "naziv": vm.predmetNaziv
                },
                "studyYear": vm.leto
            },//*/
            tableHeader = {"row":["Zaporedna številka","Vpisna številka","Priimek","Ime","Štud.leto","Polaganje","Ocena pisno","Končna ocena/VP"]};
            tableRows = [];

            for (var i = 1; i <= vm.studenti.length; i++) {
                var temp = vm.studenti[i-1];
                var trow = {"row":[i,temp.student.vpisnaStevilka,temp.student.priimek,temp.student.ime,temp.prijavaRok.rok.izvajanjePredmeta.studijskoLeto.studijskoLeto,
                temp.zapStPolaganja, temp.ocenaPisno, temp.koncnaOcena]};
                tableRows.push(trow);
            }
            izvozService.izvoziCSVPDF("Seznam prijavljenih kandidatov z ocenami\nIzpitni rok "+vm.studenti[0].predmet.naziv+" "+vm.studenti[0].prijavaRok.rok.datum, null, tableHeader, tableRows, tip);
        };
    }    


    angular
        .module("studis")
        .controller("gradesStudentsCtrl", gradesStudentsCtrl);
})();
