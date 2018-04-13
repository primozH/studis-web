(function() {

    /* global angular */
    angular
        .module('studis')
        .controller('profileCtrl', profileCtrl);

    function profileCtrl(searchProfile, $routeParams, $scope, $window){
        vm = this;

        //za header
        $scope.tip_referentka = $window.localStorage.getItem("tip") === "Referent";
        $scope.tip_ucitelj = $window.localStorage.getItem("tip") === "Ucitelj";
        
        $scope.logout = function() {
            $window.localStorage.removeItem('studis');
            $window.localStorage.removeItem("tip");
            $window.localStorage.removeItem("zeton");
            $window.location.href = '/#/prijava';
        }

        searchProfile.getStudent($routeParams.vpisnaStevilka)
            .then(
                function success(response){
                    vm.student = response.data[0];
                    console.log("response in profile controller:");
                    console.log(vm.student);


                    searchProfile.getVpis(vm.student.id)
                        .then(
                            function success(response){
                                vm.vpisi = response.data;
                                console.log("response in profile controller:");
                                console.log(vm.vpisi);

                            },
                            function error(error){
                                console.log(error);
                            }
                        );

                },
                function error(error){
                    console.log(error);
                }
            );
    }

})();