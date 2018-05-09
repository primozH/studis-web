(function() {

    enterResultsSelectCtrl.$inject = ["$routeParams", "$location", "examService"];

    function enterResultsSelectCtrl($routeParams, $location, examService){
        var vm = this;

        vm.subjectSelected = false;

        examService.getAllSubjects()
            .then(
                function success(response){
                    vm.subjects = response.data;
                    console.log("subjects");
                    console.log(vm.subjects);
                },
                function error(error){
                    console.log(error);
                }
            );


        $('.selectpicker').selectpicker();


        vm.getExamsForSubject = function(){
            console.log(vm.predmet);
            examService.getExamsForSubject(vm.predmet)
                .then(
                    function success(response){
                        console.log(response);
                        vm.exams = response.data;
                        vm.subjectSelected = true;
                    },
                    function error(error){
                        console.log(error);
                    }
                )
        };

        vm.enterResults = function(){

        };
    }

    angular
        .module('studis')
        .controller('enterResultsSelectCtrl', enterResultsSelectCtrl);
})();