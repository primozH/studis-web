(function() {

    listGradeshistoryCtrl.$inject = ["gradesService", "$routeParams", "pdfService"];

    function listGradeshistoryCtrl(gradesService, $routeParams, pdfService) {
        var vm = this;

        vm.printAllBool = false;
        vm.hidden = null;
        vm.shown = {display: "none"};
        vm.printAllMsg = "Zadnje polaganja";

        vm.changePrintMsg = function() {
            if (vm.printAllBool) {
                vm.printAllMsg = "Vsa polaganja";
                vm.shown = null;
                vm.hidden = {display: "none"};
            } else {
                vm.printAllMsg = "Zadnje polaganje";
                vm.shown = {display: "none"};
                vm.hidden = null;
            }
        };

        gradesService.getGradesHistory($routeParams.studentId)
            .then(
                function success(response){
                    console.log(response);
                    vm.vrstice = response.data.vrstica;
                    vm.student = {"ime":response.data.ime, "priimek":response.data.priimek, "vpisnaStevilka": response.data.vpisnaStevilka};
                },
                function error(error){
                    console.log(error);
                }
            );

        vm.createPdf = function() {
            vm.working = true;
            var doc = angular.element(document.getElementById("kartoteka").cloneNode(true));

            console.log(doc.html());
            pdfService.createPdf(doc.html())
                .then(function(data) {
                    var file = new Blob([data], {type: "application/pdf"});
                    saveAs(file, "kartotecni-list.pdf");
                    vm.working = false;
                });
        };

        vm.createCsv = function() {
            vm.working = true;

            izvozService.izvoziCsvZaKartotecniList($routeParams.studentId, vm.printAllBool)
                .then(function(data) {
                    var file = new Blob([data], {type: "application/csv"});
                    saveAs(file, "kartotecni-list.csv");
                    vm.working = false;
                })
        }

    }

    angular
        .module("studis")
        .controller("listGradeshistoryCtrl", listGradeshistoryCtrl);
})();

angular.module("studis").filter('reverse', function() {
    return function(items) {
        return items.slice().reverse();
    };
});