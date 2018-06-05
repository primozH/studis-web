
angular
    .module('studis')
    .controller('tokensCtrl', tokensCtrl);

function tokensCtrl(tokenService, $location, searchProfile, izvozService, $timeout, $scope, $window){
    var vm = this;

    vm.message = tokenService.getMessage();
    vm.errorMsg = null;
    vm.naStran = 15;

    $timeout(function(){
        vm.message = null;
        tokenService.setMessage(null);
    }, 4000);

    vm.menjavaStrani = function() {
        console.log(vm.trenutnaStran);
        vm.tokens = vm.allTokens.slice((vm.trenutnaStran- 1) * vm.naStran, vm.trenutnaStran * vm.naStran);
    };

    tokenService.getTokens()
        .then(
            function success(response){
                vm.skupaj = response.data.length;
                vm.allTokens = response.data;
                vm.trenutnaStran = 1;
                vm.menjavaStrani();
            },
            function error(error){
                console.log(error);
            }
        );



    vm.openToken = function(id){
        $location.path("/zeton/" + id);
    };

    vm.createToken = function(){
        searchProfile.getStudent(vm.vpisnaStevilka)
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
                                $location.path("/zeton/" + response.data.id);
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

        console.log(vm.allTokens[0]);
        for (var i = 1; i <= vm.allTokens.length; i++) {
            var temp = vm.allTokens[i-1];
            var trow = {"row":[i,temp.student.vpisnaStevilka,temp.student.ime,temp.student.priimek,temp.studijskiProgram.naziv,
            temp.letnik.letnik,temp.vrstaVpisa.vrstaVpisa,temp.nacinStudija.opis,temp.oblikaStudija.opis]};
            tableRows.push(trow);
        } 
        izvozService.izvoziCSVPDF("Žetoni", null, tableHeader, tableRows, tip);
    };
}
