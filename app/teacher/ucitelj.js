(function() {
  'use strict';

    function UciteljCtrl($location) {

        var vsebina_datoteke = null;
        var vm = this;

        vm.iskanjeStudentov = function() {
            $location.path("/iskanje");
        };
    }

    angular
        .module('studis')
        .controller('UciteljCtrl', UciteljCtrl);
})();