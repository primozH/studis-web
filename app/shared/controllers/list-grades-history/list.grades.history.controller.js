(function() {

    listGradeshistoryCtrl.$inject = ["gradesService", "$routeParams", "pdfService", "$templateCache", "$compile", "$timeout", "$scope"];

    function listGradeshistoryCtrl(gradesService, $routeParams, pdfService, $templateCache, $compile, $timeout, $scope) {
        var vm = this;

        gradesService.getGradesHistory($routeParams.id)
            .then(
                function success(response){
                    console.log(response);
                    vm.rows = response.data.vrstica;
                    vm.student = {"ime":response.data.ime, "priimek":response.data.priimek, "vpisnaStevilka": response.data.vpisnaStevilka};
                },
                function error(error){
                    console.log(error);
                }
            );

        vm.createPdf = function() {
            var doc = angular.element(document.getElementById("kartoteka").cloneNode(true));
            console.log(doc);
            $scope.rows = vm.rows;
            $scope.student = vm.student;
            var linkFunction = $compile(doc);
            var result = linkFunction($scope);

            $timeout(function() {
                console.log(result);
                console.log(result.html());
                pdfService.createPdf(result.html())
                    .then(function(data) {
                        var file = new Blob([data], {type: "application/pdf"});
                        saveAs(file, "kartotecni-list.pdf");
                    });
            }, 300);
        };

    }

    angular
        .module("studis")
        .controller("listGradeshistoryCtrl", listGradeshistoryCtrl);
})();