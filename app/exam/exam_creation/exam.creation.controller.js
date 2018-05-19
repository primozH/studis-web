(function() {

    examCreationCtrl.$inject = ["examService", "authentication", "$timeout"];

    function examCreationCtrl(examService, authentication, $timeout){
        var vm = this;

        var messageTimer = null;
        var errorMsgTimer = null;

        vm.subjectSelected = false;
        vm.yearSelected = false;
        vm.currentUser = authentication.currentUser();
        vm.exams = [];

        $.fn.datepicker.dates['sl'] = {
            days: ["Nedelja", "Ponedeljek", "Torek", "Sreda", "Četrtek", "Petek", "Sobota"],
            daysShort: ["Ned", "Pon", "Tor", "Sre", "Čet", "Pet", "Sob"],
            daysMin: ["Ne", "Po", "To", "Sr", "Če", "Pe", "So"],
            months: ["Januar", "Februar", "Marec", "April", "Maj", "Junij", "Julij", "Avgust", "September", "Oktober", "November", "December"],
            monthsShort: ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Avg", "Sep", "Okt", "Nov", "Dec"],
            today: "Danes",
            weekStart: 1
        };

        $("#dateInput").datepicker({
            format: 'dd/mm/yyyy',
            autoclose: true,
            startDate: '+2d',
            daysOfWeekDisabled:[0,6],
            language: 'sl',
            todayBtn: true,
            todayHighlight: true
        });

        $('.clockpicker').clockpicker({
            donetext: 'Potrdi',
            default: ""
        });

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

        vm.createExam = function(){
            var izvajalec;
            if(vm.currentUser.tip === 'Ucitelj')
                izvajalec = vm.currentUser.id;
            else
                izvajalec = vm.izvajalec;

            var data = {
                "prostor": vm.examRoom,
                "izvajalec": {
                    "id": izvajalec
                },
               "izvajanjePredmeta": {
                    "predmet": {"sifra": vm.izvajanjePredmeta.predmet.sifra},
                    "studijskoLeto": {"id":2018}
               },
                "datum": $("#dateInput").data('datepicker').getFormattedDate('yyyy-mm-dd'),
                "cas": $("#timeInput").val() + ":00"
            };
            console.log(data);
            examService.postExam(data)
                .then(
                    function success(response){
                        console.log(response);
                        vm.message = "Izpitni rok je bil uspešno ustvarjen";
                        messageTimeout();
                        vm.exams.push(response.data);
                    },
                    function error(error){
                        console.log(error);
                        vm.errorMsg = "Pri ustvarjanju izpitnega roka je prišlo do napake";
                        errorMsgTimeout();
                    }
                )
        };

        vm.getExamsForSubject = function(){
            vm.exams = [];
            examService.getExamsForSubject(vm.izvajanjePredmeta.predmet.sifra)
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

        vm.reset = function(){
            vm.subjectSelected = false;
            $("#roomInput").prop('value', '');
            $("#timeInput").prop('value', '');
            $("#date").prop('value', '');

        };
    }

    angular
        .module('studis')
        .controller('examCreationCtrl', examCreationCtrl);
})();