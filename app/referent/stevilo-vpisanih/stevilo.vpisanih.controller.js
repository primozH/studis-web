(function () {

    numberEnrolledCtrl.$inject = ["$location", "$routeParams", "numberEnrolledService", "izvozService"];

    function numberEnrolledCtrl($location, $routeParams, numberEnrolledService, izvozService) {
        var vm = this;
        vm.stevilo_vsi_predmeti = new Array(100).fill(0);

        vm.izpis_stevila_vpisanih = function() {
            vm.stevilo_vsi_predmeti = new Array(100).fill(0);

            if (!vm.leto || !vm.program || !vm.letnik) {
                console.log("vnesi vse podatke");
                return;
            }

            numberEnrolledService.vsiPredmeti(vm.leto, vm.program, vm.letnik)
            .then(function (response1) {
                response1.sort(function(a,b){
                    return a.naziv.localeCompare(b.naziv ,"cs-CS");
                });
                vm.vsi_predmeti = response1;
                
                numberEnrolledService.vsiVpisani(vm.leto, vm.program, vm.letnik).then(function (response2) {
                    for (var z=0; z<vm.vsi_predmeti.length;z++) {
                        for (i=0; i<response2.length; i++) {
                            if (response2[i][0].predmet.naziv == vm.vsi_predmeti[z].naziv)
                                vm.stevilo_vsi_predmeti[z] = vm.stevilo_vsi_predmeti[z]+1;
                        }
                    }
                    vm.prikazi_stevilo = true;

                }, function (err) {
                    console.log(err);
                });


            }, function (err) {
                console.log(err);
            });


        };

        vm.reset = function(){
            vm.prikazi_stevilo = false;
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
        .controller("numberEnrolledCtrl", numberEnrolledCtrl);
})();
