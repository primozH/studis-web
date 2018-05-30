(function () {

    inputGradeCtrl.$inject = ["$location", "$routeParams", "gradesService", "listEnrolledService"];

    function inputGradeCtrl($location, $routeParams, gradesService, listEnrolledService) {
        var vm = this;
        vm.predmeti = [];
        vm.idRok = -1;
        vm.today = new Date().getDate();

        vm.spremembaLeta = function() {
            listEnrolledService.seznamPredmetov(vm.leto)
            .then(function (response) {
                vm.predmeti = response;
                (vm.predmeti).sort(function(a,b){
                    return a.predmet.naziv.localeCompare(b.predmet.naziv ,"cs-CS");
                });
                console.log(response);

            }, function (err) {
                console.log(err);
            });
        }

        vm.preveriZaObstojecoPrijavo = function() {
            vm.idRok = -1;
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
                for (var i = 0; i < roki.length; i++) {
                    if (roki[i].izvajanjePredmeta.predmet.sifra == vm.predmet.predmet.sifra) {

                        gradesService.seznamStudentov(roki[i].id)
                        .then(function (response2) { //tuki so notri vsi študenti prijavljeni na ta rok
                            for (var j = 0; j < response2.length; j++) {
                                if (response2[j].prijavaRok.student.vpisnaStevilka == vm.vpisna) {
                                    vm.idRok = response2[j].prijavaRok.id; //id ki ga pošljem na backend
                                    vm.polaganjeLetos = response2[j].stPolaganjaLeto;
                                    vm.polaganjeSkupno = response2[j].stPolaganjaSkupno;
                                    vm.datum = new Date(response2[j].prijavaRok.rok.datum);
                                    vm.koncna = response2[j].koncnaOcena;
                                    vm.checked = true;
                                    vm.skrijIdRok = false;
                                }
                            }

                        });
                    }
                }

            });
        }

        vm.oddajOceno = function() {
            vm.pokaziNapako = false;
            vm.pokaziOk = false;
            if (vm.koncna < 5) return;
            if (vm.idRok != -1) {
                gradesService.vnesiOcenoID(vm.koncna,vm.idRok,vm.predmet.predmet.sifra,vm.leto,
                    vm.vpisna,vm.polaganjeLetos,vm.polaganjeSkupno,vm.datum)
                .then(function (response) {
                    console.log(response);
                    if (response.status == 400) {
                        vm.napaka = "napaka pri vnašanju ocene";
                        vm.pokaziNapako = true;
                    }
                    else {
                        vm.ok = "ocena uspešno shranjena";
                        vm.pokaziOk = true;
                    }
                });
            }

            else {
                gradesService.vnesiOceno(vm.koncna,vm.predmet.predmet.sifra,vm.leto,vm.vpisna)
                .then(function (response) {
                    console.log(response);
                    if (response.status == 400) {
                        vm.napaka = "napaka pri vnašanju ocene";
                        vm.pokaziNapako = true;
                    }
                    else {
                        vm.ok = "ocena uspešno shranjena";
                        vm.pokaziOk = true;
                    }
                });
            }
        }







    }    


    angular
        .module("studis")
        .controller("inputGradeCtrl", inputGradeCtrl);
})();
