(function() {

    studentCtrl.$inject = ["$location", "studentService", "authentication", "tokenService", "$timeout",
    "examService"];
    
    function studentCtrl($location, studentService, authentication, tokenService, $timeout, examService) {

        var vm = this;
        vm.student = null;
        vm.zetoni = null;

        studentService.getStudent(authentication.currentUser().id)
            .then(function (response) {
                vm.student = response;
            }, function (err) {
                console.log(err);
            });

        tokenService.getTokensForStudent(authentication.currentUser().id, false)
            .then(function (response) {
                console.log(response);
                vm.zetoni = response;
            }, function (err) {
                console.log(err);
            });

        vm.useToken = function(zeton) {
            tokenService.setSelectedToken(zeton);
            $location.path("/student/" + vm.student.id + "/vpis");
        };


        /* izpitni roki */
        vm.exam = [];
        vm.prijavljenId = [];
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

        examService.getAvailableExams(2018)
            .then(
                function success(response){
                    console.log(response);
                    vm.exams = response.data;
                    angular.forEach(vm.exams, function(exam, key) {
                        var prijavljenRok = exam.prijavljenId;
                        if (prijavljenRok != null) {
                            angular.forEach(exam.roki, function(rok) {
                                if (rok.id == prijavljenRok) {
                                    vm.exam[key] = rok;
                                }
                            })
                        }
                    });
                },
                function error(error){
                    console.log(error);
                }
            );


        vm.applyForExam = function(rok, index){
            data = {
                "student": {
                    "id": authentication.currentUser().id
                },
                "rok": {
                    "id": rok
                }
            };
            examService.postExamApplication(data)
                .then(
                    function success(response){
                        console.log(response);
                        vm.exams[index].prijavljen = true;
                        //$('#dateInput').prop('disabled', 'disabled');
                        vm.prijavljenId[index] = response.data.id;
                        vm.message = "Prijava na izpit je bila uspešna";
                        messageTimeout();
                    },
                    function error(error){
                        console.log(error);
                        vm.errorMsg = "Pri prijavi na izpit je prišlo do napake: " + error.data.message;
                        errorMsgTimeout();
                    }
                )
        };

        vm.cancelExamApplication = function(id, index){
            var data = {
                "student": {
                    "id": authentication.currentUser().id
                },
                "rok": {
                    "id": id == null ? vm.prijavljenId[index] : id
                }
            };
            examService.deleteExamApplication(data)
                .then(
                    function success(response){
                        console.log(response);
                        vm.exams[index].prijavljen = false;
                        //$('#dateInput').prop('disabled', false);
                        vm.prijavljenId[index] = null;
                        vm.message = "Odjava izpita je bila uspešna";
                        messageTimeout();
                    },
                    function error(error){
                        console.log(error);
                        vm.errorMsg = "Pri odjavi izpita je prišlo do napake: " + error.data.message;
                        errorMsgTimeout();
                    }
                )
        };
    }

    angular
        .module('studis')
        .controller('studentCtrl', studentCtrl);
})();