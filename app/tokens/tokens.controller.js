
angular
    .module('studis')
    .controller('tokensCtrl', tokensCtrl);

function tokensCtrl(tokenService, $location, searchProfile, $timeout){
    var vm = this;

    vm.message = tokenService.getMessage();

    $timeout(function(){
        vm.message = null;
    }, 3000);

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
