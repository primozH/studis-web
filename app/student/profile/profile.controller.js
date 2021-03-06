(function() {

    /* global angular */
    angular
        .module('studis')
        .controller('profileCtrl', profileCtrl);

    function profileCtrl(searchProfile, $routeParams, $scope, $window, $location){
        vm = this;

        vm.showGradesHistory = function(){
            $location.path("/kartotecniList/" + $routeParams.id);
        };

        vm.showIndex = function(){
            $location.path("/elektronskiIndeks/" + $routeParams.id);
        };

        searchProfile.getStudentById($routeParams.id)
            .then(
                function success(response){
                    console.log(response);
                    vm.student = response.data;

                    searchProfile.getVpis(vm.student.id)
                        .then(
                            function success(response){
                                vm.vpisi = response.data;
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