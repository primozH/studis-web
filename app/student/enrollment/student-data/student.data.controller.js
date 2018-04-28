(function () {

    vpisniList1Ctrl.$inject = ["$location", "studentService", "codeListService", "$routeParams"];

    function vpisniList1Ctrl($location, studentService, codeListService, $routeParams) {
        var vm = this;
        vm.datumRojstva = null;

        //če država ni slovenija, pošto in občino nastavi na null
        vm.preveriZacasnoDrzavo = function() {
            if (vm.student.drzavaZacasno.numericnaOznaka != 705) {
                vm.student.obcinaZacasno = null;
                vm.student.postaZacasno = null;
            }
        }
        vm.preveriStalnoDrzavo = function() {
            if (vm.student.drzavaStalno.numericnaOznaka != 705) {
                vm.student.obcinaStalno = null;
                vm.student.postaStalno = null;
            }
        }    


        vm.save = function() {
            vm.errorMsg = false;
            vm.student.datumRojstva = convertDate(vm.datumRojstva);
            vm.student.spol = vm.spol;

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

                if (vm.student.spol) {
                    vm.spol = vm.student.spol === "MOSKI" ? 1 : 0;
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
