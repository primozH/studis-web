(function() {

    examCreationCtrl.$inject = ["examService", "authentication"];

    function examCreationCtrl(examService, authentication){
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

        $.fn.datepicker.dates['sl'] = {
            days: ["Nedelja", "Ponedeljek", "Torek", "Sreda", "Četrtek", "Petek", "Sobota"],
            daysShort: ["Ned", "Pon", "Tor", "Sre", "Čet", "Pet", "Sob"],
            daysMin: ["Ne", "Po", "To", "Sr", "Če", "Pe", "So"],
            months: ["Januar", "Februar", "Marec", "April", "Maj", "Junij", "Julij", "Avgust", "September", "Oktober", "November", "December"],
            monthsShort: ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Avg", "Sep", "Okt", "Nov", "Dec"],
            today: "Danes",
            weekStart: 1
        };

        $('.selectpicker').selectpicker();

        $("#dateInput").datepicker({
            format: 'dd/mm/yyyy',
            autoclose: true,
            startDate: '+2d',
            daysOfWeekDisabled:[0],
            language: 'sl',
            todayBtn: true,
            todayHighlight: true
        });

        $('.clockpicker').clockpicker({
            donetext: 'Potrdi',
            default: ""
        });

        vm.createExam = function(){
           var data = {
                "prostor": vm.examRoom,
                "izvajalec": {
                    "id": authentication.currentUser().id
                },
                "datum": $("#dateInput").data('datepicker').getFormattedDate('yyyy-mm-dd'),
                "cas": $("#timeInput").val()
            };
            console.log(data);
            examService.postExam(vm.predmet, data)
                .then(
                    function success(response){
                        console.log(response);
                    },
                    function error(error){
                        console.log(error);
                    }
                )
        };

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
    }

    angular
        .module('studis')
        .controller('examCreationCtrl', examCreationCtrl);
})();