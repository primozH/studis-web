
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

}
