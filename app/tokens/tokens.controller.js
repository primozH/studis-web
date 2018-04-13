
angular
    .module('studis')
    .controller('tokensCtrl', tokensCtrl);

function tokensCtrl(tokenService, $location, searchProfile, $timeout, $scope, $window){
    var vm = this;

    vm.message = tokenService.getMessage();

    $scope.logout = function() {
        $window.localStorage.removeItem('studis');
        $window.localStorage.removeItem("tip");
        $window.location.reload();
        $window.location.href = '/#/prijava';
    };

    $timeout(function(){
        vm.message = null;
        tokenService.setMessage(null);
    }, 4000);

    tokenService.getTokens()
        .then(
            function success(response){
                vm.tokens = response.data;
                console.log("response in tokens controller:");
                console.log(vm.tokens);
            },
            function error(error){
                console.log(error);
            }
        );

    vm.openToken = function(id, vrstaVpisa){
        $location.path("/zeton/" + id + "/" + vrstaVpisa);
    };

    vm.createToken = function(vpisnaStevilka){
        searchProfile.getStudent(vpisnaStevilka)
            .then(
                function success(response){
                    console.log(response.data[0]);
                    var student = response.data[0];
                    tokenService.postToken(student.id)
                        .then(
                            function success(response){
                                console.log("create token response");
                                console.log(response);
                                $('#createTokenModal').modal('hide');
                                $location.path("/zeton/" + student.id + "/" + response.data.vrstaVpisa.sifraVpisa);
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
    };
}
