(function () {

    vpisniList1Ctrl.$inject = ["$location", "studentService", "codeListService", "$routeParams"];

    function vpisniList1Ctrl($location, studentService, codeListService, $routeParams) {
        var vm = this;
        vm.spol = [
            {
                id: 0,
                naziv: "ženski"
            },
            {
                id: 1,
                naziv: "moški"
            }
        ];

        vm.datumRojstva = null;

        vm.save = function() {
            vm.student.datumRojstva = convertDate(vm.datumRojstva);

            console.log(vm.student);
            studentService.updateStudent(vm.student)
                .then(function(response) {
                    if (response.status == 409) {
                        vm.errorMsg = response.data.message;
                    } else {
                        vm.saveSuccess = true;
                    }
                }, function(err) {
                    vm.errorMsg = "Napaka pri shranjevanju osebnih podatkov!";
                })
        };

        vm.toCurriculum = function() {
            $location.path("student/" + vm.student.id + "/vpis/predmetnik");
        };

        studentService.getStudent($routeParams.id)
            .then(function (response) {
                vm.student = response;
                if (vm.student.datumRojstva) {
                    vm.datumRojstva = new Date(vm.student.datumRojstva);
                }
                console.log(vm.student);
            }, function(err) {
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

    function convertDate(date) {
        year = date.getFullYear();
        month = date.getMonth()+1;
        dt = date.getDate();

        if (dt < 10) {
            dt = '0' + dt;
        }
        if (month < 10) {
            month = '0' + month;
        }

        return(year+'-' + month + '-'+dt);
    }

    angular
        .module("studis")
        .controller("vpisniList1Ctrl", vpisniList1Ctrl);
})();
