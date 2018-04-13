(function() {

    studentCtrl.$inject = ["$location"];
    
    function studentCtrl($window, $http, $location) {

        var vm = this;
        vm.updateProfile = function() {

        };

        vm.useToken = function() {

            $location.path("/student/" + 31 + "/vpis");
        };
    }

    angular
        .module('studis')
        .controller('studentCtrl', studentCtrl);
})();