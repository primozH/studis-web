(function() {

    curriculumCtrl.$inject = ["$location", "enrollmentService", "tokenService", "$routeParams"];

    function curriculumCtrl($location, enrollmentService, tokenService, $routeParams) {

        var vm = this;
        vm.token = tokenService.getSelectedToken();
        console.log(vm.token);

        vm.strokovniPredmeti = [];
        vm.modulskiPredmeti = [];
        vm.splosniPredmeti = [];
        vm.izbraniModulskiPredmeti = [];
        vm.izbraniSplosniPredmeti = [];
        vm.sumECTS = 0;

        setCourses();

        vm.addProfCourse = function(course) {
            var tmp = vm.izbraniStrokovniPredmet;
            if (tmp != null) {
                vm.strokovniPredmeti.push(tmp);
                vm.sumECTS -= tmp.predmet.ects;
                vm.izbraniStrokovniPredmet = null;
            }
            vm.izbraniStrokovniPredmet = course;
            vm.sumECTS += course.predmet.ects;
            var index = vm.strokovniPredmeti.indexOf(course);
            vm.strokovniPredmeti.splice(index, 1);
        };

        vm.removeProfCourse = function(course) {
            vm.strokovniPredmeti.push(course);
            vm.sumECTS -= course.predmet.ects;
            vm.izbraniStrokovniPredmet = null;
        };

        vm.addCourse = function(course, from, to) {
            swap(course, from, to);
            vm.sumECTS += course.predmet.ects;
        };

        vm.removeCourse = function(course, from, to) {
            swap(course, from, to);
            vm.sumECTS -= course.predmet.ects;
        };

        vm.enroll = function() {
            if (vm.sumECTS < 60) {
                vm.errorMsg = "Zbrati je potrebno vsaj 60 kreditnih točk";
                return;
            }
            var vpis = {
                zeton: vm.token
            };

            if (vm.token.letnik.letnik == 2) {
                if (vm.izbraniStrokovniPredmet == null) {
                    vm.errorMsg = "Izbrati je potrebno en strokovni predmet";
                    return;
                }
                vpis.strokovniPredmet = {
                    sifra: vm.izbraniStrokovniPredmet.predmet.sifra
                };
            }
            if (vm.token.letnik.letnik == 3) {
                if (vm.izbraniModulskiPredmeti.length < 6) {
                    vm.errorMsg = "Izbrati je potrebno 6 modulskih predmetov";
                    return;
                }
                vpis.modulskiPredmeti = [];
                angular.forEach(vm.izbraniModulskiPredmeti, function(course, key) {
                   vpis.modulskiPredmeti.push({sifra: course.predmet.sifra})
                });
            }

            if (vm.token.letnik.letnik != 1) {
                vpis.splosniPredmeti = [];
                angular.forEach(vm.izbraniSplosniPredmeti, function(course, key) {
                    vpis.splosniPredmeti.push({sifra: course.predmet.sifra})
                });
            }

            enrollmentService.enroll($routeParams.id, vpis)
                .then(function (response) {
                    console.log(response);
                    tokenService.deleteSelectedToken();
                    $location.path("/student");
                }, function(err) {
                    console.log(err);
                })
        };



        function swap(course, from, to) {
            var index = from.indexOf(course);
            from.splice(index, 1);
            to.push(course);
        }

        function setCourses() {
            enrollmentService.getCurriculum("obvezni", vm.token)
                .then(function(response) {
                    vm.obvezniPredmeti = response;
                    angular.forEach(vm.obvezniPredmeti, function(course, key) {
                        vm.sumECTS += course.predmet.ects;
                    })
                }, function(err) {
                    console.log(err);
                });

            enrollmentService.getCurriculum("strokovni", vm.token)
                .then(function(response) {
                    vm.strokovniPredmeti = response;
                }, function(err) {
                    console.log(err);
                });

            enrollmentService.getCurriculum("splosni", vm.token)
                .then(function(response) {
                    vm.splosniPredmeti = response;
                }, function(err) {
                    console.log(err);
                });

            enrollmentService.getCurriculum("moduli", vm.token)
                .then(function(response) {
                    vm.modulskiPredmeti = response;
                }, function(err) {
                    console.log(err);
                });
        }
    }

    angular
        .module("studis")
        .controller("vpisniList2Ctrl", curriculumCtrl);
})();