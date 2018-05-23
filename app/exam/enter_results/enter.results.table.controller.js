(function() {

    enterResultsTableCtrl.$inject = ["$routeParams", "$location", "examService"];

    function enterResultsTableCtrl($routeParams, $location, examService){
        var vm = this;

        vm.grades = [5,6,7,8,9,10];

        examService.getExamResults($routeParams.rokId)
            .then(
                function success(response){
                    console.log(response);
                    vm.examApps = response.data;
                },
                function error(error){
                    console.log(error);
                }
            );

        vm.postExamResults = function(){
            console.log(vm.examApps);
            examService.postExamResults($routeParams.rokId, vm.examApps)
                .then(
                    function success(response){
                        console.log(response);
                        vm.message = "Rezultati so bili uspešno shranjeni";
                    },
                    function error(error){
                        console.log(error);
                        vm.errorMsg = "Pri shranjevanju rezultatov je prišlo do napake";
                    }
                );
        };

        vm.cancelExamApplication = function(rokId, studentId, idx){
            var data = {
                "student": {
                    "id": studentId
                },
                "rok": {
                    "id": rokId
                }
            };
            examService.deleteExamApplication(data)
                .then(
                    function success(response){
                        console.log(response);
                        vm.examApps.splice(idx, 1);
                        vm.message = "Prijava je bila uspešno vrnjena";
                    },
                    function error(error){
                        console.log(error);
                        vm.errorMsg = "Pri vračanju prijave je prišlo do napake";
                    }
                )
        };

        vm.openGradesList = function(){
            $location.path("/seznamOcen/" + $routeParams.rokId);
        };

    }

    angular
        .module('studis')
        .controller('enterResultsTableCtrl', enterResultsTableCtrl);
})();