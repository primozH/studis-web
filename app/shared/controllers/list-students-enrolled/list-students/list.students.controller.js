(function () {

    listStudentsCtrl.$inject = ["$location", "$routeParams", "listEnrolledService", "izvozService", "gradesService"];

    function listStudentsCtrl($location, $routeParams, listEnrolledService, izvozService, gradesService) {
        var vm = this;
        vm.studenti = [];
        vm.predmetNaziv = $routeParams.nazivPredmeta;
        vm.predmetSifra = $routeParams.sifraPredmeta;
        vm.idRok = -1;

        vm.pokaziNapako = [];
        vm.pokaziOk = [];
        vm.napaka = [];
        vm.ok = [];

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

        vm.oddajOceno = function(vpisna, $index) {
            vm.pokaziNapako[$index] = false;
            vm.pokaziOk[$index] = false;
            if (vm.koncna < 5 || vm.koncna>10 || vm.polaganjeLetos > 3) return;
            

            if (vm.idRok != -1) {
                gradesService.vnesiOcenoID(vm.koncna,vm.idRok,vm.predmetSifra,vm.leto.id,
                    vpisna,vm.polaganjeLetos,vm.polaganjeSkupno,vm.datum)
                .then(function (response) {
                    console.log(response);
                    if (response.status == 400) {
                        vm.napaka[$index] = "napaka pri vnašanju ocene";
                        vm.pokaziNapako[$index] = true;
                    }
                    else if (response.status == 200){
                        vm.ok[$index] = "ocena uspešno shranjena";
                        vm.pokaziOk[$index] = true;
                    }
                });
            }

            else {
                gradesService.vnesiOceno(vm.koncna,vm.predmetSifra,vm.leto.id,vpisna)
                .then(function (response) {
                    console.log(response);
                    if (response.status == 400) {
                        vm.napaka[$index] = "napaka pri vnašanju ocene";
                        vm.pokaziNapako[$index] = true;
                    }
                    else if (response.status == 200){
                        vm.ok[$index] = "ocena uspešno shranjena";
                        vm.pokaziOk[$index] = true;
                    }
                });
            }
        }

        vm.preveriCePrijava = function($index) {
            vm.pokaziNapako[$index] = false;
            vm.pokaziOk[$index] = false;

            //preveriš če obstaja prijava in v tem primeru izpolniš in zakleneš polja
            /*vm.idRok = -1;
            vm.polaganjeLetos = null;
            vm.polaganjeSkupno = null;
            vm.datum = new Date("2018-05-30");
            vm.koncna = null;
            vm.checked = false;
            vm.skrijIdRok = true;
            vm.pokaziNapako = false;
            vm.pokaziOk = false;


            gradesService.seznamRokov(vm.leto)
            .then(function (response1) {
                var roki = response1;
                
            }); //*/
        }







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
