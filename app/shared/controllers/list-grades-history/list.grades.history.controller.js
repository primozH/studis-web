(function() {

    listGradeshistoryCtrl.$inject = ["gradesService", "$routeParams", "pdfService"];

    function listGradeshistoryCtrl(gradesService, $routeParams, pdfService) {
        var vm = this;

        vm.printAllBool = false;

        vm.printOne = function(){
            vm.printAllBool = false;
        };

        vm.printAll = function(){
            vm.printAllBool = true;
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

    }

    angular
        .module("studis")
        .controller("listGradeshistoryCtrl", listGradeshistoryCtrl);
})();