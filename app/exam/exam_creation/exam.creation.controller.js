(function() {

    examCreationCtrl.$inject = ["examService", "authentication", "$timeout", "$filter", "$location"];

    function examCreationCtrl(examService, authentication, $timeout, $filter, $location){
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

        //$('[data-toggle="tooltip"]').tooltip();
        $("body").tooltip({ selector: '[data-toggle=tooltip]' });

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
            vm.updateProcess = false;
            if(vm.currentUser.tip === 'Ucitelj')
                vm.izvajalec = vm.currentUser;

            var data = {
                "prostor": vm.examRoom,
                "izvajalec": {
                    "id": vm.izvajalec.id
                },
               "izvajanjePredmeta": {
                    "predmet": {"sifra": vm.izvajanjePredmeta.predmet.sifra},
                    "studijskoLeto": {"id":vm.studijskoLeto}
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


        vm.prepareForExamUpdate = function(x, idx){
            vm.updateProcess = true;
            vm.idxToUpdate = idx;

            console.log("prepare for exam update");
            console.log(x);
            var time = x.cas.split(':')[0] + ":" + x.cas.split(':')[1];
            vm.examRoom = x.prostor;
            $("#timeInput").prop('value', time);
            vm.izvajalec = x.izvajalec;
            //$("#izvajalec").prop('value', x.izvajalec.id).change();
            $('#dateInput').datepicker('setDate', $filter('date')(x.datum, 'dd/MM/y'));
            vm.editingExam = x;
            vm.rokIdToUpdate = x.id;
        };


        <!--EXAM UPDATE-->

        vm.confirmUpdate = function(){
            vm.confirmation = true;
            $('#updateExamModal').modal('hide');
        };

        vm.startUpdateProcess = function(){
            vm.confirmation = true;
            examService.getNumberOfApplicants(vm.rokIdToUpdate)
                .then(
                    function success(response){
                        console.log(response);
                        var numOfApplicants = response.headers("X-Total-Count");
                        if(numOfApplicants > 0){
                            vm.numOfApplicants = numOfApplicants;
                            vm.confirmation = false;
                            $('#updateExamModal').modal('show');
                        }
                        else
                            vm.updateExam();
                    },
                    function error(error){
                        console.log(error);
                    }
                );
        };

        $('#updateExamModal').on('hidden.bs.modal', function(){
            if(vm.confirmation)
                vm.updateExam();
        });

        vm.updateExam = function(){
            //vm.editingExam.prostor = vm.examRoom;
            //vm.editingExam.cas = $("#timeInput").val() + ":00";
            //vm.editingExam.datum = $("#dateInput").data('datepicker').getFormattedDate('yyyy-mm-dd');

            if(vm.currentUser.tip === 'Ucitelj')
                vm.izvajalec = vm.currentUser;

            var data = {
                "id": vm.editingExam.id,
                "prostor": vm.examRoom,
                "izvajalec": {
                    "id": vm.izvajalec.id
                },
                "izvajanjePredmeta": {
                    "predmet": {"sifra": vm.izvajanjePredmeta.predmet.sifra},
                    "studijskoLeto": {"id":vm.studijskoLeto}
                },
                "datum": $("#dateInput").data('datepicker').getFormattedDate('yyyy-mm-dd'),
                "cas": $("#timeInput").val() + ":00"
            };
            console.log(data);
            examService.putExam(data)
                .then(
                    function success(response){
                        console.log(response);
                        vm.updateProcess = false;
                        vm.exams[vm.idxToUpdate] = response.data;
                        vm.message = "Izpitni rok je bil uspešno spremenjen";
                        vm.confirmation = false;
                        messageTimeout();
                    },
                    function error(error){
                        console.log(error);
                        vm.errorMsg = "Pri spreminjanju izpitnega roka je prišlo do napake: " + error.data.message;
                        errorMsgTimeout();
                    }
                )
        };


        <!--EXAM REMOVAL-->

        vm.confirmRemoval = function(){
          vm.confirmation = true;
          $('#removeExamModal').modal('hide');
        };

        vm.startRemovalProcess = function(rokId, idx){
            vm.rokIdToRemove = rokId;
            //vm.idx = idx;
            vm.confirmation = true;
            examService.getNumberOfApplicants(rokId)
                .then(
                    function success(response){
                        console.log(response);
                        var numOfApplicants = response.headers("X-Total-Count");
                        if(numOfApplicants > 0){
                            vm.numOfApplicants = numOfApplicants;
                            vm.confirmation = false;
                            $('#removeExamModal').modal('show');
                        }
                        else
                            vm.removeExam();
                    },
                    function error(error){
                        console.log(error);
                    }
                );
        };

        $('#removeExamModal').on('hidden.bs.modal', function(){
            if(vm.confirmation)
                vm.removeExam();
        });

        vm.removeExam = function(){
            vm.updateProcess = false;
            examService.deleteExam(vm.rokIdToRemove)
                .then(
                    function success(response){
                        console.log(response);
                        vm.exams.splice(vm.idx, 1);
                        vm.message = "Izpitni rok je bil uspešno izbrisan";
                        messageTimeout();
                    },
                    function error(error){
                        console.log(error);
                        vm.errorMsg = "Pri brisanju izpitnega roka je prišlo do napake: " + error.data.message;
                        errorMsgTimeout();
                    }
                )
        };


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

        vm.reset = function(yearReset){
            if(yearReset)
                vm.yearSelected = false;
            vm.subjectSelected = false;
            vm.updateProcess = false;
            $("#roomInput").prop('value', '');
            $("#timeInput").prop('value', '');
            $("#izvajalec").prop('value', '');
            $("#date").prop('value', '');
        };

        vm.filterNull = function(nosilec){
            return nosilec !== null;
        };

        vm.enterResults = function(rokId){
            $location.path("/vnosRezultatov/" + rokId);
        };

    }

    angular
        .module('studis')
        .controller('examCreationCtrl', examCreationCtrl);
})();