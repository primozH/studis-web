(function() {

    listGradeshistoryCtrl.$inject = ["gradesService", "$routeParams"];

    function listGradeshistoryCtrl(gradesService, $routeParams) {
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
            )

    }

    angular
        .module("studis")
        .controller("listGradeshistoryCtrl", listGradeshistoryCtrl);
})();