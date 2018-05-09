(function() {

    examAppCtrl.$inject = ["$routeParams", "$location", "examService", "authentication"];

    function examAppCtrl($routeParams, $location, examService, authentication){
        var vm = this;

        examService.getAvailableExams()
            .then(
                function success(response){
                    console.log(response);
                    vm.exams = response.data;
                    console.log("vm.exams");
                    console.log(vm.exams);
                },
                function error(error){
                    console.log(error);
                }
            );


        vm.applyForExam = function(predmet, studijskoLeto, datumIzvajanja){
            data = {
                "student": authentication.currentUser().id,
                "predmet": predmet,
                "studijskoLeto": studijskoLeto,
                "datumIzvajanja": datumIzvajanja
            };
            examService.postExamApplication(data)
                .then(
                    function success(response){
                        console.log(response);
                    },
                    function error(error){
                        console.log(error);
                    }
                )
        };

        vm.cancelExamApplication = function(predmet, studijskoLeto, datumIzvajanja){
            data = {
                "student": authentication.currentUser().id,
                "predmet": predmet,
                "studijskoLeto": studijskoLeto,
                "datumIzvajanja": datumIzvajanja
            };
            examService.deleteExamApplication(data)
                .then(
                    function success(response){
                        console.log(response);
                    },
                    function error(error){
                        console.log(error);
                    }
                )
        };
    }

    angular
        .module('studis')
        .controller('examAppCtrl', examAppCtrl);
})();