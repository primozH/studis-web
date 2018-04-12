
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

    vm.updateToken = function(){
        // var loginForm = $('#tokenForm').serializeArray();
        // var loginFormObject = {};
        // $.each(loginForm,
        //     function(i, v) {
        //         loginFormObject[v.name] = v.value;
        //     });
        // loginFormObject["student"] = vm.token.student.id;
        // console.log(loginFormObject);
        // console.log(document.getElementById('program').value);
        var form = {
            "vrstaVpisa":{
                "sifraVpisa": document.getElementById('program').value
            },
            "student":{
                "id": vm.token.student.id
            },
            "studijskiProgram":{
                "sifraEVS": document.getElementById('program').value
            },
            "letnik":{
                "letnik": document.getElementById('program').value
            },
            "nacinStudija":{
                "sifra": document.getElementById('program').value
            },
            "oblikaStudija":{
                "sifra": document.getElementById('program').value
            }
        };
        console.log(form);

    };

}
