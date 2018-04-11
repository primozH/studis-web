(function() {

    enrollmentService.$inject = ["$http", "$window", "studentService"];

    function enrollmentService($http, $window, studentService) {

        var vm = this;

        vm.student = studentService.getStudent;

    }

    angular
        .module("studis")
        .service("enrollmentService", enrollmentService);
})();