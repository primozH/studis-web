(function () {

    gradesStudentsCtrl.$inject = ["$location", "$routeParams", "gradesService", "izvozService"];

    function gradesStudentsCtrl($location, $routeParams, gradesService, izvozService) {
        var vm = this;

        gradesService.seznamStudentov($routeParams.idRoka)
        .then(function (response) {
            vm.studenti = response;
            console.log(response);

             if (vm.studenti[0] && vm.studenti[0].prijavaRok.student)
                vm.niprazno = true;

            (vm.studenti).sort(function(a,b){
                return a.prijavaRok.student.priimek.localeCompare(b.prijavaRok.student.priimek, "cs-CS");
            });
        }, function (err) {
            console.log(err);
        });

       

        vm.izvozi = function(tip) {
            console.log(vm.studenti[0]);
            tableHeader = {"row":["Zaporedna številka","Vpisna številka","Priimek","Ime","Štud.leto","Polaganje","Ocena pisno","Končna ocena/VP"]};
            tableRows = [];

            for (var i = 1; i <= vm.studenti.length; i++) {
                var temp = vm.studenti[i-1].prijavaRok;

                var koncna = "";
                if (temp.brisana == true)
                    koncna = "VP";
                var polaganje = "1.";
                var trow = {"row":[i,temp.student.vpisnaStevilka,temp.student.priimek,temp.student.ime,temp.rok.izvajanjePredmeta.studijskoLeto.studijskoLeto,
                polaganje, vm.studenti[i-1].ocenaPisno, koncna]};
                tableRows.push(trow);
            }
            izvozService.izvoziCSVPDF("Seznam prijavljenih kandidatov z ocenami\nIzpitni rok "+
                vm.studenti[0].prijavaRok.rok.izvajanjePredmeta.predmet.naziv+" "+
                vm.studenti[0].prijavaRok.rok.datum, null, tableHeader, tableRows, tip);
        };
    }    


    angular
        .module("studis")
        .controller("gradesStudentsCtrl", gradesStudentsCtrl);
})();
