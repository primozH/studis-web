
angular
    .module('studis')
    .controller('tokensCtrl', tokensCtrl);

function tokensCtrl(tokenService, $location, searchProfile, izvozService, $timeout, $scope, $window){
    var vm = this;

    vm.message = tokenService.getMessage();
    vm.errorMsg = null;

    $timeout(function(){
        vm.message = null;
        tokenService.setMessage(null);
    }, 4000);

    tokenService.getTokens()
        .then(
            function success(response){
                vm.tokens = response.data;
                console.log("response in list-tokens controller:");
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
                                $('#createTokenModal').modal('hide');
                                vm.errorMsg = "Napaka pri kreiranju žetona!";
                            }
                        );
                },
                function error(error){
                    console.log(error);
                }
            );
    };

    vm.izvozi = function(tip) {
        tableHeader = {"row":["Zaporedna številka","Vpisna številka","Ime","Priimek",
        "Študijski program","Letnik","Vrsta vpisa","Način študija","Oblika študija"]};
        tableRows = [];

        console.log(vm.tokens[0]);
        for (var i = 1; i <= vm.tokens.length; i++) {
            var temp = vm.tokens[i-1];
            var trow = {"row":[i,temp.student.vpisnaStevilka,temp.student.ime,temp.student.priimek,temp.studijskiProgram.naziv,
            temp.letnik.letnik,temp.vrstaVpisa.vrstaVpisa,temp.nacinStudija.opis,temp.oblikaStudija.opis]};
            tableRows.push(trow);
        } 
        izvozService.izvoziCSVPDF("Žetoni", tableHeader, tableRows, tip);
    };
}
