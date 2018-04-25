(function() {

    ReferentkaCtrl.$inject = ["$window", "$location"];

    function ReferentkaCtrl($window, $location) {
        var vsebina_datoteke = null;
        var vm = this;

        vm.iskanjeStudentov = function() {
          $location.path("/iskanje");
        };

        vm.prikaziZetone = function() {
            $location.path("/zeton");
        };

    }

    angular
        .module('studis')
        .controller('ReferentkaCtrl', ReferentkaCtrl);
})();