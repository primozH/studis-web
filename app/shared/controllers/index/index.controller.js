(function () {

    indexCtrl.$inject = ["$location", "$routeParams", "gradesService", "listEnrolledService", "izvozService", "authentication"];

    function indexCtrl($location, $routeParams, gradesService, listEnrolledService, izvozService, authentication) {
        var vm = this;
        vm.predmeti = [];
        vm.idRok = -1;
        vm.today = new Date().getDate();
        vm.povprecneOcene = [];
        vm.izpiti = [];

        vm.curUser = authentication.currentUser();
        //{id: 2, tip: "Referent"}

        vm.oddajOceno = function() {
            gradesService.index(51)
            .then(function (response) {
                console.log(response);
                
            });
 
        }

        vm.izvozi = function(tip) {
            tableHeader = {"row":[" ","Šifra","Predmet","Ocenil","Letnik","Datum","Opravljanje","KT","Ocena"]};
            tableRows = [];

            for (var i = 1; i <= vm.izpiti.length; i++) {
                var trow = {"row":[i]};
                tableRows.push(trow);
            }

            tableRows.push({"row":[""]});
            tableRows.push({"row":["Povprečne ocene po študijskih letih"]});
            tableRows.push({"row":["Študijsko leto","Število opravljenih izpitov","Kreditne točke","Skupno povprečje"]});
            for (var i = 1; i <= vm.izpiti.length; i++) {
                var trow = {"row":[i]};
                tableRows.push(trow);
            }

            tableRows.push({"row":[""]});
            tableRows.push({"row":["Skupna povprečna ocena"]});
            tableRows.push({"row":["Število opravljenih izpitov","Kreditne točke","Skupno povprečje"]});     
            for (var i = 1; i <= vm.izpiti.length; i++) {
                var trow = {"row":[i]};
                tableRows.push(trow);
            }

            izvozService.izvoziCSVPDF("Elektronski index", null, tableHeader, tableRows, tip);
        };



    }    


    angular
        .module("studis")
        .controller("indexCtrl", indexCtrl);
})();
