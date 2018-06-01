(function () {

    listStudentsCtrl.$inject = ["$location", "$routeParams", "listEnrolledService", "izvozService", "gradesService"];

    function listStudentsCtrl($location, $routeParams, listEnrolledService, izvozService, gradesService) {
        var vm = this;
        vm.studenti = [];
        vm.predmetNaziv = $routeParams.nazivPredmeta;
        vm.predmetSifra = $routeParams.sifraPredmeta;
        vm.idRok = [];

        vm.pokaziNapako = [];
        vm.pokaziOk = [];
        vm.napaka = [];
        vm.ok = [];
        vm.prijava = [];
        vm.koncna = [];
        vm.polaganjeLetos = [];
        vm.polaganjeSkupno = [];
        vm.checked = [];
        

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
            if (vm.koncna[$index] < 5 || vm.koncna[$index]>10 || vm.polaganjeLetos[$index] > 3) return;
            
            if ((vm.idRok[$index] == -1)&&(vm.polaganjeLetos > vm.polaganjeSkupno)) {
                vm.pokaziNapako[$index] = true;
                vm.napaka[$index] = "napaka v številu polaganj";
                return;
            }

            if (vm.idRok[$index] != -1) {                
                gradesService.vnesiOcenoID(vm.koncna[$index],vm.idRok[$index],vm.predmetSifra,$routeParams.leto,
                    vm.studenti[$index].student.vpisnaStevilka)
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
                gradesService.vnesiOceno(vm.koncna[$index],vm.predmetSifra,$routeParams.leto,
                    vm.studenti[$index].student.vpisnaStevilka,vm.polaganjeLetos[$index],vm.polaganjeSkupno[$index],vm.datum)
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

            gradesService.preveriCePrijava(vm.predmetSifra, vm.studenti[$index].student.id)
            .then(function (response) {                
                console.log(response.data);
                //prijava ne obstaja
                if (response.data == []) {
                    vm.idRok[$index] = -1;
                }
                //prijava obstaja
                else {
                    vm.idRok[$index] = response.data.id;
                    console.log("ble");
                    console.log(vm.idRok[$index]);
                    vm.prijava[$index] = response.data;
                    vm.checked[$index] = true;
                    vm.datum = new Date(response.data.rok.datum);
                }
            });
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
