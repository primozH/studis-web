(function () {

    listStudentsCtrl.$inject = ["$location", "$routeParams", "listEnrolledService", "izvozService"];

    function listStudentsCtrl($location, $routeParams, listEnrolledService, izvozService) {
        var vm = this;
        vm.studenti = [];
        vm.predmetNaziv = $routeParams.nazivPredmeta;
        vm.predmetSifra = $routeParams.sifraPredmeta;
        vm.leto = $routeParams.leto;

        listEnrolledService.seznamStudentov($routeParams.leto, $routeParams.sifraPredmeta)
        .then(function (response) {
            vm.studenti = response;
            (vm.studenti).sort(function(a,b){
                return a.priimek.localeCompare(b.priimek);
            })
            if (vm.studenti.length > 0)
                vm.izvoz = true;
        }, function (err) {
            console.log(err);
        });

        vm.izvozi = function(tip) {
            tableHeader = {"row":["Zaporedna številka","Vpisna številka","Priimek","Ime","Vrsta vpisa"]};
            tableRows = [];

            for (var i = 1; i <= vm.studenti.length; i++) {
                var temp = vm.studenti[i-1];
                var trow = {"row":[i,temp.vpisnaStevilka,temp.priimek,temp.ime,temp.vrstaVpisa]};
                tableRows.push(trow);
            }
            izvozService.izvoziCSVPDF("Seznam vpisanih\n"+vm.predmetNaziv+" ("+vm.predmetSifra+") v letu "+vm.leto, tableHeader, tableRows, tip);
        };
    }    


    angular
        .module("studis")
        .controller("listStudentsCtrl", listStudentsCtrl);
})();
