(function() {

    /* global angular */
    angular
        .module('studis')
        .controller('profileCtrl', profileCtrl);

    function profileCtrl(searchProfile, $routeParams){
        vm = this;
        console.log($routeParams);
        searchProfile.getStudent($routeParams.vpisnaStevilka)
            .then(
                function success(response){
                    vm.student = response.data[0];
                    console.log("response in profile controller:");
                    console.log(vm.student);
                },
                function error(error){
                    console.log(error);
                }
            );
        //vm.student = searchProfile.getStudent($routeParams.vpisnaStevilka);
        console.log(vm.student);
    }

})();