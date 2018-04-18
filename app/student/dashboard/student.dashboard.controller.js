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

        tokenService.getTokens(authentication.currentUser().id, false)
            .then(function (response) {
                console.log(response);
                vm.zetoni = response.data;
            }, function (err) {
                console.log(err);
            });

        vm.useToken = function(zeton) {
            tokenService.setSelectedToken(zeton);
            $location.path("/student/" + vm.student.id + "/vpis");
        };
    }

    angular
        .module('studis')
        .controller('studentCtrl', studentCtrl);
})();