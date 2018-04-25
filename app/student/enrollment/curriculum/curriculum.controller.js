(function() {

    curriculumCtrl.$inject = ["$location", "enrollmentService", "tokenService", "$routeParams"];

    function curriculumCtrl($location, enrollmentService, tokenService, $routeParams) {

        var vm = this;
        vm.token = tokenService.getSelectedToken();
        console.log(vm.token);

        vm.freeChoice = vm.token.prostaIzbira;
        console.log(vm.freeChoice);

        vm.strokovniPredmeti = [];
        vm.modulskiPredmeti = [];
        vm.splosniPredmeti = [];
        vm.izbraniStrokovniPredmeti = [];
        vm.izbraniModulskiPredmeti = [];
        vm.izbraniSplosniPredmeti = [];
        vm.sumECTS = 0;

        setCourses();

        vm.addCourse = function(course, from, to) {
            vm.sumECTS += swap(course, from, to, true);

            if (vm.sumECTS > 60) {
                vm.removeCourse(course, to, from);
                vm.errorMsg = "Zbrati je potrebno točno 60 kreditnih točk";
                return;
            }
        };

        vm.removeCourse = function(course, from, to) {
            vm.sumECTS -= swap(course, from, to, false);
        };

        vm.enroll = function() {
            if (vm.sumECTS != 60) {
                vm.errorMsg = "Zbrati je potrebno 60 kreditnih točk";
                return;
            }
            var vpis = {
                zeton: vm.token
            };

            if (vm.token.letnik.letnik == 2) {
                if (vm.izbraniStrokovniPredmeti.length < 1) {
                    vm.errorMsg = "Izbrati je potrebno vsaj en strokovni predmet";
                    return;
                }
                vpis.strokovniPredmeti = [];
                angular.forEach(vm.izbraniStrokovniPredmeti, function(course) {
                    vpis.strokovniPredmeti.push({sifra: course.predmet.sifra})
                });
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



        function swap(course, from, to, add) {
            if (course.delPredmetnika.sifra == 4 && !vm.freeChoice
                && ((vm.izbraniModulskiPredmeti.length < 6) || (vm.izbraniModulskiPredmeti.length >= 6 && !add))) {
                var module = course.modul;
                var ects = 0;
                var courses = [];
                angular.forEach(from, function(c) {
                    console.log(c, course);
                    if (c.modul == module) {
                        to.push(c);
                        courses.push(c);
                        ects += c.predmet.ects;
                    }
                });

                angular.forEach(courses, function(c) {
                    from.splice(from.indexOf(c), 1);
                });

                return ects;

            } else {
                var index = from.indexOf(course);
                from.splice(index, 1);
                to.push(course);

                return course.predmet.ects;
            }
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