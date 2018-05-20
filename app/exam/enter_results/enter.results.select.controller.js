(function() {

    enterResultsSelectCtrl.$inject = ["$location", "examService"];

    function enterResultsSelectCtrl($location, examService){
        var vm = this;

        vm.subjectSelected = false;
        vm.yearSelected = false;

        /*examService.getAllSubjects()
            .then(
                function success(response){
                    vm.subjects = response.data;
                    console.log("subjects");
                    console.log(vm.subjects);
                },
                function error(error){
                    console.log(error);
                }
            );*/

        /*vm.getExamsForSubject = function(){
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
        };*/


        vm.getExamsForSubject = function(){
            vm.exams = [];
            examService.getExamsForSubjectYear(vm.izvajanjePredmeta.predmet.sifra, vm.studijskoLeto)
                .then(
                    function success(response){
                        console.log(response);
                        if(response.status !== 204){
                            vm.exams = vm.exams.concat(response.data);
                        }
                        vm.nosilci = [vm.izvajanjePredmeta.nosilec1, vm.izvajanjePredmeta.nosilec2, vm.izvajanjePredmeta.nosilec3];
                        vm.subjectSelected = true;
                    },
                    function error(error){
                        console.log(error);
                    }
                )
        };

        vm.getSubjectsForYear = function(){
            examService.getAllSubjects(vm.studijskoLeto)
                .then(
                    function success(response){
                        vm.subjects = response.data;
                        console.log("subjects");
                        console.log(vm.subjects);
                        vm.yearSelected = true;
                    },
                    function error(error){
                        console.log(error);
                    }
                );
        };

        vm.enterResults = function(x){
            console.log("X");
            console.log(x);
            examService.setData(x);
            $location.path("/vnosRezultatov/" + x.id);
        };

        vm.reset = function(yearReset){
            if(yearReset)
                vm.yearSelected = false;
            vm.subjectSelected = false;
        };
    }

    angular
        .module('studis')
        .controller('enterResultsSelectCtrl', enterResultsSelectCtrl);
})();