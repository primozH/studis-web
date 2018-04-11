(function() {

    studentCtrl.$inject = ["$location", "studentService", "authentication", "tokenService"];
    
    function studentCtrl($location, studentService, authentication, tokenService) {

        var vm = this;
        vm.student = null;
        vm.zetoni = null;

        studentService.getStudent(authentication.currentUser().id)
            .then(function (response) {
                vm.student = response;
            }, function (err) {
                console.log(err);
            });

        tokenService.getTokens(authentication.currentUser().id)
            .then(function (response) {
                vm.zetoni = response.data;
            }, function (err) {
                console.log(err);
            });

        vm.useToken = function(sifra) {
            $location.path("/student/" + vm.student.id + "/vpis");
        };
    }

    angular
        .module('studis')
        .controller('studentCtrl', studentCtrl);
})();