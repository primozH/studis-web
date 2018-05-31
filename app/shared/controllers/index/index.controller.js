(function () {

    indexCtrl.$inject = ["$location", "$routeParams", "gradesService", "izvozService", "authentication"];

    function indexCtrl($location, $routeParams, gradesService, izvozService, authentication) {
        var vm = this;
        vm.predmeti = [];
        vm.idRok = -1;
        vm.today = new Date().getDate();
        vm.povprecneOcene = [];
        vm.izpiti = [];

        vm.opravljeni = [];
        vm.skupnoIzpitov = 0;
        vm.skupnoKreditov = 0;
        vm.skupnoPovprecje = 0; 


        var posodobiIndex = function(idStudenta) {
            gradesService.index(idStudenta)
            .then(function (response) {
                vm.response = response.data;

                if (response.data.message == "Študent nima opravljenih izpitov") {
                    vm.pokaziIndex = false;
                    vm.pokaziNapako = true;
                    vm.napaka = response.data.message;
                    return;
                }
                vm.pokaziIndex = true;

                for (var i = 0; i < vm.response.length; i++){
                    vm.opravljeni = vm.opravljeni.concat(vm.response[i].opravljeniPredmeti);
                    vm.skupnoIzpitov += vm.response[i].opravljeniPredmeti.length;
                
                    for (var j = 0; j < vm.response[i].opravljeniPredmeti.length; j++) {
                        vm.skupnoKreditov += vm.response[i].opravljeniPredmeti[j].predmet.ects;
                        vm.skupnoPovprecje += vm.response[i].opravljeniPredmeti[j].koncnaOcena;
                    }
                }
                vm.skupnoPovprecje = (vm.skupnoPovprecje / vm.skupnoIzpitov).toFixed(2);               
            }); 
        }


        vm.curUser = authentication.currentUser();
        //{id: 2, tip: "Referent"}
        var idStudenta = 63;
        if (vm.curUser.tip == "Student") {
            idStudenta = vm.curUser.id;
            posodobiIndex(idStudenta);
            vm.pokaziIndex = true;
            vm.pokaziNapako = false;
        }
        else if (vm.curUser.tip == "Referent" || vm.curUser.tip == "Ucitelj"){
            vm.pokaziIndex = false;
        }

       

        vm.indexGledeNaVpisno = function() {
            if (!vm.vpisnaInput){
                vm.napaka = "prosim vnesi vpisno številko"
                vm.pokaziNapako = true;
                vm.pokaziIndex = false;
                return;
            }

            gradesService.idIzVpisne(vm.vpisnaInput)
            .then(function (response) {
                if (response == -1) {
                    vm.napaka = "študent z dano vpisno številko ne obstaja";
                    vm.pokaziNapako = true;
                    vm.pokaziIndex = false;
                    return;
                }
                vm.pokaziNapako = false;
                posodobiIndex(response);
                          
            });
        }

        

        vm.izvozi = function(tip) {
            tableHeader = {"row":["Zaporedna številka","Šifra","Predmet","Datum","Opravljanje","KT","Ocena"]};
            tableRows = [];
            //del za CSV
            for (var i = 0; i < vm.opravljeni.length; i++) {
                var x = vm.opravljeni[i];
                var trow = {"row":[i,x.predmet.sifra,x.predmet.naziv,x.datum,x.stPolaganjaSkupno,x.predmet.ects,x.koncnaOcena]};
                tableRows.push(trow);
            }
            tableRows.push({"row":[" "," "," "," "," "," "," "]});
            tableRows.push({"row":["Študijsko leto","Število opravljenih izpitov","Kreditne točke","Skupno povprečje"," "," "," "]});
            for (var i = 0; i < vm.response.length; i++) {
                var x = vm.response[i];
                var trow = {"row":[x.studijskoLeto.studijskoLeto,x.steviloOpravljenihPredmetov,x.kreditneTocke,x.skupnoPovprecje," "," "," "]};
                tableRows.push(trow);
            }
            tableRows.push({"row":[" "," "," "," "," "," "," "]});
            tableRows.push({"row":["Število opravljenih izpitov","Kreditne točke","Skupno povprečje"," "," "," "," "]});

            tableRows.push({"row":[vm.skupnoIzpitov,vm.skupnoKreditov,vm.skupnoPovprecje," "," "," "," "]});
            //del za CSV

            //del za PDF
            tableRows1 = [];
            for (var i = 0; i < vm.opravljeni.length; i++) {
                var x = vm.opravljeni[i];
                var trow = {"row":[i+1,x.predmet.sifra,x.predmet.naziv,x.datum,x.stPolaganjaSkupno,x.predmet.ects,x.koncnaOcena]};
                tableRows1.push(trow);
            }
            tableRows2 = [];
            for (var i = 0; i < vm.response.length; i++) {
                var x = vm.response[i];
                var trow = {"row":[i+1,x.studijskoLeto.studijskoLeto,x.steviloOpravljenihPredmetov,x.kreditneTocke,x.skupnoPovprecje]};
                tableRows2.push(trow);
            }
            //del za PDF

            
            
            if (tip == "csv")
                izvozService.izvoziCSVPDF("Elektronski index", null, tableHeader, tableRows, tip);
            if (tip == "pdf")
                izvozService.izvoziIndex(tableRows1, tableRows2);
        };
    }    


    angular
        .module("studis")
        .controller("indexCtrl", indexCtrl);
})();
