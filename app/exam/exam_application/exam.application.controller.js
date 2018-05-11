(function() {

    examAppCtrl.$inject = ["examService", "authentication", "$timeout"];

    function examAppCtrl(examService, authentication, $timeout){
        var vm = this;
        vm.exam = [];
        vm.prijavljen = [];
        vm.prijavljenDatum = [];
        vm.message = null;
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

        examService.getAvailableExams()
            .then(
                function success(response){
                    console.log(response);
                    vm.exams = response.data;
                },
                function error(error){
                    console.log(error);
                }
            );


        vm.applyForExam = function(predmet, studijskoLeto, datumIzvajanja, index){
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
                        vm.exams[index].prijavljen = true;
                        //$('#dateInput').prop('disabled', 'disabled');
                        vm.prijavljen[index] = true;
                        vm.message = "Prijava na izpit je bila uspešna";
                        messageTimeout();
                    },
                    function error(error){
                        console.log(error);
                        vm.errorMsg = "Pri prijavi na izpit je prišlo do napake";
                        errorMsgTimeout();
                    }
                )
        };

        vm.cancelExamApplication = function(predmet, studijskoLeto, datumIzvajanja, index){
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
                        vm.exams[index].prijavljen = false;
                        //$('#dateInput').prop('disabled', false);
                        vm.prijavljen[index] = false;
                        vm.message = "Odjava izpita je bila uspešna";
                        messageTimeout();
                    },
                    function error(error){
                        console.log(error);
                        vm.errorMsg = "Pri odjavi izpita je prišlo do napake";
                        errorMsgTimeout();
                    }
                )
        };
    }

    angular
        .module('studis')
        .controller('examAppCtrl', examAppCtrl);
})();