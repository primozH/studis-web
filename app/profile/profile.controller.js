(function() {

    /* global angular */
    angular
        .module('studis')
        .controller('profileCtrl', profileCtrl);

    function profileCtrl(searchProfile){
        vm = this;
        vm.student = searchProfile.getStudent();

    }

})();