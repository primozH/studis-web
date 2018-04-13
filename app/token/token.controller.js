
angular
    .module('studis')
    .controller('tokenCtrl', tokenCtrl);

function tokenCtrl(tokenService, $routeParams, $location, $scope, $window){
    var vm = this;

    $scope.logout = function() {
        $window.localStorage.removeItem('studis');
        $window.localStorage.removeItem("tip");
        $window.location.reload();
        $window.location.href = '/#/prijava';
    };

    tokenService.getToken($routeParams.id, $routeParams.vrstaVpisa)
        .then(
            function success(response){
                vm.token = response.data;
                if(vm.token.prostaIzbira)
                    $("#prostaIzbiraDa").prop("checked", true);
                else
                    $("#prostaIzbiraNe").prop("checked", true);
                if(vm.token.izkoriscen){
                    $(':button').prop('disabled', true);
                    $('select').prop('disabled', true);
                    $("input[type=radio]").prop('disabled', true);
                }

                /*
                document.getElementById('program').value = vm.token.studijskiProgram.sifraEVS;
                document.getElementById('letnik').value = vm.token.letnik.letnik;
                document.getElementById('vrsta_vpisa').value = vm.token.vrstaVpisa.sifraVpisa;
                document.getElementById('nacin_studija').value = vm.token.nacinStudija.sifra;
                document.getElementById('oblika_studija').value = vm.token.oblikaStudija.sifra;
                */
                console.log(vm.token);
                $("form select[name=studijskiProgram]").val(vm.token.studijskiProgram.sifraEVS).change();
                $("form select[name=letnik]").val(vm.token.letnik.letnik).change();
                $("form select[name=vrstaVpisa]").val(vm.token.vrstaVpisa.sifraVpisa).change();
                $("form select[name=nacinStudija]").val(vm.token.nacinStudija.sifra).change();
                $("form select[name=oblikaStudija]").val(vm.token.oblikaStudija.sifra).change();

                $('.selectpicker').selectpicker({
                    size: 5
                });
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
                    tokenService.setMessage("Žeton je bil uspešno odstranjen");
                    $location.path("/zetoni");
                },
                function error(error){
                    console.log(error);
                    tokenService.setMessage("Pri brisanju žetona je prišlo do napake");
                }
            );
    };

    vm.updateToken = function(){
        var formData = {
            "vrstaVpisa":{
                "sifraVpisa": document.getElementById('vrsta_vpisa').value
            },
            "student":{
                "id": vm.token.student.id
            },
            "studijskiProgram":{
                "sifraEVS": document.getElementById('program').value
            },
            "letnik":{
                "letnik": document.getElementById('letnik').value
            },
            "nacinStudija":{
                "sifra": document.getElementById('nacin_studija').value
            },
            "oblikaStudija":{
                "sifra": document.getElementById('oblika_studija').value
            },
            "prostaIzbira": $("input[name=prostaIzbira]:checked").val()
        };
        console.log("form data");
        console.log(formData);
        tokenService.putToken($routeParams.id, $routeParams.vrstaVpisa, formData)
            .then(
                function success(response){
                    console.log(response);
                    tokenService.setMessage("Žeton je bil uspešno posodobljen");
                    $location.path("/zetoni");
                },
                function error(error){
                    console.log(error);
                    tokenService.setMessage("Pri posodabljanju žetona je prišlo do napake");
                }
            );
    };

}
