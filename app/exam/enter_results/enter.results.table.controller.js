(function() {

    enterResultsTableCtrl.$inject = ["$routeParams", "$location", "examService", "$timeout"];

    function enterResultsTableCtrl($routeParams, $location, examService, $timeout){
        var vm = this;

        vm.grades = [5,6,7,8,9,10];

        var messageTimer = null;
        var errorMsgTimer = null;

        var messageTimeout = function(){
            $timeout.cancel(messageTimer);
            messageTimer = $timeout(function(){
                vm.message = null;
            }, 5000);
        };

        var errorMsgTimeout = function(){
            $timeout.cancel(errorMsgTimer);
            errorMsgTimer = $timeout(function(){
                vm.errorMsg = null;
            }, 5000);
        };


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
                        messageTimeout();
                    },
                    function error(error){
                        console.log(error);
                        vm.errorMsg = "Pri shranjevanju rezultatov je prišlo do napake";
                        errorMsgTimeout();
                    }
                );
        };

        vm.returnApplication = function(rokId, studentId, idx){
            examService.returnApplication(rokId, studentId)
                .then(
                    function success(response){
                        console.log(response);
                        vm.examApps.splice(idx, 1);
                        vm.message = "Prijava je bila uspešno vrnjena";
                        messageTimeout();
                    },
                    function error(error){
                        console.log(error);
                        vm.errorMsg = "Pri vračanju prijave je prišlo do napake: " + error.data.message;
                        errorMsgTimeout();
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