
angular
    .module('studis')
    .controller('tokenCtrl', tokenCtrl);

function tokenCtrl(tokenService, $routeParams, $location){
    var vm = this;

    tokenService.getToken($routeParams.id, $routeParams.vrstaVpisa)
        .then(
            function success(response){
                vm.token = response.data;
                if(vm.token.prostaIzbira)
                    $("#prostaIzbiraDa").prop("checked", true);
                else
                    $("#prostaIzbiraNe").prop("checked", true);

                document.getElementById('program').value = vm.token.studijskiProgram.sifraEVS;
                document.getElementById('letnik').value = vm.token.letnik.letnik;
                document.getElementById('vrsta_vpisa').value = vm.token.vrstaVpisa.sifraVpisa;
                document.getElementById('nacin_studija').value = vm.token.nacinStudija.sifra;
                document.getElementById('oblika_studija').value = vm.token.oblikaStudija.sifra;


                console.log(vm.token);
            },
            function error(error){
                console.log(error);
            }
        );

    vm.removeToken = function(){
        tokenService.deleteToken($routeParams.id, $routeParams.vrstaVpisa)
            .then(
                function success(response){
                    console.log(response);
                    $('#removeTokenModal').modal('hide');
                    $location.path("/zetoni");
                },
                function error(error){
                    console.log(error);
                }
            );
    };

    /*vm.updateToken = function(e){
        console.log(e);
    };*/

}
