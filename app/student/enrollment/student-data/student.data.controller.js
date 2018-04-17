(function () {

    vpisniList1Ctrl.$inject = ["$location", "studentService", "codeListService", "$routeParams"];

    function vpisniList1Ctrl($location, studentService, codeListService, $routeParams) {
        var vm = this;
        vm.student = null;
        vm.spol = null;
        vm.drzava = null;
        vm.poste = null;
        vm.obcine = null;

        studentService.getStudent($routeParams.id)
            .then(function (response) {
                vm.student = response;
                console.log(vm.student);
            }, function(err) {
                console.log(err);
            });
        codeListService.getGender()
            .then(function (response) {
                vm.spol = response;
            }, function (err) {
                console.log(err);
            });

        codeListService.getCountries()
            .then(function (response) {
                vm.drzave = response;
            }, function (err) {
                console.log(err);
            });

        codeListService.getMunicipalities()
            .then(function (response) {
                vm.obcine = response;
            }, function(err) {
                console.log(err);
            });

        codeListService.getPosts()
            .then(function(response) {
                vm.poste = response;
            }, function(err) {
                console.log(err);
            })
    }

    angular
        .module("studis")
        .controller("vpisniList1Ctrl", vpisniList1Ctrl);
})();
