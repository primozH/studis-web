(function() {

    examCreationCtrl.$inject = ["$routeParams", "$location", "examService"];

    function examCreationCtrl($routeParams, $location, examService){
        var vm = this;

        $.fn.datepicker.dates['sl'] = {
            days: ["Nedelja", "Ponedeljek", "Torek", "Sreda", "Četrtek", "Petek", "Sobota"],
            daysShort: ["Ned", "Pon", "Tor", "Sre", "Čet", "Pet", "Sob"],
            daysMin: ["Ne", "Po", "To", "Sr", "Če", "Pe", "So"],
            months: ["Januar", "Februar", "Marec", "April", "Maj", "Junij", "Julij", "Avgust", "September", "Oktober", "November", "December"],
            monthsShort: ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Avg", "Sep", "Okt", "Nov", "Dec"],
            today: "Danes",
            weekStart: 1
        };

        $('.selectpicker').selectpicker({
            size: 5
        });

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
            donetext: 'Potrdi'
        });

        vm.createExam = function(){

        };
    }

    angular
        .module('studis')
        .controller('examCreationCtrl', examCreationCtrl);
})();